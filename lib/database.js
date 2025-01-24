import initSqlJs from 'sql.js/dist/sql-wasm.js';
import sqlWasm from 'sql.js/dist/sql-wasm.wasm?url';

let db;

export async function connectToDatabase() {
  if (!db) {
    const SQL = await initSqlJs({
      locateFile: () => sqlWasm
    });
    db = new SQL.Database();
    
    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS breedCache (
        breed TEXT PRIMARY KEY,
        data TEXT,
        timestamp DATETIME
      );
    `);
  }
  
  return {
    db,
    client: db
  };
}
