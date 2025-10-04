import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LearningPage from './pages/LearningPage'
import DetailedLearningPage from './pages/DetailedLearningPage'
import UnsubscribePage from './pages/UnsubscribePage'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning/:date?" element={<LearningPage />} />
        <Route path="/detailed/:date?" element={<DetailedLearningPage />} />
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
      </Routes>
    </Layout>
  )
}

export default App
