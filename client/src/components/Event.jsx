import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const Event = (props) => {

    const [time, setTime] = useState([])
    const [remaining, setRemaining] = useState([])

     useEffect(() => {
        if (!props.time) return
        (async () => {
            try {
                const result = await dates.formatTime(props.time)
                setTime(result)
            }
            catch (error) {
                console.error(error)
            }
        }) ()
    }, [props.time])

    useEffect(() => {
        // compute remaining based on date/time (adjust arguments to match your helper)
        if (!props.date) return
        (async () => {
            try {
                const timeRemaining = await dates.formatRemainingTime(props.date, props.time)
                setRemaining(timeRemaining)
                // call with the computed value, not the stale state
                dates.formatNegativeTimeRemaining(timeRemaining, props.id)
            }
            catch (error) {
                console.error(error)
            }
        }) ()
    }, [props.date, props.time, props.id])

    return (
        <article className='event-information'>
            <img src={props.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.event}</h3>
                    <h4>{props.artist}</h4>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {props.date} <br /> {time}</p>
                    <p id={`remaining-${props.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event