export const BASE_URL = "http://localhost:3001";

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(res.status);
  }
  return res.json();
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => getResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then((res) => getResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => getResponse(res));
};
