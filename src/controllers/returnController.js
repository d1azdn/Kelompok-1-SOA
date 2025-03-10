const express = require("express")
const db = require("../db")

const getAllReturn = (req, res) => {
    const sql = `SELECT * FROM return`;
        db.query(sql, (err, results) => {
        if (err) {
        return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
}

module.exports = { getAllReturn }