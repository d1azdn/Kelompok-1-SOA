const express = require("express")
require('dotenv').config();
const { db, client } = require("../db")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const z = require('zod')
const { createId } = require("@paralleldrive/cuid2")

const authLogin = async (req,res) => {
    const {email, password} = req.body
    if (!email || !password){
        return res.status(400).json({
            message:'Email atau password wajib diisi!'
        })
    }

    db.query('SELECT * FROM penyewa WHERE email = ?', [email], async (err,dbres)=>{
        if (dbres.length == 0){
            return res.status(400).json({
                message:'User tidak ditemukan.'
            })
        }

        const checkPass = await bcrypt.compare(password, dbres[0].password)
        if (!checkPass){
            return res.status(400).json({
                message:'Email atau password salah.'
            })
        }
        const token = jwt.sign(
            {
                id: dbres[0].id_penyewa,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('session_user', dbres[0].id_penyewa)
        await client.hSet(`session_user:${dbres[0].id_penyewa}`, {
            user_id: dbres[0].id_penyewa,
            nama: dbres[0].nama,
            alamat: dbres[0].alamat,
            email: dbres[0].email,
            no_telepon: dbres[0].no_telepon,
            login_time: new Date().toISOString()
          });
        await client.expire(`session_user:${dbres[0].id_penyewa}`, 3600);
    
        return res.status(200).json({
            token:token,
            message:'Berhasil login.'
        })
    })
}


const authRegister = async (req,res) => {
    const { nama, alamat, email, password, no_telepon } = req.body

    const registerValidation = z.object({
        nama: z.string().min(1, {message:'Nama wajib diisi'}),
        alamat: z.string().min(1, {message:'Alamat wajib diisi'}),
        email: z.string().email('Email tidak valid'),
        password: z.string().min(8, 'Password harus minimal 8 karakter'),
        no_telepon: z.string().min(1, {message:'Nomor telepon wajib diisi'}),
    });

    try {
        registerValidation.parse({ nama, alamat, email, password, no_telepon })
      } catch (err) {
        return res.status(400).json({
          message: err.errors,
        });
      }

    const hashedPassword = await bcrypt.hash(password,10)

    try{
        db.query('SELECT * FROM penyewa WHERE email = ?', [email], async (err,row)=>{
            if (row.length>0){
                return res.status(400).json({
                    message:'Email sudah terdaftar' 
                })
            }

            const randomIdgenerator = createId()

            db.query('INSERT INTO penyewa (id_penyewa, nama, alamat, email, password, no_telepon) values (?, ?, ?, ?, ?, ?)', [randomIdgenerator, nama, alamat, email, hashedPassword, no_telepon]); 

            const token = jwt.sign(
                {
                    id: randomIdgenerator,
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' }
            );
            
            res.cookie('session_user', randomIdgenerator)
            await client.hSet(`session_user:${randomIdgenerator}`, {
                user_id: randomIdgenerator,
                nama: nama,
                alamat: alamat,
                email: email,
                no_telepon: no_telepon,
                login_time: new Date().toISOString()
                });
            await client.expire(`session_user:${randomIdgenerator}`, 3600);
            return res.status(200).json({
                token: token,
                message:'Email berhasil terdaftar'
            })
        });

    

    }catch (err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }

} 

module.exports = { authLogin, authRegister }