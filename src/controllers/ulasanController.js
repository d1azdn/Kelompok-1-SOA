const express = require("express")
const db = require("../db")

const getAllUlasan = (req, res) => {
    const sql = `SELECT * FROM ulasan`;
        db.query(sql, (err, results) => {
        if (err) {
        return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
}

module.exports = { getAllUlasan }