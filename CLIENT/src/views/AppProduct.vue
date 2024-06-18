<script setup lang='ts'>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    name: String,
    description: String,
    price: String,
    link_img: String
  });
</script>

<template>
  <div class="content">
    <div class="main_infos">
      <div class="images">
        <div class="all_images">
          <div class="img1">
            <img :src="link_img" alt="">
          </div>
          <div class="img2">
            <img :src="link_img" alt="">
          </div>
          <div class="img3">
            <img :src="link_img" alt="">
          </div>
        </div>
        <div class="main_img">
          <img :src="link_img" alt="">
        </div>
      </div>
      <div class="text_description">
        <div class="title">
          <h2>{{ props.name }}</h2>
        </div>
        <div class="description">
          <h3>{{ props.description }}</h3>
        </div>
        <div class="price">
          <h3>{{ price }} €</h3>
        </div>
        <div class="cart">
        </div>
      </div>    
    </div>
    <div class="detailed_description">

    </div>
  </div>
    
 
  </template>
  
<style scoped>
.content{
  padding: 0 2rem;
}
.main_infos{
  display: flex;
  flex-direction: column;
  width: 50%;
}

.text_description{
  padding-right: 1rem;
}

  .images{
    display: flex;
    .all_images{
      display: flex;
      flex-direction: column;
      img{
        width: 10rem;
        height: auto;
        border: black solid 1px;
      }
    }
    .main_img{
      img{
        width: 30rem;
        height: auto;
        border: black solid 1px;
      }
    }
  }

</style>
  