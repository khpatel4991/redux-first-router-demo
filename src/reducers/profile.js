export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'PROFILE_FOUND': {
      const { profile } = action.payload
      return profile
    }
    default:
      return state
  }
}
