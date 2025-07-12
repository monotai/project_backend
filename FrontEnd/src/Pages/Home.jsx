import React from "react";
import PostCard from "./Component/PostCard";
import Sidebar from "./Component/Sidebar";
import "../Style/Home.css"; // Adjust the path as necessary
import Uploadbar from "./Component/Uploadbar";
import { getLocally } from "../control";
import { getPosts, getUsers } from "../control/index.js";

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
    <div className="home-pages">
        <div className="home-sidebar">
          <Sidebar name={name} />
        </div>
        <div className="home-posts">
          <Uploadbar name={name} />
          {/* <PostCard name={"Sina Ravy"} profile={"/images/image.png"} text={"Miss you so much 😘#VY💗"} image={"/images/image.png"}/> */}
          {/* {Array.from({ length: 20 }).map((_, idx) => (
            <PostCard
              key={idx}
              name={`User ${idx + 1}`}
              profile={`https://randomuser.me/api/portraits/men/${(idx % 10) + 1}.jpg`}
              text={`Random post #${idx + 1} - Lorem ipsum dolor sit amet.`}
              image={`https://picsum.photos/seed/${idx + 1}/300/200`}
            />
          ))} */}
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
    </div>
    </>;
}