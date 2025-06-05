# JoinUI

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

## Overview

This plugin adjusts the default "Create Server" modal in Revolt by adding **two tabs**:  
- **Create** — for creating a new server  
- **Join** — for joining an existing server with an invite code

The join tab validates invite codes and allows users to enter a code or invite URL, automatically joining the server for you.

---

## Features

- Tab switch between **Create** and **Join** forms inside the modal  
- Automatic invite code extraction from full URLs (e.g. `https://rvlt.gg/abc123`)  
- Validation and error display for invalid or expired invite codes  
- Customizable styling consistent with Revolt's UI  
- Auto-injects into the server modal on page load and mutation changes

---

## Installation

Copy and paste the following code into the browser console **while on** [https://app.revolt.chat](https://app.revolt.chat) (or desktop client):

```js

xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/AwesomeRevolt/RevoltPlugins/refs/heads/main/JoinUI/plugin.js");
xhr.send("");
xhr.onload = function() {
  state.plugins.add({
      format: 1,
      version: "1.0",
      namespace: "AR",
      id: "joinUI",
      entrypoint: xhr.response
  });
  window.location.reload();
};
```

---

## Usage

- Open the **Create Server** modal in Revolt as usual.  
- You'll see two tabs at the top: **Create** (default) and **Join**.  
- Select **Join** to input an invite code or paste a full invite URL.  
- If you enter a valid invite code, clicking the confirm button will redirect you to join that server.  
- Errors (invalid or expired invites) will show inline below the input field.  
- Select **Create** to create a new server as usual.

---

## Troubleshooting

- If the tabs do not appear, try reloading the page or reinstalling the plugin.  
- Make sure you open the modal via the usual **Create Server** button.  
- If the invite code validation fails unexpectedly, check your network connection.  
- Console errors can be viewed in DevTools for debugging.

---

## Customization

- You can customize the styles via editing the `baseTabStyle()` function.  
- Feel free to fork and extend the plugin with additional tabs or features!

---

## Contribution & Support

Contributions, bug reports, and feature requests are welcome!  
Feel free to fork the repository or message me on [Revolt](https://rvlt.gg/hw1sDfMY).

---
