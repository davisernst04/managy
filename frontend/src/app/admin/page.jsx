"use client";
import Image from "next/image";
import { withAuth } from "@/components/withAuth.jsx";
import { navigate } from "@/components/actions";

const Admin = () => {
  const handleManageUsers = async (e) => {
    e.preventDefault();
    try {
      navigate("/admin/manage-users");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleManageAmenities = async (e) => {
    e.preventDefault();
    try {
      navigate("/admin/manage-amenities");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleManageEvents = async (e) => {
    e.preventDefault();
    try {
      navigate("/admin/manage-events");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-4xl text-center">Managy Administration</h1>
        <button className="border-4 p-2 rounded hover:bg-gray-700">
          <Image
            src="/images/menu.png"
            alt="menu"
            width={40}
            height={40}
            priority
          />
        </button>
      </header>
      <main className="flex flex-grow items-center justify-center p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
          <button
            onClick={handleManageUsers}
            className="flex flex-col items-center border-4 border-black p-4 shadow-xl bg-orange-100 rounded h-80 transition duration-300 ease-in-out transform hover:bg-orange-200 hover:scale-105"
          >
            <Image
              src="/images/admin-user.png"
              alt="Manage Users"
              width={200}
              height={200}
              priority
              className="mb-4"
            />
            <span className="text-lg">Manage Users</span>
          </button>
          <button
            onClick={handleManageAmenities}
            className="flex flex-col items-center border-4 border-black p-4 shadow-xl bg-orange-100 rounded h-80 transition duration-300 ease-in-out transform hover:bg-orange-200 hover:scale-105"
          >
            <Image
              src="/images/amenity-manage.png"
              alt="Manage Amenities"
              width={200}
              height={200}
              priority
              className="mb-4"
            />
            <span className="text-lg">Manage Amenities</span>
          </button>
          <button
            onClick={handleManageEvents}
            className="flex flex-col items-center border-4 border-black p-4 shadow-xl bg-orange-100 rounded h-80 transition duration-300 ease-in-out transform hover:bg-orange-200 hover:scale-105"
          >
            <Image
              src="/images/AdminEvent.png"
              alt="Manage Events"
              width={200}
              height={200}
              priority
              className="mb-4"
            />
            <span className="text-lg">Manage Events</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default withAuth(Admin);
