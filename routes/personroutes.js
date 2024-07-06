const express = require("express");
const router = express.Router();

const person = require('./../models/person');



router.post("/", async(req, res) => {
try{
    const data = req.body;

    const newperson = new person(data);
    const respones = await newperson.save();
    console.log("data was fetched");
    res.status(200).json(respones);

}catch(err){
    console.log(err);
    res.send(500).json("internal server error");
}

});


router.get("/", async (req, res) => {
    try {
      const data = await person.find();
      console.log("data is fetched");
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: "intrnal server srror"});
  
    }
  });

  
router.get("/:workType", async(req, res) => {
    try{
  
      const workType = req.params.workType;
      if(workType == "chef" || workType == "waiter" || workType == "manager" ){
        const response = await person.find({work: workType});
        console.log("data is fetched");
        res.status(200).json(response);
      }else{
        res.status(404).json("data not found");
      }
    }catch(err){
      console.log(err);
      res.status(500).json("internal server error");
    }
  });

  router.put("/:id", async (req,res) => {
    try{
      const personId = req.params.id;
      const updatedpersondata = req.body;

      const response = await person.findByIdAndUpdate(personId, updatedpersondata, {
        new: true,
        runValidators: true,
      })

      if(!response){
        res.status(404).json("data was not found");
      }else{
        console.log("data updated");
        res.status(200).json(response);
      }

    }catch(err){
      console.log(err);
      res.status(500).json("internal server error");
    }
  });

  router.delete("/:id", async (req, res) => {
    try{
      const personId = req.params.id;

      const response = await person.findByIdAndDelete(personId);

      if(!response){
        res.status(404).json("data was not found");
      }else{
        console.log("data delted");
        res.status(200).json({message: "person was deleted successfully"});
      }

    }catch(err){
      console.log(err);
      res.status(500).json("internal server error");
    }
  });

module.exports = router;