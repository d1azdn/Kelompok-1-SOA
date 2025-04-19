const { client } = require("../../db")

const getCarAvailable = async(req,res) => {
    const { id_mobil } = req.params

    try{
        const checkCar = await client.hGetAll(`available_car:${id_mobil}`)
        if (Object.keys(checkCar).length == 0){
            return res.status(404).json({
                message:'Session tidak ditemukan'
            })
        }
        return res.status(200).json(checkCar);
    } catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

const postCarAvailable = async(req,res)=>{
    const { id_mobil } = req.params
    const { available } = req.body

    try{
        await client.hSet(`available_car:${id_mobil}`, {
            available: available,
            last_updated: new Date().toISOString()
            });
        await client.expire(`available_car:${id_mobil}`, 3600);
        return res.status(200).json({
            message:'Berhasil caching mobil'
        })
    } catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

module.exports = { getCarAvailable, postCarAvailable }