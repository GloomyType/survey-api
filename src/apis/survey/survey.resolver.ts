import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { SurveyInput } from './dto/survey.dto';
import { QuestionResponse } from './dto/question-response.dto';

const logger = new Logger('SurveyResolver'); // 로거 생성

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Mutation(() => Survey)
  async createSurvey(@Args('input') input: SurveyInput): Promise<Survey> {
    logger.log(`Creating a new survey with input: ${JSON.stringify(input)}`); // 로그 추가
    return await this.surveyService.createSurvey(input);
  }

  @Query(() => [Survey])
  async getAllSurveys(): Promise<Survey[]> {
    logger.log('Fetching all surveys'); // 로그 추가
    return await this.surveyService.getAllSurveys();
  }

  @Mutation(() => Survey)
  async updateSurvey(
    @Args('id') id: number,
    @Args('input') input: SurveyInput,
  ): Promise<Survey> {
    logger.log(
      `Updating survey with ID ${id} and input: ${JSON.stringify(input)}`,
    ); // 로그 추가
    return await this.surveyService.updateSurvey(id, input);
  }

  @Mutation(() => Boolean)
  async deleteSurvey(@Args('id') id: number): Promise<boolean> {
    logger.log(`Deleting survey with ID: ${id}`); // 로그 추가
    return await this.surveyService.deleteSurvey(id);
  }

  @Query(() => [QuestionResponse])
  async getQuestionsBySurveyId(
    @Args('id') id: number,
  ): Promise<QuestionResponse[]> {
    logger.log(`Fetching questions for survey with ID: ${id}`); // 로그 추가
    return this.surveyService.getQuestionsBySurveyId(id);
  }
}
