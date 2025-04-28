"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("product", [
      {
        id: '39bda5ea-8e1c-4885-b038-90d27c184139',
        id_manufacturer: 1,
        id_category: 1,
        ref: "DUAL-RTX3050-O6G",
        label:
          "ASUS DUAL GeForce RTX 3050 OC O6G ASUS DUAL GeForce RTX 3050 OC O6G",
        unit_price: 214.95,
        description:
          "La carte graphique ASUS DUAL GeForce RTX 3050 OC O6G embarque 6 Go de mémoire vidéo GDDR6. Des graphismes sublimés, une fluidité remarquable et un réalisme incroyable vous permettront de profiter au mieux des jeux PC en Full HD.",
      },
      {
        id: '89286027-029a-4266-9243-7600613bdd34',
        id_manufacturer: 1,
        id_category: 1,
        ref: "DUAL-RTX4060-O8G EVO",
        label: "ASUS Dual GeForce RTX 4060 EVO OC Edition 8GB",
        unit_price: 349.95,
        description:
          "Basée sur l'architecture NVIDIA Ada Lovelace, la carte graphique ASUS Dual GeForce RTX 4060 EVO OC Edition 8GB s'appuie sur la technologie DLSS 3 et le ray tracing matériel pour sublimer les jeux les plus récents et vous permettre de vivre une expérience vidéoludique immersive et réaliste.",
      },
      {
        id: '8e37d4f2-69f6-4b13-86e7-6fe214f23db8',
        id_manufacturer: 2,
        id_category: 1,
        ref: "GV-N407SAORUS M-12GD",
        label: "Gigabyte AORUS GeForce RTX 4070 SUPER MASTER 12G",
        unit_price: 779.95,
        description:
          "Tout ce dont vous avez besoin pour jouer ou créer est réuni au sein d'une seule et même carte graphique haut de gamme, la Gigabyte AORUS GeForce RTX 4070 SUPER MASTER 12G. Elle délivre des performances remarquables grâce au DLSS 3, au ray tracing et à l'intelligence artificielle.",
      },
      {
        id: 'd9e2e8e9-6e3e-46e4-8a9c-854705c7bcb6',
        id_manufacturer: 2,
        id_category: 1,
        ref: "GV-R64EAGLE-4GD",
        label: "Gigabyte AORUS Radeon RX 6400 EAGLE 4G",
        unit_price: 199.95,
        description:
          "Basée sur l'architecture AMD RDNA 2 et prenant en charge le ray tracing, la carte graphique Gigabyte AORUS Radeon RX 6400 EAGLE 4G vous permet de jouer en 1080p dans de bonnes conditions. Elle embarque 768 processeurs de flux et permet des fréquences de fonctionnement élevées.",
      },
      {
        id: 'e80450c9-c0c5-420d-8992-622dbb6d4ec4',
        id_manufacturer: 3,
        id_category: 1,
        ref: "GEFORCE GT 1030 2GHD4 LP OC",
        label: "MSI GeForce GT 1030 2GHD4 LP OC ",
        unit_price: 89.95,
        description:
          "La carte graphique MSI GeForce GT 1030 2GHD4 LP OC est la carte graphique multimédia par excellence. Facile à intégrer, consommant peu d'énergie, elle est idéale pour doter votre PC de fonctionnalités multimédia avancées. Plus performante qu'un iGP standard, elle offre un affichage fluide en HD.",
      },
      {
        id: 'f1edd901-d0d9-4f42-a754-6c75b491af5d',
        id_manufacturer: 4,
        id_category: 2,
        ref: "YD3200C5FHBOX",
        label: "AMD Ryzen 3 3200G Wraith Stealth Edition (3.6 GHz / 4 GHz)",
        unit_price: 79.95,
        description:
          "Le processeur AMD Ryzen 3 3200G Wraith Stealth (3.6 GHz / 4 GHz) est basé sur l'architecture Zen+ gravée en 12 nm. Cette deuxième génération Ryzen avec graphismes Radeon Vega 8 se dote de 4 coeurs, des fréquences revues à la hausse avec de base 3.6 GHz et jusqu'à 4 GHz.",
      },
      {
        id: 'd67fdc07-84bd-4818-a621-384cbac6e05a',
        id_manufacturer: 4,
        id_category: 2,
        ref: "100-100000144BOX",
        label: "AMD Ryzen 3 4300G Wraith Stealth (3.8 GHz / 4.0 GHz)",
        unit_price: 99.95,
        description:
          "L'AMD Ryzen 3 4300G est un processeur 4-Core basé sur l'architecture \"Zen 2\". Travail, Jeux ou Divertissement, ce processeur AMD Ryzen pour PC de bureau délivre des performances multitâches et multimédia avancées tout en restant très abordable.",
      },
      {
        id: 'ec5fe214-2ca1-4b81-9cbc-e7a144618e58',
        id_manufacturer: 4,
        id_category: 2,
        ref: "100-000000031",
        label: "AMD Ryzen 5 3600 (3.6 GHz / 4.2 GHz)",
        unit_price: 77.95,
        description:
          "Le processeur AMD Ryzen 5 3600 (3.6 GHz / 4.2 GHz) fait partie des premiers processeurs pour PC gravés en 7 nm. Ses 6 coeurs et 12 threads, une fréquence jusqu'à 4.2 GHz et 35 Mo de GameCache le rendent polyvalent, il vous permet de tout faire rapidement et en toute fluidité.",
      },
      {
        id: '1456236c-5f48-44eb-9e12-f01b7d19fd67',
        id_manufacturer: 5,
        id_category: 2,
        ref: "BX80701G6400",
        label: "Intel Pentium Gold G6400 (4.0 GHz)",
        unit_price: 79.95,
        description:
          "Abordable et performant, le processeur Comet Lake Intel Pentium G6400 (4.0 GHz) représente une solution idéale, peu onéreuse et efficace, pour la bureautique et le divertissement multimédia.",
      },
      {
        id: 'a0996c53-81b2-4275-9dde-0b8e2ef54147',
        id_manufacturer: 5,
        id_category: 2,
        ref: "BX8071512400",
        label: "Intel Core i5-12400 (2.5 GHz / 4.4 GHz)",
        unit_price: 178.95,
        description:
          "Avec plus de coeurs et plus de puissance, les processeurs Intel de 12ème génération (Alder Lake) sont prêts pour les jeux nouvelle génération, les cartes graphiques PCI-Express 5.0 ou encore la RAM DDR5. Ils vous permettront de concevoir des machines puissantes pour toutes les tâches.",
      },
    ]);

    await queryInterface.bulkInsert("stock", [
      {
        id_product: '39bda5ea-8e1c-4885-b038-90d27c184139', // ID du produit ASUS DUAL GeForce RTX 3050
        quantity: 50, // Quantité initiale de stock
      },
      {
        id_product: '89286027-029a-4266-9243-7600613bdd34', // ID du produit ASUS Dual GeForce RTX 4060
        quantity: 30, // Quantité initiale de stock
      },
      {
        id_product: '8e37d4f2-69f6-4b13-86e7-6fe214f23db8', // ID du produit ASUS Dual GeForce RTX 4060
        quantity: 20, // Quantité initiale de stock
      },
      {
        id_product: 'd9e2e8e9-6e3e-46e4-8a9c-854705c7bcb6', // ID du produit ASUS Dual GeForce RTX 4060
        quantity: 20, // Quantité initiale de stock
      },
      {
        id_product: 'e80450c9-c0c5-420d-8992-622dbb6d4ec4', // ID du produit ASUS Dual GeForce RTX 4060
        quantity: 60, // Quantité initiale de stock
      },
      {
        id_product: 'f1edd901-d0d9-4f42-a754-6c75b491af5d', // ID du produit ASUS Dual GeForce RTX 4060
        quantity: 30, // Quantité initiale de stock
      },
      {
        id_product: 'd67fdc07-84bd-4818-a621-384cbac6e05a', // ID du produit ASUS Dual GeForce RTX 4060
        quantity: 25, // Quantité initiale de stock
      },
      {
        id_product: 'ec5fe214-2ca1-4b81-9cbc-e7a144618e58', // ID du produit ASUS Dual GeForce RTX 4060
        quantity: 18, // Quantité initiale de stock
      },
      {
        id_product: '1456236c-5f48-44eb-9e12-f01b7d19fd67', // ID du produit ASUS Dual GeForce RTX 4060
        quantity: 13, // Quantité initiale de stock
      },
      {
        id_product: 'a0996c53-81b2-4275-9dde-0b8e2ef54147', // ID du produit ASUS Dual GeForce RTX 4060
        quantity: 7, // Quantité initiale de stock
      },
      // ... autres stocks pour les autres produits
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("stock", null, {});
    await queryInterface.bulkDelete("product", null, {});
  },
};
