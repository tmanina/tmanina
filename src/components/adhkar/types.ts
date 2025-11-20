// Shared types for adhkar components

export type AdhkarItem = {
    zekr: string
    repeat: number
    bless: string
}

export type RemainingMap = Record<string, number>

export type ProgressData = {
    history: Record<string, number>
    lastDate?: string
}

export type AdhkarConfig = {
    title: string
    icon: string
    gradient: string
    data: AdhkarItem[]
}
