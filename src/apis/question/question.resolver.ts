import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { QuestionInput } from './dto/question.dto';

const logger = new Logger('QuestionResolver'); // 로거 생성

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  async createQuestion(@Args('input') input: QuestionInput): Promise<Question> {
    const { content } = input;
    logger.log(`Creating a new question with content: ${content}`); // 로그 추가
    return await this.questionService.createQuestion(content);
  }

  @Query(() => [Question])
  async getAllQuestions(): Promise<Question[]> {
    logger.log('Fetching all questions'); // 로그 추가
    return await this.questionService.getAllQuestions();
  }

  @Query(() => Question)
  async getQuestionById(@Args('id') id: number): Promise<Question> {
    logger.log(`Fetching question with ID: ${id}`); // 로그 추가
    return await this.questionService.getQuestionById(id);
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Args('id') id: number,
    @Args('input') input: QuestionInput,
  ): Promise<Question> {
    const { content } = input;
    logger.log(`Updating question with ID ${id} and content: ${content}`); // 로그 추가
    return await this.questionService.updateQuestion(id, content);
  }

  @Mutation(() => Boolean)
  async deleteQuestion(@Args('id') id: number): Promise<boolean> {
    logger.log(`Deleting question with ID: ${id}`); // 로그 추가
    return await this.questionService.deleteQuestion(id);
  }
}
