

**Instruções:**

1. Clone o projeto e em seguida execute os seguintes comandos

```node
npm install
npm run dev
```


## Estrutura e URLs

A aplicação em questão deve responder pela seguintes **URLs**:

/login(raiz) via POST
--- 

Deve ser enviado um json com dois campos, usarname e password

```
{
  username: bruno,
  password: 11111
}
```

Existe somente um usuário possível. Verifique no código fonte.

Verifique a resposta. Em caso de sucesso você terá acesso ao token.


/protected via GET

Se o token for enviado corretamente no header, você receberá uma mensagem indicando que você acessou o recurso com sucesso.


## Arquivos HBS

Estamos usando o **Handlebars** nessa aplicação para que não precisemos *imprimir* código HTML ao responder uma requisição. No projeto temos 4 arquivos **.hbs**:

main.hbs
--- 
Contém o layout principal da aplicação. O outros arquivos reusam as informações dele para evitar a repetição de código.

Você não irá interagir diretamente com esse arquivo.Este arquivo **espera** que uma **variável** chamada **pageTitle** (tem que ser escrita exatamente assim) seja passada para ele. Ela irá preencher a tag `<title>` e a tag `<h1>` com essa valor.

index.hbs
---
Este arquivo contém o código hbs/html necessário para listar os usuários.

Para isso você precisá passar duas variáveis para ele:

1. pageTitle: Um texto qualquer
2. users: Que deve contér a lista de usuários da aplicação

form.hbs
---
Este arquivo contém o código hbs/html que define o formulário que deve ser preenchido na criação ou atualização de um usuário. Portanto, este mesmo arquivo será renderizado quando as URLs, **/users/add e /users/:id** forem acessadas.

Para que ele funcione corretamente 3 variáveis podem ser informadas:

1. pageTitle: Um texto qualquer
2. user: 
    * Deve ser vazio quando um utilizador da aplicação estiver tentando criar um novo usuário
   * Deve contér um usuário quando o utilizador estiver tentando atualizar um usuário existente
3. error: Deve conter uma mensagem de erro somente quando um erro de validação ocorrer

notFound.hbs
---
Apenas mostra uma mensagem de error.

Somente o *pageTitle* deve ser enviado.

## Renderizando um arquivo HBS

Para fazer com que um arquivo hbs seja renderizado corretamente, no código que trata a rota adequada será necessário o seguinte código:


```node
res.render('nome-do-arquivo-hbs', {
  variavel1: valor1,
  variavel2: valor2
})
```

res -> Precisar ser o objeto response

O primeira argumento do método *render* deve ser o nome do arquivo .hbs que deverá ser renderizado. **Não é preciso informa a extensão.**

O segundo argumento do método *render* recebe um objeto, cuja as propiedades são as variáveis que serão acessíveis no arquivo hbs indicado como primeiro argumento.

Exemplo de uso:

```node
res.render('index', {
  pageTitle: 'User list',
  users: myUserList
})
```

Neste caso a página index.hbs será renderizada com o títlo 'User List' e a lista de usuários contidas na variável **myUserList** será mostrada na tela.
