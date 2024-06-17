import React from 'react';

const Results = ({ totalQuestions, correctAnswers }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Quiz Result</h1>
        <p>Total Questions: {totalQuestions}</p>
        <p>Correct Answers: {correctAnswers}</p>
        <p>Incorrect Answers: {totalQuestions - correctAnswers}</p>
      </div>
    </div>
  );
};

export default Results;
