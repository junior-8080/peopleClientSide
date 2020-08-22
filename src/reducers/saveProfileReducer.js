const isJson = (data) => {
    try {
        return JSON.parse(data);
    }catch {
        return {};
    }
}

const initialSate = isJson(localStorage.getItem('profile'));

const saveProfileReducer = (state =initialSate, action) => {
    switch (action.type) {
        case 'saveProfile':
            return  action.payload;
        default:
            return state

    }
}

export default saveProfileReducer