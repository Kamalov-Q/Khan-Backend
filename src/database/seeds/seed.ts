import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Seed');
  try {
    const app = await NestFactory.createApplicationContext(SeedModule);
    const seeder = app.get(SeedService);
    await seeder.seed();
    await app.close();
    logger.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding failed', error);
    process.exit(1);
  }
}
bootstrap();
