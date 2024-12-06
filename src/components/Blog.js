import React, { useEffect, useState } from 'react';

const Blog = ({ match }) => {
    const [blog, setBlog] = useState(null);
    const [isSummarized, setIsSummarized] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/blog/${match.params.id}`);
                const data = await response.json();
                if (data.blog) {
                    setBlog(data.blog);
                    setIsSummarized(data.isSummarized || false);
                } else {
                    setError(data.error || 'Blog not found.');
                }
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Failed to load the blog.');
            }
        };

        fetchBlog();
    }, [match.params.id]);

    if (error) {
        return (
            <div className="alert alert-danger mt-3">
                <strong>Error:</strong> {error}
            </div>
        );
    }

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-4">
            <h1>{blog.title}</h1>
            <pre className="mt-3" id="blogContent">
                {blog.content}
            </pre>
            <div className="mt-3">
                Author: {blog.author?.Name || 'Unknown'}
            </div>

            {!isSummarized ? (
                <form method="POST" action={`/blog/${blog._id}/summarize`}>
                    <button type="submit" className="btn btn-primary mt-3">
                        Summarize
                    </button>
                </form>
            ) : (
                <div className="alert alert-success mt-3">
                    This blog has been summarized.
                </div>
            )}
        </div>
    );
};

export default Blog;
