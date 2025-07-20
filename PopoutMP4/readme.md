# **DeleteServer Remover Plugin**

This plugin automatically removes the **"Delete server"** option,  this is mainly for myself, as I'm terrified of deleting [Solace](https://rvlt.gg/r9qXYXgM) on accident.

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

This plugin targets and removes the **"Delete server"** option, this is mainly for myself, as I'm terrified of deleting [Solace](https://rvlt.gg/r9qXYXgM) on accident.

### Features:
- **Automatic removal** of the "Delete server" option 
- **Simple** and **lightweight** script.

---

## Installation

Copy and paste the following code into the browser console **while on** [https://app.revolt.chat](https://app.revolt.chat) or the desktop app:

```js
xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/AwesomeRevolt/RevoltPlugins/refs/heads/main/DDS/deleteDeleteServer.js");
xhr.send("");
xhr.onload = function() {
  state.plugins.add({
      format: 1,
      version: "1.0",
      namespace: "AR",
      id: "DeleteDeleteServer",
      entrypoint: xhr.response
  });
  window.location.reload();
};
```