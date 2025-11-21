/**
 * Design Tokens for طمأنينة Application
 * Centralized source of truth for design values
 */

export const colors = {
    // Primary - Warm Gold
    primary: {
        main: "#d4a574",
        dark: "#b8885a",
        light: "#e8d0a0",
        gradient: "linear-gradient(135deg, #d4a574 0%, #b8885a 100%)",
    },

    // Secondary - Sage Green
    secondary: {
        main: "#7d9d7f",
        dark: "#5a7c5c",
        light: "#a8c3ae",
        gradient: "linear-gradient(135deg, #7d9d7f 0%, #5a7c5c 100%)",
    },

    // Accent - Deep Teal
    accent: {
        main: "#2c6e7c",
        dark: "#265a66",
        light: "#5ab1c2",
    },

    // Hero gradient
    hero: {
        gradient: "linear-gradient(135deg, #4a5d7e 0%, #7d9d7f 100%)",
        gradientDark: "radial-gradient(circle at top, #5a7c5c, #2d3a3d)",
    },

    // Combined gradients
    primaryGradient: "linear-gradient(135deg, #d4a574 0%, #7d9d7f 100%)",
} as const;

export const typography = {
    fonts: {
        arabic: {
            heading: "Cairo, Arial, sans-serif",
            body: "Amiri, serif",
        },
        latin: {
            ui: "Inter, system-ui, sans-serif",
        },
    },

    sizes: {
        xs: "0.75rem",    // 12px
        sm: "0.875rem",   // 14px
        base: "1rem",     // 16px
        lg: "1.125rem",   // 18px
        xl: "1.25rem",    // 20px
        "2xl": "1.5rem",  // 24px
        "3xl": "1.875rem",// 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem",    // 48px
    },

    weights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
} as const;

export const spacing = {
    xs: "0.25rem",   // 4px
    sm: "0.5rem",    // 8px
    md: "1rem",      // 16px
    lg: "1.5rem",    // 24px
    xl: "2rem",      // 32px
    "2xl": "3rem",   // 48px
    "3xl": "4rem",   // 64px
} as const;

export const borderRadius = {
    sm: "0.375rem",  // 6px
    md: "0.5rem",    // 8px
    lg: "0.75rem",   // 12px
    xl: "1rem",      // 16px
    "2xl": "1.5rem", // 24px
    full: "9999px",
} as const;

export const shadows = {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",

    // Glassmorphism shadows
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    glassLg: "0 12px 48px 0 rgba(31, 38, 135, 0.2)",

    // Colored shadows
    gold: "0 10px 40px rgba(212, 165, 116, 0.3)",
    goldLg: "0 20px 60px rgba(212, 165, 116, 0.4)",
    sage: "0 10px 40px rgba(125, 157, 127, 0.3)",

    // Inner glow
    innerGlow: "inset 0 0 20px rgba(255, 255, 255, 0.05)",
} as const;

export const animations = {
    durations: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
    },

    easings: {
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
} as const;

export const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
} as const;

export const zIndex = {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
    chat: 1090,
    max: 9999,
} as const;

// Glassmorphism effect utilities
export const glassmorphism = {
    light: {
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
    },
    dark: {
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
    },
} as const;

// Export all tokens as a single object
export const designTokens = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    animations,
    breakpoints,
    zIndex,
    glassmorphism,
} as const;

export default designTokens;
