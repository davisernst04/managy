'use client';

import api from "../api";
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import "../styles/Home.css"

function Home() {
    const scrollToInfo = () => {
        const infoSection = document.getElementById('info-section')
        infoSection?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-8">
                <Image
                    src="/images/house.png"
                    alt="Logo"
                    width={512}
                    height={512}
                    className="rounded-full"
                />
                <h1 className="text-4xl font-bold text-center"> Managy </h1>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Register</Link>
                    </Button>
                    <Button variant="outline" onClick={scrollToInfo}>
                        Learn More
                    </Button>
                </div>
            </main>
            <section id="info-section" className="bg-muted py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Information</h2>
                    <p className="text-lg text-center max-w-2xl mx-auto">
                        Managy is a web platform that serves as a booking system for hospitality venues (hotels,
                        resorts, clubhouses, and community centres). Its features are User authentication and the
                        Creation, Retainment, Updating and Deletion of the entity or space that will be booked.
                        Smaller businesses or establishments would need an automated system to input, retain and remove
                        information. Indeed, what is currently available mostly uses google sheets, etc. Our platform
                        would make the process automatic without a third person (ei. Receptionist) to input the
                        information. Finally, our main stakeholder is the Clubhouse Avatar. Potentially: Lakewood Civic
                        Centre and Resident Services Usask.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Home;