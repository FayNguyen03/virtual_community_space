import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'

const Events = () => {

    const [events, setEvents] = useState([]);
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
  return (
      <div>
        <main style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', alignItems: 'start' }}>
              {
                  events && events.length > 0 ? events
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
