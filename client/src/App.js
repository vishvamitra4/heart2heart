import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import { USerContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
function App() {
    return (
        <USerContextProvider>
            <Routes>

                <Route path='/' element={<Layout />}>
                    <Route index element={
                        <IndexPage />
                    } />
                    <Route path='/login' element={
                        <LoginPage />
                    } />
                    <Route path='/register' element={<RegisterPage />}
                    />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/create' element={<CreatePost />} />
                    <Route path='/post/:id' element={<PostPage />} />
                    <Route path='/edit/:id' element = {<EditPost />} />
                </Route>

            </Routes>
        </USerContextProvider>




    )
};

export default App;