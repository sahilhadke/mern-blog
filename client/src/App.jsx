import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SingUp from "./pages/Signup"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import FooterComponenent from "./components/FooterComponenent"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/sign-up" element={<SingUp />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <FooterComponenent />
    </BrowserRouter>
  )
}
