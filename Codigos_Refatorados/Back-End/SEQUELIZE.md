### 1. Intale o sequelize de forma global

```js
 npm i sequelize
```

```js
 npm i -g sequelize-cli
```
## MIGRATION -> BackEnd for Database

### 1. Gera os modelos do banco

```js
 sequelize model:generate  --name Post --atributes title:string, content:text, imageUrl:string, categoryId, userId:integer
```


### 2. Faça o migration, leve os dados para o banco

```js
sequelize db:migrate
```

## Sequelize-auto -> Database for BackEnd

### 1. Caso queira gerar um modelo no back-end com base em tabelas já existentes baixe 

```js
npm install -g sequelize-auto
```

### 2. Execute o comando com suas configurações:

```js
sequelize-auto -h localhost -d nome_do_banco -u usuario -p 3306 -x senha -e mysql -o ./models
```

Parâmetro	Explicação
-h	Host (ex: localhost)
-d	Nome do banco de dados
-u	Usuário do banco
-p	Porta (default do MySQL: 3306)
-x	Senha do usuário
-e	Dialeto (use mysql)
-o	Pasta de saída dos models (./models)

### Exemplo:

```js
npx sequelize-auto -h 127.0.0.1 -d gctweb_dnit_val -u root -x admin -p 3306 -e mysql -o ./models --lang commonjs
```

## Geração de seeders

```js
 sequelize seed:generate --name municipio-seeder
```

### se eu quiser executar a seed

```js
 sequelize db:seed:all //Para todas as seeders
```

```js
 sequelize db:seed --seed arquivo.js //Para uma em especifico
```

### Para desfazer uma seed

```js
 sequelize db:seed:undo:all  
```

```js
 sequelize db:seed:undo --seed arquivo.js
```