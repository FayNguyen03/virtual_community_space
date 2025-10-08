import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'
import LocationsAPI from '../services/LocationsAPI'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async() =>{
            try{
                const locationData = await LocationsAPI.getLocationById(index);
                setLocation(locationData);
            }
            catch(error){
                throw error;
            }
        }
        )()
    }, [index]);

    useEffect(() => {
        (async() =>{
            try{
                const eventsData = await EventsAPI.getAllEvents();
                setEvents(eventsData);
            }
            catch(error){
                throw error;
            }
        }
        )()
    }, []);
    console.log(events.filter((event) => Number(event.locationid) === Number(index)));
    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.img} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>Address: {location.address}, {location.city}, {location.state} {location.zip}</p>
                    <p>Capacity: {location.capacity}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events
                        .filter((event) => Number(event.locationid) === index)
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

export default LocationEvents