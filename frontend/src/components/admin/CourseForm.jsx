import React from 'react'

export const CourseForm = ({formData,handleChange,handleSubmit,editingId}) => {
  return (

    <form onSubmit={handleSubmit} className="max-w-2xl bg-slate-900 p-8 rounded-2xl space-y-5">

      <input type="text" name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} className="w-full p-3 rounded bg-slate-800" required />
      <textarea name="shortDescription" placeholder="Short Description" value={formData.shortDescription} onChange={handleChange} className="w-full p-3 rounded bg-slate-800" required />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-3 rounded bg-slate-800" required />
      <input type="text" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} className="w-full p-3 rounded bg-slate-800" required />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-3 rounded bg-slate-800" required />
      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-3 rounded bg-slate-800" required />
      <label className="flex items-center gap-2">
        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
        Featured Course
      </label>

      <button type="submit" className={`w-full py-3 rounded-lg font-semibold transition ${
        editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-cyan-500 hover:bg-cyan-600"
      }`} >
        {editingId ? "Update Course" : "Add Course"}
      </button>
    </form>
  )
}
