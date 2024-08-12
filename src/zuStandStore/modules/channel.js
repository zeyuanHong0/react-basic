const channelStore = (set) => {
  return {
    channelList: [],
    async getChannelList() {
      const res = await fetch("http://geek.itheima.net/v1_0/channels", {
        method: "GET",
      });
      const jasonRes = await res.json();
      set({ channelList: jasonRes.data.channels });
    },
  };
};

export default channelStore;