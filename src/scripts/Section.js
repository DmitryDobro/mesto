class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  setItem(element) {
    this._container.prepend(element);
  }
  renderItems() {
    console.log(123);
    if (Array.isArray(this._renderedItems)) {
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });
    } else {
      console.log(this._renderedItems);
      this._renderer(this._renderedItems);
    }
  }
}
export { Section };
