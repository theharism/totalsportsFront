"use client";
import axios from 'axios'

export const getTopTeams = async () => {
  const { data } = await axios.get('/api/v1/teams/top')
  return data
}
