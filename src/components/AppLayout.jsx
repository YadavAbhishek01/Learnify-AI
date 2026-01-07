import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar/>

      <main className="flex-1">
        {/* Navbar */}
        <Navbar/>

        {children}
      </main>
    </div>
  );
};

export default AppLayout;
