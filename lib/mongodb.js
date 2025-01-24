// Rename this file to database.js
import sqlite from 'better-sqlite3';

const db = sqlite('caninecompass.db');

// Create tables if they don't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS breedCache (
    breed TEXT PRIMARY KEY,
    data TEXT,
    timestamp DATETIME
  )
`).run();

export async function connectToDatabase() {
  return {
    db,
    client: db
  };
}
