import React from 'react';
import { shuffleArray } from './utils';

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  };
  
export interface FetchProps {
    category: string,
    difficulty: string
};

export type QuestionsState = Question & { answers: string[] };


export const fetchQuizQuestions = async (category: string, difficulty: string): Promise<QuestionsState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
  };

