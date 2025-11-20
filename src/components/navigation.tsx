"use client"

import * as React from "react"

type NavItem = {
  id: string
  label: string
  icon?: string
  emoji?: string
  tabButtonId: string
  isDropdown?: boolean
  dropdownItems?: { id: string; label: string; icon: string; tabButtonId: string }[]
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "الرئيسية", icon: "fa-home", tabButtonId: "home-tab" },
  { id: "prayer", label: "الصلاة", icon: "fa-mosque", tabButtonId: "prayer-tab" },
  { id: "adhkar-list", label: "الاذكار", emoji: "🤲", tabButtonId: "adhkar-list-tab" },
  { id: "calendar", label: "التقويم", icon: "fa-calendar", tabButtonId: "calendar-tab" },
  {
    id: "other",
    label: "أخرى",
    icon: "fa-ellipsis-h",
    tabButtonId: "",
    isDropdown: true,
    dropdownItems: [
      { id: "dashboard", label: "لوحة التحكم", icon: "fa-chart-line", tabButtonId: "dashboard-tab" },
      { id: "about", label: "عن التطبيق", icon: "fa-info-circle", tabButtonId: "about-tab" },
    ],
  },
]

export function Navigation() {
  const [activeId, setActiveId] = React.useState<string>("home")
  const [showDropdown, setShowDropdown] = React.useState(false)

  const handleClick = (item: NavItem) => {
    setActiveId(item.id)

    if (typeof document !== "undefined" && item.tabButtonId) {
      const btn = document.getElementById(item.tabButtonId) as HTMLButtonElement | null

      if (btn) {
        btn.click()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  const handleDropdownClick = (subItem: { id: string; label: string; icon: string; tabButtonId: string }) => {
    setActiveId(subItem.id)
    setShowDropdown(false)

    if (typeof document !== "undefined") {
      const btn = document.getElementById(subItem.tabButtonId) as HTMLButtonElement | null

      if (btn) {
        btn.click()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  return (
    <nav
      className="bg-body shadow-lg mb-4 mb-lg-4"
      style={{
        zIndex: 9999,
      }}
    >
      <style jsx>{`
        nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: 1px solid var(--bs-border-color);
          margin-bottom: 0 !important;
        }
        
        @media (min-width: 992px) {
          nav {
            position: relative;
            border-top: none;
            border-bottom: 1px solid var(--bs-border-color);
            border-radius: 0.75rem;
            margin-bottom: 1.5rem !important;
          }
        }
      `}</style>
      <div className="d-flex justify-content-around text-center py-2 py-lg-3">
        {NAV_ITEMS.map((item) => {
          if (item.isDropdown && item.dropdownItems) {
            return (
              <div key={item.id} className="position-relative flex-fill">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="btn btn-link w-100 text-decoration-none p-0"
                >
                  <div
                    className={`d-flex flex-column align-items-center small ${activeId === item.id || item.dropdownItems.some((sub) => sub.id === activeId)
                      ? "text-primary"
                      : "text-secondary"
                      }`}
                  >
                    <i className={`fas ${item.icon} mb-1`}></i>
                    <span className="text-nowrap">{item.label}</span>
                  </div>
                </button>
                {showDropdown && (
                  <div
                    className="position-absolute bottom-100 end-0 mb-2 bg-body border rounded shadow"
                    style={{ minWidth: "150px" }}
                  >
                    {item.dropdownItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        type="button"
                        onClick={() => handleDropdownClick(subItem)}
                        className="btn btn-link w-100 text-decoration-none text-start px-3 py-2"
                      >
                        <i className={`fas ${subItem.icon} ms-2`}></i>
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item)}
              className="btn btn-link flex-fill text-decoration-none p-0"
            >
              <div
                className={`d-flex flex-column align-items-center small ${activeId === item.id ? "text-primary" : "text-secondary"
                  }`}
              >
                {item.emoji ? (
                  <span style={{ fontSize: "1.5rem" }} className="mb-1">
                    {item.emoji}
                  </span>
                ) : (
                  <i className={`fas ${item.icon} mb-1`}></i>
                )}
                <span className="text-nowrap">{item.label}</span>
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
