import React, { useState } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./API";
//Types
import { Difficulty, QuestionState } from "./API";
//Styles

import {GlobalStyle,Wrapper} from "./App.syles"


const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setUserAnswers([]);
    setScore(0);
    setNumber(0);
    setLoading(false);
  };

  const checkAnsewer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //add score if correct
      if (correct) setScore((prev) => prev + 1);
      //Save answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }



  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === 10 ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}

      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading ...</p>}
      {!gameOver && !loading && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnsewer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </Wrapper>
    </>
  );
};

export default App;
