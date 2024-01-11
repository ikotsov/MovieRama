class BottomScreenObserver {
  _loadingIndicator = document.querySelector('.loading-indicator');

  _onScrollHandler(handler) {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const hasReachedBottom = scrollTop + clientHeight >= scrollHeight;
    
    if (hasReachedBottom) {
      this._loadingIndicator.classList.add('show');
      handler();
    } else {
      this._loadingIndicator.classList.remove('show');
    }
  }

  attachRenderHandler(handler) {
    window.addEventListener('scroll', () => this._onScrollHandler(handler));  }
}

export default new BottomScreenObserver();
