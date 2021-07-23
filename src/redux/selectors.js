export const selectIsAuth = state => state.auth.isAuth;

export const selectGroups = state => state.main.groups;

export const selectUsername = state => state.auth.user.username;

export const selectUserPhoto = state => state.auth.user.photo;

export const selectIsFetchingGroups = state => state.main.isFetching;

export const selectIsFetchingUser = state => state.auth.isFetchingUserData;

export const selectIsFiltered = state => state.main.isFiltered;

export const selectMiniGroups = state => state.main.miniGroups;

export const selectMiniGroupsIsFetching = state => state.main.isFetchingMiniGroups;

export const selectIsFetchingPhoto = state => state.auth.isFetchingPhoto;