import { Kafka, Producer } from "kafkajs";
import fs from 'fs'
import path from "path";
import { couldStartTrivia } from "typescript";
import prismaClient from "./prisma";

const kafka = new Kafka({
    brokers : ["kafka-2d8dc771-middleware-project.f.aivencloud.com:12619"],
    ssl: {
        ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
    },
    sasl: {
        username: 'avnadmin',
        password: 'AVNS_dKtTgJdTySnPDpQTmU0',
        mechanism: "plain",
    }
})

let producer: null | Producer = null

export async function createProducer() {
    if (producer) return producer

    const _producer = kafka.producer()
    await _producer.connect()
    producer = _producer
    return producer
}

export async function produceMessage(message: string) {
    const producer = await createProducer()
    await producer.send({
        messages: [{key: `message-${Date.now()}`, value: message}],
        topic: "MENSAJES",
    })
    return true
}

export async  function startMessageConsumer() {
        console.log('Consumer Kafka esta corriendo')
    const consumer = kafka.consumer({
        groupId: "default"
    })
    await consumer.connect()
    await consumer.subscribe({topic: "MENSAJES", fromBeginning: true})

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({message, pause}) => {
            if (!message.value) return;
            console.log(`Nuevo mensaje recibido`)
            try {
                await prismaClient.message.create({
                    data: {
                        text: message.value?.toString(),
                    },
                })
            } catch (err) {
                console.log('Algo esta mal')
                pause()
                setTimeout(() => { 
                    consumer.resume ([{topic: "MENSAJES"}]) 
                }, 60 * 1000)
            } 
        },
    })
}

export default kafka