import { create } from "zustand";
import countStore from "./modules/count";
import channelStore from "./modules/channel";

const useStore = create((set) => ({
  ...countStore(set),
  ...channelStore(set),
}));

export default useStore;
