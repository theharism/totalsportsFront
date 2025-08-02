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

export function calculateRemainingTime(startDateStr: string, startTimeStr: string, endDateStr?: string, endTimeStr?: string): string {

  if (!startDateStr || !startTimeStr) {
    console.warn("Missing date or time:", { startDateStr, startTimeStr });
    return "Invalid time";
  }
  
  const startingTime = dayjs.tz(`${startDateStr} ${startTimeStr}`, 'YYYY-MM-DD HH:mm', 'Etc/GMT');
  let endingTime;
  if(endDateStr && endTimeStr){
    endingTime = dayjs.tz(`${endDateStr} ${endTimeStr}`, 'YYYY-MM-DD HH:mm', 'Etc/GMT');
  }
  const now = dayjs().tz('Etc/GMT'); 

  const isToday = now.isSame(startingTime, 'day');
  const isBetween = now.isAfter(startingTime) && endingTime && now.isBefore(endingTime);
  
  if (isToday || isBetween) {
    const diffMinutes = startingTime.diff(now, 'minute');

    if (diffMinutes <= 0) {
      return "In Progress";
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}hr and ${minutes}min from now`;
  }

  // For future UK dates
  return startingTime.format('MMMM D, YYYY • h:mm A');
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