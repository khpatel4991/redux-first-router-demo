export default (state = [], action = {}) =>
  action.type === 'CARDS_FETCHED' ? action.payload.cards : state
