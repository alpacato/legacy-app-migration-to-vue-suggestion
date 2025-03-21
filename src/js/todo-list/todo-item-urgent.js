import { TodoItem } from "./todo-item.js";

/**
 * This class created to make artificial circular dependency
 * Circular dependency is resolved in stage-2.1
 */
export class TodoItemUrgent extends TodoItem {
  constructor() {
    super(...arguments);
    this.setClassName("todo__item todo__item_urgent");
  }
}
