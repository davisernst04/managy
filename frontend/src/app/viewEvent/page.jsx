'use client'

import api from '../../api.js';
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
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
            setError('There was an error fetching events: ' + err.message);
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
            setError('There was an error fetching events: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // 3
    // allows user to select a start and end date range to display events in that range
    const filterEventsByDate = async () => {
        if (!startDate || !endDate) {
            alert('Please select a start and end date');
            return;
        }
        setLoading(true);
        try {
            // CONNECT TO BACK
            const response = await api.get(`/api/filter_event_date/${startDate.toISOString()}/${endDate.toISOString()}`);
            if (response.status === 200) {
                 setEvents(response.data);
            } else { setError('Failed to fetch events'); }
        } catch (err) {
            setError('There was an error fetching events: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex flex-col bg-white text-black">
            <main className="flex-grow flex flex-col items-center justify-start p-4 space-y-8 overflow-y-auto">
                <Image
                    src="/images/house.png"
                    alt="Logo"
                    width={200}
                    height={200}
                    priority
                    >
                </Image>
            </main>
        </div>
    );
}
export default ViewAllEvents;
