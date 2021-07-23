import { UserDataAPI } from '../api/ajax';

// groups:
const SET_GROUPS = 'my-app/main/SET_GROUPS';
const ADD_GROUP = 'my-app/main/ADD_GROUP';
const UPDATE_GROUP = 'my-app/main/UPDATE_GROUP';
const DELETE_GROUP = 'my-app/main/DELETE_GROUP';
const TOGGLE_IS_FETCHING = 'my-app/main/TOGGLE_IS_FETCHING';
// mini groups:
const SET_MINI_GROUPS = 'my-app/main/SET_MINI_GROUPS';
const TOGGLE_IS_FETCHING_MINI_GROUPS = 'my-app/main/TOGGLE_IS_FETCHING_MINI_GROUPS';
// tasks:
const ADD_TASK = 'my-app/main/ADD_TASK';
const UPDATE_TASK = 'my-app/main/UPDATE_TASK';
const DELETE_TASK = 'my-app/main/DELETE_TASK';
// filter:
const TOGGLE_IS_FILTERED = 'my-app/main/TOGGLE_IS_FILTERED';


const initialState = {
   groups: [],
   miniGroups: [],
   filterText: '',
   isFetchingMiniGroups: false,
   isFetching: false,
   isFiltered: false,
};

const mainReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_GROUPS:
         return {
            ...state,
            groups: action.groups.map(group => ({
               ...group,
               tasks: group.tasks.map(task => ({
                  ...task,
               })),
            }))
         };
      case ADD_GROUP:
         return {
            ...state,
            groups: [...state.groups, {
               id: action.id,
               name: action.name,
               tasks: [],
            }],
            miniGroups: [...state.miniGroups, {
               id: action.id,
               name: action.name,
            }]
         };
      case UPDATE_GROUP:
         return {
            ...state,
            groups: state.groups.map(group => {
               if (group.id === action.id) {
                  return {
                     ...group,
                     name: action.groupname
                  }
               } else {
                  return group;
               }
            }),
            miniGroups: state.miniGroups.map(miniGroup => {
               if (miniGroup.id === action.id) {
                  return {
                     ...miniGroup,
                     name: action.groupname
                  }
               } else {
                  return miniGroup;
               }
            }),
         };
      case DELETE_GROUP:
         return {
            ...state,
            groups: state.groups.filter(group => group.id !== action.id),
            miniGroups: state.miniGroups.filter(miniGroup => miniGroup.id !== action.id),
         };
      case TOGGLE_IS_FETCHING:
         return {
            ...state,
            isFetching: action.boolean
         };
      case SET_MINI_GROUPS:
         return {
            ...state,
            miniGroups: action.miniGroups
         };
      case TOGGLE_IS_FETCHING_MINI_GROUPS:
         return {
            ...state,
            isFetchingMiniGroups: action.boolean
         };
      case ADD_TASK:
         return {
            ...state,
            groups: state.groups.map(group => {
               if (group.id === action.group_id) {
                  return {
                     ...group,
                     tasks: [...group.tasks, {
                        id: action.id,
                        is_completed: false,
                        name: action.newTaskText,
                        task_type: action.task_type,
                        created_at: action.createdAt,
                        deadline: action.deadline,
                        timedelta: action.timedelta,
                     }]
                  }
               } else {
                  return group;
               }
            })
         };
      
      case UPDATE_TASK:
         return {
            ...state,
            groups: state.groups.map(group => {
               if (group.groupId === action.groupId) {
                  return {
                     ...group,
                     tasks: group.tasks.map(task => {
                        if (task.id === action.id) {
                           return {
                              ...task,
                              name: action.taskName || task.name,
                              timedelta: action.timedelta || task.timedelta,
                              task_type: action.task_type || task.task_type,
                              is_completed: action.is_completed,
                              deadline: action.deadline
                           };
                        } else {
                           return task;
                        }
                     })
                  }
               } else {
                  return group;
               }
            })
         };
      case DELETE_TASK:
         return {
            ...state,
            groups: state.groups.map(group => ({
               ...group,
               tasks: group.tasks.filter(task => task.id !== action.id),
            }))
         };
      case TOGGLE_IS_FILTERED:
         return {
            ...state,
            isFiltered: action.boolean
         };
      default:
         return state;
   }
};


// ACTION_CREATORS here:
const setGroups = (groups) =>
   ({ type: SET_GROUPS, groups });

const addGroup = (id, name) =>
   ({ type: ADD_GROUP, id, name });

export const updateGroup = (id, groupname) =>
   ({ type: UPDATE_GROUP, id, groupname });

const deleteGroup = (id) =>
   ({ type: DELETE_GROUP, id });

const toggleIsFetching = (boolean) =>
   ({ type: TOGGLE_IS_FETCHING, boolean });

export const setMiniGroups = (miniGroups) =>
   ({ type: SET_MINI_GROUPS, miniGroups });

export const toggleIsFetchingMiniGroups = (boolean) =>
   ({ type: TOGGLE_IS_FETCHING_MINI_GROUPS, boolean });

const addTask = (group_id, newTaskText, task_type, timedelta, createdAt, id, deadline) =>
   ({ type: ADD_TASK, group_id, newTaskText, task_type, timedelta, createdAt, id, deadline });

export const updateTask = (group_id, id, taskName, timedelta, task_type, is_completed, deadline) =>
   ({ type: UPDATE_TASK, group_id, id, taskName, timedelta, task_type, is_completed, deadline });

const deleteTask = (id) =>
   ({ type: DELETE_TASK, id });

export const toggleIsFiltered = (boolean) =>
   ({ type: TOGGLE_IS_FILTERED, boolean });


// THUNKS here:
export const getUserGroups = (filter = null) => async (dispatch) => {
   dispatch(toggleIsFetching(true));
   const data = await UserDataAPI.getGroups(filter);
   if (data) {
      dispatch(setGroups(data));
      if (filter === null) {
         dispatch(toggleIsFiltered(false));
      } else {
         dispatch(toggleIsFiltered(true));
      }
   }
   dispatch(toggleIsFetching(false));
};

export const getMiniGroups = () => async dispatch => {
   dispatch(toggleIsFetchingMiniGroups(true));
   const data = await UserDataAPI.getMiniGroups();
   if (data) {
      dispatch(setMiniGroups(data));
   }
   dispatch(toggleIsFetchingMiniGroups(false));
};

export const createGroup = (body) => async (dispatch) => {
   const data = await UserDataAPI.createGroup(body);
   if (data) {
      dispatch(addGroup(data.id, data.name));
   }
};

export const createTask = (body, groupId) => async (dispatch) => {
   const data = await UserDataAPI.createTask(body);
   if (data) {
      dispatch(addTask(groupId, data.name, data.task_type, data.timedelta, data.created_at, data.id, data.deadline));
   }
};

export const updateTodoTask = (body, id, taskName, groupId) => async (dispatch) => {
   const data = await UserDataAPI.updateTask(body);
   if (data && typeof data !== 'number') {
      dispatch(updateTask(groupId, id, taskName, data.timedelta, data.task_type, data.is_completed, data.deadline));
   } else if (data === 204) {
      dispatch(deleteTask(id));
   }
};

export const updateTaskGroup = (body, id) => async (dispatch) => {
   const data = await UserDataAPI.updateGroup(body);
   if (data && typeof data !== 'number') {
      dispatch(updateGroup(id, data.name));
   } else if (data === 204) {
      dispatch(deleteGroup(id));
   }
};

export default mainReducer;