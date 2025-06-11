// API functions to fetch data from the endpoints

export async function getCategories() {
  try {
    const response = await fetch("https://0b38-154-208-41-117.ngrok-free.app//api/v1/categories/top")
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
    const response = await fetch("https://0b38-154-208-41-117.ngrok-free.app//api/v1/teams/top")
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
    const response = await fetch("https://0b38-154-208-41-117.ngrok-free.app//api/v1/games")
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

