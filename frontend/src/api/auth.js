import { apiClient } from './client';

/**
 * Correspond au formulaire "inscription" de index.html :
 * prenom, nom, email, telephone, password, domaine_interet.
 */
export async function register({ prenom, nom, email, telephone, password, domaineInteret }) {
  const data = await apiClient.post('/register', {
    prenom,
    nom,
    email,
    telephone,
    password,
    domaine_interet: domaineInteret,
  });

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

/**
 * Correspond au formulaire "connexion" de index.html : email, password.
 */
export async function login({ email, password }) {
  const data = await apiClient.post('/login', { email, password });

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

export async function logout() {
  await apiClient.post('/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export async function getCurrentUser() {
  return apiClient.get('/me');
}

export function getStoredUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}