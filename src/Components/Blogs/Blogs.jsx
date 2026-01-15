import React, { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Loading from '../Loading';
import { useNavigate } from 'react-router';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("http://localhost:3000/blogs");
                if (!res.ok) throw new Error("Failed to fetch blogs");
                const data = await res.json();
                setBlogs(data);
            } catch (error) {
                console.error(error);
                toast.error(error.message || "Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="section sp-t w-11/12 max-w-7xl mx-auto py-14">
            {/* Heading */}
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FFAA6E]">
                    Our Latest Blogs
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                    Stay updated with the latest club events, tips, and community highlights.
                </p>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div
                        key={blog.id || blog._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                    >
                        {/* Image */}
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="inline-block bg-[#FFAA6E]/20 text-[#FFAA6E] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                                {blog.category}
                            </span>

                            <h2 className="text-xl font-bold mb-2 text-gray-900">
                                {blog.title}
                            </h2>

                            <p className="text-gray-600 flex-grow">{blog.excerpt}</p>

                            {/* Author & Date */}
                            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                <span>By {blog.author}</span>
                                <span>{new Date(blog.date).toLocaleDateString()}</span>
                            </div>

                            {/* Read More */}
                            <button
                                onClick={() => navigate(`/blogDetails/${blog._id || blog.title}`)}
                                className="mt-4 inline-flex items-center text-[#FFAA6E] font-semibold hover:underline"
                            >
                                Read More <FiArrowRight className="ml-1" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
