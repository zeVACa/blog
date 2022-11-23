import { Routes, Route } from 'react-router-dom';
import Header from './components/AppHeader';
import ArticlePage from './pages/ArticlePage';
import ArticlesPage from './pages/ArticlesPage';
import CreateArticlePage from './pages/CreateArticlePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<ArticlesPage />} />
        <Route path='/articles/' element={<ArticlesPage />} />
        <Route path='/articles/:id' element={<ArticlePage />} />
        <Route path='/create-article' element={<CreateArticlePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
