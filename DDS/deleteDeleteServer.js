(() => {
  function removeDeleteServer() {
    const deleteServerElement = document.querySelector('span span[style="color: var(--error);"]');
    if (deleteServerElement) {
      deleteServerElement.parentElement.remove(); 
    }
  }

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          removeDeleteServer(); 
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  removeDeleteServer();

  return {
    onUnload: () => observer.disconnect()
  };
})();
