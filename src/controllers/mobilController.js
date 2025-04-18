const db = require('../db');

// Get All Cars
exports.getAllMobil = (req, res) => {
    db.query('SELECT * FROM mobil', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get Car by ID
exports.getMobilById = (req, res) => {
    const { id_mobil } = req.params;
    db.query('SELECT * FROM mobil WHERE id_mobil = ?', [id_mobil], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Mobil not found' });
        res.json(result[0]);
    });
};

// Create Car
exports.createMobil = (req, res) => {
    const { id_mobil, plat_nomor, nama, merek, model, transmisi, tahun, warna, bahan_bakar, harga_sewa, status, id_pemilik } = req.body;
    const query = `INSERT INTO mobil (id_mobil, plat_nomor, nama, merek, model, transmisi, tahun, warna, bahan_bakar, harga_sewa, status, id_pemilik)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [id_mobil, plat_nomor, nama, merek, model, transmisi, tahun, warna, bahan_bakar, harga_sewa, status, id_pemilik], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Mobil added successfully', id: result.insertId });
    });
};

// Update Car
exports.updateMobil = (req, res) => {
    const { id_mobil } = req.params;
    const { plat_nomor, nama, merek, model, transmisi, tahun, warna, bahan_bakar, harga_sewa, status, id_pemilik } = req.body;
    const query = `UPDATE mobil SET plat_nomor=?, nama=?, merek=?, model=?, transmisi=?, tahun=?, warna=?, bahan_bakar=?, harga_sewa=?, status=?, id_pemilik=? WHERE id_mobil=?`;
    
    db.query(query, [plat_nomor, nama, merek, model, transmisi, tahun, warna, bahan_bakar, harga_sewa, status, id_pemilik, id_mobil], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mobil updated successfully' });
    });
};

// Delete Car
exports.deleteMobil = (req, res) => {
    const { id_mobil } = req.params;
    db.query('DELETE FROM mobil WHERE id_mobil = ?', [id_mobil], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mobil deleted successfully' });
    });
};
