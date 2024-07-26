# Challenge-S2-4IW2
Challenge semestriel du S2 

## Développeurs :
- ANDRE Hugo (HugoAndre15):
    * Paiement par Stripe
    * Envoi de mails
    * Anonymisation des données
    * Page 'mon compte'

- HALIMI Kylian (TyTanKil):
    * Models
    * Panier
    * Commandes

- BEGUERISSE Jean-Pierre (JPBeguerisse):
    * Dashboard admin

- COPPE Rafael (RafaelCoppe):
    * Docker et Serveur de prod
    * Bases de Sequelize, seeding, routes et Mongoose
    * Pages liées au légal
    * Login / Inscription
    * Liaison back et front

## Lancement du projet : 

Installer les dépendances : 
```
cd CLIENT
npm install
cd ../SERVER
npm install
```

Créer la base de données : 
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Une fois le serveur lancé, allez sur l'url : 
``` 
http://localhost:8080/
```