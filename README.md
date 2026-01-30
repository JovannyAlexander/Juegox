# Juego para Grupos - Preguntas y Desafíos

Una aplicación web moderna desarrollada con Next.js para jugar un juego de preguntas y desafíos picantes entre grupos de amigos.

## 🎮 Características

- **Configuración flexible**: Elige entre solo preguntas, solo desafíos o modo mixto
- **Múltiples jugadores**: Soporta de 2 a 10 jugadores
- **Interfaz moderna**: Diseño oscuro con animaciones suaves y responsive
- **Contenido variado**: Preguntas y desafíos organizados por categorías y niveles
- **Sin repeticiones**: El sistema evita mostrar el mismo contenido dos veces

## 🚀 Despliegue en AWS Amplify

Este proyecto está optimizado para desplegarse en AWS Amplify de forma gratuita.

### Prerrequisitos

1. Una cuenta de AWS (puedes crear una cuenta gratuita)
2. Un repositorio Git (GitHub, GitLab o Bitbucket)
3. Node.js 18+ instalado localmente (para desarrollo)

### Pasos de Despliegue

#### 1. Preparar el Repositorio

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd juego-adulto-grupos

# Instalar dependencias
npm install

# Hacer commit y push
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. Conectar a AWS Amplify

1. Ve a la [Consola de AWS Amplify](https://console.aws.amazon.com/amplify/)
2. Haz clic en **"New app"** → **"Host web app"**
3. Selecciona tu proveedor de Git (GitHub, GitLab o Bitbucket)
4. Autoriza AWS Amplify para acceder a tu repositorio
5. Selecciona el repositorio y la rama (normalmente `main` o `master`)
6. AWS Amplify detectará automáticamente que es un proyecto Next.js

#### 3. Configurar Build Settings

AWS Amplify detectará automáticamente Next.js, pero puedes verificar que la configuración sea:

- **Build command**: `npm run build`
- **Output directory**: `.next`

El archivo `amplify.yml` ya está configurado y se usará automáticamente.

#### 4. Desplegar

1. Haz clic en **"Save and deploy"**
2. Espera a que se complete el build (aproximadamente 3-5 minutos)
3. Una vez completado, tu aplicación estará disponible en una URL de AWS Amplify

### Plan Gratuito de AWS Amplify

El plan gratuito incluye:
- **1000 minutos de build time** por mes
- **15 GB de transferencia de datos** por mes
- **5 GB de almacenamiento**
- **SSL/HTTPS** incluido automáticamente
- **CDN global** con CloudFront

Esto es más que suficiente para proyectos pequeños y medianos.

## 💻 Desarrollo Local

### Instalación

```bash
# Instalar dependencias
npm install
```

### Ejecutar en Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Build de Producción

```bash
# Crear build de producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura del Proyecto

```
/
├── app/                    # Páginas y layouts de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── GameSetup.tsx     # Configuración inicial
│   ├── GameBoard.tsx     # Tablero principal
│   ├── PlayerCard.tsx    # Tarjeta de jugador
│   ├── QuestionCard.tsx  # Tarjeta de pregunta
│   └── ChallengeCard.tsx # Tarjeta de desafío
├── data/                  # Datos del juego
│   ├── questions.json    # Preguntas organizadas por categorías
│   └── challenges.json   # Desafíos organizados por niveles
├── lib/                   # Lógica del juego
│   └── gameLogic.ts      # Funciones de turnos y selección
├── amplify.yml           # Configuración de AWS Amplify
├── next.config.js        # Configuración de Next.js
└── package.json          # Dependencias del proyecto
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 14+**: Framework React con App Router
- **React 18+**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de CSS utility-first
- **AWS Amplify**: Hosting y CI/CD

## 📝 Personalización

### Agregar Preguntas o Desafíos

Edita los archivos JSON en la carpeta `data/`:

- `data/questions.json`: Agrega preguntas en las categorías existentes o crea nuevas
- `data/challenges.json`: Agrega desafíos en los niveles existentes o crea nuevos

Las categorías de preguntas son:
- `romanticas`: Preguntas románticas y suaves
- `picantes`: Preguntas más atrevidas
- `extremas`: Preguntas más intensas

Los niveles de desafíos son:
- `suaves`: Desafíos suaves y discretos
- `intermedios`: Desafíos moderados
- `extremos`: Desafíos más intensos

## 🎨 Personalización de Estilos

Los estilos están en:
- `app/globals.css`: Estilos globales y animaciones
- `tailwind.config.ts`: Configuración de Tailwind CSS

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de modificar y usar como desees.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de hacer fork y enviar pull requests.

## ⚠️ Aviso

Este juego contiene contenido para adultos. Asegúrate de que todos los participantes sean mayores de edad y estén de acuerdo con participar.
