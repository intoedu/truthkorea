-- 트루스코리아 홈페이지: 서명운동(서명 명단 signatures, 손글씨 서명 그림 저장소 signatures)
-- 0001_init.sql 을 먼저 실행한 다음, Supabase 대시보드 > SQL Editor 에 이 파일 전체를 붙여 넣고 Run 을 누릅니다.
-- (Supabase CLI 로는 `supabase db push`) 처음 한 번만 실행합니다.
--
-- 권한 규칙 (RLS):
--   * 누구나(로그인 안 한 방문자 포함) 서명을 '넣을' 수만 있습니다. 넣은 서명은 아무도 못 봅니다(본인 포함).
--   * 서명 명단을 보고 지우는 일은 public.admins 표에 있는 관리자만 할 수 있습니다(관리자 화면 > 서명 명단).
--   * 고치기(update)는 아무에게도 허용하지 않습니다.
--   * 방문자가 알 수 있는 것은 서명한 사람 '수'뿐입니다: public.signature_count('main').
--   * 손글씨 서명 그림은 비공개 저장소(signatures)에 들어갑니다. 방문자는 PNG 그림(200KB 이하)을 올리기만 할 수 있고,
--     관리자만 보고(잠깐 쓰는 서명된 주소) 지울 수 있습니다.
--
-- 같은 휴대폰 번호로는 한 서명운동(petition)에 한 번만 서명할 수 있습니다(unique). 두 번째는 오류 23505가 나고,
-- 홈페이지는 ‘이미 서명하셨습니다’라고 알려 드립니다.
--
-- 홈페이지는 서명 그림을 먼저 올리고 그다음 서명 줄을 넣습니다. 그래서 이미 서명한 번호로 다시 서명하면
-- 그림 파일만 남을 수 있습니다(명단에는 안 나옴). 저장소 > signatures 에서 가끔 지워도 됩니다(README 참고).

begin;

-- ---------------------------------------------------------------------------
-- 1. 서명 명단
-- ---------------------------------------------------------------------------
create table public.signatures (
  id               uuid primary key default gen_random_uuid(),
  petition         text not null default 'main'
                   check (petition ~ '^[a-z0-9_-]{1,40}$'),
                   -- 어느 서명운동인지. 지금은 'main' = 민주당 해산을 위한 서명에 동의합니다!
  name             text not null
                   check (char_length(name) between 1 and 30 and name = btrim(name) and name !~ '[[:cntrl:]]'),
                   -- 이름(실명), 앞뒤 빈칸 없이 1~30자
  phone            text not null
                   check (phone ~ '^0[1-9][0-9]{7,9}$'),
                   -- 숫자만 9~11자리 (휴대폰 01012345678, 집 전화 0212345678 등). +82 는 0 으로 바꿔서 넣습니다.
  region           text
                   check (region is null or region in (
                     '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시',
                     '세종특별자치시', '경기도', '강원특별자치도', '충청북도', '충청남도', '전북특별자치도', '전라남도',
                     '경상북도', '경상남도', '제주특별자치도', '해외')),
                   -- 사는 곳(선택). 홈페이지 sign.html 의 목록과 같아야 합니다.
  signature_path   text,
                   -- 손글씨 서명 그림의 저장소 경로(선택): signatures 버킷 안 '<petition>/<uuid>.png'
  consent          boolean not null check (consent),
                   -- 개인정보 수집·이용 동의 (동의해야만 넣을 수 있음)
  consent_version  text not null check (char_length(consent_version) between 1 and 40),
                   -- 어떤 안내문에 동의했는지 (예: 2026-10-v1). 안내문을 바꾸면 홈페이지 sign.js 의 값도 바꿉니다.
  created_at       timestamptz not null default now(),
  constraint signatures_petition_phone_key unique (petition, phone),
  constraint signatures_path_check check (
    signature_path is null
    or signature_path ~ ('^' || petition || '/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.png$')
  )
);

comment on table public.signatures is '서명운동 참여자 명단. 관리자만 읽고 지울 수 있습니다. 서명운동이 끝나면 지체 없이 파기합니다(보유 기간은 단체가 확정, CONTENT-TODO.md).';

create index signatures_petition_created_at_idx on public.signatures (petition, created_at desc);

-- ---------------------------------------------------------------------------
-- 2. 행 단위 보안 (RLS)
-- ---------------------------------------------------------------------------
alter table public.signatures enable row level security;

revoke all on table public.signatures from anon, authenticated;
-- 방문자는 정해진 칸만 넣을 수 있습니다 (id, created_at 은 데이터베이스가 정함)
grant insert (petition, name, phone, region, signature_path, consent, consent_version)
  on table public.signatures to anon, authenticated;
grant select, delete on table public.signatures to authenticated;

create policy "signatures: 누구나 서명 넣기"
  on public.signatures for insert
  to anon, authenticated
  with check (
    petition = 'main'
    and consent
    and char_length(name) between 1 and 30
    and phone ~ '^0[1-9][0-9]{7,9}$'
  );

create policy "signatures: 관리자만 읽기"
  on public.signatures for select
  to authenticated
  using ((select public.is_admin()));

create policy "signatures: 관리자만 지우기"
  on public.signatures for delete
  to authenticated
  using ((select public.is_admin()));

comment on policy "signatures: 누구나 서명 넣기" on public.signatures is
  '방문자는 서명을 넣기만 합니다(동의 필수). 읽기 정책이 없으므로 넣은 뒤에는 관리자만 봅니다. 새 서명운동을 열면 petition 조건을 고칩니다.';
-- update 정책이 없으므로 아무도 서명을 고칠 수 없습니다.

-- ---------------------------------------------------------------------------
-- 3. 서명한 사람 수 (방문자에게는 수만 알려 줌)
-- ---------------------------------------------------------------------------
create or replace function public.signature_count(p text default 'main')
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::integer from public.signatures s where s.petition = p;
$$;

revoke all on function public.signature_count(text) from public;
grant execute on function public.signature_count(text) to anon, authenticated;

comment on function public.signature_count(text) is '서명운동에 서명한 사람 수. 이름이나 번호는 알려 주지 않습니다.';

-- ---------------------------------------------------------------------------
-- 4. 손글씨 서명 그림 저장소: signatures (비공개, PNG 200KB 이하)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('signatures', 'signatures', false, 204800, array['image/png'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- 방문자: 'main/<uuid>.png' 이름으로 새 파일을 올리기만 (덮어쓰기·읽기·지우기 불가)
create policy "signatures 버킷: 누구나 서명 그림 올리기"
  on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'signatures'
    and name ~ '^main/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.png$'
  );

-- 관리자: 보기(서명된 주소 만들기에 필요)와 지우기
create policy "signatures 버킷: 관리자만 보기"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'signatures' and (select public.is_admin()));

create policy "signatures 버킷: 관리자만 지우기"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'signatures' and (select public.is_admin()));

commit;
