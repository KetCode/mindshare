import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diffInMs = now.getTime() - past.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInSeconds < 60) {
    return "Agora"
  }

  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "min"}`
  }

  if (diffInHours < 24) {
    return `Há ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`
  }

  if (diffInDays === 1) {
    return "Ontem"
  }

  if (diffInDays >= 30) {
  const diffInMonths = Math.floor(diffInDays / 30)

  return `Há ${diffInMonths} ${diffInMonths === 1 ? "mês" : "meses"}`
}

  return `Há ${diffInDays} ${diffInDays === 1 ? "dia" : "dias"}`
}

export const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }