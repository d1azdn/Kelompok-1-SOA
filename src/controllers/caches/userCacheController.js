const { client } = require("../../db")

const getUserCache = async (req,res) => {
    const { id_penyewa } = req.params

    try{
        const checkSession = await client.hGetAll(`session_user:${id_penyewa}`)
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

const postUserCache = async (req,res) => {
    const { id_penyewa } = req.params
    const { nama, alamat, email, password, no_telepon } = req.body

    try{
        await client.hSet(`session_user:${id_penyewa}`, {
            id_penyewa: id_penyewa,
            nama: nama,
            alamat: alamat,
            email: email,
            no_telepon: no_telepon,
            last_updated: new Date().toISOString()
            });
        await client.expire(`session_user:${id_penyewa}`, 3600);
        return res.status(200).json({
            message:'Berhasil caching user'
        })
    } catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

const deleteUserCache = async(req,res) => {
    const { id_penyewa } = req.params

    try{
        const checkSession = await client.hGetAll(`session_user:${id_penyewa}`)
        if (Object.keys(checkSession).length == 0){
            return res.status(404).json({
                message:'Session tidak ditemukan'
            })
        }
        await client.del(`session_user:${id_penyewa}`)
        return res.status(200).json({
            message:'Session berhasil dihapus'
        });
    } catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

module.exports = { getUserCache, postUserCache, deleteUserCache }