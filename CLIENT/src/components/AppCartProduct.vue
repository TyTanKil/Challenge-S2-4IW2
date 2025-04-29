<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import ApiClient from '@/assets/js/apiClient';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const store = useStore();
const toast = useToast();
const emits = defineEmits(['productDeleted']);

const props = defineProps({     //Définition des données passées par le composants
    id: Number,
    label: String,
    description: String,
    price: String,
    quantity: Number,
    link: String,
    link_img: String,
    cartProductId: Number
});
console.log('Props:', props);

const decrementQuantity = async () => {
    if (props.quantity > 1) {
        try {
            await ApiClient.patch(`/cartProduct/${props.cartProductId}/${props.id}`, { quantity: props.quantity - 1 });
            toast.success('Quantité diminuée');
            emits('productDeleted', null); // Ou crée un nouvel event pour "refresh"
            window.location.reload();
        } catch (error) {
            toast.error('Erreur lors de la modification de la quantité');
        }
    } else {
        // Si quantité = 1, supprimer le produit
        await deleteProduct();
    }
};

const deleteProduct = async () => {
    const id_user = store.state.user_id;
    if (id_user == null) {
        toast.error('Vous devez être connecté pour supprimer un produit du panier');
        return;
    }
    try {
        await ApiClient.delete(`/cartProduct/${props.cartProductId}/${props.id}`);
        toast.success('Produit supprimé du panier');
        emits('productDeleted', props.cartProductId);
        //force reload
        window.location.reload();
    } catch (error) {
        toast.error('Une erreur est survenue lors de la suppression du produit du panier');
    }
};

</script>

<!-- Composant Card Horizontal -->
<template>        
  <div class="card_product_cart">
      <img class="card_product_cart_img" :src="props.link_img" :alt="props.label">
      <div class="infos">
          <h3>{{ props.label }}</h3>
          <h4>{{ props.description }}</h4>
      </div>
      <div class="buy_div_container">
          <div class="price_quantity_container">
              <p>Prix : {{ props.price }} €</p>
              <p>
                <span>Quantité : {{ props.quantity }}</span>
                <button @click="decrementQuantity" style="margin-left: 10px;">-</button>
              </p>
          </div>
          <div class="action_div_container">
              <button @click="deleteProduct">
                  <img class="cart_card" src="\src\assets\img\svg\icons\trash.svg" alt="">
              </button>
          </div>
      </div>
  </div>
</template>

<style scoped>
.card_product_cart {
  background-color: #575757;
  color: #fff;
  width: 95%;
  min-width: 320px;
  max-width: 600px;
  min-height: 90px;
  max-height: 150px;
  height: auto;
  margin: 1rem auto;
  padding: 0.7rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  border-radius: 14px;
  border: 0.7px #C4F649 solid;
  transition: box-shadow 0.3s;
  box-sizing: border-box;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
}

.card_product_cart:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.18);
}

.card_product_cart_img {
  height: 100px;
  width: 120px;
  object-fit: contain;
  margin-right: 1rem;
  border-radius: 10px;
  background: #fff;
  flex-shrink: 0;
  align-self: center;
  border: none;
}

.infos {
  flex: 2;
  min-width: 0;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.infos h3 {
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  font-size: 1.08rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.infos h4 {
  font-weight: 300;
  margin: 0;
  font-size: 0.98rem;
  color: #e0e0e0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.buy_div_container {
  flex: 0.8;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0.7rem;
}

.price_quantity_container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 0.2rem;
}

.price_quantity_container p {
  font-size: 1rem;
  font-weight: 500;
  margin: 0.08rem 0;
}

.price_quantity_container p span {
  font-size: 0.96rem;
  font-weight: 400;
}

.price_quantity_container button {
  margin-left: 10px;
  border: none;
  background: #C4F649;
  color: #222;
  border-radius: 6px;
  padding: 0.13rem 0.5rem;
  font-size: 1.05rem;
  font-weight: bold;
  transition: background 0.2s;
}

.price_quantity_container button:hover {
  background: #A0DB10;
  cursor: pointer;
}

.action_div_container {
  margin-top: 0.2rem;
}

.action_div_container button {
  border: none;
  width: 1.7rem;
  height: 1.7rem;
  background-color: #C4F649;
  border-radius: 8px;
  box-shadow: 1px 2px #3838385d;
  padding: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action_div_container button:hover {
  cursor: pointer;
  background-color: #A0DB10;
}

.action_div_container img {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 700px) {
  .card_product_cart {
    flex-direction: column;
    align-items: stretch;
    padding: 0.7rem;
    min-width: 160px;
    max-width: 98vw;
    min-height: 80px;
    max-height: 220px;
  }
  .card_product_cart_img {
    margin: 0 auto 0.7rem auto;
    height: 80px;
    width: 110px;
  }
  .infos, .buy_div_container {
    margin-right: 0;
    width: 100%;
    align-items: flex-start;
  }
  .buy_div_container {
    align-items: flex-start;
  }
}

@media (prefers-color-scheme: dark) {
  .card_product_cart {
      background-color: #fff;
      color: #222;
  }
  .infos h4 {
      color: #444;
  }
}
</style>