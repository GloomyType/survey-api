import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { QuestionModule } from './apis/question/question.module';
import { ChoiceModule } from './apis/choice/choice.module';
import { SurveyModule } from './apis/survey/survey.module';
import { AnswerModule } from './apis/answer/answer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './apis/question/entities/question.entity';
import { Choice } from './apis/choice/entities/choice.entity';
import { Survey } from './apis/survey/entities/survey.entity';
import { Answer } from './apis/answer/entities/answer.entity';

@Module({
  imports: [
    QuestionModule,
    ChoiceModule,
    SurveyModule,
    AnswerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      entities: [Question, Choice, Survey, Answer],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
