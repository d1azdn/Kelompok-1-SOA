const { client } = require("../../db")

const getRentalCache = async(req,res) => {
    const { id_rental } = req.params

    try{
        const checkRental = await client.hGetAll(`session_rental:${id_rental}`)
        if (Object.keys(checkRental).length == 0){
            return res.status(404).json({
                message:'Session tidak ditemukan'
            })
        }
        return res.status(200).json(checkRental);
    } catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

const postRentalCache = async(req,res)=>{
    const { id_rental } = req.params
    const { tanggal_mulai, tanggal_selesai, status_pembayaran, id_penyewa, id_mobil } = req.body

    try{
        await client.hSet(`session_rental:${id_rental}`, {
            id_penyewa: id_penyewa,
            id_mobil: id_mobil,
            status_pembayaran: status_pembayaran,
            tanggal_selesai: tanggal_selesai,
            tanggal_mulai: tanggal_mulai,
            last_updated: new Date().toISOString()
            });
        await client.expire(`session_rental:${id_rental}`, 3600);
        return res.status(200).json({
            message:'Berhasil caching mobil'
        })
    } catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

module.exports = { getRentalCache, postRentalCache }