# qrcode-generator (서명운동 화면의 QR 코드)

- 판: 2.0.4 (npm 레지스트리 `qrcode-generator@2.0.4`, 2025-08-07 공개)
- 파일: 패키지의 `dist/qrcode.js`를 고치지 않고 그대로 복사했습니다.
- SHA-256: `79ec86f82856005b1c887905cfccfcfbec3821ca61c7fd5a952faa5f778f791c`
- 라이선스: MIT (같은 폴더의 `LICENSE`, Copyright (c) 2009 Kazuhiko Arase). 패키지에 LICENSE 파일이 따로 없어
  `dist/qrcode.js` 머리말의 저작권·MIT 표시를 바탕으로 MIT 전문을 적었습니다.
- 쓰는 곳: `sign.html`만 불러옵니다. ‘QR 코드 보기’를 누르면 이 화면 주소(# 뒤는 뺌)를 브라우저 안에서 QR 그림으로 만듭니다.
  바깥 서버로 아무것도 보내지 않습니다.

새 판으로 바꿀 때:

```
npm pack qrcode-generator@<판>
tar -xzf qrcode-generator-<판>.tgz
cp package/dist/qrcode.js assets/vendor/qrcode-generator/qrcode.js
sha256sum assets/vendor/qrcode-generator/qrcode.js   # 이 문서의 SHA-256과 판 번호를 고칩니다
```
