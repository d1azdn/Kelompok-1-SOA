const { client } = require("../../db")

const getRentalRatingCache = async (req,res) => {
    const { id_rental } = req.params

    try{
        const checkSession = await client.hGetAll(`rental_rating:${id_rental}`)
        if (Object.keys(checkSession).length == 0){
            return res.status(404).json({
                message:'Session tidak ditemukan'
            })
        }
        return res.status(200).json({ session: checkSession });
    } catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

const postRentalRatingCache = async (req,res) => {
    const { id_rental } = req.params
    const { rating, tanggal, id_ulasan, ulasan } = req.body

    try{
        await client.hSet(`rental_rating:${id_rental}`, {
            id_ulasan: id_ulasan,
            tanggal: tanggal,
            rating: rating,
            ulasan: ulasan,
            last_updated: new Date().toISOString()
            });
        await client.expire(`rental_rating:${id_rental}`, 3600);
        return res.status(200).json({
            message:'Berhasil caching user'
        })
    } catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

const deleteRentalRatingCache = async(req,res) => {
    const { id_rental } = req.params

    try{
        const checkSession = await client.hGetAll(`rental_rating:${id_rental}`)
        if (Object.keys(checkSession).length == 0){
            return res.status(404).json({
                message:'Session tidak ditemukan'
            })
        }
        await client.del(`rental_rating:${id_rental}`)
        return res.status(200).json({
            message:'Session berhasil dihapus'
        });
    } catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

module.exports = { getRentalRatingCache, postRentalRatingCache, deleteRentalRatingCache }