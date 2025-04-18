const express = require("express")
require('dotenv').config();
const { db, client } = require("../db")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const z = require('zod')
const { createId } = require("@paralleldrive/cuid2")

const getUserCache = async (req,res) => {
    res.send('halo')
    // const { userId } = req.params

    // try{
    //     const checkSession = await client.get(`session_user:${userId}`)
    //     if (!checkSession){
    //         return res.status(404).json({
    //             message:'Session tidak ditemukan'
    //         })
    //     }
    //     return res.status(200).json({ session: JSON.parse(session) });
    // } catch (err){
    //     return res.status(500).json({
    //         message:'Internal server error'
    //     })
    // }
}

const postUserCache = async (req,res) => {
    res.send('halo')
    // const { userId } = req.params
    // const key = `session_user:${userId}`

    // try{
    //     await client.hSet(key, {
    //         user_id: user.user_id,
    //         nama: user.nama,
    //         alamat: user.alamat,
    //         no_telp: user.no_telp,
    //         login_time: new Date().toISOString(),
    //     })
        
    // } catch (err){
    //     return res.status(500).json({
    //         message:'Internal server error'
    //     })
    // }
}

const deleteUserCache = (req,res) => {
    res.send('halo')
}

module.exports = { getUserCache, postUserCache, deleteUserCache }