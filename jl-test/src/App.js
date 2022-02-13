import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import CreateClient from "./components/CreateClient"
import Navbar from "./components/Navbar"
import UserDetails from "./components/UserDetails"
import useAuthUser from "./context/AuthUser"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  const { userLogged } = useAuthUser()

  const PrivateRoute = ({ children }) =>
    userLogged.ok ? children : <Navigate to="/login" />
  const PublicRoute = ({ children }) =>
    userLogged.ok ? <Navigate to="/dashboard" /> : children

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/userdetails/:id"
            element={
              <PrivateRoute>
                <UserDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/createclient"
            element={
              <PrivateRoute>
                <CreateClient />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
