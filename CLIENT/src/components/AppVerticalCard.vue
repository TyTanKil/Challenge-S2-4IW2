<script lang="ts" setup>
    import ApiClient from '@/assets/js/apiClient';
    import { defineProps, ref, onMounted } from 'vue';
    import { useToast } from 'vue-toast-notification';
    import { useStore } from 'vuex';

    // Définition des propriétés passées au composant
    const props = defineProps({
    id: Number,
    label: String,
    description: String,
    price: String,
    link: String,
    link_img: String
    });

    const selectedQuantity = ref(1);
    const quantityOptions = ref<number[]>([]);

    onMounted(async () => {
    try {
        const response = await ApiClient.post('/stock/ByIdProduct', { id_product: props.id });
        if (response.status === 200 && response.data.length > 0) {
        const maxQuantity = response.data[0].quantity;
        quantityOptions.value = Array.from({ length: maxQuantity }, (_, i) => i + 1);
        } else {
        toast.error('Erreur lors de la récupération de la quantité du produit');
        }
    } catch (error) {
        console.error('Error fetching product quantity:', error);
        toast.error('Erreur lors de la récupération de la quantité du produit');
    }
    });

    // Initialisation des données et des méthodes
    const store = useStore();
    const toast = useToast();

    function navigate() {
    if (props.link) {
        window.location.href = props.link;
    }
    }

    const addToCart = async () => {
    const id_user = store.state.user_id;
    console.log('User ID:', id_user);
    const productId = props.id;

    if (id_user == null) {
        toast.error('Vous devez être connecté pour ajouter un produit au panier');
        return;
    }

    try {
        let responseGetCart;
        let cartId;

        // Tenter de récupérer le panier existant
        try {
        responseGetCart = await ApiClient.post(`/cart/getByIDUser`, { id_user: id_user });
        console.log('Response Cart:', responseGetCart);

        if (responseGetCart.status === 200) {
            cartId = responseGetCart.data.id;
        } else {
            throw new Error('Unexpected response status');
        }
        } catch (error) {
        if (error.response && error.response.status === 404) {
            // Si le panier n'existe pas (404), en créer un nouveau
            let responseCart = await ApiClient.put(`/cart`, { id_user: id_user });
            cartId = responseCart.data.id;
        } else {
            // Si une autre erreur survient, la gérer
            throw error;
        }
        }

        // Ajouter le produit avec la quantité sélectionnée
        let responseAddCart = await ApiClient.post(`/cartProduct/addProduct`, { 
        id_cart: cartId,
        id_product: productId,
        quantity: selectedQuantity.value
        });
        toast.success('Produit ajouté au panier');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        toast.error('Une erreur est survenue lors de l\'ajout du produit au panier');
    }
    }

    const emits = defineEmits(['select']);

    function selectCard() {
    emits('select', {
        name: props.label,
        description: props.description,
        price: props.price,
        link_img: props.link_img
    });
    }
</script>

<template>        
    <div class="card_vertical">
        <img @click="selectCard" class="card_vertical_img" :src="props.link_img" :alt="props.label">
        <div class="infos">
            <h3>{{ props.label }}</h3>
            <h4>{{ props.description }}</h4>
        </div>
        <div class="quantity_selector">
            <label for="quantity">Quantité:</label>
            <select v-model="selectedQuantity" id="quantity">
                <option v-for="num in quantityOptions" :key="num" :value="num">
                    {{ num }}
                </option>
            </select>
        </div>
        <div class="buy_div_container">
            <p>Prix : {{ props.price }} €</p>
            <div class="cart_img_container">
                <button @click="addToCart">
                    <img class="cart_card" src="\src\assets\img\svg\icons\cart2.svg" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card_vertical {
        background-color: #575757;
        color: #fff;
        max-width: 25%;
        min-width: 12rem;
        height: auto;
        margin: 1rem;
        padding: 0.8rem;
        border-radius: 8px;
        border: 0.7px #C4F649 solid;
        transition: box-shadow 0.3s ease;
    }
    .card_vertical:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .card_vertical_img {
        height: auto;
        width: 100%;
        object-fit: contain;
    }
    .card_vertical_img:hover {
        cursor: pointer;
    }
    .infos {
        margin: 0.5rem 0;
    }
    .infos h3 {
        font-weight: 500;
        margin: 0;
        font-size: x-large;
    }
    .infos h4 {
        font-weight: 300;
        margin: 0;
        font-size: medium;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .buy_div_container {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .buy_div_container p {
        font-size: large;
        font-weight: 500;
    }
    .cart_img_container {
        margin-right: 1rem;
    }
    .cart_img_container button {
        border: none;
        min-width: 4rem;
        height: 3.2rem;
        background-color: #C4F649;
        border-radius: 8px;
        box-shadow: 1px 2px #3838385d;
        padding: 0.4rem;
    }
    .cart_img_container button:hover {
        cursor: pointer;
        background-color: #A0DB10;
    }
    .cart_card {
        width: 100%;
        height: 100%;
    }
    .quantity_selector {
        margin: 10px 0;
    }
    .quantity_selector label {
        margin-right: 10px;
    }
    .quantity_selector select {
        padding: 5px;
    }
    @media (prefers-color-scheme: dark) {
        .card_vertical {
            background-color: #fff;
            color: black;
        }
    }
</style>
