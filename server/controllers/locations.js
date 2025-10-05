import { pool } from "../config/database.js";

//GET /locations
const getAllLocations = async (req, res) =>{
    try{
        const results = await pool.query("SELECT * FROM locations ORDER BY id ASC");
        res.status(200).json(results.rows); 
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
};

//GET /locations/:id
const getLocationById = async (req, res) =>{
    try{
        const selectionQuery = "SELECT * FROM locations WHERE id = $1";
        const locationId = req.params.id;
        const results = await pool.query(selectionQuery, [locationId]);
        res.status(200).json(results.rows[0]); 
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
};

export default {getAllLocations, getLocationById};