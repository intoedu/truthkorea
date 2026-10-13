-- 트루스코리아 홈페이지: 글(posts), 관리자(admins), 사진 저장소(post-images)
-- Supabase 대시보드 > SQL Editor 에 이 파일 전체를 붙여 넣고 Run 을 누르거나,
-- Supabase CLI 로 `supabase db push` 하면 됩니다. 처음 한 번만 실행합니다.
--
-- 권한 규칙 (RLS):
--   * 누구나(로그인 안 한 방문자 포함) 게시된 글(is_published = true)만 읽을 수 있습니다.
--   * 글 쓰기·고치기·지우기와 사진 올리기·지우기는 public.admins 표에 있는 사용자만 할 수 있습니다.
--   * public.admins 표는 관리자만 볼 수 있고, 화면에서는 아무도 고칠 수 없습니다(대시보드 SQL로만 추가).

begin;

-- ---------------------------------------------------------------------------
-- 1. 글
-- ---------------------------------------------------------------------------
create table public.posts (
  id            text primary key default gen_random_uuid()::text,
  category      text not null
                check (category in ('broadcast', 'tknews', 'truth', 'event')),
                -- broadcast = 종합뉴스, tknews = TK 뉴스, truth = 진실알리기, event = 행사·세미나
  title         text not null check (length(btrim(title)) between 1 and 300),
  body          text not null default '',
  youtube_id    text check (youtube_id is null or youtube_id ~ '^[A-Za-z0-9_-]{11}$'),
  images        jsonb not null default '[]'::jsonb check (jsonb_typeof(images) = 'array'),
                -- [{ "src": "https://…/post-images/… 또는 assets/uploads/legacy/…", "alt": "사진 설명", "width": 1000, "height": 563 }]
  published_at  timestamptz not null default now(),
  is_published  boolean not null default true,
  show_on_home  boolean not null default true,
  source_url    text,          -- 옛 홈페이지에서 옮겨 온 글의 원래 주소
  event_start   date,          -- 행사·세미나 글의 행사 날짜 (선택)
  event_end     date,          -- 여러 날 행사의 끝나는 날 (선택)
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid default auth.uid() references auth.users (id) on delete set null,
  constraint posts_event_dates_check
    check (event_end is null or (event_start is not null and event_end >= event_start))
);

comment on table public.posts is '홈페이지 글: 종합뉴스(broadcast), TK 뉴스(tknews), 진실알리기(truth), 행사·세미나(event)';

create index posts_category_published_at_idx on public.posts (category, published_at desc);
create index posts_published_at_idx on public.posts (published_at desc) where is_published;

-- updated_at 을 고칠 때마다 자동으로 바꿉니다
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 2. 관리자 목록
-- ---------------------------------------------------------------------------
create table public.admins (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now()
);

comment on table public.admins is '글을 쓸 수 있는 관리자. 대시보드 SQL Editor에서만 추가합니다 (README 참고).';

-- 지금 로그인한 사람이 관리자인지 (RLS 안에서 쓰므로 security definer: admins 표의 RLS를 거치지 않고 확인)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins a where a.user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 3. 행 단위 보안 (RLS)
-- ---------------------------------------------------------------------------
alter table public.posts  enable row level security;
alter table public.admins enable row level security;

-- 표 권한도 꼭 필요한 만큼만
revoke all on table public.posts  from anon, authenticated;
revoke all on table public.admins from anon, authenticated;
grant select on table public.posts to anon, authenticated;
grant insert, update, delete on table public.posts to authenticated;
grant select on table public.admins to authenticated;

create policy "posts: 게시된 글은 누구나, 숨긴 글은 관리자만 읽기"
  on public.posts for select
  to anon, authenticated
  using (is_published or (select public.is_admin()));

create policy "posts: 관리자만 쓰기"
  on public.posts for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "posts: 관리자만 고치기"
  on public.posts for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "posts: 관리자만 지우기"
  on public.posts for delete
  to authenticated
  using ((select public.is_admin()));

create policy "admins: 관리자만 읽기"
  on public.admins for select
  to authenticated
  using ((select public.is_admin()));
-- admins 표에는 insert/update/delete 정책이 없으므로 화면(anon/authenticated)에서는 바꿀 수 없습니다.

-- ---------------------------------------------------------------------------
-- 4. 사진 저장소: post-images (공개 읽기, 관리자만 올리기·바꾸기·지우기)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('post-images', 'post-images', true, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- 공개 버킷이므로 사진은 공개 주소(/storage/v1/object/public/post-images/…)로 누구나 볼 수 있습니다.
-- 파일 목록 보기(select)는 관리자에게만 허용합니다(올리기·지우기에 필요).
create policy "post-images: 관리자 목록 보기"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'post-images' and (select public.is_admin()));

create policy "post-images: 관리자만 올리기"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-images' and (select public.is_admin()));

create policy "post-images: 관리자만 바꾸기"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'post-images' and (select public.is_admin()))
  with check (bucket_id = 'post-images' and (select public.is_admin()));

create policy "post-images: 관리자만 지우기"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-images' and (select public.is_admin()));

commit;
