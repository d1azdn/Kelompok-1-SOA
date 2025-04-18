const express = require("express")
require('dotenv').config();
const db = require("../db")
const jwt = require('jsonwebtoken')

const authLogin = (req,res,) => {
    res.send('login berhasil')
}

const authRegister = (req,res) => {
    res.send('register berhasil')
} 

module.exports = { authLogin, authRegister }