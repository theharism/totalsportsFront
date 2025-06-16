import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Europe/London")

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

// // Helper function to calculate remaining time
// export function calculateRemainingTime(startDateStr: string, startTimeStr: string): string {
//   const now = new Date();

//   const combined = `${startDateStr} ${startTimeStr}`;
//   const ukTime = dayjs.tz(combined, 'YYYY-MM-DD HH:mm', 'Europe/London');

//   // Step 3: Convert to local time (e.g., Pakistan)
//   const localTime = ukTime.tz(dayjs.tz.guess()); // User’s timezone

//   console.log("Local Time:", localTime.format('YYYY-MM-DD hh:mm A'));

//   // Parse the starting date and time
//   const [startHour, startMinute] = startTimeStr.split(":").map(Number);
//   const startDate = new Date(startDateStr);
//   startDate.setHours(startHour, startMinute, 0, 0); // Set time on the date

//   const isToday =
//     now.toDateString() === startDate.toDateString();

//   if (isToday) {
//     const diffMs = startDate.getTime() - now.getTime();

//     if (diffMs <= 0) {
//       return "In Progress";
//     }

//     const diffMinutes = Math.floor(diffMs / 60000);
//     const hours = Math.floor(diffMinutes / 60);
//     const minutes = diffMinutes % 60;
//     const str = `${hours}h ${minutes}m from now`;
//     return str;
//   } else {
//     return startDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
//   }
// }

// Helper function to calculate remaining time
// export function calculateRemainingTime(startDateStr: string, startTimeStr: string): string {
//   // Combine date and time in UK timezone
//   const ukTime = dayjs.tz(`${startDateStr} ${startTimeStr}`, 'YYYY-MM-DD HH:mm', 'Europe/London');
//   const now = dayjs.tz('Europe/London');

//   const isToday = now.isSame(ukTime, 'day');

//   if (isToday) {
//     const diffMinutes = ukTime.diff(now, 'minute');

//     if (diffMinutes <= 0) {
//       return "In Progress";
//     }

//     const hours = Math.floor(diffMinutes / 60);
//     const minutes = diffMinutes % 60;
//     return `${hours}h ${minutes}m from now`;
//   }

//   // For future dates, return formatted local time
//   return ukTime.format('MMMM D, YYYY • h:mm A');  
// }

export function calculateRemainingTime(startDateStr: string, startTimeStr: string): string {

  if (!startDateStr || !startTimeStr) {
    console.warn("Missing date or time:", { startDateStr, startTimeStr });
    return "Invalid time";
  }
  
  const ukTime = dayjs.tz(`${startDateStr} ${startTimeStr}`, 'YYYY-MM-DD HH:mm', 'Europe/London');
  const now = dayjs(); // Current time in UK

  const isToday = now.isSame(ukTime, 'day');

  if (isToday) {
    const diffMinutes = ukTime.diff(now, 'minute');

    if (diffMinutes <= 0) {
      return "In Progress";
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m from now`;
  }

  // For future UK dates
  return ukTime.format('MMMM D, YYYY • h:mm A');
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