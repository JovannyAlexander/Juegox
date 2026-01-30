# Configuración de Imágenes Hentai Voluptuoso

## 🎨 Instrucciones para Cambiar las Imágenes

Para usar imágenes de hentai japonés voluptuoso con menos ropa y poses provocativas, sigue estas instrucciones:

## 📍 Ubicaciones de las URLs

### 1. Fondo Principal
**Archivo:** `app/globals.css` (línea ~17)
**Archivo:** `app/page.tsx` (línea ~37)

Cambia la URL en `background-image` por tu imagen de hentai voluptuoso.

### 2. Tarjeta de Preguntas
**Archivo:** `components/QuestionCard.tsx` (línea ~12)

URL para imágenes de personajes hentai voluptuosos en tarjetas de preguntas.

### 3. Tarjeta de Desafíos
**Archivo:** `components/ChallengeCard.tsx` (línea ~11)

URL para imágenes de personajes hentai voluptuosos en tarjetas de desafíos.

### 4. Configuración del Juego
**Archivo:** `components/GameSetup.tsx` (línea ~50)

URL para la pantalla de configuración.

### 5. Tabla de Clasificación
**Archivo:** `components/ScoreBoard.tsx` (línea ~38)

URL para el fondo del scoreboard.

## 🌐 Opciones para Obtener URLs

### Opción 1: Danbooru (Recomendado)
1. Visita: https://danbooru.donmai.us
2. Busca tags como: `large_breasts`, `suggestive`, `panties`, `lingerie`, `sitting`, `lying`
3. Haz clic derecho en la imagen → "Copy image address"
4. Usa esa URL directamente

**Ejemplo de formato:**
```
https://cdn.donmai.us/original/12/34/1234567890abcdef1234567890abcdef.jpg
```

### Opción 2: Gelbooru
1. Visita: https://gelbooru.com
2. Busca con tags similares
3. Copia la URL directa de la imagen

### Opción 3: Imágenes Locales (Más Privado)
1. Crea la carpeta: `public/images/hentai/`
2. Descarga tus imágenes de hentai voluptuoso
3. Guárdalas ahí con nombres descriptivos:
   - `fondo.jpg` - Para el fondo principal
   - `preguntas.jpg` - Para tarjetas de preguntas
   - `desafios.jpg` - Para tarjetas de desafíos
   - `setup.jpg` - Para configuración
   - `scoreboard.jpg` - Para tabla de clasificación
4. Usa las rutas:
   - `/images/hentai/fondo.jpg`
   - `/images/hentai/preguntas.jpg`
   - etc.

### Opción 4: Otros Servicios
- **Rule34.xxx**: Permite copiar URLs directas
- **Pixiv**: Requiere cuenta y puede tener restricciones
- **Imgur**: Con cuenta verificada para NSFW
- **PostImage**: Soporta contenido adulto

## 🎯 Características Deseadas

Cuando elijas tus imágenes, busca:

✅ **Voluptuoso**: Curvas exageradas, senos grandes, caderas anchas  
✅ **Poca ropa**: Ropa interior, bikini mínimo, semi-desnudo, transparentes  
✅ **Pose provocativa**: Sentada, acostada, seductora, insinuante, erótica  
✅ **Estilo hentai**: Anime/manga japonés, colores vibrantes  
✅ **Alta calidad**: Resolución mínima 1920x1080 para mejor visualización  

## 📝 Tags Recomendados para Búsqueda

En Danbooru/Gelbooru usa estos tags:
- `large_breasts`
- `wide_hips` 
- `thick_thighs`
- `suggestive`
- `lingerie`
- `panties`
- `sitting`
- `lying`
- `bent_over`
- `spread_legs`
- `cleavage`
- `ass`

## ⚙️ Ajustes Visuales

Si las imágenes no se ven bien, puedes ajustar los filtros en `app/globals.css`:

```css
.image-background {
  filter: brightness(0.85) saturate(1.4) contrast(1.15);
}
```

- `brightness()`: Ajusta el brillo (0.7 = oscuro, 1.0 = normal)
- `saturate()`: Ajusta la saturación (1.0 = normal, 1.5 = muy saturado)
- `contrast()`: Ajusta el contraste (1.0 = normal, 1.3 = alto contraste)

## 🔒 Privacidad

Si usas imágenes locales en `public/images/hentai/`, esas imágenes estarán incluidas en tu build y serán públicas cuando despliegues el sitio. Ten esto en cuenta si quieres mantener privacidad.
