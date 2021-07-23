import { getUserData } from './auth-reducer';

const SET_IS_INITIALIZED = 'my-app/app/SET_IS_INITIALIZED';

const initialState = {
   isInitialized: false
};

const appReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_IS_INITIALIZED:
         return {
            ...state,
            isInitialized: action.boolean
         };
      default:
         return state;
   }
};


// ACTION_CREATORS here:
const setIsInitialized = (boolean) =>
   ({ type: SET_IS_INITIALIZED, boolean })


// THUNKS here:
export const init = () => async (dispatch) => {
   await dispatch(getUserData());
   dispatch(setIsInitialized(true));
};

export default appReducer;