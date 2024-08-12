const countStore = (set) => {
  return {
    count: 0,
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
  };
};

export default countStore;
