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

        incrementDailyDhikr(1)

        setRemaining((prev) => ({
            ...prev,
            [key]: newRemaining,
        }))

        if (newRemaining <= 0 && current > 0 && typeof navigator !== "undefined" && "vibrate" in navigator) {
            try {
                navigator.vibrate?.(60)
            } catch {
                // ignore
            }
        }
    }

    const resetAllCounters = () => {
        setRemaining(getInitialRemaining(config.data, prefix))
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
                {/* Reset button */}
                <div className="d-flex justify-content-end mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
                        onClick={resetAllCounters}
                    >
                        <i className="fas fa-rotate-right" />
                        إعادة تعيين العدادات
                    </button>
                </div>

                {/* Main card */}
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                    <div className="p-4 text-white" style={{ background: config.gradient }}>
                        <h2 className="h3 mb-0 d-flex align-items-center gap-2">
                            <i className={`fas fa-${config.icon}`} />
                            {config.title}
                        </h2>
                    </div>
                    <div className="card-body p-3 p-md-4">
                        <div className="vstack gap-3">
                            {config.data.map((dhikr, index) => {
                                const key = `${prefix}-${index}`
                                const remainingCount = remaining[key] ?? dhikr.repeat
                                const isDone = remainingCount <= 0
                                const circleContent = isDone ? "✅" : remainingCount

                                return (
                                    <div
                                        key={key}
                                        onClick={() => handleDhikrClick(key, dhikr.repeat)}
                                        className={`p-3 p-md-4 rounded-4 border ${isDone
                                                ? "border-success bg-success bg-opacity-10"
                                                : "border border-body-secondary bg-body"
                                            }`}
                                        style={{
                                            cursor: "pointer",
                                            transition: "all 0.25s ease",
                                        }}
                                    >
                                        {/* Dhikr text */}
                                        <div className="flex-fill">
                                            <p
                                                className="fs-5 lh-lg mb-2"
                                                style={{ textAlign: "justify" }}
                                            >
                                                {dhikr.zekr}
                                            </p>

                                            {/* Bless text */}
                                            {dhikr.bless && (
                                                <p className="small text-success mb-0">{dhikr.bless}</p>
                                            )}
                                        </div>

                                        {/* Bottom bar: counter + copy */}
                                        <div className="mt-3 pt-2 border-top d-flex text-center small">
                                            {/*Repeat counter */}
                                            <button
                                                type="button"
                                                className="btn btn-link flex-fill text-decoration-none text-body-secondary d-flex align-items-center justify-content-center gap-2 py-2"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                }}
                                            >
                                                <span>عدد التكرار</span>
                                                <div
                                                    className="rounded-circle d-inline-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "24px",
                                                        height: "24px",
                                                        border: "1px solid rgba(0,0,0,0.15)",
                                                        backgroundColor: "var(--bs-body-bg)",
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    {circleContent}
                                                </div>
                                            </button>

                                            <div className="border-start" />

                                            {/* Copy button */}
                                            <button
                                                type="button"
                                                className="btn btn-link flex-fill text-decoration-none text-body-secondary d-flex align-items-center justify-content-center gap-2 py-2"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    copyDhikr(dhikr.zekr)
                                                }}
                                            >
                                                <i className="fas fa-copy" />
                                                <span>نسخ</span>
                                            </button>
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
