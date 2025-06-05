# JoinUI

---

<div align="center">

## 💖 Support & Donate 💖

[![Support Server](https://img.shields.io/badge/Support%20Server-Join%20Now-5865F2?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZSIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMTIiIGZpbGw9IiM1ODY1RjIiLz48cGF0aCBkPSJNMTYuODQ2IDI1LjE4M2MtMi44MDkgMC01LjExOSAyLjM1Mi01LjExOSA1LjI5MiAwIDIuMDk1IDIuMTE0IDMuMzQ3IDQuMjQ5IDMuMzQ3IDEuMjA5IDAgMi4yOTItLjU0NSAzLjA2OS0xLjM0NSAyLjYzIDIuNzQ0IDguNzQxIDYuOTIyIDguNzQxIDYuOTIycy0uOTc3LTEuMTU3LTEuNTc1LTIuMTktMy4wNzItMi41ODhjLjE2MS0uMTE1LjI5My0uMjQzLjQxMi0uMzg1IDEuNTUyLTIuMzI4IDIuNzA5LTUuMjQ5IDMuNzItOC40NTMtMS43MjQuODU2LTMuNjk0IDEuNDYzLTUuOTYgMS43Njh6Ii8+PHBhdGggZD0iTTMyLjU1NiAyMy4zNDZjLTIuNjE0IDAtNC43NDYgMi4xNzEtNC43NDYgNC44NDMgMCAxLjc2NSAxLjA5MiAzLjI3NCAyLjcxNSA0LjI4OS0yLjcwMSAxLjk4NS04LjAxIDYuNjYzLTguMDEgNi42NjNzLS41ODUtLjkxMy0xLjU4MS0yLjIyNGMtLjEzNy0uMTktLjI1MS0uMzc4LS4zNS0uNTc3IDIuMzIzLTEuMDUzIDQuMTg1LTMuMDA3IDQuNjU3LTUuMjU3LS45NjctLjY2MS0xLjU1OC0xLjc5OS0xLjU1OC0zLjA4NCAwLTIuMjcgMS44NjctNC4xMTIgNC4xNTItNC4xMTIgMS4yMTYgMCAyLjM0OS41MjIgMy4xODcgMS4zMzRhNS44MjYgNS44MjYgMCAwIDEgMS44Ni0uNTY1YzIuNjg3IDAgNC44NTggMi4xODMgNC44NTggNC44NjQgMCAxLjA4OS0uNDQyIDIuMDc3LTEuMTU0IDIuODA0LjMxMi4wNjUuNjA1LjA5LjkyMy4wOSA1LjYyNCAwIDEwLjA1Mi00LjQyNyAxMC4wNTItMTAuMDUzIDAtNS41OTUtNC40MjctMTAuMDUzLTEwLjA1Mi0xMC4wNTN6Ii8+PC9zdmc+)](https://rvlt.gg/hw1sDfMY)  
[![Donate](https://img.shields.io/badge/Donate-Ko--Fi-orange?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/asraye)

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
      namespace: "Asraye",
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
