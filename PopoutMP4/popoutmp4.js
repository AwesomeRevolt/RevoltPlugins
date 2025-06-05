() => {
  const SNAP_THRESHOLD = 20;

  function createElement(tag, props = {}) {
    const el = document.createElement(tag);
    if (props.text) el.textContent = props.text;
    if (props.html) el.innerHTML = props.html;
    if (props.styles) Object.assign(el.style, props.styles);
    if (props.attrs) {
      for (const [key, val] of Object.entries(props.attrs)) {
        el.setAttribute(key, val);
      }
    }
    return el;
  }

  function setupVideoPopout(video) {
    if (video.dataset.hasPopout) return;
    video.dataset.hasPopout = 'true';

    const btn = createElement('button', {
      text: '📺',
      attrs: { title: 'Popout video' },
      styles: {
        position: 'absolute', top: '5px', right: '5px', zIndex: 10,
        background: '#000a', border: 'none', color: 'white', fontSize: '16px',
        padding: '4px 8px', borderRadius: '4px', cursor: 'pointer'
      }
    });

    video.parentElement.style.position = 'relative';
    video.parentElement.appendChild(btn);

    btn.addEventListener('click', () => {
      const popout = createElement('div', {
        styles: {
          position: 'fixed', bottom: '16px', right: '16px', width: '320px', height: '180px',
          zIndex: 9999, boxShadow: '0 0 8px rgba(0,0,0,0.5)', borderRadius: '8px',
          background: 'black', display: 'flex', flexDirection: 'column', userSelect: 'none',
          overflow: 'hidden'
        }
      });

      const header = createElement('div', {
        styles: {
          cursor: 'move', background: '#111', color: 'white', padding: '4px 8px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTopLeftRadius: '8px', borderTopRightRadius: '8px', gap: '10px'
        }
      });

      const dragArea = createElement('div', {
        text: 'Video Popout',
        styles: { flexGrow: 1, fontSize: '14px', fontWeight: 'bold' }
      });

      const opacityContainer = createElement('div', {
        styles: { display: 'flex', alignItems: 'center', gap: '4px' }
      });
      const opacityLabel = createElement('label', { text: 'Opacity:', styles: { fontSize: '12px' } });
      const opacitySlider = createElement('input', {
        attrs: { type: 'range', min: 0.1, max: 1, step: 0.01, value: 1, title: 'Adjust opacity' },
        styles: { width: '80px', cursor: 'pointer' }
      });

      opacitySlider.addEventListener('input', () => {
        popout.style.opacity = opacitySlider.value;
      });

      opacityContainer.append(opacityLabel, opacitySlider);

      const closeBtn = createElement('button', {
        text: '✖',
        attrs: { title: 'Close popout' },
        styles: {
          background: 'transparent', border: 'none', color: 'white', fontSize: '16px',
          cursor: 'pointer', padding: '0', marginLeft: '8px'
        }
      });

      closeBtn.addEventListener('click', () => {
        clone.pause();
        popout.remove();
      });

      header.append(dragArea, opacityContainer, closeBtn);
      popout.appendChild(header);

      const clone = video.cloneNode(true);
      clone.controls = true;
      clone.autoplay = true;
      clone.muted = false;
      clone.style = 'width: 100%; height: calc(100% - 34px); background: black; display: block;';
      popout.appendChild(clone);
      document.body.appendChild(popout);

      let isDragging = false, startX, startY, origX, origY;
      dragArea.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.clientX; startY = e.clientY;
        const rect = popout.getBoundingClientRect();
        origX = rect.left; origY = rect.top;
        popout.style.transition = 'none';
        e.preventDefault();
      });
      window.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          popout.style.transition = '';
          snapToEdges(popout);
        }
      });
      window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        let x = origX + (e.clientX - startX);
        let y = origY + (e.clientY - startY);
        const vw = window.innerWidth, vh = window.innerHeight;
        const rect = popout.getBoundingClientRect();
        x = Math.min(Math.max(0, x), vw - rect.width);
        y = Math.min(Math.max(0, y), vh - rect.height);
        Object.assign(popout.style, { left: x + 'px', top: y + 'px', right: 'auto', bottom: 'auto' });
      });

      const resizer = createElement('div', {
        styles: {
          width: '16px', height: '16px', position: 'absolute', right: '4px', bottom: '4px',
          cursor: 'se-resize', zIndex: 10000
        }
      });
      popout.appendChild(resizer);

      let isResizing = false, resizeStartX, resizeStartY, startWidth, startHeight;
      resizer.addEventListener('mousedown', e => {
        isResizing = true;
        resizeStartX = e.clientX; resizeStartY = e.clientY;
        const rect = popout.getBoundingClientRect();
        startWidth = rect.width; startHeight = rect.height;
        popout.style.transition = 'none';
        e.preventDefault(); e.stopPropagation();
      });
      window.addEventListener('mouseup', () => {
        if (isResizing) {
          isResizing = false;
          popout.style.transition = '';
          snapToEdges(popout);
        }
      });
      window.addEventListener('mousemove', e => {
        if (!isResizing) return;
        let w = Math.max(200, startWidth + (e.clientX - resizeStartX));
        let h = Math.max(112, startHeight + (e.clientY - resizeStartY));
        const vw = window.innerWidth, vh = window.innerHeight;
        const rect = popout.getBoundingClientRect();
        if (rect.left + w > vw) w = vw - rect.left;
        if (rect.top + h > vh) h = vh - rect.top;
        popout.style.width = w + 'px';
        popout.style.height = h + 'px';
      });

      function snapToEdges(el) {
        const vw = window.innerWidth, vh = window.innerHeight;
        const rect = el.getBoundingClientRect();
        let x = rect.left, y = rect.top;
        if (x < SNAP_THRESHOLD) x = 0;
        else if (vw - (x + rect.width) < SNAP_THRESHOLD) x = vw - rect.width;
        if (y < SNAP_THRESHOLD) y = 0;
        else if (vh - (y + rect.height) < SNAP_THRESHOLD) y = vh - rect.height;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
      }
    });
  }

  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node instanceof HTMLElement) {
          node.querySelectorAll('video').forEach(setupVideoPopout);
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  document.querySelectorAll('video').forEach(setupVideoPopout);

  return {
    onUnload: () => observer.disconnect()
  };
};