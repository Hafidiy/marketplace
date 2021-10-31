import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Seeder } from "./seeder/seeder";
import { SeederModule } from "./seeder/seeder.module";

async function bootstrap() {
    try {
        const appContext = await NestFactory.createApplicationContext(SeederModule);

        const logger = appContext.get(Logger);
        const seeder = appContext.get(Seeder);

        try {
            await seeder.seed()
            logger.debug('Seeding complete!');
        } catch (error) {
            logger.error('Seeding failed!');
            console.log('Error seed in: ', error)
            throw error;
        } finally {
            appContext.close()
        }
    } catch (err) {
        console.log('Error seed: ', err)
        throw err;
    }
}
bootstrap();