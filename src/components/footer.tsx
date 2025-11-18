"use client"

import React from "react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white-50 mt-auto py-3">
      <div className="container-fluid">
        <div className="text-center">
          <small>
            <i className="fas fa-copyright me-1"></i>
            {year} Copyright to{" "}
            <strong className="text-white">M.S</strong>

            <span className="mx-2">|</span>

            <i className="fas fa-code me-1"></i>
            Developed by{" "}
            <strong className="text-white">M.S</strong>
          </small>
        </div>
      </div>

      <style jsx>{`
        html,
        body {
          height: 100%;
        }
        footer {
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </footer>
  )
}
