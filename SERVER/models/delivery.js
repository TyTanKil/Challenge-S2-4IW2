const deliveryStates = ["En cours", "En livraison", "Livré", "Problème"];

class Delivery {
  constructor(id, status = "En cours") {
    this.id = id;
    this.status = status;
  }

  updateStatus() {
    const currentIndex = deliveryStates.indexOf(this.status);
    this.status = deliveryStates[(currentIndex + 1) % deliveryStates.length];
  }
}

module.exports = Delivery;
