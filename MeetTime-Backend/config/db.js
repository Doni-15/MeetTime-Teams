import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL, 

    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false 
    } : false
});

pool.on("connect", () => {
    console.log("Connected to the database");
});

pool.on("error", (err) => {
    console.error("Database erro", err);
});

export default pool;