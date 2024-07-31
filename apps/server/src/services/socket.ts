import { Server } from "socket.io";
import Redis from 'ioredis'

const pub = new Redis({
    host: 'caching-2efbeb0-middleware-project.e.aivencloud.com',
    port: 12606,
    username: 'default',
    password: 'AVNS_pTOZ4hzlDEPg-2u0SN7'
})
const sub = new Redis({
    host: 'caching-2efbeb0-middleware-project.e.aivencloud.com',
    port: 12606,
    username: 'default',
    password: 'AVNS_pTOZ4hzlDEPg-2u0SN7'
})

//Clase que exporta el socket al archivo index que contiene el servidor
class SocketService {
    private _io: Server

    //Inicializamos el objeto _io que contiene el socket
    constructor() {
        console.log("Iniciando Servicio Socket...")
        //Agregamos a la funcion server las politicas CORS
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            }
        })
        sub.subscribe('MENSAJE')
    }

    //Funcion que inicia el socket
    public initListeners(){
        const io = this.io
        console.log("Iniciando evento que atiende a un solicitante para el socket")

        //Funcion que conecta el socket a traves del .id y registra el evento message
        io.on('connect', async socket => {
            console.log(`Nuevo Socket Conectado`, socket.id)
            socket.on('event:message', async ({message}: {message:string}) => {
                console.log("Nuevo Mensaje Recibido.", message)

                //Publish el mensaje hacia Redis
                await pub.publish("MENSAJE", JSON.stringify({ message }))
            })
        })
        sub.on('message', (channel, message) => {
            if (channel === 'MENSAJE') {
                console.log("Nuevo mensajes desde Redis", message)
                io.emit("message", message);
            }
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService