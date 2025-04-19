const pool = require('../db');

// Get All Cars
const getAllMobil = async (req, res) => {
    try {
        const query = 'SELECT * FROM mobil';
        pool.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching cars:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getAllMobil:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Car by ID
const getMobilById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM mobil WHERE id = ?';
        pool.query(query, [id], (error, results) => {
            if (error) {
                console.error('Error fetching car:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Car not found' });
            }
            res.json(results[0]);
        });
    } catch (error) {
        console.error('Error in getMobilById:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create Car
const createMobil = async (req, res) => {
    try {
        const {
            plat_nomor,
            nama,
            merek,
            model,
            transmisi,
            tahun,
            warna,
            bahan_bakar,
            harga_sewa,
            status,
            id_pemilik
        } = req.body;

        const query = `
            INSERT INTO mobil (
                plat_nomor, nama, merek, model, transmisi, 
                tahun, warna, bahan_bakar, harga_sewa, 
                status, id_pemilik
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        pool.query(
            query,
            [plat_nomor, nama, merek, model, transmisi, tahun, warna, bahan_bakar, harga_sewa, status, id_pemilik],
            (error, results) => {
                if (error) {
                    console.error('Error creating car:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                res.status(201).json({ id: results.insertId, message: 'Car created successfully' });
            }
        );
    } catch (error) {
        console.error('Error in createMobil:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Car
const updateMobil = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            plat_nomor,
            nama,
            merek,
            model,
            transmisi,
            tahun,
            warna,
            bahan_bakar,
            harga_sewa,
            status,
            id_pemilik
        } = req.body;

        const query = `
            UPDATE mobil 
            SET plat_nomor = ?, nama = ?, merek = ?, model = ?, 
                transmisi = ?, tahun = ?, warna = ?, bahan_bakar = ?, 
                harga_sewa = ?, status = ?, id_pemilik = ?
            WHERE id = ?
        `;

        pool.query(
            query,
            [plat_nomor, nama, merek, model, transmisi, tahun, warna, bahan_bakar, harga_sewa, status, id_pemilik, id],
            (error, results) => {
                if (error) {
                    console.error('Error updating car:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'Car not found' });
                }
                res.json({ message: 'Car updated successfully' });
            }
        );
    } catch (error) {
        console.error('Error in updateMobil:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Car
const deleteMobil = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM mobil WHERE id = ?';
        pool.query(query, [id], (error, results) => {
            if (error) {
                console.error('Error deleting car:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Car not found' });
            }
            res.json({ message: 'Car deleted successfully' });
        });
    } catch (error) {
        console.error('Error in deleteMobil:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllMobil,
    getMobilById,
    createMobil,
    updateMobil,
    deleteMobil
};
