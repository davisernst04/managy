'use client'

import { useState, useEffect } from 'react';
import api from '../../api.js';
import Image from 'next/image';

function EventReminder({ eventId }) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
}
export default EventReminder;