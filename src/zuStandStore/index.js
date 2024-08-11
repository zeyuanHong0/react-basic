import { create } from "zustand";

const useStore = create((set) => {
  return {
    count: 0,
    channelList: [],
    increment() {
      set((state) => {
        return { count: state.count + 1 };
      });
    },
    decrement() {
      set((state) => {
        return { count: state.count - 1 };
      });
    },
    async getChannelList() {
      const res = await fetch("http://geek.itheima.net/v1_0/channels", {
        method: "GET",
      });
      const jasonRes = await res.json();
      set({ channelList: jasonRes.data.channels });
    },
  };
});

export default useStore;
