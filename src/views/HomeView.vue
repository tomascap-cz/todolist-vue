<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

import TodoList from "@/components/TodoList.vue";
import TodoForm from "@/components/TodoForm.vue";
import { readData, writeData } from "@/services/DataService";
import type ListItem from "@/models/list-item.model";

const store = useStore();

function handleFormSubmit(newItem: ListItem): void {
  newItem.id = uuidv4();
  writeData({ ...newItem });
  store.dispatch("addToList", { ...newItem });
  console.log("New item added to DB and to Vuex store:");
  console.log(newItem);
}

onMounted(async () => {
  const data = await readData();
  if (data) {
    for (let item of Object.values(data)) {
      store.dispatch("addToList", { ...item });
    }
  }
});
</script>

<template>
  <main class="row">
    <div class="content-col col-md-6 col-sm-12">
      <TodoList />
    </div>
    <div class="content-col col-md-6 col-sm-12">
      <TodoForm form-title="Add New Item" @itemSubmit="handleFormSubmit" />
    </div>
  </main>
</template>

<style scoped>
main {
  box-sizing: border-box;
  padding: 2rem;
  max-height: 100%;
}
.content-col {
  box-sizing: border-box;
  margin: 2rem 0;
  padding: 0 3rem;
}

.content-col:first-child {
  border-right: 1px solid #ece7e7;
}
</style>
