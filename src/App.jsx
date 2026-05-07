import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Player from './Pages/Player/Player';

// 🔥 PAGES
import TVShows from './Pages/TVShows/TVShows';
import Movies from './Pages/Movies/Movies';
import NewPopular from './Pages/NewPopular/NewPopular';

import Languages from './Pages/Languages/Languages';
import Search from './Pages/Search/Search'; 
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import ActorDetails from './Pages/ActorDetails/ActorDetails'

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      // ✅ Only protect private routes
      if (!user && location.pathname !== '/login') {
        navigate('/login');
      }

      if (user && location.pathname === '/login') {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <div>
      <ToastContainer theme='dark' />

      <Routes>

        {/* 🔐 AUTH */}
        <Route path='/login' element={<Login />} />

        {/* 🏠 MAIN */}
        <Route path='/' element={<Home />} />

        <Route path='/movie/:id' element={<MovieDetails />} /> {/* ✅ FIXED */}
        <Route path='/player/:id' element={<Player />} />
        <Route path='/actor/:id' element={<ActorDetails/>}/>
        <Route path='/tv' element={<TVShows />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/new' element={<NewPopular />} />
       
        <Route path='/languages' element={<Languages />} />

        <Route path='/search/:query' element={<Search/>} /> {/* ✅ FIXED */}

      </Routes>
    </div>
  );
};

export default App;