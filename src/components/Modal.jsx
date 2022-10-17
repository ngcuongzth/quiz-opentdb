import React from 'react'
import { useGlobalContext } from '../store/context'
const Modal = () => {

  const {
    setIsWaiting,
    setIsLoading,
    setIsModalOpen,
    setQuestions,
    setIndex,
    setCorrect,
    calcPercent
  } = useGlobalContext();

 
  const closeModal = () => {
    setIsModalOpen(false);
    setIsLoading(true)
    setIsWaiting(true);
    setQuestions([]);
    setCorrect(0);
    setIndex(0);
  }
  return (
    <div className="modal-container isOpen">
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>
          You answered {calcPercent()}% of questions correctly
        </p>
        <button onClick={() => {
          closeModal();
        }} className="close-btn">play again</button>
      </div>
    </div>
  )
}


export default Modal
