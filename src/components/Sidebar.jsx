import React, { useContext } from "react";
import { Grid, FileText, Book, User, LogOut, X } from "lucide-react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

const Sidebar = ({open, setOpen }) => {
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

  return (
    <>
     {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
      <div
  className={`
    fixed md:static
    inset-y-0 left-0 z-40
    w-60 bg-white h-100vh
    shadow-md p-6
    flex flex-col justify-between
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>

  {/* Top Section */}
  <div>
    {/* Logo + Menu Icon */}
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-2" onClick={()=>navigate('/dashboard')}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <img
            src="https://img.icons8.com/color/480/electronic-brain.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-lg font-semibold text-gray-900">
          Learnify AI
        </span>
      </div>

      {/* Mobile Menu Icon */}
      <X color="#121112"
        className="block md:hidden cursor-pointer"
     onClick={() => setOpen(false)}  />
    </div>

    {/* Menu Items */}
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
          <span className="truncate">{item.name}</span>
        </NavLink>
          
      ))}
    </div>
  </div>

  {/* Bottom Section */}
  <div className="space-y-2">
    <button
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium w-full transition ${
        isProfileActive
          ? "bg-linear-to-l from-green-500 to-green-600 text-white shadow-md"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => navigate("profile")}
    >
      <User className="w-5 h-5" />
      Profile
    </button>

    <button
      className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium w-full transition text-gray-700 hover:bg-gray-100"
      onClick={() => logoutUser()}
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  </div>
</div>

    </>
  );
};

export default Sidebar;
