import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/style.css';
import './fonts/linearicons/style.css'
import { fetchQuizQuestions, QuestionsState } from './API';
import { QuestionCard } from './QuestionCard';

export type stateString = "start" | "questions" | "end";

function App() {
  const [state, setState] = useState<stateString>('start');
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [score, setScore] = useState(0);


  async function getQuestions(category: string, difficulty: string) {
    if (category === '' || difficulty === '' || name === '') {
      alert('There are still fields to fill');
    } else {
      setLoading(true);
      setState('questions');
      console.log(category);
      console.log(difficulty);
      const newQuestions = await fetchQuizQuestions(category, difficulty);
      console.log(newQuestions);
      setQuestions(newQuestions);
      console.log('aqui2');
      setLoading(false);
    }
    setSelectedCategory('');
    setSelectedDifficulty('');

  }

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  function handleNext() {
    console.log(questions);
  }


  function reStart(){
    setState('start');
    setScore(0);
  }

  return (
    <div className="App">
      {(state === 'start') ? (
        <div className="wrapper">
          <div className="inner">
            <img src={require('./images/image-1.png')} alt="" className="image-1" />
            <form action="">
              <h3>React Quiz</h3>
              <div className="form-holder">
                <input type="text" className="form-control" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-holder">
                <select className="form-control " aria-label="Difficulty" value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}>
                  <option value="" disabled selected hidden>Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="form-holder">
                <select className="form-control " aria-label="Category" value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="" disabled selected hidden>Select category</option>
                  <option value="9">General Knowledge</option>
                  <option value="12">Entertainmet: Music</option>
                  <option value="22">Geography</option>
                  <option value="18">Science: Computers</option>
                </select>
              </div>
              <button type="submit" onClick={() => getQuestions(selectedCategory, selectedDifficulty)}>
                <span>Start</span>
              </button>
            </form>
            <img src={require('./images/image-2.png')} alt="" className="image-2" />
          </div>
        </div>
      ) : null}
      {loading ?  <div className="wrapper">
          <div className="inner">
            <img src={require('./images/image-1.png')} alt="" className="image-1" />
            <form action="">
              <h3>React Quiz</h3>
             <br></br>
             <h4>Loading the questions...</h4>
             </form>
            <img src={require('./images/image-2.png')} alt="" className="image-2" />
          </div>
        </div>
        : null}
      {(!loading && state === 'questions') ? (
        <QuestionCard
          list={questions}
          score={score} 
          state={state}
          setState={setState}
          setScore={setScore}/>
      ) : null}
      {(state === 'end') ? (
        <div className="wrapper">
          <div className="inner">
            <img src={require('./images/image-1.png')} alt="" className="image-1" />
            <form action="">
              <h3>You scored {score} out of 10!</h3>
              <p>{(score < 5) ? `I think you could do better, ${name}!` : (score < 8) ? `It's good, but it could be better, ${name}.` : `You actually are very smart, ${name}!`}</p>
              <button onClick={reStart}>
                <span>Start over</span>
              </button>
            </form>
            <img src={require('./images/image-2.png')} alt="" className="image-2" />
          </div>
        </div>
      ) : null}
    </div>

  );
}

export default App;
