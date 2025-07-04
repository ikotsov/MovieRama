class SearchFormView {
  #formElement = document.querySelector('.search');
  #inputElement = document.querySelector('.search__field');

  #preventDefault() {
    this.#formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  constructor() {
    this.#preventDefault();
  }

  attachOnTypeHandler(handler) {
    this.#inputElement.addEventListener('input', (event) => {
      handler(event.target.value);
    });
  }
}

export default new SearchFormView();
