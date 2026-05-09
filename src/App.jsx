import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Network from './pages/Network';
import Careers from './pages/Careers';
import Profile from './pages/Profile';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            
            <main className="flex-grow container mx-auto max-w-7xl pt-16 pb-20 md:pb-8 lg:flex lg:gap-8 lg:px-8">
              {/* Sidebar hidden on mobile, shown on large screens */}
              <div className="hidden lg:block lg:w-64 lg:shrink-0">
                <Sidebar />
              </div>

              <div className="flex-1 px-4 lg:px-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route path="/posts/create" element={<CreatePost />} />
                  <Route path="/network" element={<Network />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/profile/:username" element={<Profile />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<div className="text-center py-20">Page Not Found</div>} />
                </Routes>
              </div>
            </main>

            <Footer />
          </div>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
