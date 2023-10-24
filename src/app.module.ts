import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesController } from './mensajes/mensajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajesService } from './mensajes/mensajes.service';
import { Mensaje } from './mensajes/entities/mensaje.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'DESKTOP-6QV4KQA',
      port: 1433,
      username: 'sa',
      password: '123',
      database: 'PRUEBA',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      }
    }),
    TypeOrmModule.forFeature([Mensaje])
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajesService],
})
export class AppModule {}
