let initState = {
  state: null,
  loadingApi: false,
  walletKey: false,
  walletAccount: false,
  provider: false,
  CC: false,
  SOL: 0,
  ETH: 0,
};

export function InitReducer(state = initState, action) {
  let { type, payload } = action;
  console.log('type: ', type);
  console.log('payload: ', payload);
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        ...payload,
      };
    case "LOADING":
      return {
        ...state,
        loadingApi: payload,
      };
    case "PROVIDER":
      return {
        ...state,
        provider: payload,
      };
    case "WALLET_KEY":
      return {
        ...state,
        walletKey: payload,
      };
    case "WALLET_ACCOUNT":
      return {
        ...state,
        walletAccount: payload,
      };
    default:
      return state;
  }
}
