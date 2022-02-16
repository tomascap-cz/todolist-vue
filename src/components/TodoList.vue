<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

import { deleteData } from "@/services/DataService";

const store = useStore();

const sorting = ref("asc");

function handleDeleteItem(id) {
  deleteData(id);
  store.dispatch("deleteListItem", id);
}

function sortItems() {
  store.dispatch("sortItems", sorting.value);
  sorting.value = sorting.value === "asc" ? "desc" : "asc";
}
</script>

<template>
  <button
    class="btn float-right"
    v-if="store.state.items.length > 0"
    @click="sortItems"
  >
    Sort in {{ sorting === "asc" ? "ascending" : "descending" }} order
  </button>
  <h3>My Todos</h3>
  <div v-if="store.state.items.length > 0">
    <div
      class="card w-100"
      :class="{ important: item.important }"
      v-for="item in store.state.items"
      :key="item.id"
    >
      <div class="card-body">
        <h5 class="card-title">
          {{ item.title }} <span class="marker" v-if="item.important">!</span>
        </h5>
        <p class="card-text">
          {{
            item.description.length > 50
              ? item.description.substring(0, 50) + "..."
              : item.description
          }}
        </p>
        <router-link :to="'/detail/' + item.id" class="btn btn-primary me-1"
          >Detail</router-link
        >
        <button class="btn btn-danger ms-1" @click="handleDeleteItem(item.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
  <p v-else>There are no items here. Why not add one?</p>
</template>

<style scoped>
.float-right {
  float: right;
}

.important {
  background-color: #fcdfab;
}

.marker {
  float: right;
  font-weight: 700;
  color: red;
}
</style>
