import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import toast from 'react-hot-toast';

const BlogDetails = () => {
    const { id } = useParams(); // get the blog id from the URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`http://localhost:3000/blogs/${id}`); 
                if (!res.ok) throw new Error('Failed to fetch blog details');
                const data = await res.json();
                setBlog(data);
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to load blog');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Loading blog...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Blog not found.</p>
            </div>
        );
    }

    return (
        <div className="section sp-t w-11/12 max-w-4xl mx-auto py-14">
            {/* Back link */}
            <Link
                to="/blogs"
                className="text-[#FFAA6E] font-semibold hover:underline mb-6 inline-block"
            >
                ← Back to Blogs
            </Link>

            {/* Blog Image */}
            <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-96 object-cover rounded-xl shadow-md mb-8"
            />

            {/* Title and Date */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFAA6E] mb-4">
                {blog.title}
            </h1>
            <p className="text-gray-500 mb-8">
                By {blog.author} | {new Date(blog.date).toLocaleDateString()}
            </p>

            {/* Detailed Content */}
            <div className="prose max-w-full text-gray-700">
                {blog.detailed
                    ? blog.detailed.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                    ))
                    : <p>{blog.excerpt}</p>}
            </div>
        </div>
    );
};

export default BlogDetails;
