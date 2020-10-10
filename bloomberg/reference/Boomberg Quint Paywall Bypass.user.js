// ==UserScript==
// @name         Boomberg Quint Paywall Bypass
// @version      0.1
// @description  Bypasses the Bloomberg Quint/India paywall
// @author       Jujhar Singh
// @match        https://www.bloombergquint.com/*
// @grant        none
// @namespace https://greasyfork.org/users/303738
// ==/UserScript==

(() => {
    let old = window.fetch;
    window.fetch = () => {
        Promise.resolve().then(() => window.fetch = old)
    }
})()
