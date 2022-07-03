import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseClient from "firebase/client";

const initialState = {
  addressData: {},
  addressIsLoaded: false,
  addressHasErrors: false,
};

const address = createSlice({
  name: "address",
  initialState,
  reducers: {
    getData: (state) => {},

    getDataSuccess: (state, action) => {
      state.addressIsLoaded = true;
      state.addressData = action.payload;
    },

    getDataFailure: (state, action) => {
      state.addressIsLoaded = true;
      state.addressHasErrors = true;
    },

    createDataFailure: (state) => {
      state.addressHasErrors = true;
    },
  },
});

export const reducer = address.reducer;

export const { getData, getDataSuccess, getDataFailure, createDataFailure } =
  address.actions;

export const fetchAllAddress = createAsyncThunk(
  "address/fetchAllAddress",
  async (_, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(getData());

    try {
      const data = await _fetchAllAddressFromDb();
      thunkAPI.dispatch(getDataSuccess(data));
    } catch (error) {
      console.error("error", error);
      // Set any erros while trying to fetch
      thunkAPI.dispatch(getDataFailure(error));
    }
  }
);

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (payload, thunkAPI) => {
    try {
      await _createAddress(
        payload.key,
        payload.username,
        payload.address,
        payload.latitude,
        payload.longitude
      );
    } catch (error) {
      console.error("error", error);
      // Set any erros while trying to fetch
      thunkAPI.dispatch(createDataFailure());
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (payload, thunkAPI) => {
    try {
      await _updateAddress(
        payload.id,
        payload.key,
        payload.username,
        payload.address,
        payload.latitude,
        payload.longitude
      );
    } catch (error) {
      console.error("error", error);
      // Set any erros while trying to fetch
      thunkAPI.dispatch(createDataFailure());
    }
  }
);

/* export const savePhoto = createAsyncThunk(
  "widget/savePhoto",
  async (payload) => {
    const file = payload.file;

    try {
      const fileName = _appendToFilename(file.name, "_" + Date.now());
      const uploadTask = _updloadFile(fileName, file);

      const uploadPromise = new Promise((resolve, reject) => {

        uploadTask.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('progress:', progress);

        }, error => {
          reject(error);
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => resolve(downloadURL)).catch(reject);
        });
      });

      const downloadURL = await uploadPromise;

      return downloadURL;
    } catch (error) {
      alert('Error saving photo: ' + JSON.stringify(error));
    }
  }
); */

async function _fetchAllAddressFromDb() {
  const snapshot = await firebaseClient.firestore().collection("address").get();

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
}

async function _createAddress(key, username, address, latitude, longitude) {
  const doc = await firebaseClient
    .firestore()
    .collection("address")
    .add({ key, username, address, latitude, longitude });

  return doc;
}

async function _updateAddress(id, key, username, address, latitude, longitude) {
  const doc = await firebaseClient
    .firestore()
    .collection("address")
    .doc(id)
    .update({ key, username, address, latitude, longitude });

  return doc;
}

// https://stackoverflow.com/a/31205878/173957
/* function _appendToFilename(filename, string) {
  var dotIndex = filename.lastIndexOf(".");
  if (dotIndex == -1) return filename + string;
  else return filename.substring(0, dotIndex) + string + filename.substring(dotIndex);
}

function _updloadFile(fileName, file) {
  const uploadTask = firebaseClient.storage().ref(`/${fileName}`).put(file);

  return uploadTask;
} */
