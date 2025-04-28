// API functions to fetch data from the endpoints

export async function getCategories() {
  try {
    const response = await fetch("https://dashgenius.space/api/v1/categories/top")
    const data = await response.json()

    if (data.success) {
      return data.data
    }
    return []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getTeams() {
  try {
    const response = await fetch("https://dashgenius.space/api/v1/teams/top")
    const data = await response.json()

    if (data.success) {
      return data.data
    }
    return []
  } catch (error) {
    console.error("Error fetching teams:", error)
    return []
  }
}

export async function getGames() {
  try {
    const response = await fetch("https://dashgenius.space/api/v1/games")
    const data = await response.json()

    if (data.success) {
      return data.data
    }
    return []
  } catch (error) {
    console.error("Error fetching games:", error)
    return []
  }
}

// Helper function to calculate remaining time
export function calculateRemainingTime(startingDate: string, startingTime: string) {
  const now = new Date()

  // Parse the starting date and time
  const [hours, minutes] = startingTime.split(":").map(Number)
  const startDate = new Date(startingDate)
  startDate.setHours(hours, minutes)

  // If the start time has passed, return "In progress"
  if (startDate <= now) {
    return "In progress"
  }

  // Calculate the difference in milliseconds
  const diffMs = startDate.getTime() - now.getTime()

  // Convert to hours
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) {
    // If less than an hour, show minutes
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    return `${diffMinutes}m from now`
  }

  return `${diffHours}h from now`
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
      }
    }

    grouped[categoryId].games.push(game)
  })

  return Object.values(grouped)
}

