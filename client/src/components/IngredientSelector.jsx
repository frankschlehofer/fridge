"use client"

import { useState, useEffect } from "react"

function IngredientSelector({ ingredients, onSelectionChange, className = "" }) {
  const [selectedIngredients, setSelectedIngredients] = useState(new Set())
  const [isOpen, setIsOpen] = useState(false)

  // Initialize with all ingredients selected
  useEffect(() => {
    const allNames = new Set(ingredients.map(ingredient => ingredient.name))
    setSelectedIngredients(allNames)
    onSelectionChange(Array.from(allNames))
  }, [ingredients])

  const handleToggleIngredient = (ingredientName) => {
    const newSelected = new Set(selectedIngredients)
    if (newSelected.has(ingredientName)) {
      newSelected.delete(ingredientName)
    } else {
      newSelected.add(ingredientName)
    }
    setSelectedIngredients(newSelected)
    onSelectionChange(Array.from(newSelected))
  }

  const handleSelectAll = () => {
    const allNames = new Set(ingredients.map(ingredient => ingredient.name))
    setSelectedIngredients(allNames)
    onSelectionChange(Array.from(allNames))
  }

  const handleDeselectAll = () => {
    setSelectedIngredients(new Set())
    onSelectionChange([])
  }

  const selectedCount = selectedIngredients.size
  const totalCount = ingredients.length

  return (
    <div className={`${className}`} style={{ position: 'relative', marginBottom: '2rem' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'linear-gradient(135deg, var(--bg-card), rgba(78, 147, 122, 0.05))',
          border: '2px solid var(--primary)',
          borderRadius: '0.75rem',
          padding: '1rem 1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
            borderRadius: '50%',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"/>
              <path d="M9 7V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>
            </svg>
          </div>
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Select Ingredients for Recipes
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              margin: '0.25rem 0 0 0',
              fontSize: '0.875rem'
            }}>
              {selectedCount} of {totalCount} ingredients selected
            </p>
          </div>
        </div>
        <div style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          color: 'var(--primary)'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'var(--bg-card)',
          border: '2px solid var(--border-color)',
          borderRadius: '0.75rem',
          marginTop: '0.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          maxHeight: '400px',
          overflow: 'hidden'
        }}>
          {/* Header with Select All/Deselect All */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Choose ingredients to include
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleSelectAll}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease'
                }}
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAll}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
              >
                Deselect All
              </button>
            </div>
          </div>

          {/* Ingredients List */}
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '0.5rem'
          }}>
            {ingredients.length === 0 ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--text-secondary)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛒</div>
                No ingredients in your fridge yet
              </div>
            ) : (
              ingredients.map((ingredient) => (
                <div
                  key={ingredient.name}
                  onClick={() => handleToggleIngredient(ingredient.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    margin: '0.25rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: selectedIngredients.has(ingredient.name)
                      ? 'rgba(78, 147, 122, 0.1)'
                      : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedIngredients.has(ingredient.name)) {
                      e.target.style.backgroundColor = 'var(--bg-secondary)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedIngredients.has(ingredient.name)) {
                      e.target.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: `2px solid ${selectedIngredients.has(ingredient.name) ? 'var(--primary)' : 'var(--border-color)'}`,
                    backgroundColor: selectedIngredients.has(ingredient.name) ? 'var(--primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                    transition: 'all 0.2s ease'
                  }}>
                    {selectedIngredients.has(ingredient.name) && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}>
                      {ingredient.name}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)'
                    }}>
                      Quantity: {ingredient.quantity}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default IngredientSelector