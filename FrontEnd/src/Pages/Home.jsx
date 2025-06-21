import React, { useEffect, useState } from "react";
import { getUserById } from "../control.js";

export default function Home({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                const fetchedUser = await getUserById(userId);
                setUser(fetchedUser);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div className="home">
            <h1>
                {"Welcome " + (user ? user.name : "") + " to the Chat Application"}
            </h1>
            <p>This is the home page. You can navigate to different sections from here.</p>
            <nav>
                <ul>
                    {user && user.user_id !== 0 ? ( // Check if user exists and is valid
                        <>
                            <li><a href="/adminstation">Admin Station</a></li>
                            <li><a href={`/chat?userid=${userId}`}>Chat</a></li>
                        </>
                    ) : (
                        <li><a href="/login">Login</a></li>
                    )}
                </ul>
            </nav>
        </div>
    );
}