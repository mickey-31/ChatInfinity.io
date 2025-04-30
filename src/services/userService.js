import apiService from './api';

// Define types for TypeScript-like type safety
/**
 * @typedef {Object} User
 * @property {number} id - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} mobile - User mobile number
 * @property {string} tenant - User tenant
 * @property {string[]} roles - User roles
 */

/**
 * @typedef {Object} UserResponse
 * @property {User[]} data - Array of users
 * @property {number} total - Total number of users
 * @property {number} page - Current page
 * @property {number} limit - Items per page
 */

const userService = {
  /**
   * Get all users with pagination and search
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.search - Search term
   * @returns {Promise<UserResponse>} - Promise with user data
   */
  getUsers: (params = {}) => {
    return apiService.get('/users', params);
  },

  /**
   * Get a single user by ID
   * @param {number} id - User ID
   * @returns {Promise<User>} - Promise with user data
   */
  getUserById: (id) => {
    return apiService.get(`/users/${id}`);
  },

  /**
   * Create a new user
   * @param {User} userData - User data
   * @returns {Promise<User>} - Promise with created user
   */
  createUser: (userData) => {
    return apiService.post('/users', userData);
  },

  /**
   * Update an existing user
   * @param {number} id - User ID
   * @param {User} userData - User data to update
   * @returns {Promise<User>} - Promise with updated user
   */
  updateUser: (id, userData) => {
    return apiService.put(`/users/${id}`, userData);
  },

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise<any>} - Promise with deletion result
   */
  deleteUser: (id) => {
    return apiService.delete(`/users/${id}`);
  }
};

export default userService;