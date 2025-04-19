const {db,client} = require('../db');

// Get all cars owned by an owner with their last lease status
const getOwnerCarsWithLastLease = async (req, res) => {
    try {
        const { id_pemilik } = req.params;
        
        const query = `
            SELECT 
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
                
                -- Get the latest rental information for each car
                (
                    SELECT JSON_OBJECT(
                        'id_rental', r.id_rental,
                        'tanggal_mulai', r.tanggal_mulai,
                        'tanggal_selesai', r.tanggal_selesai,
                        'status_pembayaran', r.status_pembayaran,
                        'nama_penyewa', p.nama,
                        'email_penyewa', p.email
                    )
                    FROM rental r
                    JOIN penyewa p ON r.id_penyewa = p.id_penyewa
                    WHERE r.id_mobil = m.id_mobil
                    ORDER BY r.tanggal_mulai DESC
                    LIMIT 1
                ) as last_rental
                
            FROM mobil m
            WHERE m.id_pemilik = ?
            ORDER BY m.nama
        `;

        db.query(query, [id_pemilik], (error, results) => {
            if (error) {
                console.error('Error fetching owner cars with last lease:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            
            // Parse the JSON string in last_rental to an object
            const formattedResults = results.map(car => {
                if (car.last_rental) {
                    car.last_rental = JSON.parse(car.last_rental);
                } else {
                    car.last_rental = null;
                }
                return car;
            });
            
            res.json(formattedResults);
        });
    } catch (error) {
        console.error('Error in getOwnerCarsWithLastLease:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Get owner's car fleet summary with rental statistics
const getOwnerCarFleetSummary = async (req, res) => {
    try {
        const { id_pemilik } = req.params;
        
        const query = `
            SELECT 
                m.id_mobil,
                m.plat_nomor,
                m.nama as nama_mobil,
                m.merek,
                m.model,
                m.status as status_mobil,
                
                -- Count of all rentals for this car
                (
                    SELECT COUNT(*)
                    FROM rental r
                    WHERE r.id_mobil = m.id_mobil
                ) as total_rentals,
                
                -- Count of active rentals
                (
                    SELECT COUNT(*)
                    FROM rental r
                    WHERE r.id_mobil = m.id_mobil
                    AND r.tanggal_selesai >= CURDATE()
                ) as active_rentals,
                
                -- Total revenue from this car
                (
                    SELECT COALESCE(SUM(biaya), 0)
                    FROM rental r
                    WHERE r.id_mobil = m.id_mobil
                    AND r.status_pembayaran = 'paid'
                ) as total_revenue
                
            FROM mobil m
            WHERE m.id_pemilik = ?
            ORDER BY m.nama
        `;

        db.query(query, [id_pemilik], (error, results) => {
            if (error) {
                console.error('Error fetching owner car fleet summary:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getOwnerCarFleetSummary:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    getOwnerCarsWithLastLease,
    getOwnerCarFleetSummary
}; 