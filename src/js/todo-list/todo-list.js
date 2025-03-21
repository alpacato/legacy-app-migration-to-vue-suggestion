import { TodoItem } from "./todo-item";
import { TodoItemUrgent } from "./todo-item-urgent";
import { TodoListCanvas } from "./todo-list-canvas";

export class TodoList {
  #containterElement = null;
  #listElement = null;
  #newItemInput = null;
  #canvasContoller = null;

  #items = [
    new TodoItemUrgent(this, "Talk to Ron"),
    new TodoItem(this, "Buy new robes"),
    new TodoItem(this, "Buy new wand"),
    new TodoItem(this, "Visit Hagrid"),
    new TodoItem(this, "Go to Potions class"),
  ];

  constructor(containerSelector) {
    this.init(containerSelector);
  }

  getListElement() {
    return this.#listElement;
  }

  getItems() {
    return this.#items;
  }

  init(containerSelector) {
    this.#containterElement = $(containerSelector);
    this.#listElement = this.#containterElement.find(".todo__list");
    this.#newItemInput = this.#containterElement.find(".todo__new-item input");
    this.#canvasContoller = new TodoListCanvas(this, containerSelector + " .todo__preview canvas");

    this.registerEvents();

    this.updateList();
    this.updateCanvas();
  }

  registerEvents() {
    this.#newItemInput.on("input", (event) => {
      if (event.target.value.trim() === "") {
        this.#containterElement.find(".todo__add-item").prop("disabled", true);
      } else {
        this.#containterElement.find(".todo__add-item").prop("disabled", false);
      }
    });

    this.#containterElement.find(".todo__add-item").on("click", (event) => {
      const value = this.#newItemInput.val().trim();

      if (value !== "") {
        this.addItem(value, event.target.classList.contains("todo__add-item_urgent"));
        this.#newItemInput.val("");
      }
    });
  }

  addItem(value, urgent) {
    const item = urgent ? new TodoItemUrgent(this, value) : new TodoItem(this, value);
    this.#items.unshift(item);
    this.updateList();
    this.updateCanvas();
  }

  removeItem(item) {
    this.#items.splice(this.#items.indexOf(item), 1);
    this.updateList();
    this.updateCanvas();
  }

  updateList() {
    this.clearListView();

    for (const item of this.#items) {
      item.addView();
    }

    if (this.#items.length > 0) {
      this.#listElement.removeClass("todo__list_empty");
    }

    this.#canvasContoller.update();
  }

  updateCanvas() {
    this.#canvasContoller.update();
  }

  clearListView() {
    this.#listElement.html("");
    this.#listElement.addClass("todo__list_empty");
  }
}
