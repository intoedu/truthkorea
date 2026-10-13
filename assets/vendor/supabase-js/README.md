# @supabase/supabase-js (관리자 화면 전용)

- 판: 2.117.2 (npm 레지스트리 `@supabase/supabase-js@2.117.2`, 2026-09-25 공개)
- 파일: 패키지의 `dist/umd/supabase.js`를 고치지 않고 그대로 복사했습니다.
- SHA-256: `59d39487c3589843b410322d8a3d562ce022aba1e5ccb16898ef3fb2a0da2ecd`
- 라이선스: MIT (같은 폴더의 `LICENSE`, Copyright (c) 2020 Supabase)
- 쓰는 곳: `admin/index.html`만 불러옵니다. 공개 화면은 이 파일 없이 `fetch`로 글을 읽습니다.

새 판으로 바꿀 때:

```
npm pack @supabase/supabase-js@<판>
tar -xzf supabase-supabase-js-<판>.tgz
cp package/dist/umd/supabase.js assets/vendor/supabase-js/supabase.js
cp package/LICENSE assets/vendor/supabase-js/LICENSE
sha256sum assets/vendor/supabase-js/supabase.js   # 이 문서의 SHA-256과 판 번호를 고칩니다
```
