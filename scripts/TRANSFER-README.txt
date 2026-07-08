PORTFOLIO TRANSFER (ZIP ile taşıma)

Amaç
-----
Projeyi başka bilgisayara taşımak için tek bir zip üretmek.
İsterseniz .env.local (API key vb.) de zip'e dahil edilebilir.

1) ZIP oluşturma (iş bilgisayarında)
-----------------------------------
PowerShell:

  cd C:\Users\emir.koroglu\Desktop\portfolio

Env dahil OLMADAN:
  powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\pack-for-transfer.ps1

Env dahil OLARAK (.env.local):
  powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\pack-for-transfer.ps1 -IncludeEnvLocal

Çıktı: proje kökünde "portfolio-transfer-YYYYMMDD-HHMMSS.zip"

2) ZIP'i OneDrive'a yükle
-------------------------
Zip dosyasını OneDrive'a koy.

3) Evdeki PC'de kurulum
-----------------------
1) Zip'i aç (ör. C:\Dev\portfolio)
2) Proje klasöründe:

  npm install
  npm run dev

Notlar
------
- node_modules ve .next zip'e girmez (çok büyür). Ev PC'de npm install ile kurulur.
- .env.local zip'e dahil ettiysen, bu dosyada gizli anahtarlar var. Paylaşma/başka yere yükleme.
