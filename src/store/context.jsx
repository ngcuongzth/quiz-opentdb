import axios from 'axios'
import React, { useContext, useState } from 'react'
const categories = {
  book: 10,
  film: 11,
  music: 12,
  sports: 21,
  history: 23,
  animal: 27,
  manga: 31
}
// const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const API_ENDPOINT = 'https://opentdb.com/api.php?'


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: categories.book,
    difficulty: 'easy'
  })
  const { amount, category, difficulty } = quiz;

  //  const { response, loading } = useAxios(url);
  // useEffect(() => {
  //   if (loading === true) {
  //     return;
  //   }
  //   else {
  //     if (response.response_code === 0) {
  //       setQuestions(response.results);
  //       setIsWaiting(false);
  //       setIsLoading(false);
  //       setError(false)
  //     }
  //     else {
  //       setError(true);
  //       setIsWaiting(true);
  //     }
  //   }
  // }, [loading, response])


  // next question function
  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        opentModal();
        return questions.length - 1;
      }
      else {
        return index
      }
    })
  }
  // checkAnswer function
  const checkAnswer = (isCount) => {
    if (isCount) {
      setCorrect((oldCorrect) => {
        const correct = oldCorrect + 1;
        return correct;
      })
    }
    nextQuestion();
  }

  // opentModal function
  const opentModal = () => {
    setIsModalOpen(true);
  }

  //calc percent correct  
  const calcPercent = () => {
    return ((correct / questions.length) * 100).toFixed(0);
  }

  const handleChangeOption = (e) => {
    const keyChange = e.target.id;
    const valueChange = e.target.value;
    const newQuiz = {
      ...quiz, [keyChange]: valueChange
    }
    setQuiz(newQuiz)
  }
  const fetchQuestion = async (url) => {
    setIsLoading(true);
    setIsWaiting(false);
    try {
      const response = await axios.get(url);
      if (response.data.response_code === 0) {
        setQuestions(response.data.results);
        setIsWaiting(false);
        setIsLoading(false);
        setError(false);
      }
      else {
        console.log('failure')
        setError(true);
        setIsWaiting(true);
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${API_ENDPOINT}amount=${amount}&category=${categories[category] || categories.book}&difficulty=${difficulty}&type=multiple`
    fetchQuestion(url)
    setIsLoading(true);
  }

  return <AppContext.Provider value={{
    nextQuestion, checkAnswer, opentModal, calcPercent, handleSubmit, handleChangeOption, quiz, error,
    isWaiting, isLoading, questions, index, isModalOpen, correct,
    setQuestions, setIsWaiting, setIsLoading, setError, setIsModalOpen,
    setCorrect, setIndex,
  }}>
    {children}
  </AppContext.Provider>
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
