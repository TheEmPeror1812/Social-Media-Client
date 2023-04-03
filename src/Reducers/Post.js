import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likeReducer = createReducer(initialState, {
  likeRequest: (state) => {
    state.loading = true;
  },
  likeSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  likeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const commentReducer = createReducer(initialState, {
  commentRequest: (state) => {
    state.loading = true;
  },
  commentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  commentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const deletecommentReducer = createReducer(initialState, {
  DeleteRequest: (state) => {
    state.loading = true;
  },
  DeleteSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const myPostsReducer = createReducer(initialState, {
  myPostsRequest: (state) => {
    state.loading = true;
  },
  myPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  myPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const userPostsReducer = createReducer(initialState, {
  userPostsRequest: (state) => {
    state.loading = true;
  },
  userPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  userPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const newPost = createReducer(initialState, {
  newPostRequest: (state) => {
    state.loading = true;
  },
  newPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  newPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
  updateCaptionRequest: (state) => {
    state.loading = true;
  },
  updateCaptionSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateCaptionFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  DeletePostRequest: (state) => {
    state.loading = true;
  },
  DeletePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeletePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  UpdateProfileRequest: (state) => {
    state.loading = true;
  },
  UpdateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  UpdatepasswordRequest: (state) => {
    state.loading = true;
  },
  UpdatepasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdatepasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  DeleteAccountRequest: (state) => {
    state.loading = true;
  },
  DeleteAccountSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteAccountFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  FollowerRequest: (state) => {
    state.loading = true;
  },
  FollowerSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  FollowerFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
