const db = require('../db');

// Get All Returns
exports.getAllReturn = (req, res) => {
    db.query('SELECT * FROM pengembalian', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get Return by ID
exports.getReturnById = (req, res) => {
    const { id_pengembalian } = req.params;
    db.query('SELECT * FROM pengembalian WHERE id_pengembalian = ?', [id_pengembalian], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Pengembalian not found' });
        res.json(result[0]);
    });
};

// Create Return
exports.createReturn = (req, res) => {
    const { id_pengembalian, id_rental, tanggal_pengembalian, denda, kondisi_mobil } = req.body;
    const query = `INSERT INTO pengembalian (id_pengembalian, id_rental, tanggal_pengembalian, denda, kondisi_mobil) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [id_pengembalian, id_rental, tanggal_pengembalian, denda, kondisi_mobil], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Pengembalian added successfully', id: result.insertId });
    });
};

// Update Return
exports.updateReturn = (req, res) => {
    const { id_pengembalian } = req.params;
    const { id_rental, tanggal_pengembalian, denda, kondisi_mobil } = req.body;
    const query = `UPDATE pengembalian SET id_rental=?, tanggal_pengembalian=?, denda=?, kondisi_mobil=? WHERE id_pengembalian=?`;

    db.query(query, [id_rental, tanggal_pengembalian, denda, kondisi_mobil, id_pengembalian], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Pengembalian updated successfully' });
    });
};

// Delete Return
exports.deleteReturn = (req, res) => {
    const { id_pengembalian } = req.params;
    db.query('DELETE FROM pengembalian WHERE id_pengembalian = ?', [id_pengembalian], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Pengembalian deleted successfully' });
    });
};
