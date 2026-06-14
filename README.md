# inter-front

Frontend para visualizar la factorización QR de matrices.

## Qué hace

- Login con usuario y contraseña
- Ingresás una matriz en formato JSON
- Muestra las matrices Q y R resultantes
- Muestra estadísticas: máximo, mínimo, promedio, suma total y si alguna es diagonal

## Credenciales

```
usuario: admin123
contraseña: prueba123
```

## Correr en local

```bash
npm install
npm run dev
```

Crea un archivo `.env` con las URLs de las APIs:

```
VITE_NODE_API_URL=http://apipruebanodev1.137.184.19.146.sslip.io
VITE_GO_API_URL=http://apipruebagov1.137.184.19.146.sslip.io
```

## Stack

- React + Vite
- Tailwind CSS
- Axios
