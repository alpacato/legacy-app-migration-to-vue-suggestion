import { reactive } from "vue";

import { TodoListCanvas } from "./todo-list-canvas";

export class TodoList {
  static instances = new Map();

  static getInstance(containerSelector) {
    const instance = this.instances.get(containerSelector);

    if (!instance) {
      const newInstance = new TodoList(containerSelector);
      this.instances.set(containerSelector, newInstance);
      return newInstance;
    }

    return instance;
  }

  #containerSelector = null;
  #containterElement = null;
  #listElement = null;
  #newItemInput = null;
  #canvasContoller = null;

  /**
   * Example of a typescript type definition with JSDoc
   * @type {import("../../types/todo-list/todo-list").TodoItem[]}
   */
  #items = reactive([
    { title: "Talk to Ron", urgent: true, completed: false },
    { title: "Buy new robes", urgent: false, completed: false },
    { title: "Buy new wand", urgent: false, completed: false },
    { title: "Visit Hagrid", urgent: false, completed: false },
    { title: "Go to Potions class", urgent: false, completed: false },
  ]);

  constructor(containerSelector) {
    this.#containerSelector = containerSelector;
  }

  getItems() {
    return this.#items;
  }

  init() {
    this.#containterElement = $(this.#containerSelector);
    this.#listElement = this.#containterElement.find(".todo__list");
    this.#newItemInput = this.#containterElement.find(".todo__new-item input");
    this.#canvasContoller = new TodoListCanvas(this, this.#containerSelector + " .todo__preview canvas");

    this.registerEvents();

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
    this.#items.unshift({ title: value, urgent, completed: false });
    this.updateCanvas();
  }

  removeItem(item) {
    this.#items.splice(this.#items.indexOf(item), 1);
    this.updateCanvas();
  }

  toggleCompleteItem(item) {
    item.completed = !item.completed;
    this.updateCanvas();
  }

  updateCanvas() {
    this.#canvasContoller.update();
  }

  clearListView() {
    this.#listElement.html("");
    this.#listElement.addClass("todo__list_empty");
  }
}
