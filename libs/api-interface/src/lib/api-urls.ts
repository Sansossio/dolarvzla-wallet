export const BASE_CONTROLLER_URI = {
  CURRENCY: 'currency',
  USER: 'user',
  WALLET: 'wallet'
}
export const API_URL = {
  CURRENCY: {
    GET_PRICE: `${BASE_CONTROLLER_URI.CURRENCY}/get-price`
  },
  USER: {
    REGISTER: `${BASE_CONTROLLER_URI.USER}/register`,
    LOGIN: `${BASE_CONTROLLER_URI.USER}/login`,
    ME: `${BASE_CONTROLLER_URI.USER}/me`
  },
  WALLET: {
    LIST: `${BASE_CONTROLLER_URI.WALLET}/list`
  }
}
