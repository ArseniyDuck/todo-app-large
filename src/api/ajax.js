import axios from 'axios';
import Cookie from 'js-cookie';


const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://todo-app-large-backend.herokuapp.com/main/',
});


export const AuthAPI = {
   getMyUserInfo() {
      return instance.get('get_user_info/').then(res => res.status === 200 && res.data, err => null);
   },

   login(body) {
      return instance.post('login/', body, {
         headers: {
            'X-CSRFToken': Cookie.get('csrftoken'),
         }
      }).then(res => res.status, err => err.response ? err.response.status : 500);
   },

   logout() {
      return instance.get('logout/').then(res => res.status);
   },

   registration(body) {
      return instance.post('registration/', body, {
         headers: {
            'X-CSRFToken': Cookie.get('csrftoken'),
         }
      }).then(res => res.status, err => err.response ? err.response.status : 500);
   },
};


export const UserDataAPI = {
   getGroups(filter) {
      let url = 'get_user_groups/';
      if (filter !== null) url = `get_user_groups/?filter=${filter}`;
      return instance.get(url).then(res => res.status === 200 && res.data, err => null);
   },

   getMiniGroups() {
      return instance.get('get_user_mini_groups/').then(res => res.status === 200 && res.data, err => null);
   },

   createGroup(body) {
      return instance.post('create_group/', body, {
         headers: {
            'X-CSRFToken': Cookie.get('csrftoken'),
         }
      }).then(res => res.status === 201 && res.data, err => null);
   },

   createTask(body) {
      return instance.post('create_task/', body, {
         headers: {
            'X-CSRFToken': Cookie.get('csrftoken'),
         }
      }).then(res => res.status === 201 && res.data, err => null);
   },

   updatePhoto(file) {
      const formdata = new FormData();
      formdata.append('photo', file);
      
      return instance.post('update_photo/', formdata, {
         headers: {
            'X-CSRFToken': Cookie.get('csrftoken'),
         }
      }).then(res => res.status === 201 && res.data, err => null);
   },

   updateTask(body) {
      return instance.post('update_task/', body, {
         headers: {
            'X-CSRFToken': Cookie.get('csrftoken'),
         }
      }).then(res => res.status === 201 ? res.data : res.status, err => null);
   },

   updateGroup(body) {
      return instance.post('update_group/', body, {
         headers: {
            'X-CSRFToken': Cookie.get('csrftoken'),
         }
      }).then(res => res.status === 201 ? res.data : res.status, err => null);
   }
};
