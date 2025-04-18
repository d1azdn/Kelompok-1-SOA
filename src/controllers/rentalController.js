const db = require('../db');

// Get All Rentals
exports.getAllRental = (req, res) => {
    db.query('SELECT * FROM rental', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get Rental by ID
exports.getRentalById = (req, res) => {
    const { id_rental } = req.params;
    db.query('SELECT * FROM rental WHERE id_rental = ?', [id_rental], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Rental not found' });
        res.json(result[0]);
    });
};

// Create Rental
exports.createRental = (req, res) => {
    const { id_rental, tanggal_mulai, tanggal_selesai, biaya, metode_pembayaran, status_pembayaran, id_penyewa, id_mobil } = req.body;
    const query = `INSERT INTO rental (id_rental, tanggal_mulai, tanggal_selesai, biaya, metode_pembayaran, status_pembayaran, id_penyewa, id_mobil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [id_rental, tanggal_mulai, tanggal_selesai, biaya, metode_pembayaran, status_pembayaran, id_penyewa, id_mobil], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Rental added successfully', id: result.insertId });
    });
};

// Update Rental
exports.updateRental = (req, res) => {
    const { id_rental } = req.params;
    const { tanggal_mulai, tanggal_selesai, biaya, metode_pembayaran, status_pembayaran, id_penyewa, id_mobil } = req.body;
    const query = `UPDATE rental SET tanggal_mulai=?, tanggal_selesai=?, biaya=?, metode_pembayaran=?, status_pembayaran=?, id_penyewa=?, id_mobil=? WHERE id_rental=?`;
    
    db.query(query, [tanggal_mulai, tanggal_selesai, biaya, metode_pembayaran, status_pembayaran, id_penyewa, id_mobil, id_rental], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Rental updated successfully' });
    });
};

// Delete Rental
exports.deleteRental = (req, res) => {
    const { id_rental } = req.params;
    db.query('DELETE FROM rental WHERE id_rental = ?', [id_rental], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Rental deleted successfully' });
    });
};
