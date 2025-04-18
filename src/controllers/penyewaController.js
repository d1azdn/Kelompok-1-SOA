const db = require('../db');

// Get All Renters
exports.getAllPenyewa = (req, res) => {
    db.query('SELECT * FROM penyewa', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get Renter by ID
exports.getPenyewaById = (req, res) => {
    const { id_penyewa } = req.params;
    db.query('SELECT * FROM penyewa WHERE id_penyewa = ?', [id_penyewa], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Penyewa not found' });
        res.json(result[0]);
    });
};

// Create Renter
exports.createPenyewa = (req, res) => {
    const { id_penyewa, nama, alamat, email, password, no_telepon } = req.body;
    const query = `INSERT INTO penyewa (id_penyewa, nama, alamat, email, password, no_telepon) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [id_penyewa, nama, alamat, email, password, no_telepon], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Penyewa added successfully', id: result.insertId });
    });
};

// Update Renter
exports.updatePenyewa = (req, res) => {
    const { id_penyewa } = req.params;
    const { nama, alamat, email, password, no_telepon } = req.body;
    const query = `UPDATE penyewa SET nama=?, alamat=?, email=?, password=?, no_telepon=? WHERE id_penyewa=?`;
    
    db.query(query, [nama, alamat, email, password, no_telepon, id_penyewa], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Penyewa updated successfully' });
    });
};

// Delete Renter
exports.deletePenyewa = (req, res) => {
    const { id_penyewa } = req.params;
    db.query('DELETE FROM penyewa WHERE id_penyewa = ?', [id_penyewa], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Penyewa deleted successfully' });
    });
};
