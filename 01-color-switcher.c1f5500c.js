!function(){var t,e=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]"),a=document.querySelector("body");e.addEventListener("click",(function(n){if("BUTTON"!==n.target.nodeName)return;t=setInterval((function(){a.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),e.setAttribute("disabled",""),r.removeAttribute("disabled","")})),r.addEventListener("click",(function(a){if("BUTTON"!==a.target.nodeName)return;clearInterval(t),r.setAttribute("disabled",""),e.removeAttribute("disabled","")})),r.setAttribute("disabled","")}();
//# sourceMappingURL=01-color-switcher.c1f5500c.js.map
