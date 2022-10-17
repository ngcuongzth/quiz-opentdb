import React, { useEffect } from 'react'
import { useGlobalContext } from '../store/context'

const SetupForm = () => {
  const { setIsWaiting, setIsLoading, setQuestions, error, setError, url, handleChangeOption, handleSubmit, quiz
  } = useGlobalContext();

  return (
    <section className="quiz quiz-small">
      <form className="setup-form" onSubmit={(e) => {
        e.preventDefault();
      }}>
        <h2>setup quiz</h2>
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input type="number" min="1" max="100" id="amount" value={quiz.amount} name="amount" className="form-input"
            onChange={(e) => {
              handleChangeOption(e);
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">category
          </label>
          <select name="category" id="category" value={quiz.category} onChange={(e) => {
            handleChangeOption(e)
          }} className="form-input">
            <option value="book">book</option>
            <option value="film">film</option>
            <option value="music">music</option>
            <option value="sports">sports</option>
            <option value="history">history</option>
            <option value="animal">animal</option>
            <option value="manga">manga</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">select difficulty
          </label>
          <select name="difficulty" id="difficulty" value={quiz.difficulty} className="form-input" onChange={(e) => {
            handleChangeOption(e)
          }}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        {error ?
          <p className="error">
            Can't Generate Questions, Please Try Different Options
          </p> : ""
        }
        <button type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
          className='submit-btn'>Start</button>
      </form>
    </section>
  )
}

export default SetupForm
