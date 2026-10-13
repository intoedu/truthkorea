// data/posts.json → supabase/seed.sql
// 쓰는 법 (저장소 맨 위 폴더에서):  node supabase/make-seed.mjs
// 옛 홈페이지에서 옮겨 온 글을 Supabase의 public.posts 표에 넣는 SQL을 만듭니다.
// 같은 id가 이미 있으면 건너뛰므로(ON CONFLICT DO NOTHING) 여러 번 실행해도 안전합니다.
// 사진 주소(images[].src)는 assets/uploads/legacy/… 처럼 사이트 안 주소 그대로 둡니다.
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const posts = JSON.parse(readFileSync(new URL('data/posts.json', root), 'utf8'));

const CATS = new Set(['broadcast', 'tknews', 'truth', 'event']);
const lit = (v) => (v === null || v === undefined || v === '' ? 'null' : `'${String(v).replace(/'/g, "''")}'`);
const bool = (v, dflt) => (v === undefined ? dflt : !!v) ? 'true' : 'false';

const rows = posts.map((p) => {
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(p.id)) throw new Error(`bad id: ${p.id}`);
  if (!CATS.has(p.category)) throw new Error(`bad category: ${p.id}`);
  if (Number.isNaN(Date.parse(p.published_at))) throw new Error(`bad date: ${p.id}`);
  const images = (p.images || []).map((im) => {
    const o = { src: im.src, alt: im.alt || '' };
    if (im.width && im.height) { o.width = im.width; o.height = im.height; }
    return o;
  });
  const ev = p.event_date || {};
  return `  (${[
    lit(p.id),
    lit(p.category),
    lit(p.title),
    lit(p.body || '') === 'null' ? "''" : lit(p.body),
    lit(p.youtube_id),
    `${lit(JSON.stringify(images))}::jsonb`,
    `${lit(p.published_at)}::timestamptz`,
    bool(p.is_published, true),
    bool(p.show_on_home, true),
    lit(p.source_url),
    `${lit(p.event_start || ev.start)}::date`,
    `${lit(p.event_end || ev.end)}::date`,
  ].join(', ')})`;
});

const sql = `-- 자동으로 만든 파일입니다. 고치지 말고 data/posts.json을 고친 뒤 \`node supabase/make-seed.mjs\`를 다시 실행하세요.
-- 옛 홈페이지(국민주권운동.com)에서 옮겨 온 글 ${posts.length}개를 public.posts 표에 넣습니다.
-- 먼저 supabase/migrations/0001_init.sql 을 실행한 다음, Supabase 대시보드 > SQL Editor 에서 이 파일을 실행합니다.
-- 같은 id가 이미 있으면 건너뜁니다(여러 번 실행해도 안전).

insert into public.posts
  (id, category, title, body, youtube_id, images, published_at, is_published, show_on_home, source_url, event_start, event_end)
values
${rows.join(',\n')}
on conflict (id) do nothing;
`;

writeFileSync(new URL('supabase/seed.sql', root), sql);
console.log(`supabase/seed.sql: ${posts.length}개 글`);
