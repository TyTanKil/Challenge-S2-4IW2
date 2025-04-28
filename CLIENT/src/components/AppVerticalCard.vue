<script lang="ts" setup>
    import ApiClient from '@/assets/js/apiClient';
    import { defineProps, ref, onMounted } from 'vue';
    import { useToast } from 'vue-toast-notification';
    import { useStore } from 'vuex';

    // Définition des propriétés passées au composant
    const props = defineProps({
    id: Number,
    mongoId: String,
    label: String,
    description: String,
    price: String,
    link: String,
    link_img: String
    });

    const selectedQuantity = ref(1);
    const quantityOptions = ref<number[]>([]);
    const emits = defineEmits(['select', 'productAdded']);

    onMounted(async () => {
    try {
        const response = await ApiClient.post('/stock/ByIdProduct', { id_product: props.id });
        if (response.status === 200 && response.data.length > 0) {
        const maxQuantity = response.data[0].quantity;
        quantityOptions.value = Array.from({ length: maxQuantity }, (_, i) => i + 1);
        } else {
        console.error('Erreur lors de la récupération de la quantité du produit');
        }
    } catch (error) {
        console.error('Error fetching product quantity:', error);
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
            console.log('Product added:', responseAddCart.data);
            emits('productAdded', responseAddCart.data.id);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Une erreur est survenue lors de l\'ajout du produit au panier');
        }
    }

    function selectCard() {
    emits('select', {
        id : props.id,
        mongoId: props.mongoId,
        name: props.label,
        description: props.description,
        price: props.price,
        link_img: props.link_img
    });
    }
</script>

<template>        
    <div class="card_vertical" @click="selectCard">
        <img class="card_vertical_img" :src="props.link_img" :alt="props.label">
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
                <button @click.stop="addToCart">
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
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid #C4F649;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card_vertical:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
}

.card_vertical_img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.card_vertical_img:hover {
    cursor: pointer;
    transform: scale(1.05);
}

.infos {
    margin: 1rem 0;
    text-align: center;
}

.infos h3 {
    font-weight: 500;
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.infos h4 {
    font-weight: 300;
    margin: 0;
    font-size: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.quantity_selector {
    margin: 10px 0;
    text-align: center;
}

.quantity_selector label {
    margin-right: 10px;
    font-weight: 500;
}

.quantity_selector select {
    padding: 5px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #333;
    transition: all 0.3s ease;
}

.quantity_selector select:hover {
    border-color: #C4F649;
    background-color: #f0f0f0;
}

.buy_div_container {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.buy_div_container p {
    font-size: 1.2rem;
    font-weight: 500;
    color: #C4F649;
}

.cart_img_container {
    display: flex;
    justify-content: center;
}

.cart_img_container button {
    border: none;
    padding: 0.8rem;
    background-color: #C4F649;
    border-radius: 8px;
    box-shadow: 1px 2px #3838385d;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.cart_img_container button:hover {
    cursor: pointer;
    background-color: #A0DB10;
    transform: scale(1.1);
}

.cart_card {
    width: 24px;
    height: 24px;
}

@media (prefers-color-scheme: dark) {
    .card_vertical {
        background-color: #1a1a1a;
        color: white;
        border-color: #C4F649;
    }

    .cart_img_container button {
        background-color: #444;
    }

    .cart_img_container button:hover {
        background-color: #333;
    }

    .buy_div_container p {
        color: #C4F649;
    }
}
</style>