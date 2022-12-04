import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './team/team.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TeamModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
