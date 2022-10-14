import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gameService from "./gameService";

//gamePoints
export const getGamePoints = createAsyncThunk(
  "game/getGamePoints",
  async (thunkAPI) => {
    try {
      return await gameService.getPoints();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const getRates = createAsyncThunk(
  "game/getRates",
  async (data, thunkAPI) => {
    console.log("data");
    try {
      return await gameService.getRates(data);
    } catch (err) {
      console.log('err get rates', err)
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const transactionConfirmation = createAsyncThunk(
  "game/transactionConfirmation",
  async (data, thunkAPI) => {
    console.log("data");
    try {
      return await gameService.confirmTransaction(data);
    } catch (err) {
      console.log('err get rates', err)
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const withdrawalPoints = createAsyncThunk(
  "game/withdrawalPoints",
  async (data, thunkAPI) => {
    console.log("data");
    try {
      return await gameService.withdraw(data);
    } catch (err) {
      console.log('err get rates', err)
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const gamePlayMode = createAsyncThunk(
  "game/gamePlayMode",
  async (data, thunkAPI) => {
    console.log("data");
    try {
      return await gameService.gamePlay(data);
    } catch (err) {
      console.log('err get rates', err)
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  gamePoints: {},
  loading: false,
  error: null,
  ratesData: {},
  transactionData:{},
  withdrawal:{},
  gamePlayMode:"",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: (state) => {
      console.log("state", state.loading);
    },
  },
  extraReducers: (builder) => {
    // get game points
    builder
      .addCase(getGamePoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGamePoints.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.gamePoints = payload;
        state.success = true;
      })
      .addCase(getGamePoints.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // get Rates
      .addCase(getRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRates.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.ratesData=payload;
      })
      .addCase(getRates.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //transaction 
      .addCase(transactionConfirmation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionConfirmation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.transactionData=payload
      })
      .addCase(transactionConfirmation.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //withDrawl
      .addCase(withdrawalPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawalPoints.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.withdrawal=payload
      })
      .addCase(withdrawalPoints.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      
  },
});
export default gameSlice.reducer;
export const gamePointSelector = (state) => state.game?.gamePoints;
export const ratesDataSelector = (state) => state.game.ratesData;
