import React, { useEffect, useState } from "react";
import SetupForm from "./components/SetupForm";
import Modal from "./components/Modal";
import Loading from "./components/Loading";
import { useGlobalContext } from "./store/context";

function App() {
  const {
    nextQuestion,
    checkAnswer,
    isWaiting,
    isLoading,
    questions,
    index,
    isModalOpen,
    correct,
  } = useGlobalContext();

  // nếu isWaiting là true 

  if (isWaiting === true) {
    return (
      <main>
        <SetupForm />
      </main>
    );
  }

  if (isLoading === true) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else {
    const { question, incorrect_answers, correct_answer } = questions[index];
    // const answers = [correct_answer, ...incorrect_answers];
    const answers = [...incorrect_answers];
    const tempIndex = Math.floor(Math.random() * answers.length);
    // nếu random ra 3 thì nó thực hiện
    // push đáp án đúng vào mảng
    if (tempIndex === 3) {
      answers.push(correct_answer);
    }
    // nếu không ramdom ra 3 
    // nó thực hiện push thêm đáp án thứ 4, đại loại là đặt chỗ cho câu hỏi đúng là ở vị trí thứ 4
    // sau đó việc của nó là cướp chỗ cũ của đáp án tại vị trí vừa random xong
    else {
      answers.push(answers[tempIndex]);
      answers[tempIndex] = correct_answer;
    }
    return (
      <main>
        {isModalOpen ? <Modal /> : ""}
        <section className="quiz">
          <p className="correct-answers">
            correct answers: {correct}/{index}
          </p>
          <article className="container">
            <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    className="answer-btn"
                    dangerouslySetInnerHTML={{ __html: answer }}
                    onClick={() => {
                      if (answer === correct_answer) {
                        checkAnswer(true);
                      } else {
                        checkAnswer(false);
                      }
                    }}
                  ></button>
                );
              })}
            </div>
          </article>
          <button
            onClick={() => {
              nextQuestion();
            }}
            className="next-question"
          >
            next question
          </button>
        </section>
      </main>
    );
  }
}

export default App;
