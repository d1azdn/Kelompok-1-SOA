const express = require("express")
require('dotenv').config();
const { db, client } = require("../db")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const z = require('zod')
const { createId } = require("@paralleldrive/cuid2")

const getUserCache = async (req,res) => {
    const { userId } = req.params

    try{
        const checkSession = await client.hGetAll(`session_user:${userId}`)
        if (!checkSession){
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
    const { userId } = req.params
    const { nama, alamat, email, password, no_telepon } = req.body

    try{
        await client.hSet(`session_user:${userId}`, {
            user_id: userId,
            nama: nama,
            alamat: alamat,
            email: email,
            no_telepon: no_telepon,
            login_time: new Date().toISOString()
            });
        await client.expire(`session_user:${userId}`, 3600);
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
    const { userId } = req.params

    try{
        const checkSession = await client.del(`session_user:${userId}`)
        if (!checkSession){
            return res.status(404).json({
                message:'Session tidak ditemukan'
            })
        }
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