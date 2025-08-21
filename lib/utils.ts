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
    return `${hours} hr and ${minutes} min from now`;
  }

  // For future UK dates
  return startingTime.format('MMMM D, YYYY • h:mm A');
}

// Group games by category
export function groupGamesByCategory(games: any[]) {
  const grouped: Record<string, any> = {}

  const categoriesOrder = ["67f036eb22358178b7bb5415", "67f03c4822358178b7bb54ac", "67f042c022358178b7bb5509", "67f0424c22358178b7bb54fc", 
    "67f0428d22358178b7bb5503", "67f0419a22358178b7bb54e5", "67f0439822358178b7bb5513", "67f0383a22358178b7bb5435",
    "67f039b122358178b7bb545d", "67f0395622358178b7bb544d", "67f040db22358178b7bb54dc",
    "67f03a0e22358178b7bb546a", "67f03f9022358178b7bb54c0", "67f03f0c22358178b7bb54b8",
    "67f0372722358178b7bb5419", "67f03f6822358178b7bb54bc", "685746901d02db3045791285",
    "67f03bdb22358178b7bb549b", "685745b41d02db3045791276", "67f03b5f22358178b7bb5490",
    "67f03b9e22358178b7bb5496", '67f0398d22358178b7bb5455', '685744c11d02db3045791254', 
    '685747561d02db30457912a5', '67f037f322358178b7bb5431', '685749171d02db30457912d8', 
    '68574a961d02db304579133e', '685743021d02db3045791200', '6861deb92e52e1582df44431', 
    '67f03bfd22358178b7bb54a4', '685745301d02db304579126a', '67f0393722358178b7bb5449', 
    '683736ee4649c766475c5c5a', '67f03adf22358178b7bb547b', '67f03c1d22358178b7bb54a8', 
    '6887b2cf65880eb0fb425d3d', '6860e127759cf247abce54de', "67f044b222358178b7bb5521", 
    "6860eaa2759cf247abce56bb", "67f03ff022358178b7bb54ca", "67f039d922358178b7bb5462", 
    "67f03fcf22358178b7bb54c7", "67f03fae22358178b7bb54c4"]

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

  const groupedValues = Object.values(grouped);

  groupedValues.sort((a, b) => {
    const aStatusIndex = categoriesOrder.indexOf(a.id);
    const bStatusIndex = categoriesOrder.indexOf(b.id);
    return aStatusIndex - bStatusIndex;
  });

  return groupedValues
}