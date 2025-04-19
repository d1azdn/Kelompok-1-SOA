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

# Car Rental API

A robust and feature-rich API for a car rental management system.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Google OAuth Integration**: Login with Google accounts
- **Rate Limiting**: Protect the API from abuse
- **Input Validation**: Validate all inputs using Zod
- **Error Handling**: Centralized error handling
- **Logging**: Comprehensive request and error logging
- **Caching**: Improve performance with response caching
- **Pagination**: Handle large datasets with pagination
- **Search & Filtering**: Advanced search and filtering capabilities
- **Security**: Helmet for security headers, CORS support

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MySQL**: Database
- **JWT**: Authentication
- **Zod**: Schema validation
- **Helmet**: Security headers
- **Morgan**: HTTP request logging
- **Cors**: Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/d1azdn/Kelompok-1-SOA.git
   cd Kelompok-1-SOA
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=qrent

   # JWT Configuration
   JWT_SECRET_KEY=your_jwt_secret_key_here
   JWT_EXPIRES_IN=1h

   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # Cache Configuration
   CACHE_TTL=60000
   ```

4. Start the server:
   ```
   npm run dev
   ```

## API Documentation

The API documentation is available at `/api/docs` when the server is running.

### Endpoints

- **Authentication**: `/api/auth`
  - `POST /login`: Login with email and password
  - `POST /register`: Register a new user
  - `GET /google`: Login with Google
  - `GET /google/callback`: Google OAuth callback

- **Cars**: `/api/mobil`
  - `GET /`: Get all cars (with pagination, search, and filtering)
  - `GET /:id`: Get a car by ID
  - `POST /`: Create a new car
  - `PUT /:id`: Update a car
  - `DELETE /:id`: Delete a car

- **Car Owners**: `/api/pemilik`
  - `GET /`: Get all car owners
  - `GET /:id`: Get a car owner by ID
  - `POST /`: Create a new car owner
  - `PUT /:id`: Update a car owner
  - `DELETE /:id`: Delete a car owner

- **Renters**: `/api/penyewa`
  - `GET /`: Get all renters
  - `GET /:id`: Get a renter by ID
  - `POST /`: Create a new renter
  - `PUT /:id`: Update a renter
  - `DELETE /:id`: Delete a renter

- **Rentals**: `/api/rental`
  - `GET /`: Get all rentals
  - `GET /:id`: Get a rental by ID
  - `POST /`: Create a new rental
  - `PUT /:id`: Update a rental
  - `DELETE /:id`: Delete a rental

- **Returns**: `/api/return`
  - `GET /`: Get all returns
  - `GET /:id`: Get a return by ID
  - `POST /`: Create a new return
  - `PUT /:id`: Update a return
  - `DELETE /:id`: Delete a return

- **Reviews**: `/api/ulasan`
  - `GET /`: Get all reviews
  - `GET /:id`: Get a review by ID
  - `POST /`: Create a new review
  - `PUT /:id`: Update a review
  - `DELETE /:id`: Delete a review

- **Rental Details**: `/api/detail-transaksi-penyewaan`
  - `GET /:id_rental`: Get rental details by rental ID

## License

This project is licensed under the MIT License - see the LICENSE file for details.
