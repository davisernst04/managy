'use client'

import api from '@/api.js';
import { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css"; // DatePicker's CSS
import Image from 'next/image';
import DatePicker from "react-datepicker";

/* Three features: being able to display all events (sorted or not),
                   search for a specific event by name,
                   and pick a range which events are shown */

const api_sort = "/api/event/get_event/";
const api_eventName = "/api/event/get_event_name/"
const api_eventdate = "/api/event/filter_event_date/"

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


    const getEventsSort = () => {
        api
            .get(api_sort+`${sortOrder}/`)
            .then((res) => res.data)
            .then((data) => {
                setEvents(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    // Be able to display all events (sorted or not)
    const fetchEvents = async () => {
        setLoading(true);

        try {
            await getEventsSort();
        } catch (err) {
            setError('There was an error fetching events: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // 2
    // Display events with keyword typed or searched by user

    const getEventsName = () => {
        api
            .get(api_eventName+`${searchName}/`)
            .then((res) => res.data)
            .then((data) => {
                setEvents(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const searchEventByName = async () => {
        setLoading(true);
        try {
            await getEventsName();
        } catch (err) {
            setError('There was an error fetching events: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // 3
    // allows user to select a start and end date range to display events in that range
    const getEventsDate = () => {
        api
            .get(api_eventdate+`${startDate.toISOString()}/${endDate.toISOString()}/`)
            .then((res) => res.data)
            .then((data) => {
                setEvents(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const filterEventsByDate = async () => {
        if (!startDate || !endDate) {
            alert('Please select a start and end date');
            return;
        }
        setLoading(true);
        try {
            await getEventsDate();
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
                <h1 className="text-5xl font-bold text-center">View All Events</h1>


                <div className="w-full max-w-4xl space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Search by Name</h2>
                        <div className="flex">
                            <input
                                type="text"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder="Enter event name"
                                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button
                                onClick={searchEventByName}
                                className="px-4 py-2 bg-orange-100 text-black font-bold rounded-r-md hover:bg-orange-900 hover:text-white transition duration-300"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Filter by Date Range</h2>
                        <div className="flex space-x-4 mb-4">
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Start Date"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="End Date"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <button
                            onClick={filterEventsByDate}
                            className="w-full px-4 py-2 bg-orange-100 text-black font-bold rounded-md hover:bg-orange-900 hover:text-white transition duration-300"
                        >
                            Apply Date Filter
                        </button>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Sort Events</h2>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value={0}>Random</option>
                            <option value={1}>Ascending Date</option>
                            <option value={2}>Descending Date</option>
                        </select>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Events</h2>
                        {loading ? (
                            <p className="text-center">Loading...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
                        ) : events.length === 0 ? (
                            <p className="text-center text-gray-600">There does not seem to be any events that match the
                                criteria.</p>
                        ) : (
                            <ul className="space-y-4">
                                {events.map((event) => (
                                    <li key={event.id} className="bg-orange-100 p-4 rounded-md shadow">
                                        <h3 className="text-xl font-semibold">{event.name}</h3>
                                        <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                                        <p className="mt-2">{event.description}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ViewAllEvents;
