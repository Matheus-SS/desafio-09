<p align="center">
  <img src="src/images/01.jpg"/>
</p>

![Badge](https://img.shields.io/github/issues/Matheus-SS/desafio-09)
![Badge](https://img.shields.io/github/forks/Matheus-SS/desafio-09)
![Badge](https://img.shields.io/github/stars/Matheus-SS/desafio-09)
[![GitHub license](https://img.shields.io/github/license/Matheus-SS/desafio-09?style=plastic)](https://github.com/Matheus-SS/desafio-09/blob/master/LICENSE)


# Desafio 09
Desafio do bootcamp da rocketseat para aprender novas coisas e treinar o que nós já aprendemos até agora no Node.js junto ao TypeScript, incluindo o uso de banco de dados com o TypeORM, e relacionamentos ManyToMany!

Essa será uma aplicação que deve permitir a criação de clientes, produtos e pedidos, onde o cliente pode gerar novos pedidos de compra de certos produtos, como um pequeno e-commerce.

Para nos ajudar nesse desafio, a rocketseat criou um modelo que devemos utilizar como um template do Github.

Link: https://github.com/Rocketseat/gostack-template-typeorm-relations


> Status do Projeto: Concluido :heavy_check_mark:

## Tabela customers

- id
- name
- email
- created_at
- updated_at

### Regra de negócios
- [x] Antes de criar um novo cliente, sempre verifique se já existe um cliente com o mesmo e-mail. Caso ela exista, retorne um erro.

### Funções
- [x] Cadastrar
- [x] Encontrar pelo ID
- [x] Encontrar pelo Email

### Services
- [x] criar customer

### Rotas
> POST: http://localhost:3333/customers

- Parâmetros Body:
```
{
  name:string
  email:string
}
```


## Tabela products

- id
- name
- price
- quantity
- created_at
- updated_at


### Regra de negócios
- [x] Antes de criar um novo produto, sempre verifique se já existe um produto com o mesmo nome. Caso ela exista, retorne um erro.

### Funções
- [x] Cadastrar produto
- [x] Encontrar pelo Nome
- [x] Encontrar produtos pelo ID
- [x] Atualizar quantidade em estoque

### Sevices
- [x] criar product

### Rotas
> POST: http://localhost:3333/products

- Parâmetros Body:
```
{
  name:string
  price:number
  quantity:number
}
```

## Tabela orders

- id
- customer_id (foreign key)
- price
- quantity
- created_at
- updated_at


### Regra de negócios
 > Service Criar order
- [x] NÃO deve permitir a criação de um novo pedido com um cliente que não existe no banco de dados, retornando um erro.
- [x] NÃO deve permitir a criação de um novo pedido com um produtos que não existem no banco de dados, retornando um erro caso um ou mais dos produtos enviados não exista no banco de dados.
- [x] NÃO deve permitir a criação de um novo pedido com produtos que NÃO possuem quantidade disponível, retornando um erro caso um ou mais dos produtos enviados NÃO possuam a quantidade necessária.
- [x] Aplicação deve permitir que, quando um novo pedido for criado, seja alterada a quantidade total dos produtos baseado na quantidade pedida.

### Funções
- [x] criar order
- [x] encontrar pelo ID

### Services
- [x] Criar order
- [x] Encontrar order


### Rotas
> POST: http://localhost:3333/orders

- Parâmetros Body:
```
{
	"customer_id":string,
	"products": [
		 {
		   "id":string,
		   "quantity":number
	   }
	 ]
  }
```
> GET: http://localhost:3333/orders/" {Um ID de order válido} "

#### Exemplo:
```
http://localhost:3333/orders/3032e4a2-6a59-4e3d-9ced-f13a7fb853d8
```


## Tabela orders_products

- id
- product_id (foreign key)
- order_id (foreign key)
- price
- quantity
- created_at
- updated_at

> Necessária a criação desta tabela, pois existe um relacionamento de N:N da tabela products com a tabela orders.


>> Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/Matheus-SS/desafio-09/blob/master/LICENSE) para mais detalhes.
