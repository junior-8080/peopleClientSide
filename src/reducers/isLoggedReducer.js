const isJson = (data) => {
    try {
        return JSON.parse(data);
    }catch {
        return {};
    }
}

const item = isJson(localStorage.getItem('profile'));
let initialSate  = (item && item.username) ? true : false;

function isLoggedReducer(state=initialSate, action) {
    switch(action.type){
        case 'isLogged':
             localStorage.setItem('isLogged',!state)
            return !state;
        default:
            return state
    }
}

export default isLoggedReducer;