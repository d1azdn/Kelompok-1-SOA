# Script untuk menguji throttling
$url = "http://localhost:3000/auth/login"
$totalRequests = 10
$results = @()

Write-Host "Memulai pengujian throttling pada endpoint auth..."
Write-Host "Mengirim $totalRequests request ke $url"
Write-Host ""

# Data untuk login
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

# Kirim request satu per satu
for ($i = 1; $i -le $totalRequests; $i++) {
    $startTime = Get-Date
    try {
        $response = Invoke-WebRequest -Uri $url -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
        $statusCode = $response.StatusCode
        $statusDescription = "Success"
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $statusDescription = $_.Exception.Response.StatusDescription
    }
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalMilliseconds
    
    $results += [PSCustomObject]@{
        RequestNumber = $i
        StatusCode = $statusCode
        StatusDescription = $statusDescription
        Duration = "$duration ms"
        Timestamp = $startTime.ToString("HH:mm:ss.fff")
    }
    
    Write-Host "Request #$i - Status: $statusCode ($statusDescription) - Durasi: $duration ms - Waktu: $($startTime.ToString('HH:mm:ss.fff'))"
    
    # Tunggu sebentar agar tidak terlalu cepat
    Start-Sleep -Milliseconds 100
}

Write-Host ""
Write-Host "Hasil Pengujian Throttling:"
Write-Host "==========================="
$results | Format-Table -AutoSize

# Hitung berapa banyak request yang berhasil dan gagal
$successCount = ($results | Where-Object { $_.StatusCode -eq 200 }).Count
$errorCount = ($results | Where-Object { $_.StatusCode -ne 200 }).Count

Write-Host ""
Write-Host "Analisis Hasil:"
Write-Host "Request berhasil (200): $successCount"
Write-Host "Request gagal: $errorCount"

# Analisis durasi
$durations = $results | ForEach-Object { [double]($_.Duration -replace " ms", "") }
$avgDuration = ($durations | Measure-Object -Average).Average
$maxDuration = ($durations | Measure-Object -Maximum).Maximum
$minDuration = ($durations | Measure-Object -Minimum).Minimum

Write-Host ""
Write-Host "Analisis Durasi:"
Write-Host "Rata-rata: $avgDuration ms"
Write-Host "Maksimum: $maxDuration ms"
Write-Host "Minimum: $minDuration ms"

# Cek apakah ada pola throttling (peningkatan durasi)
$first5Avg = ($results | Select-Object -First 5 | ForEach-Object { [double]($_.Duration -replace " ms", "") } | Measure-Object -Average).Average
$last5Avg = ($results | Select-Object -Last 5 | ForEach-Object { [double]($_.Duration -replace " ms", "") } | Measure-Object -Average).Average

Write-Host ""
Write-Host "Analisis Throttling:"
Write-Host "Rata-rata 5 request pertama: $first5Avg ms"
Write-Host "Rata-rata 5 request terakhir: $last5Avg ms"

if ($last5Avg -gt $first5Avg * 1.5) {
    Write-Host "KESIMPULAN: Throttling berfungsi dengan baik. Request terakhir memiliki durasi lebih lama."
} else {
    Write-Host "KESIMPULAN: Throttling mungkin tidak berfungsi seperti yang diharapkan. Tidak ada perbedaan signifikan dalam durasi."
} 