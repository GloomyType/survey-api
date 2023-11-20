import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Survey } from '../survey/entities/survey.entity';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Survey])],
  providers: [AnswerResolver, AnswerService],
})
export class AnswerModule {}
