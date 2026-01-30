# Guía de Despliegue en AWS Amplify (Gratis)

Esta guía te ayudará a publicar tu juego para adultos de forma gratuita usando **AWS Amplify Hosting**.

## Paso 1: Subir tu código a GitHub

1. Crea un repositorio nuevo en [GitHub](https://github.com/new).
2. Sigue las instrucciones para subir tu código actual:
   ```bash
   git init
   git add .
   git commit -m "Preparado para despliegue en AWS Amplify"
   git branch -M main
   git remote add origin TU_URL_DE_GITHUB
   git push -u origin main
   ```

## Paso 2: Conectar con AWS Amplify

1. Inicia sesión en la [Consola de AWS](https://aws.amazon.com/).
2. Busca **AWS Amplify** en la barra de búsqueda.
3. Haz clic en **Deploy an app** (o "Get Started" en la sección de Hosting).
4. Selecciona **GitHub** como tu proveedor de repositorio y haz clic en **Next**.
5. Autoriza a AWS Amplify para acceder a tu cuenta de GitHub y selecciona tu repositorio `juegox`.
6. Selecciona la rama `main` y haz clic en **Next**.

## Paso 3: Configuración de Construcción (Build Settings)

AWS Amplify detectará automáticamente que es un proyecto de Next.js. Asegúrate de que los ajustes se vean parecidos a esto:

- **App name**: `juegox`
- **Environment**: `prod` (o el que prefieras)
- **Build commands**: `npm run build`
- **Base directory**: `out` (Esto es MUY importante porque estamos usando exportación estática)

Si necesitas editar el archivo `amplify.yml` durante la configuración, asegúrate de que se vea así:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Paso 4: Desplegar y Disfrutar

1. Haz clic en **Save and deploy**.
2. AWS Amplify comenzará a construir tu sitio. Esto tomará un par de minutos.
3. Una vez finalizado, recibirás una URL (algo como `https://main.d12345abcdef.amplifyapp.com`).
4. ¡Tu juego ya está en vivo y es accesible desde cualquier lugar!

## Notas Importantes sobre el Nivel Gratuito de AWS

- **AWS Free Tier**: Incluye 12 meses de nivel gratuito. Amplify ofrece 1000 minutos de construcción al mes y 5 GB de almacenamiento de datos, lo cual es más que suficiente para este juego.
- **HTTPS**: AWS proporciona automáticamente un certificado SSL gratuito para tu URL.
- **Actualizaciones**: Cada vez que hagas un `git push` a tu repositorio, AWS Amplify reconstruirá y actualizará tu juego automáticamente.
