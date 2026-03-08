import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from 'express'
const app=express();
import mysql from 'mysql2/promise';
import crypto from "crypto";

let connection;

// try {
//   connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
//   });

//   console.log("Connected to MySQL database");

// } catch (error) {
//   console.error("Database connection failed:", error.message);
// }


try {
  connection = await mysql.createConnection(process.env.MYSQL_URL);
  console.log("✅ Connected to MySQL database");
} catch (error) {
  console.error("❌ Database connection failed:", error);
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

app.get("/",(req,res)=>{
  res.send(`
      <h1>Welcome to School management Api</h1>
      <a href="https://educase-assignment.up.railway.app/listSchools?latitude=12.97&longitude=77.59">See Schools Around You</a>
    `)
})

app.post('/addSchool',validateData,async (req,res)=>{
    try{
        let {name,address,latitude,longitude}=req.body;
        const id = crypto.randomUUID();
        const query=`INSERT INTO schools (id,name,address,latitude,longitude) VALUES (?,?,?,?,?)`;
        
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

    if (isNaN(userLat) || isNaN(userLon))
        return res.status(400).json({
        message: "Latitude and Longitude are required as query parameters"
    });
    

    const [schools] = await connection.query("SELECT * FROM schools");

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});


