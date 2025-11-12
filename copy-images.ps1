# Script pour copier les images du dossier img vers le dossier public
# Création du dossier public s'il n'existe pas
if (!(Test-Path "public")) {
    New-Item -ItemType Directory -Path "public"
}

# Récupération de toutes les images du dossier img
$images = Get-ChildItem -Path "img" -Include "*.jpg","*.jpeg","*.png","*.gif" -Recurse

# Copie des images avec un nom séquentiel
$counter = 1
foreach ($image in $images) {
    $destination = "public/image$counter.jpg"
    Copy-Item $image.FullName $destination
    Write-Host "Copié: $($image.Name) -> $destination"
    $counter++
}

Write-Host "Opération terminée! $counter images copiées."