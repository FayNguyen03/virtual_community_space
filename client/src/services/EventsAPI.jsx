import React, {useState, useEffect} from "react"

const getAllEvents = async () => {
    try {
        const response = await fetch("/eventsData");
        if (!response.ok) throw new Error(`Failed to fetch events: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error("getAllEvents error", err);
        throw err;
    }
};


const getEventById = async (id) => {
    if (id == null) throw new Error("getEventsById requires an id");

    const idNum = Number(id);
    if (!Number.isInteger(idNum) || idNum <= 0) throw new Error("Invalid id");

    const safeId = encodeURIComponent(id);
    try {
        const response = await fetch(`/eventsData/${safeId}`);
        if (response.status === 404) return null; 
        if (!response.ok) throw new Error(`Failed to fetch event ${id}: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error("getEventsById error", err);
        throw err;
    }
};

export const EventsAPI = { getAllEvents, getEventById };

export default EventsAPI;

