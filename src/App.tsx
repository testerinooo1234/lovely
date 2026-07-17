import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthorPage } from './pages/AuthorPage'
import { Browse } from './pages/Browse'
import { Home } from './pages/Home'
import { StoryPage } from './pages/StoryPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="author/:handle" element={<AuthorPage />} />
          <Route path="story/:slug" element={<StoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
