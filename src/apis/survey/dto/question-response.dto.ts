import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class QuestionResponse {
  @Field(() => String)
  content: string;

  @Field(() => [String])
  choices: string[];
}
