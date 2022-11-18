import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ArticlesPage from './pages/ArticlesPage';
import CreateArticlePage from './pages/CreateArticlePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<ArticlesPage />} />
        <Route path='/create-article' element={<CreateArticlePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
