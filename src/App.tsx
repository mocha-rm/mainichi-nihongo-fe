import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import JapaneseContentPage from './pages/JapaneseContentPage'
import UnsubscribePage from './pages/UnsubscribePage'
import LoginPage from './pages/LoginPage'
import OAuthCallbackPage from './pages/OAuthCallbackPage'
import Layout from './components/Layout'
import ContentListPage from './pages/ContentListPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contents/:date" element={<JapaneseContentPage />} />
        <Route path="/contents" element={<ContentListPage />} />
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
      </Routes>
    </Layout>
  )
}

export default App
