import React from "react";
import image3 from "../assets/image3.jpg"; // Ensure this path is correct

function BlogSection() {
  const blogData = [
    {
      img: image3,
      title: "Example Blog Post", // Add a title for better alt text
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {blogData.map((blog, index) => (
        <div key={index} className="shadow-lg p-2">
          <img
            src={blog.img}
            className="w-full h-auto object-cover rounded-lg"
            alt={blog.title}
          />
          {/* Add a title if needed */}
          <h2 className="mt-4 text-xl font-semibold">{blog.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default BlogSection;
