// import redux from 'redux' => in react application

//For Node.js application

const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers; //Use to combine the mutiple reducers
const applyMiddleware = redux.applyMiddleware; //applying middleware

//Creating middleware to log/crashing report
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//Action Creator
function buyCake() {
  //Action
  return {
    type: BUY_CAKE,
    info: "First Redux Action",
  };
}

function buyIcecream() {
  //Action
  return {
    type: BUY_ICECREAM,
  };
}

//Reducer

//(Previousstate,action)=> new state

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCream: 20,
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIcecreamState = {
  numOfIceCream: 20,
};

// const reducer = (state = initialIcecreamState, action) => {
//     switch (action.type) {
//       case BUY_CAKE:
//         return {
//           ...state, //Copying the state and then doing the required change: Spread operator
//           numOfCakes: state.numOfCakes - 1,
//         };
//       case BUY_ICECREAM:
//         return {
//           ...state, //Copying the state and then doing the required change: Spread operator
//           numOfIceCream: state.numOfIceCream - 1,
//         };
//       default:
//         return state;
//     }
//   };

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //Copying the state and then doing the required change: Spread operator
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const IcecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state, //Copying the state and then doing the required change: Spread operator
        numOfIceCream: state.numOfIceCream - 1,
      };
    default:
      return state;
  }
};

//Redux Store(State)

//Combining reducers
const rootReducer = combineReducers({
  // accepting the objects of reducers as key/value pairs
  cake: cakeReducer,
  iceCream: IcecreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger)); //passing the combined reducers to create the store, passing middleware also to the store
// const store = createStore(reducer); // redux store holding the application state => responsibility(1)
console.log("initialState", store.getState()); //Allow access to state via getState()=> responsibility(2)
const unsubscribe = store.subscribe(() => {
//   console.log("Update State", store.getState()); //Register Listener via subscribe(listener)=> responsiblity(4)
});
store.dispatch(buyCake()); // Allowing state to be updated via dispatch=>Responsibility(3)
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe(); //unsubscribing from the store
