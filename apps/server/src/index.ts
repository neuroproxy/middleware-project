import http from 'http'
import SocketService from './services/socket'
import { startMessageConsumer } from './services/kafka'

//Funcion para crear y ejecutar un servidor HTTP
async function init() {
    startMessageConsumer()
    const socketService = new SocketService()

    const httpServer = http.createServer()
    const PORT = process.env.PORT ? process.env.PORT : 8000

    //Añadimos la funcion socket al servidor
    socketService.io.attach(httpServer)

    httpServer.listen(PORT, () => 
        console.log(`HTTP Server ejecutandose en el puerto: ${PORT}`)
    )

    //Iniciamos los eventos para conectar y enviar mensajes a traves de initService
    socketService.initListeners()
}

init()