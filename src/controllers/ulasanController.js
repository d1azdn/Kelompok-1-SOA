const {db,client} = require('../db');

// Get All Reviews
exports.getAllUlasan = (req, res) => {
    db.query('SELECT * FROM ulasan', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get Review by ID
exports.getUlasanById = (req, res) => {
    const { id_ulasan } = req.params;
    db.query('SELECT * FROM ulasan WHERE id_ulasan = ?', [id_ulasan], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Ulasan not found' });
        res.json(result[0]);
    });
};

// Create Review
exports.createUlasan = (req, res) => {
    const { id_ulasan, id_penyewa, id_mobil, rating, komentar } = req.body;
    const query = `INSERT INTO ulasan (id_ulasan, id_penyewa, id_mobil, rating, komentar) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [id_ulasan, id_penyewa, id_mobil, rating, komentar], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Ulasan added successfully', id: result.insertId });
    });
};

// Update Review
exports.updateUlasan = (req, res) => {
    const { id_ulasan } = req.params;
    const { id_penyewa, id_mobil, rating, komentar } = req.body;
    const query = `UPDATE ulasan SET id_penyewa=?, id_mobil=?, rating=?, komentar=? WHERE id_ulasan=?`;

    db.query(query, [id_penyewa, id_mobil, rating, komentar, id_ulasan], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Ulasan updated successfully' });
    });
};

// Delete Review
exports.deleteUlasan = (req, res) => {
    const { id_ulasan } = req.params;
    db.query('DELETE FROM ulasan WHERE id_ulasan = ?', [id_ulasan], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Ulasan deleted successfully' });
    });
};
