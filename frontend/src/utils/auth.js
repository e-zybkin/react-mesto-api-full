export const BASE_URL = 'https://api.vmesto.nomoredomains.xyz';

const HEADERS = {
  'Content-Type': 'application/json'
}

const getJson = (response) => {
  if (response.ok){
    return response.json();
  }
  throw new Error({status: response.status});
}

export const register = ( password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ password, email})
  })
  .then(getJson)
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ password, email})
  })
  .then(getJson)
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...HEADERS,
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getJson)
}
