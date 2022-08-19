import { ActionTypes } from "../constant/action-types";

const initialState = {
  albums: [],
  loading: false,
  hasMore: true,
  error: false
};

export const musicAlbumReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MUSIC_ALBUMS:
      return {
        ...state,
        albums: payload.albums,
        hasMore: payload.hasMore,
        loading: payload.loading,
        error: payload.error
      };

    default:
      return state;
  }
};
