<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import router from "../router/index";
import TodoForm from "@/components/TodoForm.vue";
import { writeData, deleteData } from "@/services/DataService";

const store = useStore();
const route = useRoute();

let isEdit = ref(false);

const detail = store.state.items.find((item) => {
  return item.id === route.params.id;
});

function handleUpdateItem(updatedItem) {
  writeData({ ...updatedItem });
  store.dispatch("updateListItem", { ...updatedItem });
  isEdit.value = false;
  router.push("/");
}

function handleDeleteItem() {
  deleteData(route.params.id);
  store.dispatch("deleteListItem", route.params.id);
  isEdit.value = false;
  router.push("/");
}
</script>

<template>
  <main class="container py-5">
    <article v-if="!isEdit">
      <h2>
        {{ detail.title }}
      </h2>
      <p>
        {{ detail.description }}
      </p>
      <button class="btn btn-primary me-1" @click="isEdit = true">Edit</button>
      <button class="btn btn-danger ms-1" @click="handleDeleteItem">
        Delete
      </button>
    </article>

    <TodoForm
      v-else
      v-bind="detail"
      form-title="Edit Item"
      @itemSubmit="handleUpdateItem"
    />
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
