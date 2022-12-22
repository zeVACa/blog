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
import ERoutes from './routes';

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
          <Route path={ERoutes.CREATE_ARTICLE} element={<CreateArticlePage />} />
          <Route path={ERoutes.PROFILE} element={<ProfilePage />} />
          <Route path={`${ERoutes.ARTICLES}/:slug${ERoutes.EDIT}`} element={<EditArticlePage />} />
        </Route>
        <Route path={ERoutes.HOME} element={<ArticlesPage />} />
        <Route path={ERoutes.ARTICLES} element={<ArticlesPage />} />
        <Route path={`${ERoutes.ARTICLES}/:slug`} element={<ArticlePage />} />
        <Route path={ERoutes.SIGN_IN} element={<LoginPage />} />
        <Route path={ERoutes.SIGN_UP} element={<RegisterPage />} />
        <Route path={ERoutes.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
