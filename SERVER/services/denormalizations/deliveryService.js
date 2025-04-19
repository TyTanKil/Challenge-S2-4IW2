const Delivery = require("../../models/delivery"); // Importer le modèle de livraison

const deliveries = new Map(); // Stockage en mémoire des livraisons

// Créer une nouvelle livraison
function createDelivery(id) {
  const delivery = new Delivery(id);
  deliveries.set(id, delivery);
  return delivery;
}

// Récupérer une livraison par ID
function getDelivery(id) {
  return deliveries.get(id);
}

// Mettre à jour les états toutes les 10 secondes
setInterval(() => {
  deliveries.forEach((delivery) => delivery.updateStatus());
}, 10000);

module.exports = { createDelivery, getDelivery };
