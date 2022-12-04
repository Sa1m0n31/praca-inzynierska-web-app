import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from "axios";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    credentials: true
  });

  // delete axios.defaults.headers.common["Authorization"];
  // delete axios.defaults.headers.common["Content-type"];
  // delete axios.defaults.headers.common["Accept"];
  // delete axios.defaults.headers.common["User-Agent"];
  // delete axios.defaults.headers.common["Accept-Encoding"];
  axios.defaults.headers.common['x-apisports-key'] = 'b6989b8cceda1f257e2f65f8913c43e6';

  console.log(axios.defaults.headers);

  await app.listen(5000);
}
bootstrap();
