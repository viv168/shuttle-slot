const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "data.db");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS user (
        email TEXT PRIMARY KEY,
        pwd_hash TEXT,
        first_name TEXT,
        last_name TEXT,
        balance INTEGER DEFAULT 1000
    )`);


	db.run(`CREATE TABLE IF NOT EXISTS court (
        court_no INTEGER PRIMARY KEY,
        name TEXT,
        location TEXT
    )`);

	const courtValues = [
		[1, "Court A", "Indoor Hall"],
		[2, "Court B", "Outdoor Field"]
	];

	const courtInsertSql = `INSERT INTO court(court_no, name, location) VALUES (?, ?, ?)`;
	courtValues.forEach((values) => {
		db.run(courtInsertSql, values, (err) => {
			if (err) {
				console.error("Error inserting court:", err);
			}
		});
	});

	db.run(`CREATE TABLE IF NOT EXISTS booking (
        booking_id INTEGER PRIMARY KEY,
        email TEXT,
        booking_dt TEXT,
        slot_date TEXT,
        slot_hour INTEGER,
        court INTEGER,
        hours INTEGER,
        FOREIGN KEY (email) REFERENCES user(email),
        FOREIGN KEY (court) REFERENCES court(court_no)
    )`);


	db.close((err) => {
		if (err) {
			return console.error("Error closing database connection:", err.message);
		}
		console.log("Closed the database connection.");
	});
});
