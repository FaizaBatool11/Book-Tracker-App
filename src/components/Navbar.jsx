// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
//       <h2 className="text-xl font-bold">📚 Book Tracker</h2>

//       <div className="flex gap-6">
//         <Link className="hover:text-blue-400 transition" to="/">
//           Home
//         </Link>
//         <Link className="hover:text-blue-400 transition" to="/add-book">
//           Add Book
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navLink = (to, label) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
            : "text-slate-300 hover:text-white hover:bg-slate-700/60"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:bg-indigo-500 transition-colors">
            <span className="text-sm">📚</span>
          </div>
          <div>
            <span className="text-white font-bold text-base tracking-tight">BookTracker</span>
            <span className="hidden sm:inline text-indigo-400 text-xs ml-1 font-medium">Pro</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLink("/", "Library")}
          {navLink("/add-book", "+ Add Book")}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;