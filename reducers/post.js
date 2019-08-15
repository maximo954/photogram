export const post = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.payload };
    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
    case "UPDATE_PHOTO":
      return { ...state, photo: action.payload };
    case "GET_POST":
      return { ...state, feeds: action.payload };
    default:
      return state;
  }
};
