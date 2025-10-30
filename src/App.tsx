import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import JapaneseContentPage from './pages/JapaneseContentPage'
import UnsubscribePage from './pages/UnsubscribePage'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contents/:date" element={<JapaneseContentPage />} />
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
      </Routes>
    </Layout>
  )
}

export default App
