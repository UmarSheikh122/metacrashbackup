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
