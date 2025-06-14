import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleServerError(error: unknown) {
  // eslint-disable-next-line no-console
  console.log(error)

  let errMsg = 'Something went wrong!'

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  if (error instanceof AxiosError) {
    errMsg = error.response?.data.title
  }

  toast({ variant: 'destructive', title: errMsg })
}

// Helper function to calculate remaining time
// export function calculateRemainingTime(startingDate: string, startingTime: string) {
//   const now = new Date()

//   // Parse the starting date and time
//   const [hours, minutes] = startingTime.split(":").map(Number)
//   const startDate = new Date(startingDate)
//   startDate.setHours(hours, minutes)

//   // If the start time has passed, return "In progress"
//   if (startDate <= now) {
//     return "In progress"
//   }

//   const isToday = now.toDateString() === startDate.toDateString();

//   // Calculate the difference in milliseconds
//   const diffMs = startDate.getTime() - now.getTime()

//   // Convert to hours
//   const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

//   if (diffHours < 1) {
//     // If less than an hour, show minutes
//     const diffMinutes = Math.floor(diffMs / (1000 * 60))
//     return `${diffMinutes}m from now`
//   }

//   return `${diffHours}h from now`
// }

export function calculateRemainingTime(startDateStr: string, startTimeStr: string): string {
  const now = new Date();

  // Parse the starting date and time
  const [startHour, startMinute] = startTimeStr.split(":").map(Number);
  const startDate = new Date(startDateStr);
  startDate.setHours(startHour, startMinute, 0, 0); // Set time on the date

  const isToday =
    now.toDateString() === startDate.toDateString();

  if (isToday) {
    const diffMs = startDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      return "In Progress";
    }

    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    const str = `${hours}h ${minutes}m from now`;
    return str;
  } else {
    return startDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}


// Group games by category
export function groupGamesByCategory(games: any[]) {
  const grouped: Record<string, any> = {}

  games.forEach((game) => {
    const categoryId = game.category._id

    if (!grouped[categoryId]) {
      grouped[categoryId] = {
        id: categoryId,
        name: game.category.name,
        games: [],
        logo: game.category.logo,
      }
    }

    grouped[categoryId].games.push(game)
  })

  return Object.values(grouped)
}