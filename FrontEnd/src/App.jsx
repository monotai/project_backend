import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import CreateAccount from './Pages/CreateAccount.jsx';
import React  from 'react';
import Adminstation from './Pages/Adminstation.jsx';
import Chat from './Pages/Chat.jsx';
import Post from './Pages/Component/Post.jsx';

function App() {
    const [userId, setUserId] = React.useState(() => {
        // Retrieve the userId from localStorage when the app initializes
        const savedUserId = localStorage.getItem("userId");
        return savedUserId ? Number(savedUserId) : 0;
    });

    const handleSetUserId = (id) => {
        setUserId(id);
        localStorage.setItem("userId", id); // Save userId to localStorage
    };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userId={userId} />} />
        <Route path="/login" element={<Login setUserId={handleSetUserId} />} />
        <Route path="/chat" element={<Chat userId={userId} />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/adminstation" element={<Adminstation />} />
        <Route path="/test" element={<Post />} />
      </Routes>
    </Router>
  );
}
export default App;