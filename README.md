
## API Reference



#### Vizualizar template

```http
  GET /${nome}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nome`      | `string` | **Required**. Gerar pdf com nome |


#### Gerar PDF

```http
  POST /
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nome`      | `string` | **Required**. Gerar pdf com nome |


  exeplo: JSON {
	"nome": "Gustavo da Silva Lopes"
}
