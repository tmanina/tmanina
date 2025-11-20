"use client"

import * as React from "react"

type TasbihButton = {
    id: string
    text: string
}

export function TasbihCircle() {
    const buttonSets: TasbihButton[][] = [
        [
            { id: "subhan", text: "سبحان الله" },
            { id: "hamd", text: "الحمد لله" },
            { id: "akbar", text: "الله أكبر" },
        ],
        [
            { id: "tahlil", text: "لا إله إلا الله" },
            { id: "lahawla", text: "لا حول ولا قوة إلا بالله" },
            { id: "istighfar", text: "استغفر الله" },
        ],
    ]

    const [currentSetIndex, setCurrentSetIndex] = React.useState(0)
    const [selectedDhikr, setSelectedDhikr] = React.useState<string>("subhan")
    const [clickCount, setClickCount] = React.useState(0)
    const [isPressed, setIsPressed] = React.useState(false)
    const [allCompleted, setAllCompleted] = React.useState(false)
    const [completedDhikrs, setCompletedDhikrs] = React.useState<string[]>([])

    const TARGET = 3 // 3 total clicks
    const buttons = buttonSets[currentSetIndex]

    const handleToggleSet = () => {
        const newSetIndex = currentSetIndex === 0 ? 1 : 0
        setCurrentSetIndex(newSetIndex)
        // Set first button of new set as selected
        setSelectedDhikr(buttonSets[newSetIndex][0].id)
        setClickCount(0)
        setAllCompleted(false) // Reset completion status when changing sets
        setCompletedDhikrs([]) // Clear completed dhikrs for the new set
    }

    const handleButtonClick = (dhikrId: string) => {
        if (!completedDhikrs.includes(dhikrId)) {
            setSelectedDhikr(dhikrId)
            setClickCount(0) // Reset count when switching dhikr
        }
    }

    const handleCircleClick = () => {
        if (clickCount >= TARGET || completedDhikrs.includes(selectedDhikr)) return

        // Animation
        setIsPressed(true)
        setTimeout(() => setIsPressed(false), 120)

        // Vibration on each click
        if (navigator.vibrate) navigator.vibrate(50)

        const newCount = clickCount + 1

        if (newCount >= TARGET) {
            // Completed this dhikr
            setClickCount(TARGET)

            // Strong vibration on completion
            if (navigator.vibrate) navigator.vibrate([100, 50, 100])

            // Mark as completed
            const newCompleted = [...completedDhikrs, selectedDhikr]
            setCompletedDhikrs(newCompleted)

            // Auto-advance to next dhikr after 500ms
            setTimeout(() => {
                const currentIndex = buttons.findIndex(b => b.id === selectedDhikr)
                const nextButton = buttons.find((b, idx) => idx > currentIndex && !newCompleted.includes(b.id))

                if (nextButton) {
                    setSelectedDhikr(nextButton.id)
                    setClickCount(0)
                } else {
                    // All completed in current set
                    setAllCompleted(true)
                }
            }, 500)
        } else {
            setClickCount(newCount)
        }
    }

    const handleReset = () => {
        setClickCount(0)
        setAllCompleted(false)
        setSelectedDhikr(buttons[0].id)
        setCompletedDhikrs([])
    }

    const selectedButton = buttons.find((b) => b.id === selectedDhikr)

    return (
        <div className="col-12">
            <style jsx>{`
        .tasbih-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) scale(1); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px) scale(0.98); }
          20%, 40%, 60%, 80% { transform: translateX(2px) scale(0.98); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        .circle-shake {
          animation: shake 0.3s ease-in-out, pulse 0.3s ease-in-out;
        }
        
        @media (max-width: 768px) {
          .tasbih-container {
            gap: 1rem;
          }
          .circle-wrapper {
            width: 200px !important;
            height: 200px !important;
          }
          .circle-svg {
            width: 200px !important;
            height: 200px !important;
          }
          .inner-circle {
            width: 160px !important;
            height: 160px !important;
          }
        }
      `}</style>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                {/* Header */}
                <div className="gradient-bg text-white p-3 text-center">
                    <h4 className="mb-0 d-flex align-items-center justify-content-center gap-2">
                        <i className="fas fa-dharmachakra"></i>
                        <span>حلقة تسبيح</span>
                    </h4>
                </div>

                {/* Content */}
                <div className="card-body p-4">
                    {!allCompleted ? (
                        <div className="tasbih-container">
                            {/* Buttons Column - Always Left */}
                            <div style={{ minWidth: "140px", position: "relative" }}>
                                {/* Toggle button in corner */}
                                <button
                                    type="button"
                                    onClick={handleToggleSet}
                                    className="btn btn-sm btn-outline-secondary rounded-circle"
                                    style={{
                                        position: "absolute",
                                        top: "-35px",
                                        right: "-10px",
                                        width: "32px",
                                        height: "32px",
                                        padding: "0",
                                        zIndex: 10,
                                        transition: "all 0.3s ease",
                                    }}
                                    title="تبديل الأذكار"
                                >
                                    <i className="fas fa-sync-alt" style={{ fontSize: "0.75rem" }}></i>
                                </button>

                                <div className="d-flex flex-column gap-2">
                                    {buttons.map((button) => (
                                        <button
                                            key={button.id}
                                            type="button"
                                            onClick={() => handleButtonClick(button.id)}
                                            disabled={completedDhikrs.includes(button.id)}
                                            className={`btn rounded-pill ${button.id === selectedDhikr
                                                ? "gradient-bg text-white"
                                                : completedDhikrs.includes(button.id)
                                                    ? "btn-success"
                                                    : "btn-outline-primary"
                                                }`}
                                            style={{
                                                transition: "all 0.3s ease",
                                                fontSize: "0.9rem",
                                                fontWeight: "600",
                                                padding: "0.5rem 1.5rem",
                                                opacity: completedDhikrs.includes(button.id) ? 0.7 : 1,
                                            }}
                                        >
                                            {button.text}
                                            {completedDhikrs.includes(button.id) && <i className="fas fa-check ms-2"></i>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Circle with 3-segment Progress Border */}
                            <div className="position-relative d-flex justify-content-center align-items-center circle-wrapper" style={{ width: "280px", height: "280px" }}>
                                {/* SVG Progress Circle with 3 segments */}
                                <svg width="280" height="280" viewBox="0 0 280 280" className="circle-svg" style={{ position: "absolute" }}>
                                    <defs>
                                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#7d9d7f" />
                                            <stop offset="100%" stopColor="#d4a574" />
                                        </linearGradient>
                                    </defs>

                                    {/* 3 Background segments (gray) with gaps */}
                                    {[0, 1, 2].map((segmentIndex) => {
                                        const radius = 120
                                        const centerX = 140
                                        const centerY = 140
                                        const strokeWidth = 10

                                        // Each segment is 110 degrees, gap is 10 degrees
                                        const segmentAngle = 110
                                        const startAngle = -90 + segmentIndex * 120
                                        const endAngle = startAngle + segmentAngle

                                        const startRad = (startAngle * Math.PI) / 180
                                        const endRad = (endAngle * Math.PI) / 180

                                        const x1 = centerX + radius * Math.cos(startRad)
                                        const y1 = centerY + radius * Math.sin(startRad)
                                        const x2 = centerX + radius * Math.cos(endRad)
                                        const y2 = centerY + radius * Math.sin(endRad)

                                        return (
                                            <path
                                                key={`bg-${segmentIndex}`}
                                                d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
                                                fill="none"
                                                stroke="#e5e7eb"
                                                strokeWidth={strokeWidth}
                                                strokeLinecap="round"
                                            />
                                        )
                                    })}

                                    {/* Progress segments (fill based on clicks) */}
                                    {[0, 1, 2].map((segmentIndex) => {
                                        // Only show segment if we've reached that click count
                                        if (clickCount <= segmentIndex) return null

                                        const radius = 120
                                        const centerX = 140
                                        const centerY = 140
                                        const strokeWidth = 10

                                        const segmentAngle = 110
                                        const startAngle = -90 + segmentIndex * 120
                                        const endAngle = startAngle + segmentAngle

                                        const startRad = (startAngle * Math.PI) / 180
                                        const endRad = (endAngle * Math.PI) / 180

                                        const x1 = centerX + radius * Math.cos(startRad)
                                        const y1 = centerY + radius * Math.sin(startRad)
                                        const x2 = centerX + radius * Math.cos(endRad)
                                        const y2 = centerY + radius * Math.sin(endRad)

                                        return (
                                            <path
                                                key={`progress-${segmentIndex}`}
                                                d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
                                                fill="none"
                                                stroke="url(#progressGradient)"
                                                strokeWidth={strokeWidth}
                                                strokeLinecap="round"
                                                style={{
                                                    transition: "all 0.3s ease",
                                                }}
                                            />
                                        )
                                    })}
                                </svg>

                                {/* Center clickable circle with dhikr name */}
                                <div
                                    onClick={handleCircleClick}
                                    className={`rounded-circle shadow-lg bg-body inner-circle d-flex align-items-center justify-content-center ${isPressed ? "circle-shake" : ""
                                        }`}
                                    style={{
                                        width: "220px",
                                        height: "220px",
                                        border: "3px solid var(--bs-border-color)",
                                        cursor: "pointer",
                                        userSelect: "none",
                                        touchAction: "manipulation",
                                        zIndex: 2,
                                    }}
                                >
                                    <span className="h4 text-center px-4 fw-bold gradient-text">
                                        {selectedButton?.text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Completion Message */}
                            <div className="text-center py-5">
                                <div className="mb-4">
                                    <i className="fas fa-check-circle text-success" style={{ fontSize: "5rem" }}></i>
                                </div>
                                <h2 className="mb-3 gradient-text fw-bold">تم بحمد الله</h2>
                                <p className="text-body-secondary mb-4">أكملت حلقة التسبيح كاملة</p>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="btn btn-lg gradient-bg text-white rounded-pill px-5 py-3"
                                >
                                    <i className="fas fa-rotate-right me-2"></i>
                                    أعد التسبيح
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
