import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'

const Events = () => {
    const [locationId, setLocationId] = useState(0);
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);


    useEffect(() => {
        (async() =>{
            try{
                const eventsData = await EventsAPI.getAllEvents();
                setEvents(eventsData);
            }
            catch(error){
                throw error;
            }
        })()
    }, []);
    
    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations();
                setLocations(locationsData);
            }
            catch (error) {
                throw error
            }
        })()
    }, []);

    useEffect(() => {
        setFilteredEvents(locationId !== 0
            ? events.filter(event => Number(event.locationid) === Number(locationId))
            : events
            )
        console.log(locationId)}, [locationId, events]);

    return (
        <div>
            <select
                name="select"
                aria-label="Select"
                value={locationId}
                onChange={(e) => {setLocationId(Number(e.target.value))}}
                required
            >
                <option value={0}>All locations</option>
                {locations && locations.length > 0 ? (
                    locations.map(location =>
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    )
                ) : null}
            </select>

            <main style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', alignItems: 'start' }}>
                {
                    filteredEvents && filteredEvents.length > 0 ? filteredEvents
                        .map(event =>
                            <Event
                                key={event.id}
                                id={event.id}
                                event={event.event}
                                artist={event.artist}
                                date={event.date}
                                time={event.time}
                                image={event.img}
                                locationId={event.locationId}
                            />
                        ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default Events;
