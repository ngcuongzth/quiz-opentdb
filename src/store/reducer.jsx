import { FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE,
   SET_BEGIN,
CHECK_ANSWER } from "./action";


const reducer = (state, action) =>{
    switch(action.type){
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state, 
                questions: action.payload,
                isWaiting: false,
                isLoading: false,
                error: false
            }
        case FETCH_QUESTIONS_FAILURE:
            return {
                ...state,
                error: true,
                isWaiting: true
            }
        case CHECK_ANSWER:
            console.log(action.payload)
            if(state.index >= state.questions.length -1){
                return {
                    ...state, isModalOpen: true
                }
            }
            return {...state, index :action.payload.newIndex, totalCorrect: action.payload.countCorrect}
        case SET_BEGIN:
            return {
                ...state, isWaiting : true, isLoading: true,
                isModalOpen: false, index: 0, totalCorrect:0,
                questions: [], 
            }
        default:
            throw new Error(`Invalid action ${action.type}`);   
    }
}

export default reducer;