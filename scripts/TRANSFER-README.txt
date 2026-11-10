PORTFOLIO TRANSFER (ZIP ile tasima)

Amac
----
Projeyi baska bilgisayara tasimak. Zip icinde:
- Tum kaynak kod (su anki hali)
- .git (GitHub remote + gecmis; diger PC'den push yapabilirsin)
- .env.local (API key vb., -IncludeEnvLocal ile)

node_modules ve .next DAHIL DEGIL (cok buyur). Yeni PC'de npm install ile kurulur.

1) ZIP olusturma (bu PC)
------------------------
PowerShell:

  cd C:\Users\emir.koroglu\Desktop\portfolio

  powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\pack-for-transfer.ps1 -IncludeEnvLocal

Cikti: masaustunde veya proje kokunde portfolio-transfer-*.zip

2) OneDrive'a yukle
-------------------
Zip dosyasini OneDrive'a koy, diger PC'den indir.

3) Diger PC'de kurulum
----------------------
1) Zip'i ac (ornek: C:\Dev\portfolio)
2) Proje klasorunde:

  npm install
  npm run dev

3) Tarayici: http://localhost:3000

Git / Vercel
------------
Zip .git icerdigi icin remote ayni kalir:

  git status
  git push

Notlar
------
- .env.local gizli anahtarlar icerir; zip'i herkese acik paylasma.
- OneDrive senkron bitmeden diger PC'den indirme.
