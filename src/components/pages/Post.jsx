import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/config";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deleteDocument(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 bg-gray-100 min-h-screen">
            <Container>
                <div className="w-full flex justify-center mb-8 relative border rounded-3xl shadow-xl overflow-hidden bg-white">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-3xl w-full max-h-[500px] object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all">
                                    <Pencil size={18} /> Edit
                                </button>
                            </Link>
                            <button 
                                onClick={deletePost}
                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all">
                                <Trash2 size={18} /> Delete
                            </button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-8 text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                    <p className="text-gray-600 text-sm">Published on: {new Date(post.$createdAt).toLocaleDateString()}</p>
                </div>

                <div className="prose prose-lg max-w-full text-gray-800 leading-relaxed">
                    {parse(post.content)}
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-md">
                        Back to Posts
                    </button>
                </div>
            </Container>
        </div>
    ) : null;
}
