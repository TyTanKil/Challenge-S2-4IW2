# Challenge-S2-4IW2
Challenge semestriel du S2 

## Sequelize : 

Créer un model :
```
npx sequelize-cli model:generate --name {Name} --attributes firstName:string,lastName:integer
```

Créer une migration :
```
npx sequelize-cli db:migrate
```

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