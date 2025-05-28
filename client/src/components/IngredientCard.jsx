"use client"

import { daysBetween } from "../utils/expirationUtils"

function IngredientCard({ name, quantity, expiration_date, onDelete }) {
  const currentDate = new Date()
  const parseLocalDate = (dateString) => {
    dateString = dateString.split("T")[0]
    const [year, month, day] = dateString.split("-").map(Number)
    return new Date(year, month - 1, day)
  }
  
  const daysUntilExpiration = daysBetween(currentDate, parseLocalDate(expiration_date))

  let cardClass = "ingredient-card"
  if (daysUntilExpiration < 0) {
    cardClass += " expired-card"
  } else if (daysUntilExpiration === 0) {
    cardClass += " expires-today-card"
  } else if (daysUntilExpiration <= 7) {
    cardClass += " expires-soon-card"
  }

  return (
    <div className={cardClass}>
      <div>
        <div className="font-bold text-lg">{name}</div>
        <div className="text-sm opacity-75">Quantity: {quantity}</div>
        <div className="text-sm mt-1">
          {daysUntilExpiration < 0 ? (
            <span className="text-red-600 font-semibold">Expired {Math.abs(daysUntilExpiration)} days ago</span>
          ) : daysUntilExpiration === 0 ? (
            <span className="text-amber-600 font-semibold">Expires today</span>
          ) : (
            <span>Expires in {daysUntilExpiration} days</span>
          )}
        </div>
      </div>
      <button onClick={onDelete} className="hover:bg-red-100 p-2 rounded-full" aria-label="Delete ingredient">
        ❌
      </button>
    </div>
  )
}

export default IngredientCard
