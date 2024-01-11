class SearchFormHandler {
  _formElement = document.querySelector('.search');
  _inputElement = document.querySelector('.search__field');

  _preventDefault() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  constructor() {
    this._preventDefault();
  }

  attachOnTypeHandler(handler) {
    this._inputElement.addEventListener('input', (e) => {
      handler(e.target.value);
    });
  }
}

export default new SearchFormHandler();
