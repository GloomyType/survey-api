import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { Question } from '../question/entities/question.entity';
import { SurveyInput } from './dto/survey.dto';
import { QuestionResponse } from './dto/question-response.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createSurvey(input: SurveyInput): Promise<Survey> {
    const { name, description, questionNumbers } = input;

    const survey = this.surveyRepository.create({
      name,
      description,
      questionNumbers,
    });

    return await this.surveyRepository.save(survey);
  }

  async getAllSurveys(): Promise<Survey[]> {
    return await this.surveyRepository.find();
  }

  async updateSurvey(id: number, surveyInput: SurveyInput): Promise<Survey> {
    const { name, description, questionNumbers } = surveyInput;
    const survey = await this.surveyRepository.findOne({ where: { id } });

    if (!survey) {
      throw new NotFoundException('Survey not found');
    }

    survey.name = name;
    survey.description = description;
    survey.questionNumbers = questionNumbers;

    return await this.surveyRepository.save(survey);
  }

  async deleteSurvey(id: number): Promise<boolean> {
    const result = await this.surveyRepository.delete(id);
    return result.affected > 0;
  }

  async getQuestionsBySurveyId(id: number): Promise<QuestionResponse[]> {
    const survey = await this.surveyRepository.findOne({ where: { id } });

    if (!survey) {
      throw new Error(`Survey with id ${id} not found`);
    }

    const questionNumbers = survey.questionNumbers;
    const questions = await this.getQuestionsByNumbers(questionNumbers);

    return questions;
  }

  private async getQuestionsByNumbers(
    questionNumbers: number[],
  ): Promise<QuestionResponse[]> {
    const questions = await this.questionRepository.find({
      where: {
        id: In(questionNumbers),
      },
      relations: ['choices'],
    });

    return questions.map((question) => ({
      content: question.content,
      choices: question.choices
        .sort((a, b) => a.order - b.order)
        .map((choice) => choice.contents),
    }));
  }
}
