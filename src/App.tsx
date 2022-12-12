import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/AppHeader';
import ArticlePage from './pages/ArticlePage';
import ArticlesPage from './pages/ArticlesPage';
import CreateArticlePage from './pages/CreateArticlePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import 'react-toastify/dist/ReactToastify.min.css';
import PrivateRoutes from './utils/PrivateRoutes';
import authApi from './services/authApi';
import { getTokenFromLocalStorage } from './utils/tokenApi';
import { useAppDispatch } from './redux/store';
import { login } from './redux/reducers/userSlice';

function App() {
  const [getUser] = authApi.useLazyGetUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      getUser(null, true)
        .unwrap()
        .then((data) => {
          const { username, email, token, image } = data.user;
          if (data) dispatch(login({ username, email, token, image: image || null }));
        });
    }
  }, []);

  return (
    <div className='App'>
      <ToastContainer
        position='top-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/create-article' element={<CreateArticlePage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
        <Route path='/' element={<ArticlesPage />} />
        <Route path='/articles/' element={<ArticlesPage />} />
        <Route path='/articles/:id' element={<ArticlePage />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/sign-up' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
