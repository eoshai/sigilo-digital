# 📮 Sigilo Digital — Cartinhas Personalizadas

Uma plataforma moderna, elegante e rápida para criar, editar e visualizar **cartinhas digitais personalizadas**, com fotos, mensagens especiais e músicas via embed do Spotify.
Perfeito para presentes únicos, mensagens privadas e experiências personalizadas. ❤️✨

---

## 🚀 Funcionalidades

### 👤 Área Pública

* Busca de cartinha por **ID único**
* Exibição limpa e responsiva
* Galeria de fotos com indicador
* Texto formatado com espaçamento agradável
* Player de música via **Spotify embed**

### 🔐 Área Administrativa

Área protegida (login necessário), com:

* Criar cartinha
* Editar cartinha
* Excluir cartinha
* Preencher texto, fotos e embed do Spotify
* ID único obrigatório para cada cartão
* Interface clara e moderna

### ⚙️ API interna (REST)

A aplicação opera sobre rotas padrão (compatível com Next.js):

| Método | Rota                 | Função       |
| ------ | -------------------- | ------------ |
| GET    | `/api/cartinhas`     | Lista todas  |
| GET    | `/api/cartinhas/:id` | Busca por ID |
| POST   | `/api/cartinhas`     | Cria nova    |
| PUT    | `/api/cartinhas/:id` | Atualiza     |
| DELETE | `/api/cartinhas/:id` | Remove       |

---

## 🧩 Tecnologias Utilizadas

* **React (TSX)**
* **TailwindCSS**
* **Lucide Icons**
* **Fetch API**
* **Gerenciamento de estado com useState**
* **API local ou backend em /api**

---

## 🔐 Credenciais de Login (Admin)

As credenciais padrão são:

```
email: email.brabo@email.com
senha: Qnct3vwZ9djD8uTAZJxpYAXmB1s7NBq
```

> Importante: isso está **hardcoded** no arquivo.
> Para produção, troque por autenticação real (JWT, OAuth, banco de dados, etc).

---

## 🗂 Estrutura do Projeto

O componente principal fica em:

```
CartinhaDigital.tsx
```

Dentro dele vivem todas as partes:

* Home
* NotFound
* CartinhaPage
* Login
* Painel Admin
* Formulário
* API local

---

## 🛠 Como Rodar o Projeto Localmente

### 1️⃣ Clonar

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Rodar em modo de desenvolvimento

```bash
npm run dev
```

### 4️⃣ Acessar no navegador

```
http://localhost:3000
```

---

## 🧰 Variáveis de Ambiente (opcional)

Caso utilize `.env.local`:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🌍 Deploy na Vercel

1. Suba o projeto para um repositório no GitHub
2. Acesse: [https://vercel.com/import](https://vercel.com/import)
3. Faça login com GitHub
4. Selecione o repositório
5. Clique em Deploy

A Vercel detecta automaticamente projetos React/Next.js.

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
Consulte o arquivo **LICENSE** na raiz do repositório.

---

## 💛 Créditos

Criado com carinho por **Shai**, inovando a forma de enviar presentes digitais.