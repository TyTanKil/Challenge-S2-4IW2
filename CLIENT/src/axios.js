import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000' // Remplacez par l'URL de votre serveur Node.js
})

export default instance
