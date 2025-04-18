const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/mobil', require('./src/routes/mobilRoutes'));
app.use('/pemilik', require('./src/routes/pemilikRoutes'));
app.use('/penyewa', require('./src/routes/penyewaRoutes'));
app.use('/rental', require('./src/routes/rentalRoutes'));
app.use('/return', require('./src/routes/returnRoutes'));
app.use('/ulasan', require('./src/routes/ulasanRoutes'));
// Tambahkan route lain untuk semua table

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
