let initState = {
  state: null,
  loadingApi: false,
  walletKey: false,
  provider: false
};

export function InitReducer(state = initState, action) {
  let { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        token: payload.token,
        user: payload.data,
        CC: payload.gametoken.CC,
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

    default:
      return state;
  }
}
