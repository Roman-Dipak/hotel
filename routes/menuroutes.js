const express = require("express");
const router = express.Router();

const menu = require("./../models/menuItem");

router.post("/", async(req, res) => {
    try{
        const data = req.body;
        const newitem = await menu(data);
        const respones = await newitem.save();
        console.log("data is fetched");
        res.status(200).json(respones)

    }catch(err){
        console.log(err);
        res.status(500).json("internal server error");
    }
});

router.get("/", async(req, res) => {
    try{
    const data = await menu.find();
    console.log("data is fetched");
    res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json("internal server error");
    }
});

router.get("/:tasteItem", async (req, res) => {
    try{
        const taste = req.params.tasteItem;
        if( taste == "spicy" || taste == "sour" || taste == "sweet"){
            const respones = await menu.find({taste: taste});
            console.log("data is fetchedd");
            res.status(200).json(respones);
        }else{
            res.status(404).json("data is not found");
        }
    }catch(err){
        console.log(err);
        res.status(500).json("internal server error");
    }
})

module.exports = router;