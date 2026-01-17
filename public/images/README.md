
# Imagens Públicas - ASANTOS DESPORTO

Esta pasta (`/public/images/`) é servida na raiz do servidor.

### Arquivos Atuais:
- `Perfil.jpg`: Foto de perfil oficial (Anderson Santos).
- `SupinoHalteres.gif`: Demonstração técnica do Supino Reto com Halteres.
- `exercise-close-grip-bench-press.mp4`: Vídeo técnico do Supino Fechado.

### Como Referenciar Corretamente:

Para que as imagens funcionem tanto em desenvolvimento quanto após o build, **não** inclua o prefixo `/public/`.

#### Correto (React):
```tsx
// O navegador resolverá para a pasta public automaticamente
<img src="images/Perfil.jpg" alt="Anderson Santos" />
```

#### Incorreto (React):
```tsx
// Isso falhará na maioria dos ambientes de produção
<img src="/public/images/Perfil.jpg" alt="..." />
```

> **Nota:** Certifique-se de que o arquivo físico `SupinoHalteres.gif` existe exatamente com este nome (incluindo a capitalização) dentro desta pasta para que o componente ExerciseTable consiga carregá-lo.
