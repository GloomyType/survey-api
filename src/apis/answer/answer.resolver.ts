import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Logger } from '@nestjs/common'; // Logger 추가
import { Answer } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import { AnswerInput } from './dto/answer.dto';

const logger = new Logger('AnswerResolver'); // 로거 생성

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Query(() => [Answer])
  async answers(): Promise<Answer[]> {
    logger.log('Fetching all answers'); // 로그 추가
    return this.answerService.findAll();
  }

  @Query(() => Answer)
  async answer(@Args('id', { type: () => Int }) id: number): Promise<Answer> {
    logger.log(`Fetching answer with ID: ${id}`); // 로그 추가
    return this.answerService.findOne(id);
  }

  @Mutation(() => Answer)
  async createAnswer(
    @Args('answerInput') answerInput: AnswerInput,
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ): Promise<Answer> {
    logger.log('Creating a new answer'); // 로그 추가
    return this.answerService.create(answerInput, surveyId);
  }

  @Mutation(() => Answer)
  async updateAnswer(
    @Args('id', { type: () => Int }) id: number,
    @Args('answerInput') answerInput: AnswerInput,
  ): Promise<Answer> {
    logger.log(`Updating answer with ID: ${id}`); // 로그 추가
    return this.answerService.update(id, answerInput);
  }

  @Mutation(() => Boolean)
  async deleteAnswer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    logger.log(`Deleting answer with ID: ${id}`); // 로그 추가
    return this.answerService.remove(id);
  }
}
