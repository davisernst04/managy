'use client';

// as per Form.jsx
import { useState } from "react";
import api from "../../api.js";
import "./createEvent.css";
import LoadingIndicator from "@/components/LoadingIndicator.jsx";

// logout/page.jsx
import { navigate } from "@/components/actions";

// defines a functional component named `CreateEvent`.
function CreateEvent() {
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log([eventName, eventID, eventDate, eventTime, eventLocation, eventDescription])
            const res = await api.post("api/event/create/", {
                name: eventName,
                date: eventDate,
                location: eventLocation,
                time: eventTime,
                description: eventDescription,
            });

            let result;
            result = res.data;
            console.log(result.message);
            console.log(result.id);

            // If event creation successful, show an alert and navigates to the events page? or specific view page maybe
            if (res.status === 201) {
                alert("Event created successfully!");
                //display ID number in alert
                navigate("/events");
            } else {
                alert("Failed to create event");
            }
        } catch (error) {
            alert("Error creating event: " + error.message);
        } finally { // reset the loading state
            setLoading(false);
        }
    };

    return (
        <div className="bg-container">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>Create New Event</h1>

                <input
                    className="form-input"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Event Name"
                    required // input field must be filled out before the form can be submitted
                />

                <input
                    className="form-input"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                />

                <input
                    className="form-input"
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    required
                />

                <input
                    className="form-input"
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Event Location"
                    required
                />

                <textarea
                    className="form-input"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Event Description"
                    required
                />

                {loading && <LoadingIndicator/>}
                <button className="form-button" type="submit">
                    Create Event
                </button>
            </form>
        </div>
    );
}

export default CreateEvent;
// tailwind version
/*
return (
        <div className="bg-container fixed inset-0 flex items-center justify-center bg-center bg-no-repeat bg-cover p-0 m-0">
            <form onSubmit={handleSubmit} className="bg-white bg-opacity-85 p-10 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-4xl font-bold mb-5 text-white text-shadow">Create New Event</h1>

                <input
                    className="w-full p-3 mb-5 border border-gray-300 rounded-md text-lg"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Event Name"
                    required
                />

                <input
                    className="w-full p-3 mb-5 border border-gray-300 rounded-md text-lg"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                />

                <textarea
                    className="w-full p-3 mb-5 border border-gray-300 rounded-md text-lg h-24 resize-none"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Event Description"
                    required
                />

                {loading && <LoadingIndicator />}
                <button className="w-full bg-blue-500 text-white py-3 px-5 rounded-md text-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300" type="submit">
                    Create Event
                </button>
            </form>
        </div>
    );
}
 */
