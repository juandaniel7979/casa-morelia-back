import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración personalizada de CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'https://tudominio.com'], // Orígenes permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permitir credenciales (cookies, auth headers, etc.)
    allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
    exposedHeaders: 'X-My-Custom-Header', // Encabezados expuestos al cliente
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
