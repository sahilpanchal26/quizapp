import React from 'react';

const Navigation = ({ handlePrevious, handleSubmit, handleNext, currentQuestionIndex, totalQuestions, selectedAnswer, answerSubmitted }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentQuestionIndex === 0}
        className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {!answerSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Submit'}
        </button>
      )}
    </div>
  );
};

export default Navigation;
