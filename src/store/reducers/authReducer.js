const initState = {
    authError: null
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      case 'LOGIN_ERROR':
        console.log('login error');
        return {
          ...state,
          authError: 'Login failed'
        }
      case 'LOGIN_SUCCESS':
        console.log('login success');
        return {
          ...state,
          authError: null
        }

      case 'UPDATE_CART_SUCCESS':
        console.log('cart add success');
        return {
          ...state,
          authError: null
        }
      case 'UPDATE_CART_ERROR':
        console.log('cart add error');
        return {
          ...state,
          authError: 'cart add failed'
        }
      case 'DELETE_CART_SUCCESS':
        console.log('delete cart success');
        return {
          ...state,
          authError: null
        }
      case 'DELETE_CART_ERROR':
        console.log('cart delete error');
        return {
          ...state,
          authError: 'cart add failed'
        }
      case 'DELETE_CART_SONG_SUCCESS':
        console.log('delete cart song success');
        return {
          ...state,
          authError: null
        }
      case 'DELETE_CART_SONG_ERROR':
        console.log('cart delete song error');
        return {
          ...state,
          authError: 'cart add failed'
        }
      case 'ARTIST_CREAT_SUCCESS':
        console.log('artist create success');
        return {
          ...state,
          authError: null
        }
      case 'ARTIST_CREATE_ERROR':
        console.log('artist create error');
        return {
          ...state,
          authError: 'cart add failed'
        }
      case 'VENUE_CREATE_SUCCESS':
        console.log('venue create success');
        return {
          ...state,
          authError: null
        }
      case 'VENUE_CREATE_ERROR':
        console.log('venue create error');
        return {
          ...state,
          authError: 'cart add failed'
        }
      case 'ADD_SONG_SUCCESS':
        console.log('add song success');
        return {
          ...state,
          authError: null
        }
      case 'ADD_SONG_ERROR':
        console.log('add song error');
        return {
          ...state,
          authError: 'cart add failed'
        }
      case 'DELETE_CART_SUCCESS':
        console.log('cart delete success');
        return {
          ...state,
          authError: null
        }
      case 'SIGNOUT_SUCCESS':
        console.log('signout success');
        return state;
      case 'SIGNUP_SUCCESS':
        console.log('signup success')
        return {
          ...state,
          authError: null
        }
      case 'SIGNUP_ERROR':
        console.log('signup error')
        return {
          ...state,
          authError: action.err.message
        }
      default:
        return state
    }
  };
  
  export default authReducer;