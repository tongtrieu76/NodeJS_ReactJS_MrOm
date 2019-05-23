import isEmpty from 'lodash/isEmpty';

const SET_CUR_USER= 'SET_CUR_USER';
const initialState = {
    isAuthenticated: false,
    user:{}
};
export default (state = initialState,action = {}) => {
        switch(action.type)
        {
            case SET_CUR_USER:
                return{
                    
                    isAuthenticated: !isEmpty(action.user),
                    user: action.user
                }
                default: return state;
        }
    }