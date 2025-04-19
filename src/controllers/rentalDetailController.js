const {db, client} = require('../db');

// Get detailed rental information with car, renter, and owner details
const getDetailedRentalInfo = async (req, res) => {
    try {
        const query = `
            SELECT 
                r.id_rental,
                r.tanggal_mulai,
                r.tanggal_selesai,
                r.biaya,
                r.metode_pembayaran,
                r.status_pembayaran,
                
                m.id_mobil,
                m.plat_nomor,
                m.nama as nama_mobil,
                m.merek,
                m.model,
                m.transmisi,
                m.tahun,
                m.warna,
                m.bahan_bakar,
                m.harga_sewa,
                m.status as status_mobil,
                
                p.id_penyewa,
                p.nama as nama_penyewa,
                p.email as email_penyewa,
                p.no_telepon as telepon_penyewa,
                p.alamat as alamat_penyewa,
                
                pk.id_pemilik,
                pk.nama as nama_pemilik,
                pk.email as email_pemilik,
                pk.no_telepon as telepon_pemilik,
                pk.alamat as alamat_pemilik
            FROM rental r
            JOIN mobil m ON r.id_mobil = m.id_mobil
            JOIN penyewa p ON r.id_penyewa = p.id_penyewa
            JOIN pemilik pk ON m.id_pemilik = pk.id_pemilik
            ORDER BY r.tanggal_mulai DESC
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching detailed rental information:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getDetailedRentalInfo:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Get detailed rental information for a specific rental ID
const getDetailedRentalById = async (req, res) => {
    try {
        const { id_rental } = req.params;
        const query = `
            SELECT 
                r.id_rental,
                r.tanggal_mulai,
                r.tanggal_selesai,
                r.biaya,
                r.metode_pembayaran,
                r.status_pembayaran,
                
                m.id_mobil,
                m.plat_nomor,
                m.nama as nama_mobil,
                m.merek,
                m.model,
                m.transmisi,
                m.tahun,
                m.warna,
                m.bahan_bakar,
                m.harga_sewa,
                m.status as status_mobil,
                
                p.id_penyewa,
                p.nama as nama_penyewa,
                p.email as email_penyewa,
                p.no_telepon as telepon_penyewa,
                p.alamat as alamat_penyewa,
                
                pk.id_pemilik,
                pk.nama as nama_pemilik,
                pk.email as email_pemilik,
                pk.no_telepon as telepon_pemilik,
                pk.alamat as alamat_pemilik
            FROM rental r
            JOIN mobil m ON r.id_mobil = m.id_mobil
            JOIN penyewa p ON r.id_penyewa = p.id_penyewa
            JOIN pemilik pk ON m.id_pemilik = pk.id_pemilik
            WHERE r.id_rental = ?
        `;

        db.query(query, [id_rental], (error, results) => {
            if (error) {
                console.error('Error fetching detailed rental information:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Rental not found' });
            }
            res.json(results[0]);
        });
    } catch (error) {
        console.error('Error in getDetailedRentalById:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    getDetailedRentalInfo,
    getDetailedRentalById
}; 