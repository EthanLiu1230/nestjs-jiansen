// swagger config
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const config = new DocumentBuilder()
  .setTitle('Title')
  .setDescription('Description')
  .setVersion('1.0')
  .build();

export const configSwagger = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
