
import PostCard from "./Component/PostCard";
import Sidebar from "./Component/Sidebar";
import "../Style/Home.css"; // Adjust the path as necessary
import Uploadbar from "./Component/Uploadbar";

export default function Home() {
  return <>
    <div className="home-pages">
        <div className="home-sidebar">
          <Sidebar />
        </div>
        <div className="home-posts">
          <Uploadbar />
          <PostCard name={"Sina Ravy"} profile={"/images/image.png"} text={"Miss you so much 😘#VY💗"} image={"/images/image.png"}/>
          {Array.from({ length: 20 }).map((_, idx) => (
            <PostCard
              key={idx}
              name={`User ${idx + 1}`}
              profile={`https://randomuser.me/api/portraits/men/${(idx % 10) + 1}.jpg`}
              text={`Random post #${idx + 1} - Lorem ipsum dolor sit amet.`}
              image={`https://picsum.photos/seed/${idx + 1}/300/200`}
            />
          ))}
        </div>
    </div>
    </>;
}