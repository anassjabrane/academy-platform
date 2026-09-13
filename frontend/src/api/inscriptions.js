import { apiClient } from './client';

/**
 * Correspond a handleEnroll(id) dans index.html.
 * Necessite que la route POST /api/formations/{id}/inscrire soit activee
 * cote Laravel (actuellement commentee dans routes/api.php, a faire
 * avec InscriptionApiController).
 */
export function inscrireFormation(formationId) {
  return apiClient.post(`/formations/${formationId}/inscrire`);
}