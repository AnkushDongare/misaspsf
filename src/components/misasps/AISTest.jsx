import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { englishQuestions } from './english';
import { MarathiQuestions } from './marathi';
import { HindiQuestions } from './hindi';
import './test.css';

const AISTest = () => {
    const { id, language } = useParams();
    const navigate = useNavigate();
    const options = ["Always", "Mostly", "Often", "Rarely", "Never"];
    const questions = language === "marathi" ? MarathiQuestions : language === "hindi" ? HindiQuestions : englishQuestions;

    const [responses, setResponses] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleOptionSelect = (questionSr, value) => {
        setResponses({
            ...responses,
            [questionSr]: value,
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ id, responses }));
        try {
            const response = await fetch('https://misasps.onrender.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, responses }),
            });

            if (response.ok) {
                console.log('Responses submitted successfully!');
                navigate(`/successful-submit/${id}`);
            } else {
                console.error('Failed to submit responses.');
            }
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const optionValues = currentQuestion.nature === "positive" ? [5, 4, 3, 2, 1] : [1, 2, 3, 4, 5];

    return (
        <div className='testbody'>
            <div className="app">
                <h1>{language === "marathi" ? "प्रश्नावली" : language === "hindi" ? "प्रश्‍नावली" : "Questionnaire"}</h1>
                <div className="question">
                    <h3>{currentQuestion.text}</h3>
                    <div className="options">
                        {options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.sr}`}
                                    value={optionValues[index]}
                                    checked={responses[currentQuestion.sr] === optionValues[index]}
                                    onChange={() => handleOptionSelect(currentQuestion.sr, optionValues[index])}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="navigation-buttons">
                    <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                        Previous
                    </button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button onClick={handleNext}>Next</button>
                    ) : (
                        <button onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AISTest;
