# Desafio 09
Desafio do bootcamp da rocketseat para aprender novas coisas e treinar o que nós já aprendemos até agora no Node.js junto ao TypeScript, incluindo o uso de banco de dados com o TypeORM, e relacionamentos ManyToMany!

Essa será uma aplicação que deve permitir a criação de clientes, produtos e pedidos, onde o cliente pode gerar novos pedidos de compra de certos produtos, como um pequeno e-commerce.

Para te ajudar nesse desafio, a rocketseat criou para nós um modelo que devemos utilizar como um template do Github.

Link: https://github.com/Rocketseat/gostack-template-typeorm-relations


### Em construção

## Nome do banco de dados
- gostack_desafio09

## Tabela customers

- id
- name
- email
- created_at
- updated_at

### Regra de negócios
- [x] Antes de criar um novo cliente, sempre verifique se já existe um cliente com o mesmo e-mail. Caso ela exista, retorne um erro.

### Funções
- [x] criar customer

### Rotas
- POST: http://localhost:3333/customers

- Parâmetros Body:
  name:string
  email:string
--------------------//-----------//-------------------------------------------

## Tabela customers

- id
- name
- price
- quantity
- created_at
- updated_at


### Regra de negócios
- [x] Antes de criar um novo produto, sempre verifique se já existe um produto com o mesmo nome. Caso ela exista, retorne um erro.

### Funções
- [x] criar product

### Rotas
- POST: http://localhost:3333/products

- Parâmetros Body:
  name:string
  price:number
  quantity:number
--------------------//-----------//-------------------------------------------
