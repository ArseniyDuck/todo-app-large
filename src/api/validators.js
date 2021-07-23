export const required = (value) => {
   if (!value) {
      return 'This field is required!';
   }
};

export const maxLengthCreator = (maxLength) => (value) => {
   if (value && value.length > maxLength) {
      return `Max length is ${maxLength} symbols!`;
   }
};

export const usernameTemplate = (value) => {
   if (!/^[\w.@+-]+$/.test(value)) {
      return 'Usernames may contain alphanumeric, _, @, +, . and - characters';
   }
}