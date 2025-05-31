"use client"

import { useEffect, useState } from "react"
import NavSideBar from "../components/NavSideBar"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const authToken = localStorage.getItem("authToken")
        if (!authToken) {
          navigate("/", { replace: true })
          return
        }

        const decodedToken = jwtDecode(authToken)
        const user_id = decodedToken.sub
        console.log("User ID from JWT:", user_id)

        const response = await fetch(`${BACKEND_URL}/api/users/${user_id}/savedrecipes`)
        const data = await response.json();
        setSavedRecipes(data)
        setLoading(false)
      } catch (error) {
        console.log("Error: ", error)
        setLoading(false)
      }
    }

    fetchSavedRecipes()
  }, [navigate])

  const handleRemoveRecipe = async (recipeId) => {
    try {
      const authToken = localStorage.getItem("authToken")
      const decodedToken = jwtDecode(authToken)
      const user_id = decodedToken.sub

      const response = await fetch(`${BACKEND_URL}/api/users/${user_id}/savedrecipes/${recipeId}`, {
        method: "DELETE",
      })

      const data = await response.json();
      setSavedRecipes(data)
      // Update the UI by removing the deleted recipe
    } catch (error) {
      console.log("Error removing recipe: ", error)
    }
  }

  const handleRecipeInfo = async (recipeId) => {
    try {
      const authToken = localStorage.getItem("authToken")
      const decodedToken = jwtDecode(authToken)
      const user_id = decodedToken.sub
      console.log(recipeId)
      const response = await fetch(`${BACKEND_URL}/api/users/${user_id}/getrecipeinfo/${recipeId}`)

      const data = await response.json();
      console.log('url:', data.sourceUrl);
      
      window.open(data.sourceUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.log("Error getting recipe info: ", error)
    }
  }

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <NavSideBar />
      <div className="flex flex-col overflow-y-auto overflow-x-hidden p-6 w-full">
        <h1 className="text-4xl font-bold mb-6 page-title">Saved Recipes</h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
              style={{ borderColor: "var(--primary)" }}
            ></div>
          </div>
        ) : savedRecipes.length === 0 ? (
          <div className="text-center p-8 rounded-lg" style={{ backgroundColor: "var(--bg-card)" }}>
            <h2 className="text-2xl font-bold mb-4">No Saved Recipes</h2>
            <p className="mb-4">You haven't saved any recipes yet.</p>
            <button
              onClick={() => navigate("/explore")}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Explore Recipes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecipes.map((recipe) => (
              <div
                key={recipe.recipe_id}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
              >
                <div className="p-6">
                  {recipe.image_path ? (
                    <img
                      src={recipe.image_path || "/placeholder.svg"}
                      alt={recipe.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div
                      className="w-full h-48 flex items-center justify-center rounded-lg mb-4 text-gray-400"
                      style={{ backgroundColor: "var(--bg-secondary)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleRecipeInfo(recipe.recipe_id)}
                      style={{ backgroundColor: "var(--primary)" }}
                      className="px-3 py-1 rounded text-sm hover:text-black transition-colors"
                    >
                      View Recipe
                    </button>
                    <button
                      onClick={() => handleRemoveRecipe(recipe.recipe_id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove recipe"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedRecipesPage
