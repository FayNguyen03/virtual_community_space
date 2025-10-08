import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const Event = (props) => {
    const [dateObject, setDateObject] = useState([]);
    const [time, setTime] = useState([])
    const [remaining, setRemaining] = useState([])
    const dates = new Date();
    
    useEffect(() => {
        if (!props.time) return
        if (!props.date) return
        (async () => {
           
            try {
                const [hour, minute, second] = props.time.split(":");
                var dateObject = new Date(props.date);
                dateObject.setHours(hour, minute, second);
                setDateObject(dateObject);
            }
            catch (error) {
                console.error(error)
            }
        }) ()
    }, [props.date, props.time])

    useEffect(() => {
        if (!dateObject) {
            setTime('');
            return;
        }
        try {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            setTime(dateObject.toLocaleString('en-CA', options));
        } catch (err) {
            console.error('Error formatting time', err);
            setTime('');
        }
    }, [dateObject]);

    useEffect(() => {
        if (!dateObject) {
            setRemaining('');
            return;
        }

        const formatRemaining = (ms) => {
            if (ms <= 0) return 'Started';
            const totalSec = Math.floor(ms / 1000);
            const days = Math.floor(totalSec / 86400);
            const hours = Math.floor((totalSec % 86400) / 3600);
            const minutes = Math.floor((totalSec % 3600) / 60);
            const seconds = totalSec % 60;
            const parts = [];
            if (days) parts.push(`${days}d`);
            if (hours) parts.push(`${hours}h`);
            if (minutes) parts.push(`${minutes}m`);
            parts.push(`${seconds}s`);
            return parts.join(' ');
        };

        const tick = () => {
            const diff = dateObject - Date.now();
            setRemaining(formatRemaining(diff));
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [dateObject]);

    const isUpcoming = dateObject ? (dateObject- Date.now() > 0) : false;

    return (
        <article className='event-information'>
            <img src={props.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.event}</h3>
                    <h4>{props.artist}</h4>
                    <p>{isUpcoming ? <i className="fa-regular fa-calendar fa-bounce"></i> : <i className="fa-regular fa-x fa-beat"></i>}{time}</p>
                    <p id={`remaining-${props.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event