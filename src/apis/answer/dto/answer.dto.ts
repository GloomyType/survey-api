import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AnswerInput {
  @Field(() => Int)
  userId: number;

  @Field(() => [Int], { nullable: true })
  answerNumbers?: number[];

  @Field(() => Int)
  scoreSum: number;
}
