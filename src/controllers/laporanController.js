const { db, client } = require('../db');

// Menampilkan penyewa yang paling sering menyewa mobil
const getPenyewaTerbanyak = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id_penyewa,
                p.nama as nama_penyewa,
                p.email as email_penyewa,
                p.no_telepon as no_telepon_penyewa,
                COUNT(r.id_rental) as total_rental,
                SUM(CAST(r.biaya AS DECIMAL(12, 2))) as total_biaya_rental,
                MAX(r.tanggal_mulai) as rental_terakhir
            FROM penyewa p
            JOIN rental r ON p.id_penyewa = r.id_penyewa
            GROUP BY p.id_penyewa, p.nama, p.email, p.no_telepon
            ORDER BY total_rental DESC
            LIMIT 10
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching top tenants:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            res.json({
                total_penyewa: results.length,
                penyewa_terbanyak: results
            });
        });
    } catch (error) {
        console.error('Error in getPenyewaTerbanyak:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Menampilkan mobil yang paling sering disewa
const getMobilPalingLaris = async (req, res) => {
    try {
        const query = `
            SELECT 
                m.id_mobil,
                m.nama as nama_mobil,
                m.merek,
                m.model,
                m.plat_nomor,
                m.transmisi,
                m.tahun,
                m.warna,
                m.bahan_bakar,
                m.harga_sewa,
                m.status,
                COUNT(r.id_rental) as total_rental,
                SUM(CAST(r.biaya AS DECIMAL(12, 2))) as total_pendapatan,
                MAX(r.tanggal_mulai) as rental_terakhir
            FROM mobil m
            JOIN rental r ON m.id_mobil = r.id_mobil
            GROUP BY m.id_mobil, m.nama, m.merek, m.model, m.plat_nomor, m.transmisi, m.tahun, m.warna, m.bahan_bakar, m.harga_sewa, m.status
            ORDER BY total_rental DESC
            LIMIT 10
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching most rented cars:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            res.json({
                total_mobil: results.length,
                mobil_paling_laris: results
            });
        });
    } catch (error) {
        console.error('Error in getMobilPalingLaris:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Menampilkan data rental dengan total denda terbesar
const getDendaTerbesar = async (req, res) => {
    try {
        const query = `
            SELECT 
                r.id_rental,
                r.tanggal_mulai,
                r.tanggal_selesai,
                r.biaya as biaya_rental,
                r.metode_pembayaran,
                r.status_pembayaran,
                p.id_penyewa,
                p.nama as nama_penyewa,
                p.email as email_penyewa,
                p.no_telepon as no_telepon_penyewa,
                m.id_mobil,
                m.nama as nama_mobil,
                m.merek,
                m.model,
                m.plat_nomor,
                ret.id_return,
                ret.tanggal_pengembalian,
                ret.kondisi_mobil,
                ret.denda as denda_pengembalian,
                (CAST(r.biaya AS DECIMAL(12, 2)) + CAST(COALESCE(ret.denda, '0') AS DECIMAL(12, 2))) as total_biaya
            FROM rental r
            JOIN penyewa p ON r.id_penyewa = p.id_penyewa
            JOIN mobil m ON r.id_mobil = m.id_mobil
            LEFT JOIN \`return\` ret ON r.id_rental = ret.id_rental
            WHERE ret.denda IS NOT NULL
            ORDER BY CAST(ret.denda AS DECIMAL(12, 2)) DESC
            LIMIT 10
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching highest penalties:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            res.json({
                total_rental: results.length,
                denda_terbesar: results
            });
        });
    } catch (error) {
        console.error('Error in getDendaTerbesar:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    getPenyewaTerbanyak,
    getMobilPalingLaris,
    getDendaTerbesar
}; 