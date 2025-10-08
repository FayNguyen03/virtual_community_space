import { pool } from "./database.js";
import eventData from "../data/events.js";
import locationData from "../data/locations.js";
import "./dotenv.js";

const createLocationsTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS locations CASCADE;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            capacity INTEGER NOT NULL,
            img VARCHAR(255) NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('Locations table created successfully')
    }
    catch (err) {
        console.error('Errors creating locations table', err)
    };
};

const createEventsTable = async ()=> {
    const createTableQuery = `
        DROP TABLE IF EXISTS events CASCADE;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            event VARCHAR(255) NOT NULL,
            artist VARCHAR(100) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            img VARCHAR(255) NOT NULL,
            locationId SERIAL NOT NULL REFERENCES locations(id)
        );
    `;

    try {
        const res = await pool.query(createTableQuery)
        console.log('Events table created successfully')
    }
    catch (err) {
        console.error('Errors creating events table', err)
    };
};

const seedLocationsTable = async () => {
    await createLocationsTable();
    locationData.forEach((location) => {
        const insertQuery = {
            text: 'INSERT INTO locations (name, address, city, state, zip, capacity, img) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        };
        const values = [
            location.name,
            location.address,
            location.city,
            location.state,
            location.zip,
            location.capacity,
            location.img
        ];
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('Error: inserting location', err)
                return
            }

            console.log(`${location.name} added successfully`)
        });
    });

};

const seedEventsTable = async () => {
    await createEventsTable();
    eventData.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (event, artist, date, time, img, locationId) VALUES ($1, $2, $3, $4, $5, $6)'
        };
        const values = [
            event.event,  
            event.artist,
            new Date(event.date),
            event.time,
            event.img,
            event.locationId
        ];
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('Error: inserting event', err)
                return
            }

            console.log(`${event.event} added successfully`)
        });
    });

};

const main = async () => {
    try {
        await seedLocationsTable();  
        await seedEventsTable();  

    } catch (err) {
        console.error('Error seeding locations database', err)
    }
};

main();