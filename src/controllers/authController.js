const express = require("express")
require('dotenv').config();
const { google } = require('googleapis')
const jwt = require('jsonwebtoken')

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
    console.log("masok")
    res.redirect(authUrl)
}

const authGoogleCallback = async (req,res) => {
    const code = req.query.code
    console.log(code)

    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({
        version: 'v2',
        auth: oauth2Client
    });

    console.log("masokss")
    const { data } = await oauth2.userinfo.get();

    const token = jwt.sign(
        {
          id: data.id,
          name: data.name,
          email: data.email,
          picture: data.picture
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );

    res.json(token)
}


module.exports = { authGoogle, authGoogleCallback }