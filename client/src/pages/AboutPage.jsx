"use client"

import NavSideBar from "../components/NavSideBar"

function AboutPage() {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <NavSideBar />
      <div className="flex flex-col overflow-y-auto overflow-x-hidden p-6 w-full">
        <div className="max-w-4xl mx-auto w-full">
          {/* Hero Section */}
          <div
            style={{
              background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(78, 147, 122, 0.05) 100%)",
              border: "2px solid var(--primary)",
              borderRadius: "1rem",
              padding: "3rem",
              marginBottom: "3rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
              position: "relative",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            {/* Decorative background elements */}
            <div
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "80px",
                height: "80px",
                background: "linear-gradient(45deg, var(--primary), var(--primary-light))",
                borderRadius: "50%",
                opacity: 0.1,
                zIndex: 0,
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  margin: "0 0 1rem 0",
                  fontFamily: '"Ubuntu", sans-serif',
                }}
              >
                About Fridge
              </h1>
              <p
                style={{
                  fontSize: "1.3rem",
                  color: "var(--text-secondary)",
                  margin: 0,
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                A journey from kitchen frustration to smart food management, by Frank Schlehofer
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* The Problem */}
            <section
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  fontFamily: '"Ubuntu", sans-serif',
                }}
              >
                The Problem That Started It All
              </h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "1rem" }}>
                Like many people, I found myself constantly asking the same question:{" "}
                <em>"What should I cook tonight?"</em>
                 I'd open my fridge, stare at the ingredients, and somehow never feel inspired. Food would expire before
                I could use it, and I'd end up cooking the same meal I'd been making for the past 4 weeks.
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-primary)" }}>
                I realized I needed a solution that could not only track what I had but also inspire me with recipes
                based on those ingredients. That's when the idea for Fridge was born.
              </p>
            </section>

            {/* The Journey */}
            <section
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  fontFamily: '"Ubuntu", sans-serif',
                }}
              >
                The Development Journey
              </h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}
              >
                <div>
                  <h3 style={{ color: "var(--secondary)", fontSize: "1.3rem", marginBottom: "1rem" }}>
                    Planning & Design
                  </h3>
                  <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-primary)" }}>
                    I started by sketching out user stories and data flow. The core features were clear: ingredient
                    tracking, expiration monitoring, and recipe discovery. I wanted the interface to be clean and
                    intuitive, something I'd actually enjoy using daily.
                  </p>
                </div>
                <div>
                  <h3 style={{ color: "var(--secondary)", fontSize: "1.3rem", marginBottom: "1rem" }}>
                    Building the MVP
                  </h3>
                  <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-primary)" }}>
                    I focused on the essential features first: adding ingredients manually, tracking expiration dates,
                    and basic recipe suggestions. This helped me validate the concept and understand what users actually
                    needed most.
                  </p>
                </div>
                <div>
                  <h3 style={{ color: "var(--secondary)", fontSize: "1.3rem", marginBottom: "1rem" }}>
                    Adding Intelligence
                  </h3>
                  <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-primary)" }}>
                    The game-changer was integrating AI-powered image recognition. Now users could simply take a photo
                    of their groceries and have ingredients automatically detected and added to their fridge. This made
                    the app truly convenient to use.
                  </p>
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  fontFamily: '"Ubuntu", sans-serif',
                }}
              >
                Technology Stack
              </h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}
              >
                <div
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "1.5rem",
                    borderRadius: "0.75rem",
                  }}
                >
                  <h3 style={{ color: "var(--primary)", fontSize: "1.2rem", marginBottom: "1rem" }}>Frontend</h3>
                  <ul style={{ color: "var(--text-primary)", lineHeight: "1.6", paddingLeft: "1.2rem" }}>
                    <li>
                      <strong>React</strong> - Component-based UI development
                    </li>
                    <li>
                      <strong>Vite</strong> - Fast build tool and dev server
                    </li>
                    <li>
                      <strong>React Router</strong> - Client-side routing
                    </li>
                    <li>
                      <strong>Tailwind CSS</strong> - Utility-first styling
                    </li>
                  </ul>
                </div>
                <div
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "1.5rem",
                    borderRadius: "0.75rem",
                  }}
                >
                  <h3 style={{ color: "var(--primary)", fontSize: "1.2rem", marginBottom: "1rem" }}>Backend</h3>
                  <ul style={{ color: "var(--text-primary)", lineHeight: "1.6", paddingLeft: "1.2rem" }}>
                    <li>
                      <strong>Node.js</strong> - Server runtime environment
                    </li>
                    <li>
                      <strong>Express.js</strong> - Web application framework
                    </li>
                    <li>
                      <strong>PostgreSQL</strong> - Relational database
                    </li>
                    <li>
                      <strong>JWT</strong> - Authentication & authorization
                    </li>
                  </ul>
                </div>
                <div
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "1.5rem",
                    borderRadius: "0.75rem",
                  }}
                >
                  <h3 style={{ color: "var(--primary)", fontSize: "1.2rem", marginBottom: "1rem" }}>AI & APIs</h3>
                  <ul style={{ color: "var(--text-primary)", lineHeight: "1.6", paddingLeft: "1.2rem" }}>
                    <li>
                      <strong>Google Cloud Vision API</strong> - Food image recognition
                    </li>
                    <li>
                      <strong>Spoonacular API</strong> - Recipe data and suggestions
                    </li>
                    <li>
                      <strong>Multer</strong> - File upload handling
                    </li>
                    <li>
                      <strong>Sharp</strong> - Image processing
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Development Process */}
            <section
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  fontFamily: '"Ubuntu", sans-serif',
                }}
              >
                Development Process & Challenges
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ color: "var(--secondary)", fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                    Database Design
                  </h3>
                  <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-primary)" }}>
                    Designing the database schema was crucial. I needed to efficiently store user data, ingredients with
                    expiration tracking, saved recipes, and user preferences. PostgreSQL's relational structure was
                    perfect for maintaining data integrity across these interconnected entities.
                  </p>
                </div>
                <div>
                  <h3 style={{ color: "var(--secondary)", fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                    AI Integration
                  </h3>
                  <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-primary)" }}>
                    Integrating computer vision for food recognition was both exciting and challenging. I had to handle
                    image uploads, process them through the AI service, parse the results, and present them in an
                    editable format for users. The key was making it feel seamless and accurate.
                  </p>
                </div>
                <div>
                  <h3 style={{ color: "var(--secondary)", fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                    User Experience
                  </h3>
                  <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-primary)" }}>
                    Every feature was designed with daily use in mind. The click-through recipe interface, expiration
                    alerts, and bulk ingredient adding were all born from thinking about how I actually use my kitchen.
                    The goal was to make healthy cooking more accessible and less overwhelming.
                  </p>
                </div>
              </div>
            </section>

            {/* LinkedIn Journey */}
            <section
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  fontFamily: '"Ubuntu", sans-serif',
                }}
              >
                Sharing the Journey on LinkedIn
              </h2>
              <p
                style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "1.5rem" }}
              >
                Throughout the development process, I've been documenting my journey with weekly LinkedIn posts. These
                posts cover everything from technical challenges to design decisions, and the lessons learned along the
                way.
              </p>
              <div
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h3 style={{ color: "var(--primary)", fontSize: "1.2rem", marginBottom: "1rem" }}>
                  Weekly Post Topics
                </h3>
                <ul style={{ color: "var(--text-primary)", lineHeight: "1.6", paddingLeft: "1.2rem" }}>
                  <li>Setting up the development environment and choosing the tech stack</li>
                  <li>Database design decisions and PostgreSQL schema planning</li>
                  <li>Building the authentication system with JWT</li>
                  <li>Integrating AI-powered image recognition for food detection</li>
                  <li>Creating an intuitive user interface with React and Tailwind</li>
                  <li>Implementing the recipe recommendation algorithm</li>
                  <li>Handling file uploads and image processing</li>
                  <li>Optimizing performance and user experience</li>
                </ul>
              </div>
              <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-primary)" }}>
                These posts have been a great way to connect with other developers, get feedback, and share knowledge
                with the community. It's amazing how much you learn when you have to explain your process to others!
              </p>
            </section>

            {/* Future Plans */}
            <section
              style={{
                background: "linear-gradient(135deg, rgba(78, 147, 122, 0.1), rgba(168, 198, 134, 0.05))",
                border: "1px solid var(--primary)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  fontFamily: '"Ubuntu", sans-serif',
                }}
              >
                What's Next?
              </h2>
              <p
                style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "1.5rem" }}
              >
                Fridge is constantly evolving. I'm always looking for ways to make it more useful and enjoyable to use.
                Some features I'm excited to work on include:
              </p>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}
              >
                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "1rem", borderRadius: "0.5rem" }}>
                  <strong style={{ color: "var(--primary)" }}>Smart Notifications:</strong> Proactive alerts for
                  expiring items
                </div>
                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "1rem", borderRadius: "0.5rem" }}>
                  <strong style={{ color: "var(--primary)" }}>Meal Planning:</strong> Weekly meal planning with shopping
                  lists
                </div>
                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "1rem", borderRadius: "0.5rem" }}>
                  <strong style={{ color: "var(--primary)" }}>Social Features:</strong> Share recipes and cooking tips
                  with friends
                </div>
                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "1rem", borderRadius: "0.5rem" }}>
                  <strong style={{ color: "var(--primary)" }}>Nutrition Tracking:</strong> Detailed nutritional
                  information and goals
                </div>
              </div>
            </section>

            {/* Contact */}
            <section
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: "1rem",
                  fontFamily: '"Ubuntu", sans-serif',
                }}
              >
                Let's Connect!
              </h2>
              <p
                style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "1.5rem" }}
              >
                I'd love to hear your thoughts on Fridge or connect about development, cooking, or anything in between.
                Feel free to reach out on LinkedIn where I share regular updates about this project and others.
              </p>

              <div style={{ marginBottom: "1.5rem" }}>
                <a
                  href="https://www.linkedin.com/in/frank-schlehofer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem 2rem",
                    background: "linear-gradient(135deg, #0077B5, #005885)",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "0.75rem",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 6px -1px rgba(0, 119, 181, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 8px 15px -3px rgba(0, 119, 181, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 119, 181, 0.3)"
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>

              <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
                Thanks for taking the time to learn about Fridge. Happy cooking! 👨‍🍳
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
