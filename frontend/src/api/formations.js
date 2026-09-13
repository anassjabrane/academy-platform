import { apiClient } from './client';

/**
 * Correspond a renderFormationsGrid(COURSES) dans index.html,
 * sauf que les donnees viennent maintenant de la base academy_ma.
 */
export function getFormations() {
  return apiClient.get('/formations');
}

/**
 * Correspond a showCourse(id) dans index.html.
 */
export function getFormation(id) {
  return apiClient.get(`/formations/${id}`);
}

export function getCategories() {
  return apiClient.get('/categories');
}