import dotenv from "dotenv";
dotenv.config();

import express from 'express'
const app=express();
import mysql from 'mysql2/promise';
import crypto from "crypto";

const connection=await mysql.createConnection({
host:process.env.DB_HOST,
user:process.env.DB_USER,
database:process.env.DB_NAME,  
password:process.env.DB_PASSWORD

})

try{
    const [results,fields]=await connection.query('SELECT * FROM school');
}
catch(err){
    console.log(err);
}

app.use(express.json())

const validateData=(req,res,next)=>{
    let {name,address,latitude,longitude}=req.body;

    if(!name||!address||latitude===undefined||longitude===undefined){
        return res.status(400).json({message:"All fields are required"});
    }

    if(typeof name!=="string"||typeof address!=="string"){
        return res.status(400).json({message:"Name and address must be text"})
    }

    if(isNaN(latitude)||isNaN(longitude)){
        return res.status(400).json({message:"Latitude and Longitude must be numbers"})
    }
        
    next();
}
app.post('/addSchool',validateData,async (req,res)=>{
    try{
        let {name,address,latitude,longitude}=req.body;
        const id = crypto.randomUUID();
        const query=`INSERT INTO school (id,name,address,latitude,longitude) VALUES (?,?,?,?,?)`;
        
        const [results]=await connection.query(query,[id, name, address, latitude, longitude]);
        console.log(results);
        res.json({message:"School added succesfully"});
    }
    catch(err){
        console.log(err);
    }
})

app.get("/listSchools", async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

     if (!userLat || !userLon) {
        return res.status(400).json({
        message: "Latitude and Longitude are required as query parameters"
    });
    }

    const [schools] = await connection.query("SELECT * FROM school");

    const schoolsWithDistance = schools.map((school) => {

      const dx = userLat - school.latitude;
      const dy = userLon - school.longitude;

      const distance = Math.sqrt(dx * dx + dy * dy);

      return {
        ...school,
        distance
      };

    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

app.listen(3000,()=>{
    console.log('Sever started at http://localhost:3000🚀');
});



