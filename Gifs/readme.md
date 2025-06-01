
# GIF Button Plugin for Revolt


---

## Getting Your Tenor API Key

To use the GIF button plugin, you need a **Tenor API key** to search and fetch GIFs.

### Steps to Get a new Tenor API Key

1. Read [Here](https://developers.google.com/tenor/guides/quickstart).  
2. Replace the `API-KEY` in the gif settings with your key.

---

## Installation

Copy and paste the following code in the console **while on** [https://app.revolt.chat](https://app.revolt.chat):  
Or while on desktop client

```js
xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/AwesomeRevolt/RevoltPlugins/refs/heads/main/Gifs/tenorgifs.js");
xhr.send("");
xhr.onload = function() {
  state.plugins.add({
      format: 1,
      version: "1.0",
      namespace: "Asraye",
      id: "gif-button",
      entrypoint: xhr.response
  });
  window.location.reload();
};
```

---

## Usage

- After reload, open a chat message box.  
- Next to the file upload icon, you will see a new **GIF button** (GIF icon).  
- Click the GIF button to open the search dropdown.  
- Enter a keyword to search for GIFs.  
- The number of GIF results returned is **customizable via the Settings tab** (click the ⚙️ icon in the dropdown).  
- Click any GIF to insert it into the message box as an invisible markdown link that posts the GIF.  
- Send your message as usual.

---

## Settings

- **API Key:** Enter your Tenor API key.  
- **Result Limit:** Customize how many GIFs appear per search (between 1 and 50).  

---

## Troubleshooting

- If no GIFs appear, make sure you replaced the `API-KEY` with a valid key.  
- If the button does not show up, try reloading the page or reinstalling.  
- The dropdown may be hidden behind other UI elements if the window is small. Try resizing.

---

## Notes

- The GIF markdown format uses a zero-width space to prevent cluttering the text visually.  
- You can customize the plugin code to change button styles or behavior.  
- Contributions are welcome! Feel free to fork and improve my crap code :D
