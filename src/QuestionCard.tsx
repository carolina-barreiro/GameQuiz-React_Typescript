import { QuestionsState } from './API';
import React, { useState } from 'react';
import { stateString } from './App.jsx';

interface CardProps {
    list: QuestionsState[],
    score: number,
    state: stateString,
    setState: (state: stateString) => void,
    setScore: (score: number) => void;
};

export function QuestionCard(props: CardProps) {
    const [atQuestion, setAtQuestion] = useState(0);
    const [selectedOption, setSelectedOpt] = useState('');
    const [showScore, setShowScore] = useState(false);
    //const [optScore, setOptScore]=useState(props.score);

    function checkAnswer(event: React.FormEvent) {
        event.preventDefault();
        let correctAnswer = props.list[atQuestion].correct_answer;
        if (selectedOption === '') {
            alert('Choose an option before submitting!');
        } else {

            console.log(atQuestion);
            console.log('next questionnnnnnnnn');
            if (selectedOption === correctAnswer) {
                console.log('acertouuuuuuuuu');
                let scoreUpdated = props.score + 1;
                props.setScore(scoreUpdated);

            }
            console.log('score: ' + props.score);
            setSelectedOpt(''); // Reset selected option to unselect it
            if (atQuestion + 1 === props.list.length) {
                setShowScore(true);
                props.setState('end');

            }
            setAtQuestion(n => n + 1);
        }
    }

    function onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedOpt(event.target.value);
    }

    function decodeHTMLEntities(text: string) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(text, 'text/html').documentElement.textContent;
        return decodedString;
    }

    return (<><div className="wrapper">
        <div className="inner">
            <img src={require('./images/image-1.png')} alt="" className="image-1" />
            <form action="">
                <h3 dangerouslySetInnerHTML={{ __html: props.list[atQuestion].question }}></h3>
                <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                    {props.list[atQuestion].answers.map((answer, index) => (
                        <label className="options" key={index}>
                            {decodeHTMLEntities(answer)}
                            <input
                                type="radio"
                                name="radio"
                                onChange={onValueChange}
                                checked={selectedOption === answer}
                                value={answer}
                            />
                            <span className="checkmark"></span>
                        </label>
                    ))}
                </div>

                <button onClick={checkAnswer}>
                    <span>{((atQuestion + 1) == props.list.length) ? 'Submit' : 'Next'}</span>
                </button>
            </form>
            <img src={require('./images/image-2.png')} alt="" className="image-2" />
        </div>

    </div></>)
}