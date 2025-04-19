const { db, client } = require('../db');

// Fungsi untuk memisahkan komponen alamat
const parseAddress = (alamat) => {
    // Format alamat: "Jl. Merdeka No. 123, Kecamatan Menteng, Jakarta Pusat, DKI Jakarta"
    const parts = alamat.split(', ');
    
    if (parts.length >= 4) {
        return {
            nama_jalan: parts[0],
            kecamatan: parts[1],
            kabupaten: parts[2],
            provinsi: parts[3]
        };
    } else if (parts.length === 3) {
        return {
            nama_jalan: parts[0],
            kecamatan: parts[1],
            kabupaten: parts[2],
            provinsi: ''
        };
    } else if (parts.length === 2) {
        return {
            nama_jalan: parts[0],
            kecamatan: parts[1],
            kabupaten: '',
            provinsi: ''
        };
    } else {
        return {
            nama_jalan: alamat,
            kecamatan: '',
            kabupaten: '',
            provinsi: ''
        };
    }
};

// Menampilkan semua lokasi rental berdasarkan alamat pemilik
const getAllLokasiRental = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id_pemilik,
                p.nama as nama_pemilik,
                p.alamat as lokasi_rental,
                p.email as email_pemilik,
                p.no_telepon as no_telepon_pemilik,
                COUNT(m.id_mobil) as total_mobil,
                SUM(CASE WHEN m.status = 'Tersedia' THEN 1 ELSE 0 END) as mobil_tersedia
            FROM pemilik p
            LEFT JOIN mobil m ON p.id_pemilik = m.id_pemilik
            GROUP BY p.id_pemilik, p.nama, p.alamat, p.email, p.no_telepon
            ORDER BY p.alamat
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching rental locations:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            // Proses hasil untuk memisahkan komponen alamat
            const processedResults = results.map(item => {
                const addressComponents = parseAddress(item.lokasi_rental);
                return {
                    ...item,
                    alamat_detail: addressComponents
                };
            });
            
            res.json({
                total_lokasi: processedResults.length,
                lokasi_rental: processedResults
            });
        });
    } catch (error) {
        console.error('Error in getAllLokasiRental:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Menampilkan detail lokasi rental berdasarkan ID pemilik
const getLokasiRentalById = async (req, res) => {
    try {
        const { id_pemilik } = req.params;
        
        // Query untuk mendapatkan informasi pemilik
        const queryPemilik = `
            SELECT 
                p.id_pemilik,
                p.nama as nama_pemilik,
                p.alamat as lokasi_rental,
                p.email as email_pemilik,
                p.no_telepon as no_telepon_pemilik
            FROM pemilik p
            WHERE p.id_pemilik = ?
        `;
        
        // Query untuk mendapatkan mobil yang tersedia di lokasi tersebut
        const queryMobil = `
            SELECT 
                m.id_mobil,
                m.nama as nama_mobil,
                m.merek,
                m.model,
                m.transmisi,
                m.tahun,
                m.warna,
                m.bahan_bakar,
                m.harga_sewa,
                m.status,
                m.plat_nomor
            FROM mobil m
            WHERE m.id_pemilik = ?
            ORDER BY m.nama
        `;
        
        // Eksekusi query untuk mendapatkan informasi pemilik
        db.query(queryPemilik, [id_pemilik], (errorPemilik, resultsPemilik) => {
            if (errorPemilik) {
                console.error('Error fetching rental location details:', errorPemilik);
                return res.status(500).json({ error: 'Internal server error', details: errorPemilik.message });
            }
            
            if (resultsPemilik.length === 0) {
                return res.status(404).json({ error: 'Lokasi rental tidak ditemukan' });
            }
            
            const lokasiRental = resultsPemilik[0];
            const addressComponents = parseAddress(lokasiRental.lokasi_rental);
            
            // Tambahkan komponen alamat yang sudah dipisahkan
            lokasiRental.alamat_detail = addressComponents;
            
            // Eksekusi query untuk mendapatkan mobil yang tersedia
            db.query(queryMobil, [id_pemilik], (errorMobil, resultsMobil) => {
                if (errorMobil) {
                    console.error('Error fetching available cars:', errorMobil);
                    return res.status(500).json({ error: 'Internal server error', details: errorMobil.message });
                }
                
                // Hitung statistik mobil
                const totalMobil = resultsMobil.length;
                const mobilTersedia = resultsMobil.filter(mobil => mobil.status === 'Tersedia').length;
                
                res.json({
                    lokasi_rental: lokasiRental,
                    statistik: {
                        total_mobil: totalMobil,
                        mobil_tersedia: mobilTersedia,
                        mobil_tersewa: totalMobil - mobilTersedia
                    },
                    mobil: resultsMobil
                });
            });
        });
    } catch (error) {
        console.error('Error in getLokasiRentalById:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Mencari lokasi rental berdasarkan kata kunci alamat
const searchLokasiRental = async (req, res) => {
    try {
        const { keyword } = req.query;
        
        if (!keyword) {
            return res.status(400).json({ error: 'Parameter keyword diperlukan' });
        }
        
        const query = `
            SELECT 
                p.id_pemilik,
                p.nama as nama_pemilik,
                p.alamat as lokasi_rental,
                p.email as email_pemilik,
                p.no_telepon as no_telepon_pemilik,
                COUNT(m.id_mobil) as total_mobil,
                SUM(CASE WHEN m.status = 'Tersedia' THEN 1 ELSE 0 END) as mobil_tersedia
            FROM pemilik p
            LEFT JOIN mobil m ON p.id_pemilik = m.id_pemilik
            WHERE 
                p.alamat LIKE ? OR
                p.alamat LIKE ? OR
                p.alamat LIKE ? OR
                p.alamat LIKE ?
            GROUP BY p.id_pemilik, p.nama, p.alamat, p.email, p.no_telepon
            ORDER BY 
                CASE 
                    WHEN p.alamat LIKE ? THEN 1
                    WHEN p.alamat LIKE ? THEN 2
                    WHEN p.alamat LIKE ? THEN 3
                    WHEN p.alamat LIKE ? THEN 4
                    ELSE 5
                END,
                p.alamat
        `;
        
        // Membuat pattern pencarian yang berbeda untuk meningkatkan akurasi
        const patterns = [
            `%${keyword}%`,           // Cocok di mana saja
            `%, ${keyword},%`,        // Cocok sebagai bagian alamat (kecamatan, kabupaten, dll)
            `%, ${keyword}`,          // Cocok di akhir alamat
            `${keyword},%`            // Cocok di awal alamat
        ];
        
        db.query(query, [...patterns, ...patterns], (error, results) => {
            if (error) {
                console.error('Error searching rental locations:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            // Proses hasil untuk memisahkan komponen alamat
            const processedResults = results.map(item => {
                const addressComponents = parseAddress(item.lokasi_rental);
                return {
                    ...item,
                    alamat_detail: addressComponents
                };
            });
            
            res.json({
                keyword: keyword,
                total_lokasi: processedResults.length,
                lokasi_rental: processedResults
            });
        });
    } catch (error) {
        console.error('Error in searchLokasiRental:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Mencari lokasi rental berdasarkan provinsi
const searchLokasiRentalByProvinsi = async (req, res) => {
    try {
        const { provinsi } = req.query;
        
        if (!provinsi) {
            return res.status(400).json({ error: 'Parameter provinsi diperlukan' });
        }
        
        const query = `
            SELECT 
                p.id_pemilik,
                p.nama as nama_pemilik,
                p.alamat as lokasi_rental,
                p.email as email_pemilik,
                p.no_telepon as no_telepon_pemilik,
                COUNT(m.id_mobil) as total_mobil,
                SUM(CASE WHEN m.status = 'Tersedia' THEN 1 ELSE 0 END) as mobil_tersedia
            FROM pemilik p
            LEFT JOIN mobil m ON p.id_pemilik = m.id_pemilik
            WHERE p.alamat LIKE ?
            GROUP BY p.id_pemilik, p.nama, p.alamat, p.email, p.no_telepon
            ORDER BY p.alamat
        `;
        
        db.query(query, [`%${provinsi}%`], (error, results) => {
            if (error) {
                console.error('Error searching rental locations by province:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            // Proses hasil untuk memisahkan komponen alamat
            const processedResults = results.map(item => {
                const addressComponents = parseAddress(item.lokasi_rental);
                return {
                    ...item,
                    alamat_detail: addressComponents
                };
            });
            
            res.json({
                provinsi: provinsi,
                total_lokasi: processedResults.length,
                lokasi_rental: processedResults
            });
        });
    } catch (error) {
        console.error('Error in searchLokasiRentalByProvinsi:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Mendapatkan daftar provinsi yang tersedia
const getDaftarProvinsi = async (req, res) => {
    try {
        const query = `
            SELECT DISTINCT
                SUBSTRING_INDEX(SUBSTRING_INDEX(p.alamat, ', ', -1), ',', 1) as provinsi
            FROM pemilik p
            WHERE p.alamat LIKE '%, %, %, %'
            ORDER BY provinsi
        `;
        
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching provinces:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            const provinsiList = results.map(item => item.provinsi);
            
            res.json({
                total_provinsi: provinsiList.length,
                daftar_provinsi: provinsiList
            });
        });
    } catch (error) {
        console.error('Error in getDaftarProvinsi:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    getAllLokasiRental,
    getLokasiRentalById,
    searchLokasiRental,
    searchLokasiRentalByProvinsi,
    getDaftarProvinsi
}; 