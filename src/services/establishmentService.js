import axios from 'axios'
import domain from '@/environment'

export const getEstablishments = async (filters = {}) => {
  return await axios.get(domain + '/establishments', {
    params: filters
  })
}

// Obtenir toutes les activités ou effectuer une recherche par nom
export const getActivities = async (searchQuery = '') => {
  const params = searchQuery ? { name: searchQuery } : {}
  return await axios.get(domain + '/establishments/activities', { params })
}

export const fetchActivityBySlug = async (slug) => {
  return await axios.get(domain + `/establishments/activities/${slug}`)
}

export const fetchRestaurantBySlug = async (slug) => {
  return await axios.get(domain + `/establishments/restaurants/${slug}`)
}

export const fetchHotelBySlug = async (slug) => {
  return await axios.get(domain + `/establishments/hotels/${slug}`)
}

export const fetchParkingBySlug = async (slug) => {
  return await axios.get(domain + `/establishments/parkings/${slug}`)
}

export const getFavoris = async (token) => {
  return await axios.get(domain + '/favorites', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const addFavoris = async (token, favoris) => {
  return await axios.post(
    '/favorites',
    {
      establishmentId: favoris
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const deleteFavoris = async (token, favoris) => {
  return await axios.delete(`/favorites/${favoris}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
