<script setup lang="ts">
import { onMounted } from "vue";

import { TodoList } from "../js/todo-list/todo-list";
import TodoItem from "./todo-list/TodoItem.vue";

const listId = "#todo-container";
const list = TodoList.getInstance(listId);
const listItems = list?.getItems() ?? [];

onMounted(() => {
  // legacy initialization
  list.init();
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

    <div class="todo__list" :class="{ todo__list_empty: listItems.length === 0 }">
      <template v-for="item of listItems">
        <TodoItem :item="item" :list-id="listId" />
      </template>
    </div>
  </div>
</template>
