import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import FridgePage from "./pages/FridgePage"
import LandingPage from "./pages/LandingPage"
import SignUpPage from "./pages/SignUpPage"
import FriendsPage from "./pages/FriendsPage"
import ProfilePage from "./pages/ProfilePage"
import ExplorePage from "./pages/ExplorePage"
import SavedRecipesPage from "./pages/SavedRecipesPage"
import SettingsPage from "./pages/SettingsPage"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/fridgepage" element={<FridgePage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/savedrecipes" element={<SavedRecipesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
