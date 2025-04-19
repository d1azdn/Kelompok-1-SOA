# Kelompok 1 SOA
## Note : 
[] = Placeholder

## Case :
[Event Organizer] Rental Car Application

## Application Name :
QRent

## Goals :
This project aims to develop a car rental application specifically designed for event organizers. The application allows users to rent vehicles easily, manage rental schedules, and ensure the availability of cars according to event needs.

## Members : 
- 2210511053 - Ananda Divana
- 2210511063 - Daffa Bagus Maulana
- 2210511087 - Diaz Saputra

## Documentation and Guide : 
For more information about this project, please visit the documentation page on GitHub Wiki:
[GitHub Wiki - QRent](https://github.com/d1azdn/Kelompok-1-SOA/wiki)

# Car Rental Application

A modern car rental application built with Node.js, Express, and MySQL, featuring secure authentication, car management, location-based services, and comprehensive reporting capabilities.

## Features

- 🔐 Secure JWT Authentication
- 🚗 Car Management System
- 📍 Location-based Services
- 📊 Advanced Reporting
- ⭐ Review & Rating System
- 🛡️ Rate Limiting & Throttling
- 🔍 Search Functionality
- 📱 Mobile-friendly API

## Feature Summary

| Feature | Status |
|---------|--------|
| API Basic | 32 API Endpoints ✅ |
| API Complex | 18 API Endpoints ✅ |
| API NoSQL | ... API Endpoints ✅ |
| Frontend | ... Page ✅  |
| Service Worker | ❌ |
| OAuth & JWT | ✅ |
| Integrasi 3rd Party | 1 Service ✅ |
| Rate Limiting & Throttling | ✅ |
| Security | ✅ |
| Dokumentasi | Function, Inline, & Swagger ✅ |

## Third-Party Integrations

### 1. Google OAuth
- **Purpose**: User authentication and profile management
- **Features**:
  - Google Sign-In
  - Profile synchronization
  - Automatic account creation
- **Implementation**: Using `passport-google-oauth20`
- **Configuration**: Requires Google Client ID and Secret

### 2. Leaflet Maps
- **Purpose**: Location-based services and map visualization
- **Features**:
  - Interactive maps
  - Location search
  - Nearby car locations
  - Route visualization
- **Implementation**: Using `leaflet` package
- **Configuration**: Requires Mapbox access token


## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, bcrypt
- **Security**: express-rate-limit, helmet
- **Testing**: Jest, Supertest

## Project Structure

```
├── src/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Custom middleware
│   ├── routes/          # API routes
│   ├── db/             # Database configuration
│   └── utils/          # Utility functions
├── docs/               # Documentation
├── tests/             # Test files
└── server.js          # Application entry point
```

## API Endpoints

## Endpoint API

### 1. Autentikasi (`/auth`)
- `POST /auth/login` - Login pengguna
- `POST /auth/register` - Registrasi pengguna baru
- `GET /auth/google` - Login dengan Google
- `GET /auth/google/callback` - Callback untuk autentikasi Google

### 2. Mobil (`/mobil`)
- `GET /mobil` - Mendapatkan semua data mobil
- `GET /mobil/:id` - Mendapatkan detail mobil berdasarkan ID
- `POST /mobil` - Menambahkan mobil baru
- `PUT /mobil/:id` - Mengupdate data mobil
- `DELETE /mobil/:id` - Menghapus data mobil

### 3. Pemilik (`/pemilik`)
- `GET /pemilik` - Mendapatkan semua data pemilik
- `GET /pemilik/:id` - Mendapatkan detail pemilik berdasarkan ID
- `POST /pemilik` - Menambahkan pemilik baru
- `PUT /pemilik/:id` - Mengupdate data pemilik
- `DELETE /pemilik/:id` - Menghapus data pemilik

### 4. Penyewa (`/penyewa`)
- `GET /penyewa` - Mendapatkan semua data penyewa
- `GET /penyewa/:id` - Mendapatkan detail penyewa berdasarkan ID
- `POST /penyewa` - Menambahkan penyewa baru
- `PUT /penyewa/:id` - Mengupdate data penyewa
- `DELETE /penyewa/:id` - Menghapus data penyewa

### 5. Rental (`/rental`)
- `GET /rental` - Mendapatkan semua data rental
- `GET /rental/:id` - Mendapatkan detail rental berdasarkan ID
- `POST /rental` - Menambahkan rental baru
- `PUT /rental/:id` - Mengupdate data rental
- `DELETE /rental/:id` - Menghapus data rental

### 6. Return (`/return`)
- `GET /return` - Mendapatkan semua data return
- `GET /return/:id` - Mendapatkan detail return berdasarkan ID
- `POST /return` - Menambahkan return baru
- `PUT /return/:id` - Mengupdate data return
- `DELETE /return/:id` - Menghapus data return

### 7. Ulasan (`/ulasan`)
- `GET /ulasan` - Mendapatkan semua data ulasan
- `GET /ulasan/:id` - Mendapatkan detail ulasan berdasarkan ID
- `POST /ulasan` - Menambahkan ulasan baru
- `PUT /ulasan/:id` - Mengupdate data ulasan
- `DELETE /ulasan/:id` - Menghapus data ulasan


API COMPLEX

### 1. Detail Transaksi Penyewaan (`/detailTransaksiPenyewaan`)
- `GET /detailTransaksiPenyewaan/:id_rental` - Mendapatkan detail transaksi penyewaan berdasarkan ID rental

### 2. Riwayat Rental (`/rental-history`)
- `GET /rental-history` - Mendapatkan semua riwayat rental
- `GET /rental-history/tenant/:penyewa_id` - Mendapatkan riwayat rental untuk penyewa tertentu

### 3. Detail Rental (`/rental-detail`)
- `GET /rental-detail` - Mendapatkan semua informasi detail rental
- `GET /rental-detail/:id_rental` - Mendapatkan informasi detail rental berdasarkan ID

### 4. Mobil Pemilik (`/owner-cars`)
- `GET /owner-cars/:id_pemilik/cars-with-last-lease` - Mendapatkan semua mobil milik pemilik beserta status sewa terakhir
- `GET /owner-cars/:id_pemilik/car-fleet-summary` - Mendapatkan ringkasan armada mobil pemilik dengan statistik rental

### 5. Laporan (`/laporan`)
- `GET /laporan/penyewa-terbanyak` - Menampilkan penyewa yang paling sering menyewa mobil
- `GET /laporan/mobil-paling-laris` - Menampilkan mobil yang paling sering disewa
- `GET /laporan/denda-terbesar` - Menampilkan data rental dengan total denda terbesar

### 6. Lokasi Rental (`/lokasi-rental`)
- `GET /lokasi-rental` - Menampilkan semua lokasi rental
- `GET /lokasi-rental/search` - Mencari lokasi rental berdasarkan kata kunci alamat
- `GET /lokasi-rental/provinsi/search` - Mencari lokasi rental berdasarkan provinsi
- `GET /lokasi-rental/provinsi/list` - Mendapatkan daftar provinsi yang tersedia
- `GET /lokasi-rental/:id_pemilik` - Menampilkan detail lokasi rental berdasarkan ID pemilik

### 7. UlasanRating (`/ulasan-rating`)
- `GET /ulasan-rating/mobil/:id_mobil` - Menampilkan seluruh ulasan yang berkaitan dengan satu mobil
- `GET /ulasan-rating/penyewa/:id_penyewa` - Menampilkan ulasan-ulasan yang diberikan oleh penyewa
- `GET /ulasan-rating/mobil/terbaik` - Menampilkan 5 mobil dengan rata-rata rating tertinggi

API NoSQL (REDIS)
### User Cache
- `POST /cache/user/session` — Register user (cached)
- `GET /cache/user/session/{id}` — Get user by ID (cached)
- `DELETE /cache/user/session/{id}` — Delete cached user by ID

### Event Cache
- `POST /cache/car/available/{id}` — Register car available status (cached)
- `GET /cache/car/available/{id}` — Get car available status (cached)
- `POST /cache/rental/{id}` — Register rental status (cached)
- `GET /cache/rental/{id}` — Get rental status (cached)
- `POST /cache/rental/rating/{id}` — Register rental rating (cached)
- `GET /cache/rental/rating/{id}` — Get rental rating by ID (cached)
- `DELETE /cache/rental/rating/{id}` — Delete rental rating by ID


## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting for API endpoints
- SQL injection prevention
- CORS protection
- Request throttling

## Rate Limiting

The application implements different throttling levels:

- **Global**: 100 requests per 15 minutes
- **Search**: 200 requests per 15 minutes
- **Auth**: 5 requests per hour
- **Heavy Operations**: 10 requests per hour with 500ms delay

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/d1azdn/Kelompok-1-SOA.git
   cd Kelompok-1-SOA
   ```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database:
```bash
npm run db:setup
```

5. Start the server:
```bash
npm start
```

## Environment Variables

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=car_rental
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Testing

Run the test suite:
```bash
npm test
```

Run specific test files:
```bash
npm test -- tests/auth.test.js
npm test -- tests/throttling.test.js
```

## API Documentation

The API documentation is available at `/api/docs` when the server is running.


## License

This project is licensed under the MIT License - see the LICENSE file for details.
