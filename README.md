# Challenge-S2-4IW2
Challenge semestriel du S2 

## Sequelize : 

### Models :

Créer un model :
```
npx sequelize-cli model:generate --name {Name} --attributes firstName:string,lastName:integer
```

Créer une migration :
```
npx sequelize-cli db:migrate
```
*Pensez à modifier le fichier avant de lancer la migration*

Annuler la dernière migration :
```
npx sequelize-cli db:migrate:undo
```

Annuler toutes les migrations :
```
npx sequelize-cli db:migrate:undo:all
```

Annuler toutes les migrations jusqu'à une migration spécifique :
```
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```

### Seeding (fixtures) :

Créer une fixture :
```
npx sequelize-cli seed:generate --name {Name}
```
*Pensez à modifier le fichier avant de lancer la fixture*

Lancer les fixtures :
```
npx sequelize-cli db:seed:all
```

Annuler la dernière fixture :
```
npx sequelize-cli db:seed:undo
```

Annuler toutes les fixtures :
```
npx sequelize-cli db:seed:undo:all
```

Annuler toutes les fixtures jusqu'à une fixture spécifique :
```
npx sequelize-cli db:seed:undo --seed {Nom du seed)
```