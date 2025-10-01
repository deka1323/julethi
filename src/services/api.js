/**
 * API Service Layer for Lambda Function Integration
 *
 * SETUP INSTRUCTIONS:
 * 1. Replace API_BASE_URL with your actual API Gateway endpoint
 * 2. Update authentication headers as needed
 * 3. Configure CORS in API Gateway
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-api-gateway-url.execute-api.region.amazonaws.com/prod';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  async post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  async put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }

  // Product APIs
  async getAllProducts() {
    return this.get('/products');
  }

  async getProductById(productId) {
    return this.get(`/products/${productId}`);
  }

  async getProductsByCategory(category) {
    return this.get(`/products/category/${category}`);
  }

  async getNewArrivals() {
    return this.get('/products/new-arrivals');
  }

  async searchProducts(query) {
    return this.get(`/products/search?q=${encodeURIComponent(query)}`);
  }

  async createProduct(productData) {
    return this.post('/products', productData);
  }

  async updateProduct(productId, productData) {
    return this.put(`/products/${productId}`, productData);
  }

  async deleteProduct(productId) {
    return this.delete(`/products/${productId}`);
  }

  // Authentication APIs
  async adminLogin(username, password) {
    return this.post('/auth/login', { username, password });
  }

  // Admin APIs
  async getDashboardStats() {
    return this.get('/admin/stats');
  }
}

const apiService = new ApiService();
export default apiService;
