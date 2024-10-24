'use client'

import { useState, useEffect } from 'react';
import api from '../../api.js';
import { navigate } from '../../components/actions.js';
import './viewEvent.css';

export default function ViewEvent({ eventID }) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/api/events/${eventID}`);
                if (response.status === 200) {
                    setEvent(response.data);
                } else {
                    setError('Failed to fetch event');
                }
            } catch (err) {
                setError('Error fetching event: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventID]);

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!event) {
        return <div className="error-message">Event not found</div>;
    }

    return (
        <div className="bg-container">
            <div className="event-container">
                <h1>{event.name}</h1>
                <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="event-description">{event.description}</p>
                <button className="back-button" onClick={() => navigate('/events')}>
                    Back to Events
                </button>
            </div>
        </div>
    );
}