export class TodoItem {
  #list = null;
  #title = "";
  #itemElement = null;
  #checked = false;
  #className = "todo__item";

  constructor(list, title) {
    this.#list = list;
    this.#title = title;
  }

  setClassName(className) {
    this.#className = className;
  }

  getFirstLetter() {
    return this.#title[0];
  }

  addView() {
    this.#itemElement = $(
      `<div class="${this.#className} ${this.#checked && "todo__item_checked"}">
          <div class="todo__item-title">${this.#title}</div>
          <div class="todo__item-controls"><i class="fa fa-trash todo__item-controls-remove"></i></div>
       </div>`,
    );

    this.#list.getListElement().append(this.#itemElement);

    this.registerEvents();
  }

  registerEvents() {
    this.#itemElement.find(".todo__item-title").on("click", (event) => {
      this.toggleCheck();
    });

    this.#itemElement.find(".todo__item-controls .todo__item-controls-remove").on("click", (event) => {
      this.#list.removeItem(this);
    });
  }

  toggleCheck() {
    this.#checked = !this.#checked;

    if (this.#checked) {
      this.#itemElement.addClass("todo__item_checked");
    } else {
      this.#itemElement.removeClass("todo__item_checked");
    }

    this.#list.updateCanvas();
  }

  isChecked() {
    return this.#checked;
  }
}
