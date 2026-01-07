import React, { useContext } from "react";
import { Grid, FileText, Book, User, LogOut } from "lucide-react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

const Sidebar = () => {
  const navigate=useNavigate()
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Grid className="w-5 h-5" /> },
    { name: "Documents", path: "/documents", icon: <FileText className="w-5 h-5" /> },
    { name: "Flashcards", path: "/flashcards", icon: <Book className="w-5 h-5" /> },

  ];
   const location = useLocation();
  const {logoutUser}=useContext(Authcontext)

  const isProfileActive = location.pathname === "/profile";
  const {pdfid}=useParams();
  console.log("Sidevar",pdfid)
  return (
    <div className="w-60 bg-white h-screen shadow-md p-6 flex flex-col justify-between">
      {/* Top Section: Logo + Menu */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10  rounded-full flex items-center justify-center text-white font-bold">
            <img src="https://img.icons8.com/color/480/electronic-brain.png" alt="" />
          </div>
          <span className="text-lg font-semibold text-gray-900">
            Learnify AI
          </span>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                  isActive
                    ? "bg-linear-to-l from-green-500 to-green-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              {item.name}
              
            </NavLink>
          
          ))}
        </div>
      </div>

      {/* Bottom Section: Logout */}
      <div>
         <button
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium w-full transition ${
          isProfileActive
            ? "bg-linear-to-l from-green-500 to-green-600 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`}
          onClick={() => navigate('profile')}
        >
          <User className="w-5 h-5" />
            Profile
        </button>
        <button
          className={"flex items-center gap-3 px-4 py-3 rounded-xl font-medium w-full transition text-gray-700 hover:bg-gray-100" }
          onClick={() =>logoutUser()}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>  
      </div>
    </div>
  );
};

export default Sidebar;
