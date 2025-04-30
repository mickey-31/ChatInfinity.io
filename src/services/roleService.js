import apiService from './api';

/**
 * @typedef {Object} Role
 * @property {number} roleId - Role ID
 * @property {string} roleName - Role name
 * @property {string} roleDescr - Role description
 * @property {string} pages - Comma-separated page IDs
 * @property {string} models - Comma-separated model IDs
 */

const roleService = {
  /**
   * Get all roles
   * @returns {Promise<Role[]>} - Promise with roles data
   */
  getRoles: () => {
    return apiService.get('/api/v1/roles');
  },

  /**
   * Get a single role by ID
   * @param {number} id - Role ID
   * @returns {Promise<Role>} - Promise with role data
   */
  getRoleById: (id) => {
    return apiService.get(`/api/v1/roles/${id}`);
  },

  /**
   * Create a new role
   * @param {Role} roleData - Role data
   * @returns {Promise<Role>} - Promise with created role
   */
  createRole: (roleData) => {
    return apiService.post('/api/v1/roles', roleData);
  },

  /**
   * Update an existing role
   * @param {number} id - Role ID
   * @param {Role} roleData - Role data to update
   * @returns {Promise<Role>} - Promise with updated role
   */
  updateRole: (id, roleData) => {
    return apiService.put(`/api/v1/roles/${id}`, roleData);
  },

  /**
   * Delete a role
   * @param {number} id - Role ID
   * @returns {Promise<any>} - Promise with deletion result
   */
  deleteRole: (id) => {
    return apiService.delete(`/api/v1/roles/${id}`);
  }
};

export default roleService;