import React, {useState, useEffect} from "react"
const getAllLocations = async () => {
    try {
        const response = await fetch("/locationsData");
        if (!response.ok) throw new Error(`Failed to fetch locations: ${response.status}`);
        console.log((response))
        return await response.json();
    } catch (err) {
        console.error("getAllLocations error", err);
        throw err;
    }
}

const getLocationById = async (id) => {
    if (id == null) throw new Error("getLocationById requires an id");

    const idNum = Number(id);
    if (!Number.isInteger(idNum) || idNum <= 0) throw new Error("Invalid id");

    const safeId = encodeURIComponent(id);
    try {
        const response = await fetch(`/locationsData/${safeId}`);
        if (response.status === 404) return null; 
        if (!response.ok) throw new Error(`Failed to fetch location ${id}: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error("getEventById error", err);
        throw err;
    }
};

export const LocationsAPI = { getAllLocations, getLocationById};

export default LocationsAPI;

