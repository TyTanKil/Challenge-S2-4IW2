// Importez axios pour effectuer les requêtes HTTP
import axios from 'axios'

// Créez une classe ApiClient
class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_ENDPOINT,
      headers: {
        JwtCookie: localStorage.getItem('jwtToken') ?? ''
      }
    })

    // Interceptor pour inclure le token JWT dans les en-têtes Authorization
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('jwtToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // Méthode pour effectuer une requête GET
  async get(url, params) {
    try {
      const response = await this.client.get(url, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Méthode pour effectuer une requête POST
  async post(url, data) {
    try {
      return await this.client.post(url, data)
    } catch (error) {
      throw error
    }
  }

  // Méthode pour effectuer une requête PATCH
  async patch(url, data) {
    try {
      const response = await this.client.patch(url, data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Méthode pour effectuer une requête PUT
  async put(url, data) {
    try {
      const response = await this.client.put(url, data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Méthode pour effectuer une requête DELETE
  async delete(url) {
    try {
      const response = await this.client.delete(url)
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Méthode pour login l'utilisateur
  async login(login, password) {
    try {
      return await this.client.post('/login', {
        login: login,
        password: password
      })
    } catch (error) {
      throw error
    }
  }

  async getDelivery(id) {
    try {
      return await this.get(`/api/delivery/${id}`)
    } catch (error) {
      throw error
    }
  }

  // Méthode pour créer une nouvelle livraison
  async createDelivery(id) {
    try {
      return await this.post(`/api/delivery`, { id })
    } catch (error) {
      throw error
    }
  }
}

// Exportez une instance de la classe ApiClient avec l'URL de base
export default new ApiClient() // Remplacez par votre URL de base
