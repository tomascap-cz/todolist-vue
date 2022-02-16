<script setup lang="ts">
import { createStructuralDirectiveTransform } from "@vue/compiler-core";
import { ref, reactive } from "vue";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  important: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
  formTitle: String,
});

// let newItem = {
//   id: ref(props.id).value,
//   title: ref(props.title).value,
//   important: ref(props.important).value,
//   description: ref(props.description).value,
// };

let newItem = reactive({
  id: props.id,
  title: props.title,
  important: props.important,
  description: props.description,
});

const errors: string[] = reactive([]);

const handleItemAdd = () => {
  const isValid = validateForm();
  if (isValid) {
    emit("itemSubmit", newItem);
  }
  clearForm();
};

function validateForm() {
  if (newItem.title && newItem.description) {
    return true;
  }

  if (!newItem.title) {
    errors.push("Please fill in a valid title.");
  }

  if (!newItem.description) {
    errors.push("Please fill in a valid description.");
  }
  console.log(errors);

  return false;
}

function clearForm() {
  newItem.id = "";
  newItem.title = "";
  newItem.important = false;
  newItem.description = "";
}

const emit = defineEmits(["itemSubmit"]);
</script>

<template>
  <div class="form">
    <h3>{{ props.formTitle }}</h3>
    <div class="error-box" v-if="errors.length > 0">
      <h4>Errors:</h4>
      <ul>
        <li v-for="error in errors" :key="'err' + errors.indexOf(error)">
          {{ error }}
        </li>
      </ul>
    </div>
    <form @submit.prevent="handleItemAdd()">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            v-model="newItem.title"
          />
          <div class="input-group-text">
            <input
              class="form-check-input mt-0"
              type="checkbox"
              id="important"
              name="important"
              v-model="newItem.important"
            />
            <label for="important" class="ms-2">Important</label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          name="description"
          v-model="newItem.description"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Send</button>
    </form>
  </div>
</template>

<style scoped>
.error-box {
  margin: 0.5rem 0;
  border: 2px solid red;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  background-color: rgb(255, 195, 195);
}
</style>
