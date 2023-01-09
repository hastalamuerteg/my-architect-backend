# my-architect-backend

## Passos para iniciar o projeto

Configurar o arquivo .env na raiz do projeto colocando os seguintes dados

DATABASE_URL="file:./dev.db"

### Comandos

- yarn (instalação de dependências)
- yarn dev (para iniciar o projeto)


O Arquivo server.ts possui as seguintes configurações de CORS

const corsConfig = {
  origin: 'http://localhost:5173'
  optionsSuccessStatus: 200,
  credentials: true,
};


##### Caso o frontend esteja rodando em outra porta, altere o origin para a rota em questão

origin: 'http://localhost:PORTA-DO-FRONTEND'
