'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        id: 1,
        id_manufacturer: 1,
        id_category: 1,
        ref: 'DUAL-RTX3050-O6G',
        label: 'ASUS DUAL GeForce RTX 3050 OC O6G ASUS DUAL GeForce RTX 3050 OC O6G',
        unit_price: 214.95,
        description: 'La carte graphique ASUS DUAL GeForce RTX 3050 OC O6G embarque 6 Go de mémoire vidéo GDDR6. Des graphismes sublimés, une fluidité remarquable et un réalisme incroyable vous permettront de profiter au mieux des jeux PC en Full HD.'
      },
      {
        id: 2,
        id_manufacturer: 1,
        id_category: 1,
        ref: 'DUAL-RTX4060-O8G EVO',
        label: 'ASUS Dual GeForce RTX 4060 EVO OC Edition 8GB',
        unit_price: 349.95,
        description: 'Basée sur l\'architecture NVIDIA Ada Lovelace, la carte graphique ASUS Dual GeForce RTX 4060 EVO OC Edition 8GB s\'appuie sur la technologie DLSS 3 et le ray tracing matériel pour sublimer les jeux les plus récents et vous permettre de vivre une expérience vidéoludique immersive et réaliste.'
      },
      {
        id: 3,
        id_manufacturer: 2,
        id_category: 1,
        ref: 'GV-N407SAORUS M-12GD',
        label: 'Gigabyte AORUS GeForce RTX 4070 SUPER MASTER 12G',
        unit_price: 779.95,
        description: 'Tout ce dont vous avez besoin pour jouer ou créer est réuni au sein d\'une seule et même carte graphique haut de gamme, la Gigabyte AORUS GeForce RTX 4070 SUPER MASTER 12G. Elle délivre des performances remarquables grâce au DLSS 3, au ray tracing et à l\'intelligence artificielle.'
      },
      {
        id: 4,
        id_manufacturer: 2,
        id_category: 1,
        ref: 'GV-R64EAGLE-4GD',
        label: 'Gigabyte AORUS Radeon RX 6400 EAGLE 4G',
        unit_price: 199.95,
        description: 'Basée sur l\'architecture AMD RDNA 2 et prenant en charge le ray tracing, la carte graphique Gigabyte AORUS Radeon RX 6400 EAGLE 4G vous permet de jouer en 1080p dans de bonnes conditions. Elle embarque 768 processeurs de flux et permet des fréquences de fonctionnement élevées.'
      },
      {
        id: 5,
        id_manufacturer: 3,
        id_category: 1,
        ref: 'GEFORCE GT 1030 2GHD4 LP OC',
        label: 'MSI GeForce GT 1030 2GHD4 LP OC ',
        unit_price: 89.95,
        description: 'La carte graphique MSI GeForce GT 1030 2GHD4 LP OC est la carte graphique multimédia par excellence. Facile à intégrer, consommant peu d\'énergie, elle est idéale pour doter votre PC de fonctionnalités multimédia avancées. Plus performante qu\'un iGP standard, elle offre un affichage fluide en HD.'
      },
      {
        id: 6,
        id_manufacturer: 4,
        id_category: 2,
        ref: 'YD3200C5FHBOX',
        label: 'AMD Ryzen 3 3200G Wraith Stealth Edition (3.6 GHz / 4 GHz)',
        unit_price: 79.95,
        description: 'Le processeur AMD Ryzen 3 3200G Wraith Stealth (3.6 GHz / 4 GHz) est basé sur l\'architecture Zen+ gravée en 12 nm. Cette deuxième génération Ryzen avec graphismes Radeon Vega 8 se dote de 4 coeurs, des fréquences revues à la hausse avec de base 3.6 GHz et jusqu\'à 4 GHz.'
      },
      {
        id: 7,
        id_manufacturer: 4,
        id_category: 2,
        ref: '100-100000144BOX',
        label: 'AMD Ryzen 3 4300G Wraith Stealth (3.8 GHz / 4.0 GHz)',
        unit_price: 99.95,
        description: 'L\'AMD Ryzen 3 4300G est un processeur 4-Core basé sur l\'architecture "Zen 2". Travail, Jeux ou Divertissement, ce processeur AMD Ryzen pour PC de bureau délivre des performances multitâches et multimédia avancées tout en restant très abordable.'
      },
      {
        id: 8,
        id_manufacturer: 4,
        id_category: 2,
        ref: '100-000000031',
        label: 'AMD Ryzen 5 3600 (3.6 GHz / 4.2 GHz)',
        unit_price: 77.95,
        description: 'Le processeur AMD Ryzen 5 3600 (3.6 GHz / 4.2 GHz) fait partie des premiers processeurs pour PC gravés en 7 nm. Ses 6 coeurs et 12 threads, une fréquence jusqu\'à 4.2 GHz et 35 Mo de GameCache le rendent polyvalent, il vous permet de tout faire rapidement et en toute fluidité.'
      },
      {
        id: 9,
        id_manufacturer: 5,
        id_category: 2,
        ref: 'BX80701G6400',
        label: 'Intel Pentium Gold G6400 (4.0 GHz)',
        unit_price: 79.95,
        description: 'Abordable et performant, le processeur Comet Lake Intel Pentium G6400 (4.0 GHz) représente une solution idéale, peu onéreuse et efficace, pour la bureautique et le divertissement multimédia.'
      },
      {
        id: 10,
        id_manufacturer: 5,
        id_category: 2,
        ref: 'BX8071512400',
        label: 'Intel Core i5-12400 (2.5 GHz / 4.4 GHz)',
        unit_price: 178.95,
        description: 'Avec plus de coeurs et plus de puissance, les processeurs Intel de 12ème génération (Alder Lake) sont prêts pour les jeux nouvelle génération, les cartes graphiques PCI-Express 5.0 ou encore la RAM DDR5. Ils vous permettront de concevoir des machines puissantes pour toutes les tâches.'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
