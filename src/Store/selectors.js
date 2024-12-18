export const getUserFirstName = (state) => {
    return state.user.user.body.firstName
}

export const getUserLastName = (state) => {
    return state.user.user.body.lastName
}

export const getUserEmail = (state) => {
    return state.user.user.body.email
}

export const getUserUsername = (state) => {
    return state.user.user.body.username
}

export const getUserId = (state) => {
    return state.user.user.body.id
}

export const getToken = (state) => {
    return state.user.token
}