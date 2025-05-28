"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import IngredientList from "../components/IngredientList"
import AddItemForm from "../components/AddItemForm"
import SortingHeader from "../components/SortingHeader"
import UseByList from "../components/UseByList"
import { jwtDecode } from "jwt-decode"
import NavSideBar from "../components/NavSideBar"
import ImageUploadSection from "../components/ImageUploadSection"

let authToken = ""
let user_id = ""

function FridgePage() {
  const [ingredients, setIngredients] = useState([])
  const currentDate = new Date()
  const alreadyExpired = new Date(currentDate)
  const expiresWithin7 = new Date(currentDate)
  alreadyExpired.setDate(currentDate.getDate() - 1)
  expiresWithin7.setDate(currentDate.getDate() + 7)

  const navigate = useNavigate()

  // Load persistent ingredient data on initial load
  useEffect(() => {
    authToken = localStorage.getItem("authToken")

    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken)
        user_id = decodedToken.sub
        console.log("User ID from JWT:", user_id)
      } catch (error) {
        console.error("Error decoding JWT:", error)
      }
    } else {
      navigate("/", { replace: true })
    }

    fetch(`http://localhost:3000/api/users/${user_id}/fridgepage`)
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.log("Error fetching ingredients: ", error))
  }, [])

  const handleAdd = (ingredient) => {
    console.log("Adding ingredient:", ingredient)
    fetch(`http://localhost:3000/api/users/${user_id}/fridgepage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    })
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.log("Error creating new ingredients: ", error))
  }

  const handleDelete = (ingredient_id) => {
    console.log(`http://localhost:3000/api/users/${user_id}/fridgepage/${ingredient_id}`)
    fetch(`http://localhost:3000/api/users/${user_id}/fridgepage/${ingredient_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.log("Error deleting ingredient: ", error))
  }

  const handleSort = (sortedIngredients) => {
    setIngredients(sortedIngredients)
  }

  const handleBulkAdd = (parsedIngredients) => {
    console.log("Adding bulk ingredients:", parsedIngredients)
    parsedIngredients.map((ingredient) => {
      ingredient.quantity = 1;
      handleAdd(ingredient);
    })
    parsedIngredients = [];
    
  }

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <NavSideBar />
      <div className="flex flex-col overflow-y-auto overflow-x-hidden p-6 w-full">
        <h1 className="text-4xl font-bold mb-6 page-title">My Fridge</h1>

        {/* Expiring Items Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 section-title">Expiring Items</h2>

          <div className="expiring-sections-container">
            <div className="expiring-category expired">
              <h3>Expired</h3>
              <div className="expiring-category-grid">
                <UseByList ingredients={ingredients} useBy={alreadyExpired.toISOString()} onDelete={handleDelete} />
              </div>
            </div>

            <div className="expiring-category today">
              <h3>Expires Today</h3>
              <div className="expiring-category-grid">
                <UseByList ingredients={ingredients} useBy={currentDate.toISOString()} onDelete={handleDelete} />
              </div>
            </div>

            <div className="expiring-category soon">
              <h3>Expires Within 7 Days</h3>
              <div className="expiring-category-grid">
                <UseByList ingredients={ingredients} useBy={expiresWithin7.toISOString()} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        </div>

        {/* All Ingredients Section */}
        <div className="mt-8">
          <div
            className="bg-card rounded-lg p-4 shadow-md border border-border-color"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold section-title">All Ingredients</h2>
              <SortingHeader ingredients={ingredients} onSort={handleSort} />
            </div>
            <IngredientList items={ingredients} onDelete={handleDelete} />
          </div>

          <AddItemForm onAdd={handleAdd} />

          {/* Image Upload Section */}
          <ImageUploadSection userId={user_id} onBulkAdd={handleBulkAdd} />
        </div>
      </div>
    </div>
  )
}

export default FridgePage
