const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { generalThrottling, searchThrottling, authThrottling, heavyOperationThrottling } = require('./src/middleware/throttling');
const { swaggerUi, specs } = require('./src/swagger.js');

const app = express();
const port = process.env.PORT || 5000;
// Back to 5000 my guy

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Terapkan throttling global
app.use(generalThrottling);

// Serve static files from the public directory
app.use(express.static('public'));

// Routes
app.use('/mobil', require('./src/routes/mobilRoutes'));
app.use('/pemilik', require('./src/routes/pemilikRoutes'));
app.use('/penyewa', require('./src/routes/penyewaRoutes'));
app.use('/rental', require('./src/routes/rentalRoutes'));
app.use('/return', require('./src/routes/returnRoutes'));
app.use('/ulasan', require('./src/routes/ulasanRoutes'));
app.use('/ulasan-rating', require('./src/routes/ulasanRatingRoutes'));
app.use('/auth', authThrottling, require('./src/routes/authRoutes'));
app.use('/cache', authThrottling, require('./src/routes/cacheRoutes.js'));
app.use('/detailTransaksiPenyewaan', require('./src/routes/detailTransaksiPenyewaanRoutes'));
app.use('/rental-history', require('./src/routes/rentalHistoryRoutes'));
app.use('/rental-detail', require('./src/routes/rentalDetailRoutes'));
app.use('/owner-cars', require('./src/routes/ownerCarsRoutes'));
app.use('/laporan', heavyOperationThrottling, require('./src/routes/laporanRoutes'));
app.use('/lokasi-rental', require('./src/routes/lokasiRentalRoutes'));
app.use('/lokasi-rental/search', searchThrottling, require('./src/routes/lokasiRentalRoutes'));
app.use('/lokasi-rental/search', searchThrottling, require('./src/routes/lokasiRentalRoutes'));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qrent'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
