"use client"

import { useState } from "react"
import NavSideBar from "../components/NavSideBar"

function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const tutorialSteps = [
    {
      title: "Welcome to Fridge!",
      icon: "🎉",
      content: (
        <div>
          <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
            Welcome to your smart kitchen companion! Fridge helps you manage your ingredients and discover amazing
            recipes.
          </p>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(78, 147, 122, 0.1), rgba(168, 198, 134, 0.05))",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--primary)",
            }}
          >
            <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.1rem" }}>What you'll learn:</h4>
            <ul style={{ color: "var(--text-primary)", lineHeight: "1.8" }}>
              <li>How to add ingredients to your fridge</li>
              <li>Using AI to scan food photos</li>
              <li>Finding recipes with your ingredients</li>
              <li>Saving your favorite recipes</li>
              <li>Getting cooking instructions</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Managing Your Fridge",
      icon: "🥬",
      content: (
        <div>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
            Keep track of all your ingredients with expiration dates and quantities.
          </p>

          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.2rem" }}>
              Adding Ingredients Manually
            </h4>
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <ol style={{ color: "var(--text-primary)", lineHeight: "1.8" }}>
                <li>Go to "My Fridge" in the sidebar</li>
                <li>Fill in the ingredient name, quantity, and expiration date</li>
                <li>Click "Add Ingredient" to save it</li>
              </ol>
            </div>
          </div>

          <div>
            <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.2rem" }}>
              Smart Photo Recognition
            </h4>
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
              }}
            >
              <p style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
                Our AI can identify multiple ingredients from a single photo!
              </p>
              <ol style={{ color: "var(--text-primary)", lineHeight: "1.8" }}>
                <li>Scroll down to "Smart Food Recognition"</li>
                <li>Upload or drag & drop a photo of your groceries</li>
                <li>Review and edit the detected items</li>
                <li>Add quantities and expiration dates</li>
                <li>Click "Add All Items to Fridge"</li>
              </ol>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Exploring Recipes",
      icon: "🍳",
      content: (
        <div>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
            Discover delicious recipes based on what you have in your fridge.
          </p>

          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.2rem" }}>Selecting Ingredients</h4>
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <ol style={{ color: "var(--text-primary)", lineHeight: "1.8" }}>
                <li>Go to "Explore Recipes" in the sidebar</li>
                <li>Click on "Select Ingredients for Recipes" dropdown</li>
                <li>Choose which ingredients you want to cook with</li>
                <li>Use "Select All" or "Deselect All" for quick changes</li>
              </ol>
            </div>
          </div>

          <div>
            <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.2rem" }}>Recipe Cards</h4>
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
              }}
            >
              <p style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
                Swipe through recipe suggestions tailored to your ingredients:
              </p>
              <ul style={{ color: "var(--text-primary)", lineHeight: "1.8" }}>
                <li>
                  <strong>Green button:</strong> Save recipe to your collection
                </li>
                <li>
                  <strong>Red button:</strong> Skip to the next recipe
                </li>
                <li>
                  <strong>Ingredients shown:</strong> What you have vs. what you need
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Saving & Finding Recipes",
      icon: "💾",
      content: (
        <div>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
            Build your personal recipe collection and access cooking instructions.
          </p>

          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.2rem" }}>Saving Recipes</h4>
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <p style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>When you find a recipe you like:</p>
              <ol style={{ color: "var(--text-primary)", lineHeight: "1.8" }}>
                <li>Click the green save button (bookmark icon)</li>
                <li>Watch the satisfying save animation</li>
                <li>The recipe is automatically added to your collection</li>
              </ol>
            </div>
          </div>

          <div>
            <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.2rem" }}>
              Accessing Saved Recipes
            </h4>
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
              }}
            >
              <ol style={{ color: "var(--text-primary)", lineHeight: "1.8" }}>
                <li>Go to "Saved Recipes" in the sidebar</li>
                <li>Browse your personal recipe collection</li>
                <li>Click "View Recipe" to get full cooking instructions</li>
                <li>Remove recipes you no longer want with the trash icon</li>
              </ol>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pro Tips & Features",
      icon: "✨",
      content: (
        <div>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
            Make the most of your Fridge experience with these helpful tips!
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
              }}
            >
              <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.1rem" }}>Expiration Tracking</h4>
              <p style={{ color: "var(--text-primary)", lineHeight: "1.6" }}>
                Check your fridge page for expired, expiring today, and expiring soon items to reduce food waste.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
              }}
            >
              <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.1rem" }}>Photo Tips</h4>
              <p style={{ color: "var(--text-primary)", lineHeight: "1.6" }}>
                For best AI recognition, take clear photos with good lighting and separate items when possible.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
              }}
            >
              <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.1rem" }}>Fresh Recipes</h4>
              <p style={{ color: "var(--text-primary)", lineHeight: "1.6" }}>
                Change your ingredient selection to discover new recipe combinations and cooking ideas.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
              }}
            >
              <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.1rem" }}>Profile Stats</h4>
              <p style={{ color: "var(--text-primary)", lineHeight: "1.6" }}>
                Visit your profile to see how many ingredients you have stored and access quick actions.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "linear-gradient(135deg, rgba(78, 147, 122, 0.1), rgba(168, 198, 134, 0.05))",
              borderRadius: "0.75rem",
              border: "1px solid var(--primary)",
              textAlign: "center",
            }}
          >
            <h4 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.2rem" }}>You're Ready to Cook!</h4>
            <p style={{ color: "var(--text-primary)", lineHeight: "1.6" }}>
              You now know everything you need to make the most of Fridge. Start by adding some ingredients to your
              fridge and discover amazing recipes!
            </p>
          </div>
        </div>
      ),
    },
  ]

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step) => {
    setCurrentStep(step)
  }

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <NavSideBar />
      <div className="flex flex-col overflow-y-auto overflow-x-hidden p-6 w-full">
        <h1 className="text-4xl font-bold mb-6 page-title">Tutorial</h1>

        {/* Progress Bar */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              Step {currentStep + 1} of {tutorialSteps.length}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              {Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}% Complete
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${((currentStep + 1) / tutorialSteps.length) * 100}%`,
                height: "100%",
                background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                borderRadius: "4px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Step Navigation Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          {tutorialSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: index === currentStep ? "var(--primary)" : "var(--bg-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (index !== currentStep) {
                  e.target.style.backgroundColor = "var(--border-color)"
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentStep) {
                  e.target.style.backgroundColor = "var(--bg-secondary)"
                }
              }}
            />
          ))}
        </div>

        {/* Tutorial Content */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(78, 147, 122, 0.05) 100%)",
            border: "2px solid var(--primary)",
            borderRadius: "1rem",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
            position: "relative",
            overflow: "hidden",
            minHeight: "500px",
          }}
        >
          {/* Decorative background elements */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "100px",
              height: "100px",
              background: "linear-gradient(45deg, var(--primary), var(--primary-light))",
              borderRadius: "50%",
              opacity: 0.1,
              zIndex: 0,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Step Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                  borderRadius: "50%",
                  padding: "1rem",
                  fontSize: "2rem",
                  boxShadow: "0 10px 15px -3px rgba(78, 147, 122, 0.3)",
                }}
              >
                {tutorialSteps[currentStep].icon}
              </div>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  margin: 0,
                  fontFamily: '"Ubuntu", sans-serif',
                }}
              >
                {tutorialSteps[currentStep].title}
              </h2>
            </div>

            {/* Step Content */}
            <div style={{ fontSize: "1rem", lineHeight: "1.6" }}>{tutorialSteps[currentStep].content}</div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              backgroundColor: currentStep === 0 ? "var(--bg-secondary)" : "transparent",
              color: currentStep === 0 ? "var(--text-secondary)" : "var(--primary)",
              border: `2px solid ${currentStep === 0 ? "var(--border-color)" : "var(--primary)"}`,
              borderRadius: "0.75rem",
              cursor: currentStep === 0 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: currentStep === 0 ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (currentStep !== 0) {
                e.target.style.backgroundColor = "var(--primary)"
                e.target.style.color = "white"
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep !== 0) {
                e.target.style.backgroundColor = "transparent"
                e.target.style.color = "var(--primary)"
              }
            }}
          >
            Previous
          </button>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
              }}
            >
              {currentStep + 1} / {tutorialSteps.length}
            </span>
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === tutorialSteps.length - 1}
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              background:
                currentStep === tutorialSteps.length - 1
                  ? "var(--bg-secondary)"
                  : "linear-gradient(135deg, var(--primary), var(--primary-light))",
              color: "white",
              border: "none",
              borderRadius: "0.75rem",
              cursor: currentStep === tutorialSteps.length - 1 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: currentStep === tutorialSteps.length - 1 ? 0.6 : 1,
              boxShadow: currentStep === tutorialSteps.length - 1 ? "none" : "0 4px 6px -1px rgba(78, 147, 122, 0.3)",
            }}
            onMouseEnter={(e) => {
              if (currentStep !== tutorialSteps.length - 1) {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 8px 15px -3px rgba(78, 147, 122, 0.4)"
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep !== tutorialSteps.length - 1) {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "0 4px 6px -1px rgba(78, 147, 122, 0.3)"
              }
            }}
          >
            {currentStep === tutorialSteps.length - 1 ? "Complete!" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TutorialPage
