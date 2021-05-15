import Redux from 'redux'

// action creators

const createPolicy = (name, amount) => {
  return { type: 'CREATE_POLICY', payload: { name, amount } };
};

const deletePolicy = (name) => {
  return { type: 'DELETE_POLICY', payload: { name } };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return { type: 'CREATE_CLAIM', payload: { name, amountOfMoneyToCollect } };
};

// Reducers
const claimsHistory = (oldListOfClaim = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...oldListOfClaim, action.payload];
  }
};
const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
};
const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter((name) => name !== action.payload.name);
  }

  return listOfPolicies;
};

const {createStore, combineReducers} = Redux

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
})

const store = createStore(ourDepartments)

store.dispatch(createPolicy('Alex', 20))
store.dispatch(createPolicy('Dane', 30))
store.dispatch(createPolicy('Mike', 25))


