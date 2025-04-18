const express = require("express")
require('dotenv').config();
const { google } = require('googleapis')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { db, client } = require("../db")
const { createId } = require("@paralleldrive/cuid2")

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
]

const authUrl = oauth2Client.generateAuthUrl({
    acces_type: 'offline',
    scope: scopes,
})

const authGoogle = async (req,res) => {
    res.redirect(authUrl)
}

const authGoogleCallback = async (req,res) => {
    const code = req.query.code

    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({
        version: 'v2',
        auth: oauth2Client
    });

    const { data } = await oauth2.userinfo.get()

    try{
    db.query('SELECT * FROM penyewa WHERE email = ?', [data.email], async (err, res) =>{
        if (res.length == 0){
            const randomIdgenerator = createId()
            const hashedPassword = await bcrypt.hash(data.email,10)

            db.query('INSERT INTO penyewa (id_penyewa, nama, alamat, email, password, no_telepon) values (?, ?, ?, ?, ?, ?)', [randomIdgenerator, data.name, data.name, data.email, hashedPassword, 0]);
        }
    })


    db.query('SELECT * FROM penyewa WHERE email = ?', [data.email], async (err, dbres) =>{
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

    }catch(err){
        return res.status(500).json({
            message:'Internal Server error'
        })
    }
}


module.exports = { authGoogle, authGoogleCallback }