import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
   const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar  open={open} setOpen={setOpen}/>

      <main className="flex-1">
        {/* Navbar */}
        <Navbar  setOpen={setOpen} />

        {children}
      </main>
    </div>
  );
};

export default AppLayout;
