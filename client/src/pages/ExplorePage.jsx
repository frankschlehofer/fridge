"use client"

import { useEffect, useState, useRef } from "react"
import NavSideBar from "../components/NavSideBar"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import IngredientSelector from "../components/IngredientSelector"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const ExplorePage = () => {
  const [recipes, setRecipes] = useState([])
  const [currentRecipe, setCurrentRecipe] = useState(null)
  const [animation, setAnimation] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [selectedIngredientNames, setSelectedIngredientNames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const cardRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    if (!authToken) {
      navigate("/", { replace: true })
      return
    }

    try {
      const decodedToken = jwtDecode(authToken)
      const user_id = decodedToken.sub
      console.log("User ID from JWT:", user_id)

      // First fetch ingredients
      fetch(`${BACKEND_URL}/api/users/${user_id}/fridgepage`)
        .then((response) => response.json())
        .then((ingredientsData) => {
          setIngredients(ingredientsData)
        })
        .catch((error) => console.log("Error fetching ingredients: ", error))
    } catch (error) {
      console.error("Error decoding JWT:", error)
    }
  }, [navigate])

  const fetchRecipes = async (user_id, ingredientNames = []) => {
    setIsLoading(true)
    try {
      console.log("Fetching recipes with ingredients:", ingredientNames)

      if (ingredientNames.length === 0) {
        setRecipes([])
        setCurrentRecipe(null)
        setIsLoading(false)
        return
      }

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientNames }),
      }

      const endpoint = `${BACKEND_URL}/api/users/${user_id}/getrecipes`
      const response = await fetch(endpoint, requestOptions)
      const data = await response.json()

      setRecipes(data)
      if (data && data.length > 0) {
        setCurrentRecipe(data[0])
      } else {
        setCurrentRecipe(null)
      }
    } catch (error) {
      console.log("Error fetching recipes: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Modify the handleIngredientSelectionChange function to just update state without making API calls
  const handleIngredientSelectionChange = (selectedNames) => {
    setSelectedIngredientNames(selectedNames)
    // No API call here anymore
  }

  // Add a new function to handle the search button click
  const handleSearchRecipes = () => {
    const authToken = localStorage.getItem("authToken")
    const decodedToken = jwtDecode(authToken)
    const user_id = decodedToken.sub
    fetchRecipes(user_id, selectedIngredientNames)
  }

  const handleSaveRecipe = async () => {
    if (!currentRecipe) return

    try {
      // Show save animation
      setAnimation("save")

      // Apply animation class to card
      if (cardRef.current) {
        cardRef.current.classList.add("card-save-animation")
      }

      const authToken = localStorage.getItem("authToken")
      const decodedToken = jwtDecode(authToken)
      const user_id = decodedToken.sub

      await fetch(`${BACKEND_URL}/api/users/${user_id}/saverecipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe_id: currentRecipe.id,
          name: currentRecipe.title || currentRecipe.name,
          image_path: currentRecipe.image,
        }),
      })

      // Wait for animation to complete before moving to next recipe
      setTimeout(() => {
        nextRecipe()
        setAnimation(null)
        if (cardRef.current) {
          cardRef.current.classList.remove("card-save-animation")
        }
      }, 500)
    } catch (err) {
      console.log(err)
      setAnimation(null)
      if (cardRef.current) {
        cardRef.current.classList.remove("card-save-animation")
      }
    }
  }

  const handleSkipRecipe = () => {
    // Show skip animation
    setAnimation("skip")

    // Apply animation class to card
    if (cardRef.current) {
      cardRef.current.classList.add("card-skip-animation")
    }

    // Wait for animation to complete before moving to next recipe
    setTimeout(() => {
      nextRecipe()
      setAnimation(null)
      if (cardRef.current) {
        cardRef.current.classList.remove("card-skip-animation")
      }
    }, 500)
  }

  const nextRecipe = () => {
    if (recipes.length <= 1) {
      setCurrentRecipe(null)
      return
    }

    const nextRecipes = recipes.filter((recipe) => recipe.id !== currentRecipe.id)
    setRecipes(nextRecipes)
    setCurrentRecipe(nextRecipes[0])
  }

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <NavSideBar />
      <div className="flex flex-col overflow-y-auto overflow-x-hidden p-6 w-full">
        <h1 className="text-4xl font-bold mb-6 page-title">Explore Recipes</h1>

        {/* Add the ingredient selector */}
        <div>
          <IngredientSelector ingredients={ingredients} onSelectionChange={handleIngredientSelectionChange} />
          <div className="flex justify-center mt-4 mb-6">
            <button
              onClick={handleSearchRecipes}
              className="px-6 py-3 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search Recipes
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                style={{ borderColor: "var(--primary)" }}
              ></div>
            </div>
          ) : currentRecipe ? (
            <div className="max-w-md w-full relative">
              <div
                ref={cardRef}
                className="bg-card rounded-lg shadow-lg overflow-hidden recipe-card"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
              >
                {animation === "save" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-30 z-10 rounded-lg save-overlay">
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}

                {animation === "skip" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-30 z-10 rounded-lg skip-overlay">
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {currentRecipe.image ? (
                    <img
                      src={currentRecipe.image || "/placeholder.svg"}
                      alt={currentRecipe.title || currentRecipe.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div
                      className="w-full h-64 flex items-center justify-center rounded-lg mb-4 text-gray-400"
                      style={{ backgroundColor: "var(--bg-secondary)" }}
                    >
                      No Image Available
                    </div>
                  )}
                  <h2 className="text-2xl font-bold mb-4">{currentRecipe.title || currentRecipe.name}</h2>

                  {currentRecipe.usedIngredients && currentRecipe.usedIngredients.length > 0 && (
                    <>
                      <h3 className="font-semibold mb-2">Ingredients from your Fridge:</h3>
                      <ul className="list-disc list-inside text-sm mb-4">
                        {currentRecipe.usedIngredients.map((ingredient, index) => (
                          <li key={index}>{ingredient.name}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {currentRecipe.missedIngredients && currentRecipe.missedIngredients.length > 0 && (
                    <>
                      <h3 className="font-semibold mb-2">Additional Ingredients:</h3>
                      <ul className="list-disc list-inside text-sm mb-4">
                        {currentRecipe.missedIngredients.map((ingredient, index) => (
                          <li key={index}>{ingredient.name}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div className="flex justify-between p-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                  <button
                    onClick={handleSkipRecipe}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    aria-label="Skip recipe"
                    disabled={animation !== null}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <button
                    onClick={handleSaveRecipe}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                    aria-label="Save recipe"
                    disabled={animation !== null}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 rounded-lg" style={{ backgroundColor: "var(--bg-card)" }}>
              <h2 className="text-2xl font-bold mb-4">No More Recipes</h2>
              <p className="mb-4">You've gone through all available recipes.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
