import { createStore } from "vuex";

const store = createStore({
  state: {
    items: [
      // {
      //   id: "6162dc91-0f43-4c88-9757-bf37b5c01b6c",
      //   title: "Hi there!",
      //   important: true,
      //   description: "Welcome to this app.",
      // },
      // {
      //   id: "36b70d80-259e-41b9-8772-d030cca8f394",
      //   title: "It may be a little rough around the edges...",
      //   important: false,
      //   description: "...but hey, I'm just learning.",
      // },
      // {
      //   id: "5b3d0e2a-ac9e-4f51-9cc5-e335ada768ba",
      //   title: "Just give me some time...",
      //   important: false,
      //   description: "...and I'll get really good at this.",
      // },
    ],
  },
  mutations: {
    addNew(state, payload) {
      state.items = payload;
    },
    update(state, payload) {
      const indexForUpdate = state.items.findIndex(
        (item) => item.id === payload.id
      );
      state.items.splice(indexForUpdate, 1, payload);
      state.items = [...state.items];
    },
    delete(state, id) {
      const indexForDelete = state.items.findIndex((item) => item.id === id);
      state.items.splice(indexForDelete, 1);
      state.items = [...state.items];
    },
    sort(state, payload) {
      state.items = payload;
    },
  },
  actions: {
    addToList(context, payload) {
      const items = context.state.items;
      items.push(payload);
      context.commit("addNew", items);
    },
    updateListItem(context, payload) {
      context.commit("update", payload);
    },
    deleteListItem(context, id) {
      context.commit("delete", id);
    },
    sortItems(context, order) {
      console.log(order);

      const sorted = context.state.items.sort((a, b) => {
        if (a.title < b.title) {
          return order === "asc" ? -1 : 1;
        }
        if (a.title > b.title) {
          return order === "asc" ? 1 : -1;
        }
        return 0;
      });
      console.log(sorted);
      context.commit("sort", sorted);
    },
  },
});

export default store;
