import { useState, useEffect } from 'react';
import { logIn, logOut } from './store/authSlice';
import authService from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(logIn(userData));
          console.log(userData);
          setLoading(false);
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-black text-gray-300'>
      <Header />
      <main className='flex-grow'>
        <div className='max-w-7xl mx-auto px-4 py-8'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
