const {db,client} = require('../db');

// Menampilkan seluruh ulasan yang berkaitan dengan satu mobil
const getUlasanByMobil = async (req, res) => {
    try {
        const { id_mobil } = req.params;
        
        const query = `
            SELECT 
                u.id_ulasan,
                u.rating,
                u.ulasan,
                u.tanggal,
                p.id_penyewa,
                p.nama as nama_penyewa,
                p.email as email_penyewa,
                m.id_mobil,
                m.nama as nama_mobil,
                m.merek,
                m.model,
                m.plat_nomor,
                r.id_rental,
                r.tanggal_mulai,
                r.tanggal_selesai
            FROM ulasan u
            JOIN rental r ON u.id_rental = r.id_rental
            JOIN penyewa p ON r.id_penyewa = p.id_penyewa
            JOIN mobil m ON r.id_mobil = m.id_mobil
            WHERE r.id_mobil = ?
            ORDER BY u.tanggal DESC
        `;

        db.query(query, [id_mobil], (error, results) => {
            if (error) {
                console.error('Error fetching reviews by car:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            // Hitung rata-rata rating untuk mobil ini
            const totalRating = results.reduce((sum, review) => sum + parseInt(review.rating), 0);
            const averageRating = results.length > 0 ? (totalRating / results.length).toFixed(1) : 0;
            
            res.json({
                mobil: {
                    id_mobil: results.length > 0 ? results[0].id_mobil : id_mobil,
                    nama_mobil: results.length > 0 ? results[0].nama_mobil : null,
                    merek: results.length > 0 ? results[0].merek : null,
                    model: results.length > 0 ? results[0].model : null,
                    plat_nomor: results.length > 0 ? results[0].plat_nomor : null,
                    rata_rata_rating: averageRating,
                    total_ulasan: results.length
                },
                ulasan: results
            });
        });
    } catch (error) {
        console.error('Error in getUlasanByMobil:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Menampilkan ulasan-ulasan yang diberikan oleh penyewa
const getUlasanByPenyewa = async (req, res) => {
    try {
        const { id_penyewa } = req.params;
        
        const query = `
            SELECT 
                u.id_ulasan,
                u.rating,
                u.ulasan,
                u.tanggal,
                p.id_penyewa,
                p.nama as nama_penyewa,
                p.email as email_penyewa,
                m.id_mobil,
                m.nama as nama_mobil,
                m.merek,
                m.model,
                m.plat_nomor,
                r.id_rental,
                r.tanggal_mulai,
                r.tanggal_selesai
            FROM ulasan u
            JOIN rental r ON u.id_rental = r.id_rental
            JOIN penyewa p ON r.id_penyewa = p.id_penyewa
            JOIN mobil m ON r.id_mobil = m.id_mobil
            WHERE r.id_penyewa = ?
            ORDER BY u.tanggal DESC
        `;

        db.query(query, [id_penyewa], (error, results) => {
            if (error) {
                console.error('Error fetching reviews by tenant:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            // Hitung rata-rata rating yang diberikan oleh penyewa ini
            const totalRating = results.reduce((sum, review) => sum + parseInt(review.rating), 0);
            const averageRating = results.length > 0 ? (totalRating / results.length).toFixed(1) : 0;
            
            res.json({
                penyewa: {
                    id_penyewa: results.length > 0 ? results[0].id_penyewa : id_penyewa,
                    nama_penyewa: results.length > 0 ? results[0].nama_penyewa : null,
                    email_penyewa: results.length > 0 ? results[0].email_penyewa : null,
                    rata_rata_rating_diberikan: averageRating,
                    total_ulasan: results.length
                },
                ulasan: results
            });
        });
    } catch (error) {
        console.error('Error in getUlasanByPenyewa:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Menampilkan 5 mobil dengan rata-rata rating tertinggi
const getMobilTerbaik = async (req, res) => {
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
                COUNT(u.id_ulasan) as total_ulasan,
                ROUND(AVG(CAST(u.rating AS DECIMAL(3,1))), 1) as rata_rata_rating
            FROM mobil m
            LEFT JOIN rental r ON m.id_mobil = r.id_mobil
            LEFT JOIN ulasan u ON r.id_rental = u.id_rental
            GROUP BY m.id_mobil
            HAVING total_ulasan > 0
            ORDER BY rata_rata_rating DESC, total_ulasan DESC
            LIMIT 5
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching top rated cars:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            res.json({
                total_mobil: results.length,
                mobil_terbaik: results
            });
        });
    } catch (error) {
        console.error('Error in getMobilTerbaik:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    getUlasanByMobil,
    getUlasanByPenyewa,
    getMobilTerbaik
}; 