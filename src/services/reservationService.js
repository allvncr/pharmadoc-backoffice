import axios from 'axios'
import domain from '@/environment'

export const addToCart = async (token, payload) => {
  return await axios.post(domain + '/cart', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const removeFromCart = async (token, ID) => {
  return await axios.delete(domain + '/cart/' + ID, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getCart = async (token) => {
  return await axios.get(domain + '/cart', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const createReservation = async (token) => {
  return await axios.post(domain + '/reservations', null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getReservationsByUser = async (token) => {
  return await axios.get(domain + '/reservations', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const cancelReservation = async (token, reservationID) => {
  return await axios.put(domain + `/reservations/${reservationID}/cancel`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const initierPaiement = async (token, data) => {
  return await axios.post(domain + 'payment/initier-paiement', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
