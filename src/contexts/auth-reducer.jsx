const StorageSetAuth = (authItems) =>{
    sessionStorage.setItem('jwtToken', JSON.stringify(authItems.length > 0 ? authItems : []));
}

// Action types
const LOGIN_SUCCESS ="LOGIN_SUCCESS";
const LOGOUT ="LOGOUT";

export const AuthReducer = (state, action) => {

  let newItems = [...state.authItems];
  let index = -1;

  if(action.payload){
    index = state.authItems.findIndex(x => x.user === action.payload.user.name);
  } 

  switch (action.type) {
    case LOGIN_SUCCESS:
      if (index === -1) {
        newItems.push({ ...action.payload, isAuthenticated: true});
      }
      break;
    case LOGOUT:
      newItems = []; 
      break;
    default:
      return prevState;
  }
    state.authItems = newItems;
    StorageSetAuth(newItems);
    
    return state;
}