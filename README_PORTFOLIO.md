# Como Modificar o Portfólio

Este guia mostra como modificar facilmente o conteúdo do seu portfólio.

## 📝 Modificar Conteúdo Principal

Abra o arquivo `src/config/portfolio.ts` para alterar:

### Email
```typescript
email: "seu-novo-email@exemplo.com"
```

### WhatsApp
```typescript
whatsapp: "https://wa.me/seu-numero" // Adicione seu link do WhatsApp
```

### Adicionar Nova Habilidade
```typescript
skills: [
  "UX/UI",
  "Desenvolvimento Web",
  "Nova Habilidade Aqui" // Adicione aqui
]
```

### Adicionar Novo Projeto
```typescript
projects: [
  // ... projetos existentes
  {
    id: 4, // Próximo número sequencial
    title: "Título do Novo Projeto",
    url: "https://seu-projeto.com",
    description: "Descrição breve do projeto"
  }
]
```

### Deletar Projeto
Simplesmente remova o objeto do projeto do array `projects`.

## 🖼️ Trocar Foto de Perfil

1. Substitua o arquivo `src/assets/profile-photo.png` pela sua nova foto
2. Mantenha o mesmo nome de arquivo ou atualize a importação em `src/pages/About.tsx`

## 🎨 Cores e Design

As cores principais estão em `src/index.css`:
- `--primary`: Cor principal (roxo)
- `--secondary`: Cor secundária
- `--background`: Cor de fundo

## 📄 Estrutura de Páginas

- **Home** (`src/pages/Home.tsx`): Página inicial com hero e habilidades
- **About** (`src/pages/About.tsx`): Página sobre com foto e descrição
- **Works** (`src/pages/Works.tsx`): Lista de projetos
- **Contact** (`src/pages/Contact.tsx`): Informações de contato

## 💡 Dicas

- Sempre mantenha a estrutura dos objetos ao modificar
- Use aspas duplas em strings
- Mantenha vírgulas entre itens dos arrays
- Salve o arquivo após modificar (o preview atualiza automaticamente)
