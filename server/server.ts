import express from "express";
import pg from "pg";

const postgresql = new pg.Pool({
    user: "postgres",
    database: "norway_data",
});


const app = express();

app.get("/api/kommuner", (req,res) => {
    console.log("Lets go!");
});

app.listen(3000);
