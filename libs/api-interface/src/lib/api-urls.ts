export const BASE_CONTROLLER_URI = {
  CURRENCY: 'currency',
  USER: 'user'
}
export const API_URL = {
  CURRENCY: {
    GET_PRICE: `${BASE_CONTROLLER_URI.CURRENCY}/get-price`
  },
  USER: {
    REGISTER: `${BASE_CONTROLLER_URI.USER}/register`
  }
}
