// import { useParams } from "react-router-dom";
// import { useContext } from "react";
// import { BookContext } from "../context/BookContext";

// function BookDetails() {
//   const { id } = useParams();
//   const { books } = useContext(BookContext);

//   const book = books.find((b) => b.id === Number(id));

//   if (!book) {
//     return <h2>Book not found</h2>;
//   }

//   return (
//   <div className="p-10 flex justify-center">
//     <div className="bg-white shadow-lg p-6 rounded-xl max-w-md">
//       <h1 className="text-2xl font-bold mb-4">{book.title}</h1>

//       <img
//         src={book.coverImage}
//         className="w-full h-52 object-cover rounded-lg"
//       />

//       <div className="mt-4 space-y-2">
//         <p><b>Author:</b> {book.author}</p>
//         <p><b>Description:</b> {book.description}</p>
//         <p><b>Pages:</b> {book.pageCount}</p>
//         <p><b>Genre:</b> {book.genre}</p>

//         <span
//           className={`px-3 py-1 rounded-full text-sm ${
//             book.isRead ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
//           }`}
//         >
//           {book.isRead ? "Read" : "Unread"}
//         </span>
//       </div>
//     </div>
//   </div>
// );
// }

// export default BookDetails;
import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BookContext } from "../context/BookContext";

const bgMap = {
  Programming: "#312e81",
  Fiction: "#064e3b",
  History: "#78350f",
  Science: "#164e63",
  default: "#1e1b4b",
};

function BookCoverHero({ src, title, genre }) {
  const [failed, setFailed] = useState(!src || src.includes("via.placeholder.com"));
  const bg = bgMap[genre] || bgMap.default;
  const initial = title?.charAt(0)?.toUpperCase() || "B";

  if (failed) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3 select-none"
        style={{ background: `linear-gradient(135deg, ${bg}, #0f172a)` }}
      >
        <span className="text-7xl font-black text-white/10">{initial}</span>
        <span className="text-sm text-white/30 px-6 text-center">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover opacity-60"
      onError={() => setFailed(true)}
    />
  );
}

function BookDetails() {
  const { id } = useParams();
  const { books, toggleRead, deleteBook } = useContext(BookContext);
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">📕</p>
          <h2 className="text-white font-bold text-xl">Book not found</h2>
          <Link to="/" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
            ← Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <Link to="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Library
        </Link>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">

          <div className="h-56 bg-slate-900 relative overflow-hidden">
            <BookCoverHero src={book.coverImage} title={book.title} genre={book.genre} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                book.isRead
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-300 border-rose-500/40"
              }`}>
                {book.isRead ? "✓ Read" : "Unread"}
              </span>
              {book.genre && (
                <span className="text-xs text-slate-300 bg-slate-800/80 border border-slate-600/50 px-3 py-1 rounded-full">
                  {book.genre}
                </span>
              )}
            </div>
          </div>

          <div className="p-7">
            <h1 className="text-2xl font-bold text-white leading-tight">{book.title}</h1>
            <p className="text-indigo-400 font-medium mt-1">by {book.author}</p>

            <div className="flex gap-6 mt-5 py-4 border-y border-slate-700/50">
              {book.pageCount && (
                <div>
                  <p className="text-white font-bold">{book.pageCount}</p>
                  <p className="text-slate-500 text-xs">Pages</p>
                </div>
              )}
              {book.genre && (
                <div>
                  <p className="text-white font-bold">{book.genre}</p>
                  <p className="text-slate-500 text-xs">Genre</p>
                </div>
              )}
              <div>
                <p className={`font-bold ${book.isRead ? "text-emerald-400" : "text-rose-400"}`}>
                  {book.isRead ? "Read" : "Not Read"}
                </p>
                <p className="text-slate-500 text-xs">Status</p>
              </div>
            </div>

            {book.description && (
              <div className="mt-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</p>
                <p className="text-slate-300 text-sm leading-relaxed">{book.description}</p>
              </div>
            )}

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => toggleRead(book.id)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
              >
                {book.isRead ? "Mark as Unread" : "Mark as Read"}
              </button>
              <Link
                to="/"
                onClick={() => deleteBook(book.id)}
                className="flex-1 text-center bg-slate-700 hover:bg-rose-600/80 text-slate-300 hover:text-white font-medium py-2.5 rounded-xl transition-all"
              >
                Delete Book
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;