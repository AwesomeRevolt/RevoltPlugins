() => {
  const classes = {
    modalCreateServer: 'div[type="create_server"].Container-sc-1d91xkm-1',
    titleContainer: '.Title-sc-1d91xkm-2',
    heading: 'h2.H2-sc-a2ydqp-0',
    content: '.Content-sc-1d91xkm-3',
    actions: '.Actions-sc-1d91xkm-4',
    policyTextDiv: '.H4-sc-1f4hirm-0 > div',
    form: 'form',
  };

  const baseTabStyle = () => ({
    flex: '1',
    padding: '8px',
    background: 'transparent',
    color: 'white',
    fontWeight: '600',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    userSelect: 'none',
  });

  let joinFormContainer = null;
  let observer = null;

  const createElement = (tag, options = {}) => {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.textContent) el.textContent = options.textContent;
    if (options.html) el.innerHTML = options.html;
    if (options.styles) Object.assign(el.style, options.styles);
    if (options.attrs) {
      for (const [k,v] of Object.entries(options.attrs)) {
        el.setAttribute(k,v);
      }
    }
    return el;
  };

  function createJoinForm() {
    const container = createElement('div', {
      styles: {
        marginTop: '12px',
      },
    });
    container.innerHTML = `
      <form>
        <div class="Column-sc-mmjmg6-0 cRLrct">
          <div>
            <div class="Category-sc-tvyi45-0 iuNJGz">Invite Code</div>
            <input id="join-invite-code" class="InputBox-sc-13s1218-0 bEeAEn" placeholder="XfDcS4JG" autocomplete="off" spellcheck="false" />
            <div id="join-error" style="color:#f55; font-size:0.9em; margin-top:4px; display:none;"></div>
          </div>
        </div>
      </form>
    `;
    return container;
  }

  function updateConfirmButtonText(actionsEl, text) {
    const btn = actionsEl.querySelector('button');
    if (btn) btn.textContent = text;
  }

  function activateCreateTab(state) {
    const { tabCreate, tabJoin, createForm, joinFormContainer, heading, policyTextDiv, actions } = state;
    tabCreate.style.borderBottom = '2px solid white';
    tabJoin.style.borderBottom = '2px solid transparent';

    if (joinFormContainer) joinFormContainer.style.display = 'none';
    createForm.style.display = '';

    updateConfirmButtonText(actions, 'Create');
    heading.textContent = 'Create a server';
    policyTextDiv.innerHTML = `By creating this server, you agree to the <a href="https://revolt.chat/aup" target="_blank" rel="noreferrer">Acceptable Use Policy.</a>`;
  }

  function activateJoinTab(state) {
    const { tabCreate, tabJoin, createForm, joinFormContainer, heading, policyTextDiv, actions, content } = state;
    tabJoin.style.borderBottom = '2px solid white';
    tabCreate.style.borderBottom = '2px solid transparent';

    createForm.style.display = 'none';

    if (!joinFormContainer) {
      state.joinFormContainer = createJoinForm();
      content.appendChild(state.joinFormContainer);
      state.joinInput = state.joinFormContainer.querySelector('#join-invite-code');
      state.errorDiv = state.joinFormContainer.querySelector('#join-error');
    } else {
      state.joinFormContainer.style.display = '';
    }

    updateConfirmButtonText(actions, 'Join');
    heading.textContent = 'Join a server';
    policyTextDiv.innerHTML = `By joining a server, you agree to the <a href="https://revolt.chat/aup" target="_blank" rel="noreferrer">Acceptable Use Policy.</a>`;
  }

  function sanitizeInviteCode(raw) {
    if (!raw) return '';
    return raw
      .replace(/^https?:\/\/(rvlt\.gg|revolt\.chat)\/invite\//i, '')
      .replace(/^rvlt\.gg\//i, '')
      .trim();
  }

  function setupTabs() {
    const modal = document.querySelector(classes.modalCreateServer);
    if (!modal || modal.querySelector('#custom-tab-switch')) return;

    const titleContainer = modal.querySelector(classes.titleContainer);
    if (!titleContainer) return;

    const heading = titleContainer.querySelector(classes.heading);
    const content = modal.querySelector(classes.content);
    const actions = modal.querySelector(classes.actions);
    const policyTextDiv = titleContainer.querySelector(classes.policyTextDiv);
    const createForm = content.querySelector(classes.form);
    if (!heading || !content || !actions || !policyTextDiv || !createForm) return;

    const tabSwitch = createElement('div', {
      attrs: { id: 'custom-tab-switch' },
      styles: { display: 'flex', marginBottom: '12px' },
    });

    const tabCreate = createElement('button', {
      textContent: 'Create',
      styles: Object.assign(baseTabStyle(), { borderBottom: '2px solid white' }),
    });
    const tabJoin = createElement('button', {
      textContent: 'Join',
      styles: baseTabStyle(),
    });

    tabSwitch.append(tabCreate, tabJoin);
    titleContainer.prepend(tabSwitch);

    const state = {
      tabCreate,
      tabJoin,
      createForm,
      joinFormContainer: null,
      joinInput: null,
      errorDiv: null,
      heading,
      policyTextDiv,
      actions,
      content,
    };

    tabCreate.addEventListener('click', () => activateCreateTab(state));
    tabJoin.addEventListener('click', () => activateJoinTab(state));

    const confirmBtn = actions.querySelector('button');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', async (e) => {
        if (tabJoin.style.borderBottom === '2px solid white') {
          e.preventDefault();
          if (!state.joinInput || !state.errorDiv) return;

          state.errorDiv.style.display = 'none';
          const raw = state.joinInput.value.trim();
          const code = sanitizeInviteCode(raw);

          if (!code) {
            state.errorDiv.textContent = 'Please enter a valid invite code.';
            state.errorDiv.style.display = 'block';
            return;
          }

          try {
            const res = await fetch(`/api/invites/${code}`);
            if (!res.ok) {
              state.errorDiv.textContent = 'This invite code is invalid or has expired.';
              state.errorDiv.style.display = 'block';
              return;
            }
            window.location.href = `/invite/${code}`;
          } catch (err) {
            state.errorDiv.textContent = 'Failed to verify invite code. Please try again later.';
            state.errorDiv.style.display = 'block';
            console.error('Error verifying invite code:', err);
          }
        }
      });
    }

    activateCreateTab(state);
  }

  observer = new MutationObserver(() => {
    setupTabs();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return {
    onUnload: () => {
      observer.disconnect();
      const tabSwitch = document.querySelector('#custom-tab-switch');
      if (tabSwitch) tabSwitch.remove();

      if (joinFormContainer) {
        joinFormContainer.remove();
        joinFormContainer = null;
      }
    },
  };
};
