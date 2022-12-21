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
import userApi from './services/userApi';
import { getTokenFromLocalStorage } from './utils/tokenApi';
import { useAppDispatch } from './redux/store';
import { setUser } from './redux/reducers/userSlice';
import EditArticlePage from './pages/EditArticlePage';

function App() {
  const [getUser] = userApi.useLazyGetUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      getUser(null, true)
        .unwrap()
        .then((data) => {
          const { username, email, token, image } = data.user;
          if (data) dispatch(setUser({ username, email, token, image: image || null }));
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
          <Route path='/articles/:slug/edit' element={<EditArticlePage />} />
        </Route>
        <Route path='/' element={<ArticlesPage />} />
        <Route path='/articles' element={<ArticlesPage />} />
        <Route path='/articles/:slug' element={<ArticlePage />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/sign-up' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
