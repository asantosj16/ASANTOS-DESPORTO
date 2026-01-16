# Imagens Públicas - ASANTOS DESPORTO

Esta pasta (`/public/images/`) é o local centralizado para armazenar todos os ativos visuais estáticos da plataforma que não precisam ser processados pelo empacotador (bundler).

### Estrutura Sugerida:
- `/avatars`: Fotos de perfil e avatares de usuários.
- `/backgrounds`: Texturas, gradientes e fotos de fundo.
- `/exercises`: Fotos ou GIFs ilustrativos de exercícios físicos.
- `/logos`: Logomarcas e ícones personalizados.

### Como Referenciar no Código:

#### Em Componentes React:
```tsx
// O caminho deve começar com /public/images/
<img src="/public/images/seu-arquivo.png" alt="Descrição" />
```

#### Em Arquivos CSS/Tailwind (no index.html):
```css
.minha-classe {
  background-image: url('/public/images/background.jpg');
}
```
