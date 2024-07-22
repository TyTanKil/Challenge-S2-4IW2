<template>
    <div class="product">
      <div>{{ product.name }}</div>
      <div>{{ product.description }}</div>
      <div>{{ product.quantity }}</div>
      <div>{{ product.price }}€</div>
      <button @click="removeProduct">🗑️</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductItem',
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    methods: {
      removeProduct() {
        this.$emit('remove', this.product.id);
      },
    },
  };
  </script>
  
  <style scoped>
  .product {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px;
    background-color: #f0f0f0;
  }
  button {
    background-color: #f44336;
    border: none;
    padding: 10px;
    cursor: pointer;
    color: white;
  }
  button:hover {
    background-color: #d32f2f;
  }
  </style>