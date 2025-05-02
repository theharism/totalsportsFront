'use client';

import axios from 'axios'

export const getTopCategories = async () => {
  const { data } = await axios.get('/api/v1/categories/top')
  return data
}
