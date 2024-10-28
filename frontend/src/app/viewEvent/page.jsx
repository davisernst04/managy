'use client'

//import api from '../../api.js';
import { useState, useEffect } from 'react';
import { navigate } from '@/components/actions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // DatePicker's CSS
import Image from 'next/image';

/* Three features: being able to display all events (sorted or not),
                   search for a specific event by name,
                   and pick a range which events are shown */

function ViewAllEvents() {
    // variables
    const [events, setEvents] = useState([]);   // Holds the events
    const [sortOrder, setSortOrder] = useState(0);  // 0 = Random, 1 = Ascending, 2 = Descending
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            // CONNECT TO BACK
            const response = await api.get(`/api/get_event/${sortOrder}`);
            if (response.status === 200) {
                 setEvents(response.data);
             } else { setError('Failed to fetch events');}
        } catch (err) {
            setError('There was an error fetching evnts: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
}
export default ViewAllEvents;
