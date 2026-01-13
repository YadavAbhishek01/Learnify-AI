import React from "react";
import { Bell, Menu } from "lucide-react"; // Using lucide-react for icons
import { useContext } from "react";
import { Authcontext } from "../context/Authcontext";

const Navbar = ({setOpen}) => {
  const {authUser}=useContext(Authcontext);
  return (
    <nav className="w-full bg-white shadow-md px-4 md:px-6 py-3 flex items-center justify-end">
  
  {/* Left: Mobile Menu Icon */}
  <button  className="md:hidden p-2 rounded-lg hover:bg-gray-100"  onClick={() => setOpen(true)}>
    <Menu className="w-6 h-6 text-gray-700"  />
  </button>

  {/* Right side: Notifications & Profile */}
  <div className="flex items-center gap-4">
    
    {/* Notification */}
    <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
      <Bell className="w-5 h-5 text-gray-600" />
      <span className="absolute top-0 right-0 block w-2 h-2 bg-green-500 rounded-full ring-1 ring-white"></span>
    </button>

    {/* Profile */}
    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1 cursor-pointer hover:shadow-md transition">
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
        {authUser.name.charAt(0).toUpperCase()}
      </div>
      <div className="hidden sm:flex flex-col">
        <span className="text-sm font-medium text-gray-900">
          {authUser.name}
        </span>
        <span className="text-xs text-gray-500">
          {authUser.email}
        </span>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
