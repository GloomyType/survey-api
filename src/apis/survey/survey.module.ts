import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { Question } from '../question/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question])],
  providers: [SurveyService, SurveyResolver],
})
export class SurveyModule {}
