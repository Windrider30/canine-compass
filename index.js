const Database = require('better-sqlite3');
    const db = new Database('mydb.sqlite');

    // Create table
    db.prepare(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        value TEXT
      )
    `).run();

    // Insert sample data
    const insert = db.prepare('INSERT INTO items (name, value) VALUES (?, ?)');
    insert.run('test', '123');

    // Query data
    const rows = db.prepare('SELECT * FROM items').all();
    console.log(rows);
