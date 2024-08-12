### Comando para construir el proyecto
`npm install --global yarn`
`npx create-turbo@latest \name-project \yarn workspaces`
### Comando para iniciar el proyecto
`yarn dev`
### Comando para instalar typescript en el directorio apps/server (una sola vez)
`yarn workspace server add typescript -D`
### Comando para instalar el compilador de typescript en el directorio apps/server(una sola vez)
`yarn workspace server add tsc-watch -D`
### Comando para instalar la lib socket.IO en el directorio apps/server(una sola vez)
`yarn workspace server add socket.io`
### Comando para crear el archivo config de typescript (una sola vez)
`yarn tsc --init`
### Comando para instalar la lib socket.IO-Client en el directorio apps/web(una sola vez)
`yarn workspace web add socket.io-client`
### Comando para instalar la lib IORedis en el directorio apps/server (una sola vez)
`yarn workspace web add ioredis`
### Comando para instalar la lib Kafka en el directorio apps/server (una sola vez)
`yarn workspace web add kafkajs`
### Comando para hacer la prueba desde otro servidor
`set PORT=8001 && npm start`
