import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_ID,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
});

export default db;
