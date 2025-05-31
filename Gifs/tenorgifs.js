() => {
  const classes = {
    fileIcon: ".MessageBox__FileAction-sc-jul4fa-3.wcOtw",
    messageBoxBase: ".MessageBox__Base-sc-jul4fa-0.jBEnry",
    gifButtonClass: "gif-button",
  };

  const getSettings = () => {
    const settings = JSON.parse(localStorage.getItem("revoltGifSettings") || "{}");
    return {
      apiKey: settings.apiKey || "API-KEY",
      safeMode: settings.safeMode ?? true,
    };
  };

  const saveSettings = (settings) => {
    localStorage.setItem("revoltGifSettings", JSON.stringify(settings));
  };

  function createGifButton() {
    const btnWrap = document.createElement("div");
    btnWrap.className = `${classes.fileIcon.slice(1)} ${classes.gifButtonClass}`;
    btnWrap.style.cursor = "pointer";
    btnWrap.style.position = "relative";

    btnWrap.innerHTML = `
      <a class="IconButton-sc-166lqkp-0 bGwznd" title="GIFs" style="display:flex;align-items:center;justify-content:center;">
        <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor"
             xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 bWRyML">
          <path d="M3 5v14h18V5H3zm8 10H9v-4H7v4H5v-6h2v2h2v-2h2v6zm4 0h-2v-6h2v6zm4 0h-4v-6h4v2h-2v1h2v3z"/>
        </svg>
      </a>
    `;
    return btnWrap;
  }

  function createDropdown(settings) {
    const dropdown = document.createElement("div");
    Object.assign(dropdown.style, {
      position: "absolute",
      bottom: "48px",
      left: "0",
      background: "#222",
      border: "1px solid #444",
      padding: "6px",
      zIndex: "9999",
      display: "none",
      maxHeight: "220px",
      overflowY: "auto",
      width: "280px",
      borderRadius: "6px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
      color: "#eee",
      fontFamily: "Arial, sans-serif",
    });

    const topRow = document.createElement("div");
    topRow.style.display = "flex";
    topRow.style.alignItems = "center";
    topRow.style.marginBottom = "6px";

    const searchInput = document.createElement("input");
    Object.assign(searchInput, {
      type: "text",
      placeholder: "Search GIFs",
      spellcheck: false,
    });
    Object.assign(searchInput.style, {
      flex: 1,
      padding: "6px 8px",
      borderRadius: "4px",
      border: "1px solid #555",
      background: "#333",
      color: "#eee",
      fontSize: "14px",
      outline: "none",
    });

    const settingsBtn = document.createElement("button");
    settingsBtn.innerHTML = "⚙️";
    settingsBtn.title = "Settings";
    Object.assign(settingsBtn.style, {
      marginLeft: "6px",
      fontSize: "16px",
      background: "none",
      border: "none",
      color: "#eee",
      cursor: "pointer",
    });

    const settingsMenu = document.createElement("div");
    Object.assign(settingsMenu.style, {
      display: "none",
      marginTop: "6px",
      padding: "6px",
      border: "1px solid #444",
      borderRadius: "4px",
      background: "#111",
    });

    settingsMenu.innerHTML = `
      <label style="display:block;margin-bottom:6px;">
        <input type="checkbox" id="safeModeToggle" ${settings.safeMode ? "checked" : ""}>
        Enable Safe Mode
      </label>
      <label style="display:block;">
        API Key:
        <input type="text" id="apiKeyInput" value="${settings.apiKey}" style="width:100%;padding:4px;margin-top:2px;background:#222;border:1px solid #555;color:#eee;border-radius:4px;">
      </label>
    `;

    settingsBtn.onclick = () => {
      settingsMenu.style.display = settingsMenu.style.display === "none" ? "block" : "none";
    };

    settingsMenu.querySelector("#safeModeToggle").addEventListener("change", (e) => {
      settings.safeMode = e.target.checked;
      saveSettings(settings);
    });

    settingsMenu.querySelector("#apiKeyInput").addEventListener("input", (e) => {
      settings.apiKey = e.target.value.trim();
      saveSettings(settings);
    });

    topRow.appendChild(searchInput);
    topRow.appendChild(settingsBtn);

    const resultsContainer = document.createElement("div");
    Object.assign(resultsContainer.style, {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      justifyContent: "flex-start",
    });

    dropdown.appendChild(topRow);
    dropdown.appendChild(settingsMenu);
    dropdown.appendChild(resultsContainer);

    return { dropdown, searchInput, resultsContainer };
  }

  function insertGifMarkdown(url) {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const zeroWidthSpace = "\u200e";
    const gifMarkdown = `[${zeroWidthSpace}](${url})`;

    textarea.value += (textarea.value ? " " : "") + gifMarkdown;

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    textarea.focus();
  }

  const observer = new MutationObserver(() => {
    const fileIcon = document.querySelector(classes.fileIcon);
    if (!fileIcon) return;

    const container = fileIcon.closest(classes.messageBoxBase);
    if (!container || container.querySelector(`.${classes.gifButtonClass}`)) return;

    const gifBtn = createGifButton();
    const settings = getSettings();
    const { dropdown, searchInput, resultsContainer } = createDropdown(settings);

    gifBtn.onclick = () => {
      dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
      if (dropdown.style.display === "block") {
        searchInput.focus();
      }
    };

    let lastQuery = "";
    searchInput.addEventListener("input", async () => {
      const query = searchInput.value.trim();
      if (!query) {
        resultsContainer.innerHTML = "";
        lastQuery = "";
        return;
      }
      if (query === lastQuery) return;
      lastQuery = query;

      resultsContainer.innerHTML = "<em style='width: 100%; text-align:center;'>Searching...</em>";

      try {
        const res = await fetch(
          `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${settings.apiKey}&limit=12&contentfilter=${settings.safeMode ? "high" : "off"}`
        );
        const data = await res.json();

        resultsContainer.innerHTML = "";
        (data.results || []).forEach((gif) => {
          const img = document.createElement("img");
          img.src = gif.media_formats.tinygif.url;
          Object.assign(img.style, {
            width: "72px",
            height: "72px",
            objectFit: "cover",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0 0 4px rgba(0,0,0,0.5)",
            transition: "transform 0.15s ease",
          });

          img.onmouseenter = () => (img.style.transform = "scale(1.1)");
          img.onmouseleave = () => (img.style.transform = "scale(1)");

          img.onclick = () => {
            insertGifMarkdown(gif.media_formats.tinygif.url);
            dropdown.style.display = "none";
            searchInput.value = "";
            resultsContainer.innerHTML = "";
          };

          resultsContainer.appendChild(img);
        });

        if (!data.results || data.results.length === 0) {
          resultsContainer.innerHTML = "<em style='width: 100%; text-align:center;'>No results found</em>";
        }
      } catch (err) {
        resultsContainer.innerHTML = "<em style='width: 100%; text-align:center; color: #f55;'>Error fetching GIFs</em>";
        console.error("[Revolt GIF Button] Error fetching GIFs:", err);
      }
    });

    fileIcon.parentNode.insertBefore(gifBtn, fileIcon.nextSibling);
    fileIcon.parentNode.style.position = "relative";
    fileIcon.parentNode.appendChild(dropdown);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return {
    onUnload: () => {
      observer.disconnect();
      document.querySelectorAll(`.${classes.gifButtonClass}`).forEach((el) => el.remove());
    },
  };
};
