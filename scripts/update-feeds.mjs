// 트루스데일리 최신 기사(RSS)와 트루스데일리TV 최신 영상을 모아 data/truthdaily.json 으로 저장합니다.
// GitHub Actions(.github/workflows/update-feeds.yml)가 한 시간마다 실행합니다. 따로 설치할 것은 없습니다(Node 20 이상).
// 가져오기에 실패한 쪽은 지난번 내용을 그대로 둡니다. 둘 다 실패하면 파일을 고치지 않습니다.
import { readFile, writeFile } from 'node:fs/promises';

const OUT = new URL('../data/truthdaily.json', import.meta.url);
const SITE = 'https://www.truthdaily.co.kr';
const RSS = SITE + '/rss/allArticle.xml';
const CHANNEL_ID = 'UC3rddsNSjWKgt_4shyUyb9g'; // 트루스데일리TV (트루스데일리 홈페이지에 연결된 채널)
const CHANNEL_URL = 'https://www.youtube.com/channel/' + CHANNEL_ID;
const N_NEWS = 12;
const N_VIDEOS = 12;
const UA = 'Mozilla/5.0 (compatible; TruthKoreaFeedBot/1.0; +https://intoedu.github.io/truthkorea/)';

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'ko-KR,ko;q=0.9' }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(url + ' → ' + res.status);
  return res.text();
}

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decode(s) {
  return String(s || '')
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
      if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
      return ENT[e.toLowerCase()] ?? m;
    })
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function tag(xml, name) {
  const m = xml.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + name + '>'));
  return m ? decode(m[1].trim()) : '';
}
// 트루스데일리 RSS 날짜는 ‘2026-11-02 10:32:40’(한국 시각) 형식입니다.
function kst(d) {
  const m = String(d).match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}(?::\d{2})?)/);
  if (m) return m[1] + 'T' + (m[2].length === 5 ? m[2] + ':00' : m[2]) + '+09:00';
  const t = new Date(d);
  return isNaN(t) ? '' : t.toISOString();
}
const safeUrl = (u) => (/^https:\/\/www\.truthdaily\.co\.kr\//.test(u) ? u : '');

async function articleThumb(url) {
  // 기사 대표 사진(og:image)의 작은 그림(300×200) 주소. 해외에서도 열리도록 www 주소를 씁니다.
  try {
    const html = await get(url);
    const m = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (!m) return '';
    const p = m[1].match(/\/news\/photo\/(\d{6})\/([^/?#]+)\.[a-z]+$/i);
    return p ? SITE + '/news/thumbnail/' + p[1] + '/' + p[2] + '_v150.jpg' : '';
  } catch { return ''; }
}

async function news(prev) {
  const xml = await get(RSS);
  const items = xml.split('<item>').slice(1).map((s) => s.split('</item>')[0]);
  const known = new Map((prev || []).map((x) => [x.url, x]));
  const out = [];
  for (const it of items.slice(0, N_NEWS)) {
    const url = safeUrl(tag(it, 'link'));
    const title = tag(it, 'title');
    if (!url || !title) continue;
    const old = known.get(url);
    out.push({
      title,
      url,
      date: kst(tag(it, 'pubDate')),
      summary: tag(it, 'description').slice(0, 140),
      thumb: old && old.thumb ? old.thumb : await articleThumb(url),
    });
  }
  if (!out.length) throw new Error('RSS에 기사가 없습니다');
  return out;
}

async function videosFromRss() {
  const xml = await get('https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID);
  const out = xml.split('<entry>').slice(1).map((e) => ({
    id: tag(e, 'yt:videoId'),
    title: tag(e, 'title'),
    date: tag(e, 'published'),
  })).filter((v) => /^[\w-]{11}$/.test(v.id) && v.title);
  if (!out.length) throw new Error('영상 RSS가 비어 있습니다');
  return out;
}

async function videosFromPage() {
  // RSS가 막혔을 때: 채널의 ‘동영상’ 화면에 실린 목록을 읽습니다(최신순).
  const html = await get(CHANNEL_URL + '/videos?hl=ko&gl=KR');
  const m = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/);
  if (!m) throw new Error('채널 화면을 읽지 못했습니다');
  const out = [];
  (function walk(o) {
    if (!o || typeof o !== 'object' || out.length >= N_VIDEOS) return;
    const l = o.lockupViewModel;
    if (l && l.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO' && l.contentId) {
      const md = (l.metadata && l.metadata.lockupMetadataViewModel) || {};
      const title = (md.title && md.title.content) || '';
      const rows = (md.metadata && md.metadata.contentMetadataViewModel && md.metadata.contentMetadataViewModel.metadataRows) || [];
      const parts = rows.flatMap((r) => r.metadataParts || []).map((p) => (p.text && p.text.content) || '');
      const ago = parts.find((t) => /전$/.test(t)) || '';
      if (title && !out.some((v) => v.id === l.contentId)) out.push({ id: l.contentId, title: title.trim(), date: '', ago });
      return;
    }
    const r = o.videoRenderer;
    if (r && r.videoId) {
      const title = (r.title && (r.title.runs || []).map((x) => x.text).join('')) || (r.title && r.title.simpleText) || '';
      if (title && !out.some((v) => v.id === r.videoId)) out.push({ id: r.videoId, title, date: '', ago: (r.publishedTimeText && r.publishedTimeText.simpleText) || '' });
      return;
    }
    for (const k in o) walk(o[k]);
  })(JSON.parse(m[1]));
  if (!out.length) throw new Error('채널 화면에 영상이 없습니다');
  return out;
}

async function videos() {
  let list;
  try { list = await videosFromRss(); } catch (e) { console.warn('영상 RSS 실패, 채널 화면으로 대신합니다:', e.message); list = await videosFromPage(); }
  return list.slice(0, N_VIDEOS).map((v) => ({ id: v.id, title: v.title, date: v.date || '', ago: v.ago || '' }));
}

const prev = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
const next = { news: prev.news || [], videos: prev.videos || [], channel: CHANNEL_URL, site: SITE };
let ok = 0;
try { next.news = await news(prev.news); ok++; } catch (e) { console.warn('기사 가져오기 실패:', e.message); }
try { next.videos = await videos(); ok++; } catch (e) { console.warn('영상 가져오기 실패:', e.message); }
if (!ok) { console.error('둘 다 실패해서 파일을 그대로 둡니다.'); process.exit(0); }

// 내용이 바뀌었을 때만 시각을 새로 적어, 바뀐 것이 없으면 커밋도 생기지 않게 합니다.
const same = JSON.stringify([prev.news, prev.videos]) === JSON.stringify([next.news, next.videos]);
next.updated_at = same && prev.updated_at ? prev.updated_at : new Date().toISOString();
await writeFile(OUT, JSON.stringify(next, null, 1) + '\n');
console.log(`기사 ${next.news.length}건, 영상 ${next.videos.length}건${same ? ' (바뀐 것 없음)' : ''}`);
