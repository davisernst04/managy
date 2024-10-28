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
    const [searchName, setSearchName] = useState('');

    // 1
    // Fetch events when the sort order changes
    useEffect(() => {
        fetchEvents();
    }, [sortOrder]);

    // Be able to display all events (sorted or not)
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

    // 2
    // Display events with keyword typed or searched by user
    const searchEventByName = async () => {
        setLoading(true);
        try {
            // CONNECT TO BACK
            const response = await api.get(`/api/get_event_name/${searchName}`);
            if (response.status === 200) {
                 setEvents(response.data);
            } else { setError('Failed to fetch events'); }
        } catch (err) {
            setError('Error fetching events: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterEventsByDate = async () => {
        setLoading(true);
        try {
            // CONNECT TO BACK
            const response = await api.get(`/api/filter_event_date/${startDate.toISOString()}/${endDate.toISOString()}`);
            if (response.status === 200) {
                 setEvents(response.data);
            } else { setError('Failed to fetch events'); }
        } catch (err) {
            setError('Error fetching events: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

}
export default ViewAllEvents;
