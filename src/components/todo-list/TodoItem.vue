<script setup lang="ts">
import { TodoList } from "../../js/todo-list/todo-list";
import { type TodoItem } from "../../types/todo-list/todo-list";

const props = defineProps<{
  listId: string;
  item: TodoItem;
}>();

const list = TodoList.getInstance(props.listId);

function toggleCompleteItem() {
  list.toggleCompleteItem(props.item);
}

function removeItem() {
  list.removeItem(props.item);
}
</script>

<template>
  <div class="todo__item" :class="{ todo__item_urgent: props.item.urgent, todo__item_checked: props.item.completed }">
    <div class="todo__item-title" @click="toggleCompleteItem">{{ item.title }}</div>
    <div class="todo__item-controls"><i class="fa fa-trash todo__item-controls-remove" @click="removeItem"></i></div>
  </div>
</template>
