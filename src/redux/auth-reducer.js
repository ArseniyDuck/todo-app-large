import { stopSubmit } from 'redux-form';
import { AuthAPI, UserDataAPI } from '../api/ajax';


const SET_USER_DATA = 'my-app/auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING_USER_DATA = 'my-app/auth/TOGGLE_IS_FETCHING_USER_DATA';
const TOGGLE_IS_FETCHING_PHOTO = 'my-app/auth/TOGGLE_IS_FETCHING_PHOTO';
const TOGGLE_IS_AUTH = 'my-app/auth/TOGGLE_IS_AUTH';
const UPDATE_PHOTO = 'my-app/auth/UPDATE_PHOTO';


const initialState = {
   user: {
      username: null,
      photo: null,
   },
   isAuth: null,
   isFetchingPhoto: false,
   isFetchingUserData: false,
};


const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            user: {
               username: action.username,
               photo: action.photoUrl ? action.photoUrl: null
            },
         };
      case TOGGLE_IS_FETCHING_USER_DATA:
         return {
            ...state,
            isFetchingUserData: action.boolean
         };
      case TOGGLE_IS_FETCHING_PHOTO:
         return {
            ...state,
            isFetchingPhoto: action.boolean
         };
      case TOGGLE_IS_AUTH:
         return {
            ...state,
            isAuth: action.boolean
         };
      case UPDATE_PHOTO:
         return {
            ...state,
            user: {
               ...state.user,
               photo: action.photoUrl,
            }
         };
      default:
         return state;
   }
};


// ACTION_CREATORS here:
const setUserData = (username, photoUrl) =>
   ({ type: SET_USER_DATA, username, photoUrl });

const toggleIsFetchingUserData = (boolean) =>
   ({ type: TOGGLE_IS_FETCHING_USER_DATA, boolean });

const toggleIsFetchingPhoto = (boolean) =>
   ({ type: TOGGLE_IS_FETCHING_PHOTO, boolean });

const toggleIsAuth = (boolean) =>
   ({ type: TOGGLE_IS_AUTH, boolean })

const updatePhotoUrl = (photoUrl) => 
   ({ type: UPDATE_PHOTO, photoUrl });


// THUNKS here:
export const getUserData = () => async (dispatch) => {
   dispatch(toggleIsFetchingUserData(true));
   const response = await AuthAPI.getMyUserInfo();
   const data = response.data;
   const headers = response.headers;
   window.CSRF_TOKEN = headers['x-csrftoken'];
   if (data) {
      dispatch(setUserData(data.username, data.photo));
      dispatch(toggleIsAuth(true));
   } else {
      dispatch(toggleIsAuth(false));
   }
   dispatch(toggleIsFetchingUserData(false));
};

export const login = (body) => async (dispatch) => {
   const status = await AuthAPI.login(body);
   if (status === 201) {
      dispatch(getUserData());
   } else {
      const message = status === 400 ? 'Incorrect login or password' : 'Some error occured';
      dispatch(stopSubmit('login', {_error: message}));
   }
};

export const logout = () => async (dispatch) => {
   const status = await AuthAPI.logout();
   if (status === 200) {
      dispatch(setUserData(null, null));
      dispatch(toggleIsAuth(false));
   }
};

export const registrate = (body) => async (dispatch) => {
   const status = await AuthAPI.registration(body);
   if (status === 201) {
      dispatch(login({ username: body.username, password: body.password1 }));
   } else {
      const message = status === 400 ? 'Login is already taken or different passwords entered' : 'Some error occured';
      dispatch(stopSubmit('registration', {_error: message}));
   }
};

export const updatePhoto = (file) => async (dispatch) => {
   dispatch(toggleIsFetchingPhoto(true));
   const data = await UserDataAPI.updatePhoto(file);
   if (data) {
      dispatch(updatePhotoUrl(data.photo));
   }
   dispatch(toggleIsFetchingPhoto(false));
};


export default authReducer;