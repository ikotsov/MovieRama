class ExpandAnimated {
  #collapse(element) {
    const sectionHeight = element.scrollHeight;
    const elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(() => {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      requestAnimationFrame(() => {
        element.style.height = 0 + 'px';
      });
    });

    element.setAttribute('data-collapsed', 'true');
  }

  #expand(element) {
    const sectionHeight = element.scrollHeight;
    element.style.height = sectionHeight + 'px';

    element.addEventListener('transitionend', function transitionEndHandler(e) {
      element.removeEventListener('transitionend', transitionEndHandler);
      element.style.height = null;
    });

    element.setAttribute('data-collapsed', 'false');
  }

  #toggle(element) {
    const isCollapsed = element.getAttribute('data-collapsed') === 'true';

    if (isCollapsed) {
      this.#expand(element);
    } else {
      this.#collapse(element);
    }
  }

  run(parentElement, collapsibleElement) {
    const isFirstClick = parentElement.getAttribute('data-first-click') !== 'false';

    if (isFirstClick) {
      parentElement.setAttribute('data-first-click', 'false');
      collapsibleElement.setAttribute('data-collapsed', 'false');
      collapsibleElement.style.height = '0px';
      this.#expand(collapsibleElement);
      return;
    }

    this.#toggle(collapsibleElement);
  }
}

export default new ExpandAnimated();
