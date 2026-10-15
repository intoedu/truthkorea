/* 트루스코리아 홈페이지 설정
   Supabase(글 저장소)를 만든 뒤 아래 두 값을 채웁니다. 자세한 순서는 README.md의 ‘Supabase 연결하기’를 보세요.
   - supabaseUrl: Supabase 대시보드 > Project Settings > API 의 Project URL (예: https://abcd1234.supabase.co)
   - supabaseAnonKey: 같은 화면의 anon(public) 키 (공개해도 되는 키입니다. service_role 키는 절대 넣지 마세요)
   두 값이 비어 있으면 홈페이지는 저장소 안의 data/posts.json 파일에 있는 글을 보여 줍니다. */
window.TK_CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: ""
};
