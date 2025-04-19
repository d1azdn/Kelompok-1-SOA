const pool = require('../db');

const getRentalHistory = async (req, res) => {
    try {
        const query = `
            SELECT 
                r.id_rental as rental_id,
                r.tanggal_mulai,
                r.tanggal_selesai,
                r.status_pembayaran as status,
                r.biaya as total_harga,
                m.nama as nama_mobil,
                m.merek as merk,
                m.model,
                p.nama as nama_penyewa,
                p.email as email_penyewa,
                p.alamat as alamat_penyewa,
                DATEDIFF(r.tanggal_selesai, r.tanggal_mulai) as durasi_sewa
            FROM rental r
            JOIN mobil m ON r.id_mobil = m.id_mobil
            JOIN penyewa p ON r.id_penyewa = p.id_penyewa
            ORDER BY r.tanggal_mulai DESC
        `;

        pool.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching rental history:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getRentalHistory:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const getRentalHistoryByTenant = async (req, res) => {
    try {
        const { penyewa_id } = req.params;
        const query = `
            SELECT 
                r.id_rental as rental_id,
                r.tanggal_mulai,
                r.tanggal_selesai,
                r.status_pembayaran as status,
                r.biaya as total_harga,
                m.nama as nama_mobil,
                m.merek as merk,
                m.model,
                DATEDIFF(r.tanggal_selesai, r.tanggal_mulai) as durasi_sewa,
                u.rating,
                u.komentar
            FROM rental r
            JOIN mobil m ON r.id_mobil = m.id_mobil
            LEFT JOIN ulasan u ON r.id_rental = u.id_rental
            WHERE r.id_penyewa = ?
            ORDER BY r.tanggal_mulai DESC
        `;

        pool.query(query, [penyewa_id], (error, results) => {
            if (error) {
                console.error('Error fetching tenant rental history:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getRentalHistoryByTenant:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    getRentalHistory,
    getRentalHistoryByTenant
}; 