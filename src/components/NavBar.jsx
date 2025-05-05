import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Personal Training</h1>
        <div className="flex space-x-4">
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-600 px-3 py-1 rounded-md flex items-center gap-1"
                : "text-gray-700 hover:text-blue-600 px-3 py-1 flex items-center gap-1"
            }
          >
            <span></span>
            Customers
          </NavLink>
          <NavLink
            to="/trainings"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-600 px-3 py-1 rounded-md flex items-center gap-1"
                : "text-gray-700 hover:text-blue-600 px-3 py-1 flex items-center gap-1"
            }
          >
            <span></span>
            Trainings
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
