<script setup lang="ts">
import { onMounted } from "vue";

import { TodoList } from "../js/todo-list/todo-list";

onMounted(() => {
  // legacy initialization
  new TodoList("#todo-container");
});
</script>

<template>
  <!--Legacy html markup-->
  <div id="todo-container" class="todo__container">
    <div class="todo__header">
      <h1>To-do List</h1>
      <div class="todo__new-item">
        <input type="text" placeholder="Add new To-do" />
        <button class="todo-button todo-button_header todo__add-item" disabled="true">
          Default <i class="fa fa-plus"></i>
        </button>
        <button class="todo-button todo-button_header todo__add-item todo__add-item_urgent" disabled="true">
          Urgent <i class="fa fa-plus"></i>
        </button>
      </div>
    </div>

    <div class="todo__preview">
      <canvas />
    </div>

    <div class="todo__list"></div>
  </div>
</template>
