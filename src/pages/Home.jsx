// import { useContext, useState } from "react";
// import { BookContext } from "../context/BookContext";
// import BookCard from "../components/BookCard";

// function Home() {
//   const { books, loading } = useContext(BookContext);
//   const [search, setSearch] = useState("");
//   console.log("BOOKS:", books);
//   if (loading) {
//     return <h2>Loading books...</h2>;
//   }

//   const filteredBooks = books.filter((book) =>
//     book.title.toLowerCase().includes(search.toLowerCase())
//   );

//  return (
//   <div className="p-6">
//     <h1 className="text-3xl font-bold text-center mb-6">Home Page</h1>

//     <input
//       type="text"
//       placeholder="Search book..."
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//       className="w-full max-w-md mx-auto block p-2 border rounded-lg mb-6"
//     />

//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {filteredBooks.map((book) => (
//         <BookCard key={book.id} book={book} />
//       ))}
//     </div>
//   </div>
// );
// }

// export default Home;
import { useContext, useState } from "react";
import { BookContext } from "../context/BookContext";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";

function Home() {
  const { books, loading } = useContext(BookContext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | read | unread

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading your library…</p>
        </div>
      </div>
    );
  }

  const filteredBooks = books
    .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => {
      if (filter === "read") return b.isRead;
      if (filter === "unread") return !b.isRead;
      return true;
    });

  const readCount = books.filter((b) => b.isRead).length;
  const unreadCount = books.length - readCount;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">My Library</h1>
          <p className="text-slate-400 mt-1 text-sm">Manage and track your reading progress</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Books", value: books.length, color: "text-indigo-400" },
            { label: "Read", value: readCount, color: "text-emerald-400" },
            { label: "Unread", value: unreadCount, color: "text-rose-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-800/60 border border-slate-700/50 rounded-xl px-5 py-4"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-slate-400 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by title…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500
                text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-slate-800 border border-slate-700 rounded-lg p-1 gap-1 text-sm">
            {["all", "read", "unread"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md font-medium capitalize transition-all ${
                  filter === f
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 text-2xl">
              📭
            </div>
            <p className="text-slate-300 font-medium">No books found</p>
            <p className="text-slate-500 text-sm mt-1">Try a different search or add a new book</p>
            <Link
              to="/add-book"
              className="mt-5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              + Add Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;