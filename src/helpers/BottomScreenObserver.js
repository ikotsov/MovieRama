class BottomScreenObserver {
  #bottomLoader = document.querySelector('.bottom-loader');

  #onScrollHandler(handler) {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const hasReachedBottom = scrollTop + clientHeight >= scrollHeight;
    
    if (hasReachedBottom) {
      this.#bottomLoader.classList.add('show');
      handler();
    } else {
      this.#bottomLoader.classList.remove('show');
    }
  }

  attachRenderHandler(handler) {
    window.addEventListener('scroll', () => this.#onScrollHandler(handler));  }
}

export default new BottomScreenObserver();
