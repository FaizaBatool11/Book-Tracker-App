// import { useState, useContext } from "react";
// import { BookContext } from "../context/BookContext";
// import { useNavigate } from "react-router-dom";

// function AddBook() {
//   const navigate = useNavigate();
//   const { addBook } = useContext(BookContext);

//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     genre: "",
//     pageCount: "",
//     description: "",
//     coverImage: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

// const handleSubmit = (e) => {
//   e.preventDefault();

//   if (!formData.title || !formData.author) {
//     alert("Please fill required fields");
//     return;
//   }

//   addBook({
//     ...formData,
//     pageCount: Number(formData.pageCount),
//   });
//   console.log("BOOK ADDED:", formData);

//   setFormData({
//       title: "",
//       author: "",
//       genre: "",
//       pageCount: "",
//       description: "",
//       coverImage: "",
//     });
//     navigate("/"); // 🔥 go back to home
// };
// return (
//   <div className="flex justify-center items-center min-h-screen bg-gray-100">
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-3"
//     >
//       <h2 className="text-2xl font-bold text-center">Add Book</h2>

//       <input className="w-full p-2 border rounded" name="title" placeholder="Title" onChange={handleChange} />
//       <input className="w-full p-2 border rounded" name="author" placeholder="Author" onChange={handleChange} />
//       <input className="w-full p-2 border rounded" name="genre" placeholder="Genre" onChange={handleChange} />
//       <input className="w-full p-2 border rounded" name="pageCount" placeholder="Page Count" onChange={handleChange} />
//       <input className="w-full p-2 border rounded" name="description" placeholder="Description" onChange={handleChange} />
//       <input className="w-full p-2 border rounded" name="coverImage" placeholder="Image URL" onChange={handleChange} />

//       <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
//         Add Book
//       </button>
//     </form>
//   </div>
// );
// }

// export default AddBook;
import { useState, useContext } from "react";
import { BookContext } from "../context/BookContext";
import { useNavigate, Link } from "react-router-dom";

const inputClass =
  "w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-colors";

const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

function AddBook() {
  const navigate = useNavigate();
  const { addBook } = useContext(BookContext);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    pageCount: "",
    description: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    addBook({ ...formData, pageCount: Number(formData.pageCount) });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-lg mx-auto">

        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Library
        </Link>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-white">Add a Book</h2>
            <p className="text-slate-400 text-sm mt-1">Fill in the details to add a book to your library</p>
          </div>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className={labelClass}>Title <span className="text-rose-400">*</span></label>
              <input className={`${inputClass} ${errors.title ? "border-rose-500" : ""}`}
                name="title" placeholder="e.g. The Great Gatsby" value={formData.title} onChange={handleChange} />
              {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Author */}
            <div>
              <label className={labelClass}>Author <span className="text-rose-400">*</span></label>
              <input className={`${inputClass} ${errors.author ? "border-rose-500" : ""}`}
                name="author" placeholder="e.g. F. Scott Fitzgerald" value={formData.author} onChange={handleChange} />
              {errors.author && <p className="text-rose-400 text-xs mt-1">{errors.author}</p>}
            </div>

            {/* Genre + Pages side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Genre</label>
                <input className={inputClass} name="genre" placeholder="e.g. Fiction"
                  value={formData.genre} onChange={handleChange} />
              </div>
              <div>
                <label className={labelClass}>Page Count</label>
                <input className={inputClass} name="pageCount" placeholder="e.g. 320" type="number"
                  value={formData.pageCount} onChange={handleChange} />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                className={`${inputClass} resize-none`}
                name="description"
                placeholder="Brief summary of the book…"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            {/* Cover Image URL */}
            <div>
              <label className={labelClass}>Cover Image URL</label>
              <input className={inputClass} name="coverImage" placeholder="https://…"
                value={formData.coverImage} onChange={handleChange} />
              {formData.coverImage && (
                <div className="mt-2 rounded-lg overflow-hidden h-24 bg-slate-900 flex items-center justify-center">
                  <img src={formData.coverImage} alt="Preview" className="h-full object-contain"
                    onError={(e) => { e.target.style.display = "none"; }} />
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl
                shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-200 mt-2"
            >
              Add to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;