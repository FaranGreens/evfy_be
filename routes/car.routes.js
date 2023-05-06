const cars_route = require('express').Router();
const {getCars} = require("../controllers/car.controller");

cars_route.get("/", async(req, res)=>{
    try {
        const {q="", brand="", model="", color="", page=1, pagesize=5} = req.query;
        const {data, count, totalPages} = await getCars(q, brand, model, color, page, pagesize);
        return res.send({
            data, count, totalPages
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

module.exports = cars_route;