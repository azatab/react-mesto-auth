const BASE_URL = 'https://auth.nomoreparties.co'

const handleResponse = (res) => {
  res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

export const register = (username, password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password, email})
  })
  .then(handleResponse)
}

export const login = () => {

}

export const checkToken = () => {
  
}