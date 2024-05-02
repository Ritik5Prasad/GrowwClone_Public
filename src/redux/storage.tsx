import { Storage } from "redux-persist";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
export const token_storage = new MMKV({
  id: "user-storage",
  encryptionKey: "your RSA Key",
});
const reduxStorage: Storage = {
  setItem: (key, val) => {
    storage.set(key, val);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default reduxStorage;
