const db = require('../db');

// GET detail transaksi penyewaan by ID rental
exports.getDetailTransaksiPenyewaan = (req, res) => {
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
            m.nama AS nama_mobil,
            m.merek,
            m.model,
            m.plat_nomor,

            p.id_penyewa,
            p.nama AS nama_penyewa,
            p.email AS email_penyewa,
            p.no_telepon AS telepon_penyewa,

            rt.tanggal_pengembalian,
            rt.kondisi_mobil,
            rt.denda,

            u.rating,
            u.ulasan AS isi_ulasan,
            u.tanggal AS tanggal_ulasan

        FROM rental r
        JOIN mobil m ON r.id_mobil = m.id_mobil
        JOIN penyewa p ON r.id_penyewa = p.id_penyewa
        LEFT JOIN \`return\` rt ON r.id_rental = rt.id_rental
        LEFT JOIN ulasan u ON r.id_rental = u.id_rental
        WHERE r.id_rental = ?
    `;

    db.query(query, [id_rental], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });

        res.json(results[0]);
    });
};
