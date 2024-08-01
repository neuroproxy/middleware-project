//importar la clase para intercatuar con la db
import {PrismaClient} from "@prisma/client"; 

const prismaClient = new PrismaClient({
    log: ["query"],
});

export default prismaClient;