!function e(t,n,i){function r(a,c){if(!n[a]){if(!t[a]){var d="function"==typeof require&&require;if(!c&&d)return d(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var s=n[a]={exports:{}};t[a][0].call(s.exports,function(e){var n=t[a][1][e];return r(n||e)},s,s.exports,e,t,n,i)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)r(i[a]);return r}({1:[function(e,t,n){"use strict";window.isfound=!1,window.addEventListener("load",function(){var e=setInterval(function(){window.imageid&&fetch("../"+window.imageid+"/isloaded",{headers:{"Content-Type":"application/x-www-form-urlencoded"},method:"GET"}).then(function(e){return e.json()}).then(function(t){"yes"==t.found&&(clearInterval(e),setTimeout(function(){var e=document.querySelector(".container--image"),t=document.querySelector(".container--wait");e.classList.toggle("container--image__hide"),t.classList.toggle("container--wait__hide"),e.appendChild(function(e){var t=document.createElement("div");t.classList.add("imagecontainer");var n=document.createElement("img");return n.setAttribute("src","/assets/processed/"+window.imageid+"-"+e+"."+window.extension),n.classList.add("imagecontainer--item"),t.appendChild(n),n.addEventListener("click",function(){location.href=this.getAttribute("src")}),t}("compiled"))},2e3))}).catch(function(e){console.log(e)})},500)})},{}]},{},[1]);
//# sourceMappingURL=render_image.js.map
