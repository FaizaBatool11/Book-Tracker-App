// import { useContext } from "react";
// import { BookContext } from "../context/BookContext";
// import { Link } from "react-router-dom";
// function BookCard({ book }) {
//   const { toggleRead, deleteBook } = useContext(BookContext);

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition">

//       <img
//         src={book.coverImage}
//         className="w-full h-40 object-cover rounded-lg"
//       />

//       <h3 className="text-lg font-bold mt-3">{book.title}</h3>

//       <p className="text-gray-600">{book.author}</p>

//       <span
//         className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
//           book.isRead ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
//         }`}
//       >
//         {book.isRead ? "Read" : "Unread"}
//       </span>

//       <div className="flex gap-2 mt-4">
//         <Link
//           to={`/book/${book.id}`}
//           className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
//         >
//           View
//         </Link>

//         <button
//           onClick={() => toggleRead(book.id)}
//           className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
//         >
//           Toggle
//         </button>

//         <button
//           onClick={() => deleteBook(book.id)}
//           className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }
// export default BookCard;

import { useContext, useState } from "react";
import { BookContext } from "../context/BookContext";
import { Link } from "react-router-dom";

const genreColors = {
  Programming: "border-indigo-500",
  Fiction: "border-emerald-500",
  History: "border-amber-500",
  Science: "border-cyan-500",
  default: "border-slate-500",
};

// Local CSS fallback — no external request needed
function BookCover({ src, title, genre }) {
  const [failed, setFailed] = useState(!src || src.includes("via.placeholder.com"));

  const initial = title?.charAt(0)?.toUpperCase() || "B";

  const bgMap = {
    Programming: "#312e81",
    Fiction: "#064e3b",
    History: "#78350f",
    Science: "#164e63",
    default: "#1e1b4b",
  };
  const bg = bgMap[genre] || bgMap.default;

  if (failed) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 select-none"
        style={{ background: `linear-gradient(135deg, ${bg}, #0f172a)` }}
      >
        <span className="text-4xl font-black text-white/20">{initial}</span>
        <span className="text-xs text-white/40 px-3 text-center line-clamp-2 leading-tight">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
      onError={() => setFailed(true)}
    />
  );
}

function BookCard({ book }) {
  const { toggleRead, deleteBook } = useContext(BookContext);
  const accentBorder = genreColors[book.genre] || genreColors.default;

  return (
    <div
      className={`relative bg-slate-800 border border-slate-700/60 rounded-xl overflow-hidden
        flex flex-col hover:border-slate-500/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40
        transition-all duration-300 border-l-4 ${accentBorder}`}
    >
      {/* Cover Image */}
      <div className="relative h-44 bg-slate-900 overflow-hidden">
        <BookCover src={book.coverImage} title={book.title} genre={book.genre} />
        {/* Status badge overlaid on image */}
        <span
          className={`absolute top-2 right-2 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${
            book.isRead
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
          }`}
        >
          {book.isRead ? "✓ Read" : "Unread"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-1">
        <h3 className="text-white font-semibold text-base leading-snug line-clamp-1">
          {book.title}
        </h3>
        <p className="text-slate-400 text-sm">{book.author}</p>

        {book.genre && (
          <span className="mt-1 self-start text-xs text-slate-500 bg-slate-700/60 px-2 py-0.5 rounded-md">
            {book.genre}
          </span>
        )}

        {/* Page count */}
        {book.pageCount && (
          <p className="text-slate-500 text-xs mt-1">{book.pageCount} pages</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-3">
          <Link
            to={`/book/${book.id}`}
            className="flex-1 text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          >
            View
          </Link>
          <button
            onClick={() => toggleRead(book.id)}
            className="flex-1 bg-slate-700 hover:bg-amber-500/80 text-slate-200 hover:text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
            title="Toggle read status"
          >
            {book.isRead ? "Mark Unread" : "Mark Read"}
          </button>
          <button
            onClick={() => deleteBook(book.id)}
            className="bg-slate-700 hover:bg-rose-600 text-slate-400 hover:text-white p-2 rounded-lg transition-colors"
            title="Delete book"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;