import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { Choice } from './entities/choice.entity';
import { ChoiceInput } from './dto/choice.dto';
import { Question } from '../question/entities/question.entity';

const logger = new Logger('ChoiceResolver'); // 로거 생성

@Resolver(() => Choice)
export class ChoiceResolver {
  constructor(private readonly choiceService: ChoiceService) {}

  @Mutation(() => Choice)
  async createChoice(
    @Args('questionId') questionId: number,
    @Args('input') input: ChoiceInput,
  ): Promise<Choice> {
    logger.log(
      `Creating a new choice for question with ID ${questionId} and input: ${JSON.stringify(
        input,
      )}`,
    ); // 로그 추가
    return await this.choiceService.createChoice(questionId, input);
  }

  @Query(() => [Choice])
  async getAllChoicesByQuestionId(
    @Args('questionId') questionId: number,
  ): Promise<Choice[]> {
    logger.log(`Fetching all choices for question with ID: ${questionId}`); // 로그 추가
    return await this.choiceService.getAllChoicesByQuestionId(questionId);
  }

  @Query(() => Choice)
  async getChoiceById(@Args('id') id: number): Promise<Choice> {
    logger.log(`Fetching choice with ID: ${id}`); // 로그 추가
    return await this.choiceService.getChoiceById(id);
  }

  @Mutation(() => Choice)
  async updateChoice(
    @Args('id') id: number,
    @Args('input') input: ChoiceInput,
  ): Promise<Choice> {
    logger.log(
      `Updating choice with ID ${id} and input: ${JSON.stringify(input)}`,
    ); // 로그 추가
    return await this.choiceService.updateChoice(id, input);
  }

  @Mutation(() => Boolean)
  async deleteChoice(@Args('id') id: number): Promise<boolean> {
    logger.log(`Deleting choice with ID: ${id}`); // 로그 추가
    return await this.choiceService.deleteChoice(id);
  }

  @ResolveField('question', () => Question)
  async getQuestion(@Parent() choice: Choice): Promise<Question> {
    logger.log(`Fetching question for choice with ID: ${choice.id}`); // 로그 추가
    const { question } = choice;
    return question;
  }
}
