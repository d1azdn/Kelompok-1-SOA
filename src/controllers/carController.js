const mysql = require('mysql');
const express = require("express")
const db = require("../db")

const getAllCar = (req, res) => {
    console.log("halo")
    const sql = `SELECT * FROM mobil`;
        db.query(sql, (err, results) => {
        if (err) {
        return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
}

module.exports = { getAllCar }