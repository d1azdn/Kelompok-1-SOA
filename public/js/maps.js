let map;
let markers = [];
let locations = [];

// Inisialisasi peta
function initMap() {
    // Default center (Jakarta)
    const defaultCenter = [6.2088, 106.8456];
    
    map = L.map('map').setView(defaultCenter, 10);
    
    // Tambahkan tile layer dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ambil data lokasi dari API
    fetch('/lokasi-rental')
        .then(response => response.json())
        .then(data => {
            locations = data.lokasi_rental.map(location => ({
                id: location.id_pemilik,
                position: {
                    lat: parseFloat(location.latitude),
                    lng: parseFloat(location.longitude)
                },
                title: location.nama_pemilik,
                address: location.alamat,
                total_mobil: location.total_mobil,
                mobil_tersedia: location.mobil_tersedia
            }));
            
            // Set center ke lokasi pertama jika ada
            if (locations.length > 0) {
                map.setView([locations[0].position.lat, locations[0].position.lng], 10);
            }
            
            // Tambahkan marker untuk setiap lokasi
            locations.forEach(location => {
                addMarker(location);
            });
            
            // Tampilkan daftar lokasi
            displayLocationsList();
        })
        .catch(error => {
            console.error('Error fetching locations:', error);
        });
}

// Tambahkan marker ke peta
function addMarker(location) {
    const marker = L.marker([location.position.lat, location.position.lng])
        .addTo(map)
        .bindPopup(`
            <div class="info-window">
                <h3>${location.title}</h3>
                <p><strong>Alamat:</strong> ${location.address}</p>
                <p><strong>Total Mobil:</strong> ${location.total_mobil}</p>
                <p><strong>Mobil Tersedia:</strong> ${location.mobil_tersedia}</p>
                <a href="/lokasi-rental/${location.id}" target="_blank">Lihat Detail</a>
            </div>
        `);
    
    // Simpan referensi ke marker
    markers.push(marker);
}

// Tampilkan daftar lokasi di sidebar
function displayLocationsList() {
    const locationsList = document.getElementById('locations-list');
    locationsList.innerHTML = '';
    
    locations.forEach((location, index) => {
        const locationItem = document.createElement('div');
        locationItem.className = 'location-item';
        locationItem.innerHTML = `
            <h3>${location.title}</h3>
            <p><strong>Alamat:</strong> ${location.address}</p>
            <p><strong>Total Mobil:</strong> ${location.total_mobil}</p>
            <p><strong>Mobil Tersedia:</strong> ${location.mobil_tersedia}</p>
        `;
        
        // Tambahkan event listener untuk memindahkan peta ke lokasi saat item diklik
        locationItem.addEventListener('click', () => {
            map.setView([location.position.lat, location.position.lng], 15);
            markers[index].openPopup();
        });
        
        locationsList.appendChild(locationItem);
    });
}

// Fungsi untuk mendapatkan koordinat dari alamat menggunakan Nominatim
async function getCoordinatesFromAddress(address) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting coordinates:', error);
        return null;
    }
}

// Cari lokasi berdasarkan kata kunci
async function searchLocations() {
    const keyword = document.getElementById('search-input').value.trim();
    
    if (keyword) {
        // Coba dapatkan koordinat dari kata kunci pencarian
        const searchCoordinates = await getCoordinatesFromAddress(keyword);
        
        if (searchCoordinates) {
            // Jika koordinat ditemukan, pindahkan peta ke lokasi tersebut
            map.setView([searchCoordinates.lat, searchCoordinates.lng], 12);
            
            // Tambahkan marker untuk lokasi pencarian
            const searchMarker = L.marker([searchCoordinates.lat, searchCoordinates.lng])
                .addTo(map)
                .bindPopup(`<div class="info-window"><h3>${keyword}</h3><p>Lokasi pencarian</p></div>`);
            
            // Hapus marker pencarian sebelumnya jika ada
            if (window.searchMarker) {
                map.removeLayer(window.searchMarker);
            }
            window.searchMarker = searchMarker;
        }
        
        // Lanjutkan dengan pencarian di database
        fetch(`/lokasi-rental/search?keyword=${encodeURIComponent(keyword)}`)
            .then(response => response.json())
            .then(data => {
                // Hapus semua marker yang ada
                markers.forEach(marker => marker.remove());
                markers = [];
                
                // Tambahkan marker baru untuk hasil pencarian
                data.lokasi_rental.forEach(location => {
                    if (location.coordinates) {
                        addMarker({
                            id: location.id_pemilik,
                            position: location.coordinates,
                            title: location.nama_pemilik,
                            address: location.lokasi_rental,
                            total_mobil: location.total_mobil,
                            mobil_tersedia: location.mobil_tersedia
                        });
                    }
                });
                
                // Tampilkan daftar lokasi hasil pencarian
                locations = data.lokasi_rental.map(location => ({
                    id: location.id_pemilik,
                    position: location.coordinates,
                    title: location.nama_pemilik,
                    address: location.lokasi_rental,
                    total_mobil: location.total_mobil,
                    mobil_tersedia: location.mobil_tersedia
                }));
                
                displayLocationsList();
                
                // Set center ke lokasi pertama jika ada
                if (locations.length > 0 && locations[0].position) {
                    map.setView([locations[0].position.lat, locations[0].position.lng], 12);
                }
            })
            .catch(error => {
                console.error('Error searching locations:', error);
            });
    } else {
        // Jika keyword kosong, tampilkan semua lokasi
        fetch('/lokasi-rental')
            .then(response => response.json())
            .then(data => {
                // Hapus semua marker yang ada
                markers.forEach(marker => marker.remove());
                markers = [];
                
                // Hapus marker pencarian jika ada
                if (window.searchMarker) {
                    map.removeLayer(window.searchMarker);
                    window.searchMarker = null;
                }
                
                // Tambahkan marker baru untuk semua lokasi
                data.lokasi_rental.forEach(location => {
                    addMarker({
                        id: location.id_pemilik,
                        position: {
                            lat: parseFloat(location.latitude),
                            lng: parseFloat(location.longitude)
                        },
                        title: location.nama_pemilik,
                        address: location.alamat,
                        total_mobil: location.total_mobil,
                        mobil_tersedia: location.mobil_tersedia
                    });
                });
                
                // Tampilkan daftar lokasi
                locations = data.lokasi_rental.map(location => ({
                    id: location.id_pemilik,
                    position: {
                        lat: parseFloat(location.latitude),
                        lng: parseFloat(location.longitude)
                    },
                    title: location.nama_pemilik,
                    address: location.alamat,
                    total_mobil: location.total_mobil,
                    mobil_tersedia: location.mobil_tersedia
                }));
                displayLocationsList();
                
                // Set center ke lokasi pertama jika ada
                if (locations.length > 0) {
                    map.setView([locations[0].position.lat, locations[0].position.lng], 10);
                }
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    }
}

// Event listener untuk tombol pencarian
document.getElementById('search-button').addEventListener('click', searchLocations);

// Event listener untuk input pencarian (Enter key)
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchLocations();
    }
});

// Inisialisasi peta saat halaman dimuat
document.addEventListener('DOMContentLoaded', initMap); 