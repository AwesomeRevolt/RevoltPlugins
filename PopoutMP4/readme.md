# PopoutMP4

---

<div align="center">

## 💖 Support & Donate 💖

<a href="https://rvlt.gg/hw1sDfMY">
  <img src="https://img.shields.io/badge/Support%20Server-Join%20Now-9b59b6?style=for-the-badge" alt="Support Server" />
</a>  
<a href="https://ko-fi.com/asraye">
  <img src="https://img.shields.io/badge/Donate-Ko--Fi-orange?style=for-the-badge&logo=ko-fi" alt="Donate" />
</a>

</div>

---

## Changes (I MAY) Do

- [ ] Add support for MP3s
- [ ] Add support for Embeds (YouTube, etc)
- [ ] Mobile support improvements

---


## Overview

This plugin adds a draggable, resizable video popout — to any video on Revolt.  
Each video gains a popout button that opens it in a floating window, complete with opacity control and snapping.

Perfect for multitasking — pop out media while browsing or chatting in other channels.

---

## Features

- 📺 Pop out any video into a draggable, resizable window  
- 🎛️ Built-in **opacity slider** for transparent overlays  
- 🧲 **Snaps** to screen edges for clean placement  
- 🧩 Works with **multiple videos at once**  
---

## Installation

Copy and paste the following code into the browser console **while on** [https://app.revolt.chat](https://app.revolt.chat) or the desktop app:

```js
xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/AwesomeRevolt/RevoltPlugins/refs/heads/main/PopoutMP4/popoutmp4.js");
xhr.send("");
xhr.onload = function() {
  state.plugins.add({
      format: 1,
      version: "1.0",
      namespace: "AR",
      id: "PopoutMP4",
      entrypoint: xhr.response
  });
  window.location.reload();
};
```

---

## Usage

- Hover over any video in chat — you'll see a 📺 button in the top-right corner.  
- Click it to open that video in a **floating popout window**.  
- Drag it around by the top bar or resize it from the corner.  
- Use the slider to change opacity for background blending.  
- Close the window anytime using the ✖ button.

---

## Troubleshooting

- ❌ No button? Wait for the video to load or try reloading the page.  
- 🖼️ If resizing glitches, try resizing slowly.
- 🧼 To remove all popouts, simply unload the plugin or reload the page.  

## Contribution & Support

Bug reports, forks, and feature ideas are always welcome!  
Feel free to fork, modify, or contribute back — and message me any time on [Revolt](https://rvlt.gg/hw1sDfMY).

---
