"use client";
import Image from "next/image";
import { navigate } from "./actions";
import { useState } from "react";

const WorkerHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleHeaderText = async (e) => {
    e.preventDefault();
    try {
      navigate("/worker");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      navigate("/logout");
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-orange-500 text-white relative border-b-8 border-black">
        <button className="text-4xl text-center" onClick={handleHeaderText}>
          Managy Worker Panel
        </button>

        <div className="relative">
          <button
            className="border-4 p-2 rounded hover:bg-gray-800"
            onClick={toggleDropdown}
          >
            <Image
              src="/images/menu.png"
              alt="menu"
              width={40}
              height={40}
              priority
            />
          </button>

          {isDropdownOpen && (
            <button onClick={handleLogout} className="block  absolute right-0 bg-white rounded shadow-lg z-10 px-10 py-2 text-gray-800 hover:bg-gray-200">
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default WorkerHeader;
