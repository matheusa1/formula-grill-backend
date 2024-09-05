Atualmente hospedado em <a href="https://formulagrill.shop">Formula Grill</a>

- backend:
  <a href="https://github.com/matheusa1/formula-grill-backend">formula-grill-backend</a>
- frontend:
  <a href="https://github.com/matheusa1/formula-grill-front">formula-grill-front</a>

## Running the app

```bash
$ npm run docker:run
```

## Test

### Install dependencies

```bash
$ pnpm i
```

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

```

### Criar um usuário administrador

crie um arquivo chamado .env com o seguinte conteúdo:

```env
JWT_SECRET=secret
POSTGRES_PRISMA_URL=postgres://postgres:admin@localhost:5432/formula-grill
POSTGRES_URL_NON_POOLING=postgres://postgres:admin@localhost:5432/formula-grill
```

Com o frontend rodando, cadastre um usuário normalmente, após isso, em um novo terminal execute os seguintes comandos
com a imagem do docker executando

```bash
$ npm i @pnpm/exe
$ pnpm i
$ pnpm prisma studio
```

com a tela web do prisma studio aberta, vá ao seu usuário desejado na tabela users, e faça a alteração no campo role para ADMIN

salve as alterações e está cadastrado como administrador
