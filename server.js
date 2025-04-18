const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/mobil', require('./src/routes/mobilRoutes'));
app.use('/pemilik', require('./src/routes/pemilikRoutes'));
app.use('/penyewa', require('./src/routes/penyewaRoutes'));
app.use('/rental', require('./src/routes/rentalRoutes'));
app.use('/return', require('./src/routes/returnRoutes'));
app.use('/ulasan', require('./src/routes/ulasanRoutes'));
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/detailTransaksiPenyewaan', require('./src/routes/detailTransaksiPenyewaanRoutes'));
app.use('/rental-history', require('./src/routes/rentalHistoryRoutes'));
app.use('/rental-detail', require('./src/routes/rentalDetailRoutes'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
