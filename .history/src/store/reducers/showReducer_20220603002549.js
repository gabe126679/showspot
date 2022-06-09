const initState = {}

const showReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CREATE_SHOW_SUCCESS': 
        console.log('created SHOW');
        return state;
      case 'CREATE_SHOW_ERROR': 
        console.log('created SHOW error');
        return state;
      case 'CREATE_BAND_SUCCESS': 
        console.log('created BAND');
        return state;
      case 'CREATE_BAND_ERROR': 
        console.log('created BAND error');
        return state;
      case 'UPDATE_SHOW_SUCCESS': 
        console.log('updated SHOW');
        return state;
      case 'UPDATE_SHOW_ERROR': 
        console.log('updated SHOW error');
        return state;
      case 'EDIT_SHOW_SUCCESS': 
        console.log('edited SHOW success');
        return state;
      case 'EDIT_SHOW_ERROR': 
        console.log('edited SHOW error');
        return state;
      case 'UPDATE_VOTE_SUCCESS': 
        console.log('updated vote success');
        return state;
      case 'UPDATE_VOTE_ERROR': 
        console.log('updated vote error');
        return state;
      case 'UPDATE_NOTIFICATION_SUCCESS': 
        console.log('updated notification success');
        return state;
      case 'UPDATE_NOTIFICATION_ERROR': 
        console.log('updated notification error');
        return state;
      case 'ADD_NOTIFICATION_SUCCESS': 
        console.log('add notification success');
        return state;
      case 'ADD_NOTIFICATION_ERROR': 
        console.log('add notification error');
        return state;
      case 'DELETE_SHOW_SUCCESS': 
        console.log('deleted SHOW');
        return state;
      case 'DELETE_SHOW_ERROR': 
        console.log('deleted SHOW error');
        return state;
      default:
        return state;
    }
}

export default showReducer;


