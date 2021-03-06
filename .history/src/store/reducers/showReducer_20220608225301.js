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
      case 'UPDATE_HEADLINER_SUCCESS': 
        console.log('updated HEADLINER');
        return state;
      case 'UPDATE_HEADLINER_ERROR': 
        console.log('updated HEADLINER error');
        return state;
      case 'UPDATE_FOURTH_SUCCESS': 
        console.log('updated FOURTH');
        return state;
      case 'UPDATE_FOURTH_ERROR': 
        console.log('updated FOURTH error');
        return state;
        case 'UPDATE_THIRD_SUCCESS': 
        console.log('updated THIRD');
        return state;
      case 'UPDATE_THIRD_ERROR': 
        console.log('updated THIRD error');
        return state;
      case 'UPDATE_SECOND_SUCCESS': 
        console.log('updated SECOND');
        return state;
      case 'UPDATE_SECOND_ERROR': 
        console.log('updated SECOND error');
        return state;
      case 'UPDATE_FIRST_SUCCESS': 
        console.log('updated FIRST');
        return state;
      case 'UPDATE_FIRST_ERROR': 
        console.log('updated FIRST error');
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


