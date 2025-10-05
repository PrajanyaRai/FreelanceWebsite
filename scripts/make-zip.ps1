param(
    [string]$Destination = "public/downloads/skillspace-project.zip"
)

$ErrorActionPreference = "Stop"

# Repo root is the parent of this script directory
$Repo = Split-Path -Parent $PSScriptRoot
$DestAbs = Join-Path $Repo $Destination
$DestDir = Split-Path -Parent $DestAbs
if (!(Test-Path $DestDir)) { New-Item -ItemType Directory -Path $DestDir -Force | Out-Null }

# Temp staging folder
$stamp = Get-Date -Format "yyyyMMddHHmmss"
$Temp = Join-Path ([System.IO.Path]::GetTempPath()) "skillspace_pkg_$stamp"
New-Item -ItemType Directory -Path $Temp -Force | Out-Null

# Pick important project files/folders (exclude node_modules, dist, .git automatically)
$include = @(
  'src', 'public', 'index.html',
  'package.json', 'package-lock.json',
  'postcss.config.js', 'tailwind.config.js', 'vite.config.ts',
  'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json',
  'eslint.config.js', 'README.md', '.gitignore'
)

foreach ($item in $include) {
  $srcPath = Join-Path $Repo $item
  if (Test-Path $srcPath) {
    $dstPath = Join-Path $Temp $item
    $dstDir = Split-Path -Parent $dstPath
    if (!(Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
    if ((Get-Item $srcPath).PSIsContainer) {
      Copy-Item $srcPath -Destination $dstPath -Recurse -Force
    } else {
      Copy-Item $srcPath -Destination $dstPath -Force
    }
  }
}

if (Test-Path $DestAbs) { Remove-Item $DestAbs -Force }

# Create zip containing the staged contents (not the staging folder itself)
Compress-Archive -Path (Join-Path $Temp '*') -DestinationPath $DestAbs -Force

# Cleanup
Remove-Item $Temp -Recurse -Force

Write-Output "Created: $Destination"

