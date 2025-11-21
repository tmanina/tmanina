"use client"

import * as React from "react"
import { Sun, Moon, Bell } from "lucide-react"

type AdhkarPeriod = "morning" | "evening" | null

export function Header() {
  const [isDark, setIsDark] = React.useState(true)
  const [scrolled, setScrolled] = React.useState(false)
  const [adhkarNotification, setAdhkarNotification] = React.useState<AdhkarPeriod>(null)
  const [showNotification, setShowNotification] = React.useState(false)

  React.useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme === "light") {
      document.documentElement.setAttribute("data-bs-theme", "light")
      setIsDark(false)
    } else {
      // Default to dark if no theme is saved or if saved theme is dark
      document.documentElement.setAttribute("data-bs-theme", "dark")
      setIsDark(true)
    }

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check time for adhkar notification
  React.useEffect(() => {
    const checkAdhkarTime = () => {
      const now = new Date()
      const hour = now.getHours()
      const today = now.toDateString()

      // Get last completion from localStorage
      const lastMorningRead = localStorage.getItem("lastMorningAdhkarRead")
      const lastEveningRead = localStorage.getItem("lastEveningAdhkarRead")

      // Morning: 6 AM - 12 PM
      if (hour >= 6 && hour < 12) {
        // Only show if not read today
        if (lastMorningRead !== today) {
          setAdhkarNotification("morning")
          setShowNotification(true)
        } else {
          setAdhkarNotification(null)
          setShowNotification(false)
        }
      }
      // Evening: 3 PM - 7 PM (15:00 - 19:00)
      else if (hour >= 15 && hour < 19) {
        // Only show if not read today
        if (lastEveningRead !== today) {
          setAdhkarNotification("evening")
          setShowNotification(true)
        } else {
          setAdhkarNotification(null)
          setShowNotification(false)
        }
      } else {
        setAdhkarNotification(null)
        setShowNotification(false)
      }
    }

    checkAdhkarTime()
    // Check every minute
    const interval = setInterval(checkAdhkarTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    document.documentElement.setAttribute("data-bs-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    setIsDark(!isDark)
  }

  const handleNotificationClick = () => {
    if (!adhkarNotification) return

    // First activate adhkar-list tab
    const adhkarListTab = document.getElementById('adhkar-list-tab') as HTMLButtonElement
    if (adhkarListTab) adhkarListTab.click()

    // Then click the appropriate adhkar card after a short delay
    setTimeout(() => {
      // Find and click the adhkar card (morning or evening)
      const cardSelector = adhkarNotification === "morning"
        ? ".adhkar-card-morning"
        : ".adhkar-card-evening"

      const adhkarCard = document.querySelector(cardSelector) as HTMLElement
      if (adhkarCard) {
        adhkarCard.click()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 150) // Slightly longer delay to ensure tab is loaded

    // Hide the notification
    setShowNotification(false)
  }

  const getNotificationText = () => {
    if (adhkarNotification === "morning") return "لا تنسَ أذكار الصباح"
    if (adhkarNotification === "evening") return "لا تنسَ أذكار المساء"
    return ""
  }

  return (
    <header
      className={`navbar navbar-expand-lg ${isDark ? "navbar-dark bg-dark" : "navbar-light bg-white"
        } sticky-top transition-all duration-300 ${scrolled ? "shadow-lg backdrop-blur-md" : "shadow-sm"
        }`}
      style={{
        ...(scrolled && {
          backgroundColor: isDark
            ? "rgba(33, 37, 41, 0.9)"
            : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }),
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center animate-fade-in" href="#">
          {/* Logo with gradient background */}
          <div className="rounded-3 gradient-bg p-3 me-2 shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-110">
            <i className="fas fa-mosque text-white fs-4"></i>
          </div>

          <div>
            <h1 className="h3 mb-0 fw-bold gradient-text animate-fade-in-down">
              طمأنينة
            </h1>
            <p className="small text-muted mb-0 d-none d-sm-block animate-fade-in-up">
              رفيقك الروحاني
            </p>
          </div>
        </a>

        <div className="d-flex align-items-center gap-2">
          {/* Theme Toggle */}
          <button
            className={`btn rounded-circle p-2 position-relative overflow-hidden transition-all duration-300 ${isDark
              ? "btn-outline-light hover:bg-white/10"
              : "btn-outline-dark hover:bg-black/5"
              }`}
            onClick={toggleTheme}
            aria-label={isDark ? "تبديل إلى الوضع النهاري" : "تبديل إلى الوضع الليلي"}
            style={{
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="position-relative">
              {isDark ? (
                <Sun className="lucide-icon" size={20} />
              ) : (
                <Moon className="lucide-icon" size={20} />
              )}
            </div>
          </button>

          {/* Smart Adhkar Notifications Button with Dropdown */}
          <div className="position-relative dropdown">
            <button
              className={`btn rounded-circle p-2 position-relative transition-all duration-300 ${isDark
                ? "btn-outline-light hover:bg-white/10"
                : "btn-outline-dark hover:bg-black/5"
                }`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="الإشعارات"
              style={{
                width: "42px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell className="lucide-icon" size={20} />
              {/* Smart Notification Badge - Shows (1) */}
              {showNotification && adhkarNotification && (
                <span
                  className="position-absolute top-0 start-0 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: adhkarNotification === "morning" ? "#f59e0b" : "#8b5cf6",
                    fontSize: "0.65rem",
                    padding: "0.25rem 0.4rem",
                  }}
                >
                  1
                  <span className="visually-hidden">{getNotificationText()}</span>
                </span>
              )}
            </button>

            {/* Dropdown Menu from Bottom */}
            {showNotification && adhkarNotification && (
              <ul
                className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 animate-fade-in"
                style={{
                  minWidth: "280px",
                  borderRadius: "0.75rem",
                }}
              >
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center gap-3 py-3 px-3"
                    onClick={handleNotificationClick}
                    type="button"
                    style={{
                      borderRadius: "0.5rem",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: adhkarNotification === "morning" ? "#f59e0b" : "#8b5cf6",
                      }}
                    >
                      <i className={`fas ${adhkarNotification === "morning" ? "fa-sun" : "fa-moon"} text-white`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-semibold mb-1" style={{ fontSize: "0.95rem" }}>
                        {getNotificationText()}
                      </div>
                      <small className="text-muted">
                        {adhkarNotification === "morning" ? "وقت الصباح" : "وقت المساء"}
                      </small>
                    </div>
                    <i className="fas fa-chevron-left text-muted" style={{ fontSize: "0.8rem" }}></i>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lucide-icon {
          transition: transform 0.3s ease;
        }

        button:hover .lucide-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Dropdown notification item hover */
        .dropdown-item:hover {
          background-color: var(--bs-light-bg-subtle);
        }

        .dropdown-item:active {
          background-color: var(--bs-primary-bg-subtle);
        }
      `}</style>
    </header>
  )
}
