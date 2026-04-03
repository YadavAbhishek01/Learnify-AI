import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Documents from './pages/Documents'
import DocumentDetail from './pages/DocumentDetail'
import NotFound from './pages/NotFound'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Authcontext } from './context/Authcontext'
import Profile from './pages/Profile.jsx'
import FlashCard from './pages/FlashCard.jsx'
import FlashCardDetails from './pages/FlashCardDetails.jsx'
import LandingPage from './pages/LandingPage.jsx'



const App = () => {
  const {loading ,token} = useContext(Authcontext)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-green-500"></div>
      </div>
    )
  }

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes */}
       <Route
  path="/"
  element={
    token ? (
      <Navigate to="/dashboard" replace />
    ) : (
      // <Navigate to="/login" replace />
      <LandingPage/>
    )
  }
/>

       <Route
  path="/login"
  element={token ? <Navigate to="/dashboard" replace /> : <Login />}
/>
<Route
  path="/register"
  element={token ? <Navigate to="/dashboard" replace /> : <SignUp />}
/>


        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<Profile/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/:pdfid" element={<DocumentDetail />} />
          <Route path="/flashcards" element={<FlashCard />} />
          <Route path="/flashcard/:id" element={<FlashCardDetails />} />
   
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
 
    </>
  )
}

export default App
