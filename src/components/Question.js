import React from 'react';

const Question = ({ question, answers, selectedAnswer, handleAnswerSelect, correctAnswer, optionsDisabled }) => {
  return (
    <div>
      <p className="mb-4 text-center" dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="flex flex-col">
        {answers.map((answer, index) => (
          <label key={index} className="mb-2">
            <input
              type="radio"
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => handleAnswerSelect(answer)}
              className="mr-2"
              disabled={optionsDisabled}
            />
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </label>
        ))}
      </div>
      {correctAnswer && (
        <p className="mt-4 text-red-500">
          Incorrect! <br/>The correct answer is: <span dangerouslySetInnerHTML={{ __html: correctAnswer }} />
        </p>
      )}
    </div>
  );
};

export default Question;
