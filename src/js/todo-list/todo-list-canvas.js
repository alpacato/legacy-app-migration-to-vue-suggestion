import { getFirstLetter } from "../../common/utils/string";

export class TodoListCanvas {
  #list = null;
  #canvas = null;
  #context = null;
  #paths = new Map();
  #overlappedItem = null;

  constructor(list, canvasSelector) {
    this.#list = list;
    this.#canvas = document.querySelector(canvasSelector);
    this.#context = this.#canvas.getContext("2d");

    this.registerEvents();
  }

  registerEvents() {
    this.#canvas.addEventListener("pointermove", (event) => {
      const rect = this.#canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      this.#overlappedItem = null;

      for (const [path, item] of this.#paths.entries()) {
        if (this.#context.isPointInPath(path, mouseX, mouseY)) {
          this.#overlappedItem = item;
        }
      }

      if (this.#overlappedItem) {
        this.#canvas.style.cursor = "pointer";
      } else {
        this.#canvas.style.cursor = "default";
      }
    });

    this.#canvas.addEventListener("click", () => {
      if (this.#overlappedItem) {
        this.#overlappedItem.completed = !this.#overlappedItem.completed;
        this.update();
      }
    });
  }

  update() {
    this.clearCanvasAndUpdateSize();
    this.drawItems();
  }

  clearCanvasAndUpdateSize() {
    const canvasSize = this.getCanvasSize();

    this.#context.clearRect(0, 0, canvasSize.width, canvasSize.height);
    this.#paths.clear();

    this.#canvas.height = canvasSize.height;
    this.#canvas.width = canvasSize.width;
  }

  getCanvasSize() {
    return {
      height: this.#canvas.clientHeight,
      width: this.#canvas.clientWidth,
    };
  }

  drawItems() {
    const canvasSize = this.getCanvasSize();
    const itemWidth = canvasSize.width / 5;
    const itemHeight = canvasSize.height / 3;

    const itemsToDraw = [...this.#list.getItems()];
    let yOffset = 0;

    do {
      for (let index = 0; index < 5; index++) {
        const item = itemsToDraw[0];

        if (item) {
          this.drawItem(
            itemsToDraw[0],
            { x: index * itemWidth, y: yOffset * itemHeight },
            { x: itemWidth, y: itemHeight },
          );
          itemsToDraw.shift();
        } else {
          break;
        }
      }

      yOffset += 1;
    } while (itemsToDraw.length > 0);
  }

  drawItem(item, position, size) {
    const circle = new Path2D();

    const center = {
      x: position.x + size.x / 2,
      y: position.y + size.y / 2,
    };

    circle.arc(center.x, center.y, size.x / 4, 0, 2 * Math.PI);

    this.#paths.set(circle, item);

    function isUrgent(item) {
      return item.urgent;
    }

    if (item.completed) {
      this.#context.fillStyle = isUrgent(item) ? "#cd5c5c" : "#000";
      this.#context.fill(circle);
    } else {
      this.#context.strokeStyle = isUrgent(item) ? "#cd5c5c" : "#000";
      this.#context.stroke(circle);
    }

    this.#context.font = "12px Roboto";
    this.#context.fillStyle = item.completed ? "#fff" : "#000";
    this.#context.fillText(getFirstLetter(item.title), center.x - 4, center.y + 4);
  }
}
