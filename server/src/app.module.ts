import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './team/team.module';
import { ConfigModule } from '@nestjs/config';
import { PredictionModule } from './prediction/prediction.module';

@Module({
  imports: [TeamModule, ConfigModule, PredictionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
