import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SurveyInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Int])
  questionNumbers: number[];
}
