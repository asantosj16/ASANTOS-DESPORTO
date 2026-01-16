
# Imagens Públicas - ASANTOS DESPORTO

Esta pasta (`/public/images/`) é o local centralizado para armazenar todos os ativos visuais estáticos da plataforma.

### Arquivos Atuais:
- `Perfil.jpg`: Foto de perfil oficial do profissional Anderson Santos (Substituiu avatar.jpg).

### Estrutura Sugerida:
- `/avatars`: Fotos de perfil e avatares de usuários.
- `/backgrounds`: Texturas, gradientes e fotos de fundo.
- `/exercises`: Fotos ou GIFs ilustrativos de exercícios físicos.
- `/logos`: Logomarcas e ícones personalizados.

### Como Referenciar no Código:

#### Em Componentes React:
```tsx
// O caminho deve começar com /public/images/
<img src="/public/images/Perfil.jpg" alt="Anderson Santos" />
```

#### Em Arquivos CSS/Tailwind (no index.html):
```css
.minha-classe {
  background-image: url('/public/images/Perfil.jpg');
}
```
