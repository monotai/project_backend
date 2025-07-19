import React from "react";
import PostCard from "./Component/PostCard";
import Sidebar from "./Component/Sidebar";
import "../Style/Home.css"; // Adjust the path as necessary
import Uploadbar from "./Component/Uploadbar";
import { getLocally } from "../control";
import { getPosts, getUsers } from "../control/index.js";
import RightSidebar from "./Component/RightSidebar.jsx";
import Stories from "./Component/Stories.jsx";
import Header from "./Component/Header.jsx";

export default function Home() {
  const user = getLocally('user');
  const name = user ? user.username : 'Guest';
  const [posts, setPosts] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getPosts();
      const usersSet = await getUsers();
      setUsers(usersSet);
      setPosts(result);
    };

    fetchData();
  }, []);

  return <>
    <Header />
    <div className="home-pages">
        <div className="home-sidebar">
          <Sidebar name={name} />
        </div>
        <div className="home-posts">
          <Stories/>
          <Uploadbar name={name} />
          {posts.map((post, index) => (
            <PostCard
              id={post.post_id}
              key={index}
              name={users.find(u => u.user_id === post.user_id)?.username || 'Unknown User'}
              profile="/images/profile.png"
              text={post.content_text}
              image={
                post.content_image_url && post.content_image_url !== "none"
                  ? `http://localhost:3001/api/upload/${post.content_image_url.replace(/(^"|"$)/g, '')}`
                  : undefined
              }
              onDelelet={() => setPosts(posts.filter(p => p.post_id !== post.post_id))}
            />
          ))}
        </div>
        <div className="right-sidebar">
          <RightSidebar />
        </div>
    </div>
    
    </>;
}