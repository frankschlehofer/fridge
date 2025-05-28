"use client"

import { useState } from "react"

export default function ImageUploadSection({ userId, onBulkAdd }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [parsedItems, setParsedItems] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setError(null)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      setError(null)

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = async () => {
    if (!selectedImage) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", selectedImage)
      formData.append("userId", userId)

      console.log(selectedImage)

      const response = await fetch("http://localhost:3000/api/parse-food-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to parse image")
      }

      const data = await response.json()
      // Add default values for quantity and expiration_date
      const itemsWithDefaults = data.items.map((item, index) => ({
        ...item,
        id: index,
        quantity: 1,
        expiration_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Default to 7 days from now
      }))
      setParsedItems(itemsWithDefaults)
      setIsEditing(true)
    } catch (error) {
      console.error("Error parsing image:", error)
      setError("Failed to parse image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveItem = (itemId) => {
    setParsedItems((items) => items.filter((item) => item.id !== itemId))
  }

  const handleEditItem = (itemId, field, value) => {
    setParsedItems((items) => items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)))
  }

  const handleAddAllItems = () => {
    // Validate that all items have required fields
    const validItems = parsedItems.filter(item => 
      item.name && item.name.trim() && 
      item.quantity && 
      item.expiration_date
    )
    
    if (validItems.length > 0) {
      onBulkAdd(validItems)
      // Reset the section
      setSelectedImage(null)
      setImagePreview(null)
      setParsedItems([])
      setIsEditing(false)
      setError(null)
    }
  }

  const handleReset = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setParsedItems([])
    setIsEditing(false)
    setError(null)
  }

  const allItemsValid = parsedItems.every(item => 
    item.name && item.name.trim() && 
    item.quantity && 
    item.expiration_date
  )

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(78, 147, 122, 0.05) 100%)',
      border: '2px solid var(--primary)',
      borderRadius: '1rem',
      padding: '2rem',
      marginTop: '2rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(45deg, var(--primary), var(--primary-light))',
        borderRadius: '50%',
        opacity: 0.1,
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(45deg, var(--secondary), var(--secondary-light))',
        borderRadius: '50%',
        opacity: 0.1,
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          marginBottom: '2rem',
          textAlign: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
            borderRadius: '50%',
            padding: '1rem',
            boxShadow: '0 10px 15px -3px rgba(78, 147, 122, 0.3)'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          <div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              fontFamily: '"Ubuntu", sans-serif'
            }}>
              Smart Food Recognition
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              margin: '0.5rem 0 0 0',
              fontSize: '1.1rem'
            }}>
              Upload a photo and let AI identify your ingredients
            </p>
          </div>
        </div>

        {error && (
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(218, 98, 125, 0.1), rgba(218, 98, 125, 0.05))',
            border: '2px solid var(--danger)', 
            borderRadius: '0.75rem', 
            padding: '1.5rem',
            marginBottom: '2rem',
            color: 'var(--danger)',
            textAlign: 'center',
            fontWeight: '500',
            boxShadow: '0 4px 6px -1px rgba(218, 98, 125, 0.2)'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
            {error}
          </div>
        )}

        {/* Image Upload Section */}
        {!isEditing && (
          <div style={{ marginBottom: '2rem' }}>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: `3px dashed ${isDragOver ? 'var(--primary)' : 'var(--border-color)'}`,
                borderRadius: '1rem',
                padding: '3rem 2rem',
                textAlign: 'center',
                background: isDragOver 
                  ? 'linear-gradient(135deg, rgba(78, 147, 122, 0.1), rgba(78, 147, 122, 0.05))'
                  : 'var(--bg-secondary)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => document.getElementById('food-image').click()}
            >
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
                opacity: 0.7
              }}>
                📸
              </div>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: '0 0 1rem 0'
              }}>
                {isDragOver ? 'Drop your image here!' : 'Upload or drag & drop your food photo'}
              </h4>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                margin: 0
              }}>
                Supports JPG, PNG, and other image formats
              </p>
              
              <input
                id="food-image"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
            </div>

            {imagePreview && (
              <div style={{ marginTop: '2rem' }}>
                <div style={{ 
                  position: 'relative', 
                  maxWidth: '500px', 
                  margin: '0 auto',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                }}>
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Food preview"
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <button
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'linear-gradient(135deg, var(--danger), #ff4444)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => {
                      setSelectedImage(null)
                      setImagePreview(null)
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                  <button
                    onClick={handleImageUpload}
                    disabled={isUploading}
                    style={{
                      padding: '1rem 2.5rem',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      background: isUploading 
                        ? 'var(--bg-secondary)' 
                        : 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      cursor: isUploading ? 'not-allowed' : 'pointer',
                      opacity: isUploading ? 0.6 : 1,
                      transition: 'all 0.3s ease',
                      boxShadow: isUploading 
                        ? 'none' 
                        : '0 10px 15px -3px rgba(78, 147, 122, 0.4)',
                      transform: isUploading ? 'none' : 'translateY(0)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                    onMouseEnter={(e) => {
                      if (!isUploading) {
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 20px 25px -5px rgba(78, 147, 122, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isUploading) {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 10px 15px -3px rgba(78, 147, 122, 0.4)'
                      }
                    }}
                  >
                    {isUploading && (
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                    )}
                    {isUploading ? "Analyzing Magic..." : "✨ Analyze Image"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Parsed Items Editing Section */}
        {isEditing && (
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(78, 147, 122, 0.1), rgba(168, 198, 134, 0.05))',
              borderRadius: '0.75rem',
              border: '1px solid var(--primary)'
            }}>
              <div>
                <h4 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--text-primary)',
                  margin: '0 0 0.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>🎯</span>
                  Found {parsedItems.length} food items!
                </h4>
                <p style={{
                  color: 'var(--text-secondary)',
                  margin: 0,
                  fontSize: '1rem'
                }}>
                  Review and complete the details below
                </p>
              </div>
              <button
                onClick={handleReset}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--danger)'
                  e.target.style.color = 'var(--danger)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--border-color)'
                  e.target.style.color = 'var(--text-primary)'
                }}
              >
                🔄 Start Over
              </button>
            </div>

            {parsedItems.length > 0 ? (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                  {parsedItems.map((item, index) => (
                    <EditableIngredientItem
                      key={item.id}
                      item={item}
                      index={index}
                      onRemove={handleRemoveItem}
                      onEdit={handleEditItem}
                    />
                  ))}
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  padding: '2rem 0'
                }}>
                  <button
                    onClick={handleAddAllItems}
                    disabled={parsedItems.length === 0 || !allItemsValid}
                    style={{
                      padding: '1.25rem 3rem',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      background: (parsedItems.length === 0 || !allItemsValid) 
                        ? 'var(--bg-secondary)' 
                        : 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '1rem',
                      cursor: (parsedItems.length === 0 || !allItemsValid) ? 'not-allowed' : 'pointer',
                      opacity: (parsedItems.length === 0 || !allItemsValid) ? 0.6 : 1,
                      transition: 'all 0.3s ease',
                      boxShadow: (parsedItems.length === 0 || !allItemsValid) 
                        ? 'none' 
                        : '0 15px 20px -5px rgba(78, 147, 122, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                    onMouseEnter={(e) => {
                      if (parsedItems.length > 0 && allItemsValid) {
                        e.target.style.transform = 'translateY(-3px)'
                        e.target.style.boxShadow = '0 25px 30px -5px rgba(78, 147, 122, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (parsedItems.length > 0 && allItemsValid) {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 15px 20px -5px rgba(78, 147, 122, 0.4)'
                      }
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}></span>
                    Add All Items to Fridge ({parsedItems.length})
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem', 
                color: 'var(--text-secondary)',
                fontSize: '1.2rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤷‍♂️</div>
                No items remaining. Click "Start Over" to try again.
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function EditableIngredientItem({ item, index, onRemove, onEdit }) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [editValue, setEditValue] = useState(item.name)

  const handleSaveName = () => {
    if (editValue.trim()) {
      onEdit(item.id, 'name', editValue.trim())
      setIsEditingName(false)
    }
  }

  const handleCancelName = () => {
    setEditValue(item.name)
    setIsEditingName(false)
  }

  const isValid = item.name && item.name.trim() && item.quantity && item.expiration_date

  return (
    <div style={{
      background: isValid 
        ? 'linear-gradient(135deg, var(--bg-card), rgba(78, 147, 122, 0.03))' 
        : 'linear-gradient(135deg, var(--bg-card), rgba(218, 98, 125, 0.03))',
      border: `2px solid ${isValid ? 'var(--primary)' : 'var(--danger)'}`,
      borderRadius: '1rem',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Item number badge */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: '20px',
        background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
        color: 'white',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
      }}>
        {index + 1}
      </div>

      {/* Status indicator */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        fontSize: '1.5rem'
      }}>
        {isValid ? '✅' : '⚠️'}
      </div>

      {/* Name Section */}
      <div style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
        {isEditingName ? (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveName()
                if (e.key === "Escape") handleCancelName()
              }}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '2px solid var(--primary)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: '500'
              }}
              autoFocus
            />
            <button
              onClick={handleSaveName}
              style={{
                padding: '0.75rem 1rem',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              💾 Save
            </button>
            <button
              onClick={handleCancelName}
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid var(--border-color)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              ❌ Cancel
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
              <span style={{ 
                fontWeight: 'bold', 
                fontSize: '1.3rem',
                color: 'var(--text-primary)'
              }}>
                {item.name}
              </span>
              {item.category && (
                <span style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                  color: 'white',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {item.category}
                </span>
              )}
              {item.confidence && (
                <span style={{
                  padding: '0.5rem 1rem',
                  border: '2px solid var(--primary)',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--primary)',
                  fontWeight: '500'
                }}>
                  {Math.round(item.confidence * 100)}% confident
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setIsEditingName(true)}
                style={{
                  padding: '0.5rem 1rem',
                  color: 'var(--primary)',
                  backgroundColor: 'transparent',
                  border: '2px solid var(--primary)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--primary)'
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = 'var(--primary)'
                }}
              >
                Edit
              </button>
              <button 
                onClick={() => onRemove(item.id)} 
                style={{
                  padding: '0.5rem',
                  color: 'var(--danger)',
                  backgroundColor: 'transparent',
                  border: '2px solid var(--danger)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--danger)'
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = 'var(--danger)'
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quantity and Expiration Date Section */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <label style={{ 
            display: 'block', 
            fontSize: '1rem', 
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span></span> Quantity
          </label>
          <input
            type="number"
            value={item.quantity || ''}
            onChange={(e) => onEdit(item.id, 'quantity', e.target.value)}
            min="1"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `2px solid ${item.quantity ? 'var(--primary)' : 'var(--danger)'}`,
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: '500'
            }}
            placeholder="1"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ 
            display: 'block', 
            fontSize: '1rem', 
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>📅</span> Expiration Date
          </label>
          <input
            type="date"
            value={item.expiration_date || ''}
            onChange={(e) => onEdit(item.id, 'expiration_date', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `2px solid ${item.expiration_date ? 'var(--primary)' : 'var(--danger)'}`,
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          />
        </div>
      </div>
    </div>
  )
}