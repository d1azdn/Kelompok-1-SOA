const db = require('../db');

// Get All Cars
exports.getAllPemilik = (req, res) => {
    db.query('SELECT * FROM pemilik', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get Car by ID
exports.getPemilikById = (req, res) => {
    const { id_pemilik } = req.params;
    db.query('SELECT * FROM pemilik WHERE id_pemilik = ?', [id_pemilik], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Pemilik not found' });
        res.json(result[0]);
    });
};

// Create Car
exports.createPemilik = (req, res) => {
    const { id_pemilik, nama, alamat, email, password, no_telepon } = req.body;
    const query = `INSERT INTO pemilik (id_pemilik, nama, alamat, email, password, no_telepon)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [id_pemilik, nama, alamat, email, password, no_telepon], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Pemilik added successfully', id: result.insertId });
    });
};

// Update Car
exports.updatePemilik = (req, res) => {
    const { id_pemilik } = req.params;
    const { nama, alamat, email, password, no_telepon } = req.body;
    const query = `UPDATE pemilik SET id_pemilik=?, nama=?, alamat=?, email=?, password=?, no_telepon=? WHERE id_pemilik=?`;
    
    db.query(query, [nama, alamat, email, password, no_telepon], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Pemilik updated successfully' });
    });
};


// Delete Car
exports.deletePemilik = (req, res) => {
    const { id_pemilik } = req.params;
    db.query('DELETE FROM pemilik WHERE id_pemilik = ?', [id_pemilik], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Pemilik deleted successfully' });
    });
};
