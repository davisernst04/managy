'use client';

import Image from 'next/image'
import {navigate} from "@/components/actions";

function Home() {
    const scrollToInfo = () => {
        const infoSection = document.getElementById('info-section')
        infoSection?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleButtonRegs = async (e) => {
        e.preventDefault();
        try {
            navigate("/register");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleButtonLogin = async (e) => {
        e.preventDefault();
        try {
            navigate("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-black">
            <main className="h-screen flex flex-col items-center justify-center p-4 space-y-8 overflow-y-auto">
                <Image
                    src="/images/house.png"
                    alt="Logo"
                    width={450}
                    height={450}
                    priority
                />
                <h1 className="text-5xl font-bold text-center"> Managy </h1>
                <div className="flex flex-wrap justify-center gap-4 text-black font-bold">

                    <button className="mt-4 px-4 py-2 bg-orange-100 rounded hover:bg-orange-900"
                            onClick={handleButtonLogin}>
                        Login
                    </button>
                    <button className="mt-4 px-4 py-2 bg-orange-100 rounded hover:bg-orange-900"
                            onClick={handleButtonRegs}>
                        Register
                    </button>
                    <button className="mt-4 px-4 py-2 bg-orange-100 rounded hover:bg-orange-900"
                            onClick={scrollToInfo}>
                        Learn More
                    </button>

                </div>
            </main>
            <section id="info-section" className="bg-muted py-16 bg-orange-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold mb-6 text-center">Information</h2>
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

/*function Home() {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-blue-600">Tailwind CSS is working!</h1>
          <p className="mt-4 text-center text-gray-700">
            This is a simple test page to check if Tailwind CSS is properly set up in your Next.js application.
          </p>
          <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Test Button
          </button>
        </div>
      </div>
  );
};

export default Home;*/


/*export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.jsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}*/
