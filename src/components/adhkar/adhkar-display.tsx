"use client"

import * as React from "react"
import { type AdhkarConfig, type RemainingMap } from "./types"
import { getInitialRemaining, incrementDailyDhikr, copyDhikr } from "./utils"

interface AdhkarDisplayProps {
    config: AdhkarConfig
    prefix: string
}

export function AdhkarDisplay({ config, prefix }: AdhkarDisplayProps) {
    const [remaining, setRemaining] = React.useState<RemainingMap>(() =>
        getInitialRemaining(config.data, prefix)
    )

    const handleDhikrClick = (key: string, maxRepeat: number) => {
        const current = remaining[key] ?? maxRepeat
        if (current <= 0) return

        const newRemaining = current - 1

        // Vibrate on each click
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
            try {
                // Short vibration on each click
                navigator.vibrate?.(40)
            } catch {
                // ignore
            }
        }

        incrementDailyDhikr(1)

        setRemaining((prev) => ({
            ...prev,
            [key]: newRemaining,
        }))

        if (newRemaining <= 0 && current > 0 && typeof navigator !== "undefined" && "vibrate" in navigator) {
            try {
                // Longer vibration pattern on completion
                navigator.vibrate?.(100)
            } catch {
                // ignore
            }
        }
    }

    const resetAllCounters = () => {
        setRemaining(getInitialRemaining(config.data, prefix))
    }

    // Extract gradient color for accents
    const gradientColor = config.gradient.includes('#f59e0b') ? '#f59e0b' :
        config.gradient.includes('#8b5cf6') ? '#8b5cf6' :
            config.gradient.includes('#10b981') ? '#10b981' : '#6366f1'

    // Sort adhkar: incomplete first, completed last
    const sortedAdhkar = React.useMemo(() => {
        return config.data.map((dhikr, index) => ({
            dhikr,
            index,
            key: `${prefix}-${index}`,
        })).sort((a, b) => {
            const aRemaining = remaining[a.key] ?? a.dhikr.repeat
            const bRemaining = remaining[b.key] ?? b.dhikr.repeat
            const aIsDone = aRemaining <= 0
            const bIsDone = bRemaining <= 0

            // Incomplete first (false < true), completed last
            if (aIsDone !== bIsDone) {
                return aIsDone ? 1 : -1
            }
            // Keep original order within same status
            return a.index - b.index
        })
    }, [config.data, remaining, prefix])

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
                {/* Reset button */}
                <div className="d-flex justify-content-end mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-secondary rounded-circle shadow-sm"
                        onClick={resetAllCounters}
                        style={{
                            transition: 'all 0.3s ease',
                            width: '44px',
                            height: '44px',
                            padding: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="إعادة تعيين"
                        aria-label="إعادة تعيين العدادات"
                    >
                        <i className="fas fa-rotate-right fs-5" />
                    </button>
                </div>

                {/* Main card */}
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                    <div className="p-4 p-md-5 text-white position-relative" style={{ background: config.gradient }}>
                        <h2 className="h3 mb-0 d-flex align-items-center gap-3">
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <i className={`fas fa-${config.icon} fs-4`} />
                            </div>
                            <span className="fw-bold">{config.title}</span>
                        </h2>
                    </div>
                    <div className="card-body p-4 p-md-5 bg-body-tertiary">
                        <div className="vstack gap-4">
                            {sortedAdhkar.map(({ dhikr, index, key }) => {
                                const remainingCount = remaining[key] ?? dhikr.repeat
                                const isDone = remainingCount <= 0
                                const circleContent = isDone ? "✓" : remainingCount

                                return (
                                    <div
                                        key={key}
                                        onClick={() => handleDhikrClick(key, dhikr.repeat)}
                                        className="position-relative"
                                        style={{
                                            cursor: "pointer",
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                    >
                                        {/* Accent border on the left */}
                                        <div
                                            className="position-absolute top-0 bottom-0 start-0 rounded-start-4"
                                            style={{
                                                width: '5px',
                                                background: isDone ? '#10b981' : gradientColor,
                                                opacity: isDone ? 1 : 0.7,
                                                transition: 'all 0.3s ease',
                                            }}
                                        />

                                        <div
                                            className={`p-4 p-md-5 rounded-4 shadow h-100 ${isDone
                                                ? "border-0"
                                                : "border-0"
                                                }`}
                                            style={{
                                                marginLeft: '5px',
                                                backgroundColor: isDone
                                                    ? 'var(--bs-secondary-bg)'
                                                    : 'var(--bs-body-bg)',
                                                boxShadow: isDone
                                                    ? '0 2px 12px rgba(0, 0, 0, 0.06)'
                                                    : '0 2px 12px rgba(0, 0, 0, 0.08)',
                                                transition: 'all 0.3s ease',
                                                border: isDone ? 'none' : '1px solid var(--bs-border-color)',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isDone) {
                                                    e.currentTarget.style.transform = 'translateY(-4px)'
                                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isDone) {
                                                    e.currentTarget.style.transform = 'translateY(0)'
                                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)'
                                                }
                                            }}
                                        >
                                            {/* Dhikr text */}
                                            <div className="flex-fill mb-3">
                                                <p
                                                    className="mb-3"
                                                    style={{
                                                        fontSize: '1.4rem',
                                                        lineHeight: '2.2',
                                                        textAlign: 'justify',
                                                        fontFamily: 'var(--font-amiri), Amiri, serif',
                                                        fontWeight: '500',
                                                        color: 'var(--bs-body-color)',
                                                    }}
                                                >
                                                    {dhikr.zekr}
                                                </p>

                                                {/* Bless text */}
                                                {dhikr.bless && (
                                                    <div
                                                        className="p-3 rounded-3"
                                                        style={{
                                                            backgroundColor: 'rgba(16, 185, 129, 0.08)',
                                                            borderLeft: '3px solid #10b981',
                                                        }}
                                                    >
                                                        <p className="mb-0 text-success fw-medium" style={{ fontSize: '0.95rem' }}>
                                                            <i className="fas fa-star me-2" style={{ fontSize: '0.8rem' }}></i>
                                                            {dhikr.bless}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bottom bar: counter + copy */}
                                            <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                                                {/* Repeat counter */}
                                                <div className="d-flex align-items-center gap-3">
                                                    <span className="text-body-secondary fw-medium" style={{ fontSize: '0.9rem' }}>
                                                        عدد التكرار
                                                    </span>
                                                    <div
                                                        className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                                                        style={{
                                                            width: "38px",
                                                            height: "38px",
                                                            border: `2px solid ${isDone ? '#10b981' : gradientColor}`,
                                                            backgroundColor: isDone ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 0, 0, 0.03)',
                                                            color: isDone ? '#10b981' : gradientColor,
                                                            fontSize: isDone ? '1.1rem' : '0.95rem',
                                                            transition: 'all 0.3s ease',
                                                        }}
                                                    >
                                                        {circleContent}
                                                    </div>
                                                </div>

                                                {/* Copy button */}
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-4"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        copyDhikr(dhikr.zekr)
                                                    }}
                                                    style={{
                                                        transition: 'all 0.2s ease',
                                                        fontSize: '0.9rem',
                                                    }}
                                                >
                                                    <i className="fas fa-copy" />
                                                    <span>نسخ</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
