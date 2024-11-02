"use client";

import Link from 'next/link';
import './welcome.css';

function WelcomePage() {
    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Welcome to Managy</h1>
            <p className="welcome-text">Choose a section to continue:</p>
            <div className="button-container">
                <Link href="/createAmenity">
                    <button className="welcome-button">Amenities</button>
                    </Link>
                <Link href="/events">
                    <button className="welcome-button">Events</button>
                </Link>
            </div>
        </div>
    );
}

export default WelcomePage;
