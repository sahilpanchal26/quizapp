import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './components/Question';
import Results from './components/Result';
import Navigation from './components/Navigation';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctnessInfo, setCorrectnessInfo] = useState([]); 
  const [answerSubmitted, setAnswerSubmitted] = useState(false); 
  const [optionsDisabled, setOptionsDisabled] = useState(false); 

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await axios.get('https://opentdb.com/api.php?amount=10');
    setQuestions(response?.data?.results);
  };

  const handleAnswerSelect = (answer) => {
    if (optionsDisabled) return; 
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    if (!selectedAnswers[currentQuestionIndex]) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion.correct_answer;
    
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    const updatedCorrectnessInfo = [...correctnessInfo];
    updatedCorrectnessInfo[currentQuestionIndex] = isCorrect;
    setCorrectnessInfo(updatedCorrectnessInfo);

    setAnswerSubmitted(true); 
    setOptionsDisabled(true); 
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSubmitted(false); 
      setOptionsDisabled(false); 
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswerSubmitted(true);
      setOptionsDisabled(true); 
    }
  };

  if (showResult) {
    return (
      <Results totalQuestions={questions.length} correctAnswers={correctAnswers} />
    );
  }

  if (questions?.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Quiz App</h1>
        <p className="mb-2 text-center">{`Question ${currentQuestionIndex + 1}/${questions.length}`}</p>
        <Question
          question={currentQuestion.question}
          answers={answers}
          selectedAnswer={selectedAnswer}
          handleAnswerSelect={handleAnswerSelect}
          correctAnswer={answerSubmitted && correctnessInfo[currentQuestionIndex] === false ? currentQuestion.correct_answer : null}
          optionsDisabled={optionsDisabled}
        />
        <Navigation
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmit}
          handleNext={handleNext}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          answerSubmitted={answerSubmitted}
        />
      </div>
    </div>
  );
};

export default App;
