<template>
  <div class="about-us">
    <div class="about-us-header">
      <img src="\src\assets\img\svg\TechShop_-_Brand_Logo\svg\logo-no-background-dark.svg" alt="TechShop Logo" class="logo" />
      <h1>Qui sommes-nous ?</h1>
    </div>
    <div class="about-us-content">
      <div class="text-content">
        <h2>Bienvenue chez TechShop</h2>
        <p>
          TechShop est votre destination en ligne pour tous vos besoins en composants informatiques et en ordinateurs.
          Fondée avec la mission de fournir des produits de haute qualité à des prix compétitifs, TechShop est devenue une référence
          pour les passionnés de technologie et les professionnels de l'informatique.
        </p>
        <h2>Notre histoire</h2>
        <p>
          L'aventure TechShop commença en 2008 quand quatre jeunes développeurs passionnés d'informatique décidèrent de se lancer
          dans le monde de l'entrepreneuriat, désireux de mettre en pratique leurs connaissances au cœur d'un projet qui les représentait.
          Après s'être rencontrés durant leurs études, ils décidèrent de lancer leur propre entreprise : c'est ainsi que naquit TechShop,
          votre fournisseur n°1 dans les composants informatiques.
        </p>
        <h2>Notre mission</h2>
        <p>
          Notre mission est simple : offrir une large gamme de produits informatiques,
          accompagnée d'un service client exceptionnel et d'une livraison rapide et fiable.
          Chez TechShop, nous croyons que chaque client mérite le meilleur, que ce soit pour monter un ordinateur de jeu performant
          ou pour équiper une entreprise avec les dernières technologies.
        </p>
        <h2>Nos services</h2>
        <p>
          Fiers de notre contrôle qualité, nous croyons à l'accès simple et économique à l'informatique. Nous proposons toujours les meilleurs
          produits à nos clients et nous assurons de leur satisfaction. Chaque produit est soigneusement sélectionné pour garantir
          sa fiabilité et sa performance, afin que vous puissiez réaliser vos projets en toute confiance.
        </p>
        <h3>Pourquoi nous choisir ?</h3>
        <ul>
          <li>Produits de qualité supérieure</li>
          <li>Prix compétitifs</li>
          <li>Service client réactif</li>
          <li>Livraison rapide et fiable</li>
          <li>Support technique expert</li>
        </ul>
      </div>
      <div class="image-content">
        <img src="\src\assets\img\equipe.png" alt="Notre équipe" class="team-image" />
        <img src="\src\assets\img\entrepot.jpg" alt="Notre entrepôt" class="warehouse-image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-us {
  padding: 40px;
  font-family: 'Roboto', sans-serif;
  color: #333;
  background-color: #f9f9f9;
  margin-bottom: 25px;
}

.about-us-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 300px;
  margin-bottom: 20px;
}

.about-us-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.about-us-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.text-content {
  flex: 1;
  max-width: 60%;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-content h2 {
  font-size: 2rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: #34495e;
}

.text-content h3 {
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #2980b9;
}

.text-content p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.text-content ul {
  list-style-type: disc;
  padding-left: 20px;
}

.text-content li {
  margin-bottom: 10px;
  font-size: 1rem;
}

.image-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.team-image,
.warehouse-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .about-us-content {
    flex-direction: column;
  }

  .text-content {
    max-width: 100%;
  }
}
</style>