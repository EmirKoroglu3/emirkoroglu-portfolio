param(
  # Zip çıkış yolu (varsayılan: proje kökünde)
  [string]$OutFile = "",
  # .env.local dosyasını da zip'e dahil et
  [switch]$IncludeEnvLocal
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")

if ($OutFile -eq "") {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $OutFile = Join-Path $ProjectRoot "portfolio-transfer-$stamp.zip"
}

Write-Host "Project: $ProjectRoot"
Write-Host "Output:  $OutFile"

$temp = Join-Path $env:TEMP ("portfolio-transfer-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path $temp | Out-Null

function Copy-Dir($relativePath) {
  $src = Join-Path $ProjectRoot $relativePath
  if (Test-Path $src) {
    $dst = Join-Path $temp $relativePath
    New-Item -ItemType Directory -Force -Path (Split-Path $dst -Parent) | Out-Null
    Copy-Item -Path $src -Destination $dst -Recurse -Force
  }
}

function Copy-File($relativePath) {
  $src = Join-Path $ProjectRoot $relativePath
  if (Test-Path $src) {
    $dst = Join-Path $temp $relativePath
    New-Item -ItemType Directory -Force -Path (Split-Path $dst -Parent) | Out-Null
    Copy-Item -Path $src -Destination $dst -Force
  }
}

# Kaynak klasörler
Copy-Dir "app"
Copy-Dir "components"
Copy-Dir "data"
Copy-Dir "docs"
Copy-Dir "lib"
Copy-Dir "public"
Copy-Dir "sections"
Copy-Dir "scripts"

# Proje kök dosyaları
Copy-File "package.json"
Copy-File "package-lock.json"
Copy-File "tsconfig.json"
Copy-File "next.config.mjs"
Copy-File "postcss.config.mjs"
Copy-File "tailwind.config.ts"
Copy-File "eslint.config.mjs"
Copy-File "middleware.ts"
Copy-File "next-env.d.ts"
Copy-File ".gitignore"

if ($IncludeEnvLocal) {
  Copy-File ".env.local"
  Write-Host "Included: .env.local"
} else {
  Write-Host "Skipped:  .env.local (use -IncludeEnvLocal to include)"
}

# Büyük/derleme çıktıları kesinlikle dahil edilmesin
$exclude = @("node_modules", ".next", "out", "dist")
foreach ($x in $exclude) {
  $p = Join-Path $temp $x
  if (Test-Path $p) { Remove-Item -Recurse -Force $p }
}

if (Test-Path $OutFile) { Remove-Item $OutFile -Force }
Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $OutFile -CompressionLevel Optimal

Remove-Item -Recurse -Force $temp

$sizeMb = [math]::Round((Get-Item $OutFile).Length / 1MB, 2)
Write-Host "Done. Zip size: $sizeMb MB"
