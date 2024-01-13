class BottomScreenObserver {
  #loadingIndicator = document.querySelector('.bottom-loader');

  #onScrollHandler(handler) {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const hasReachedBottom = scrollTop + clientHeight >= scrollHeight;
    
    if (hasReachedBottom) {
      this.#loadingIndicator.classList.add('show');
      handler();
    } else {
      this.#loadingIndicator.classList.remove('show');
    }
  }

  attachRenderHandler(handler) {
    window.addEventListener('scroll', () => this.#onScrollHandler(handler));  }
}

export default new BottomScreenObserver();
