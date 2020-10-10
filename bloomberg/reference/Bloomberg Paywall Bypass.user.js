// ==UserScript==
// @name         Bloomberg Paywall Bypass
// @namespace    https://greasyfork.org/users/673609
// @version      0.1
// @description  Bypass Bloomberg paywall.
// @match        https://www.bloomberg.com/*
// @grant        none
// @run-at       document-start
// @license      magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later
// ==/UserScript==

(function () {
    'use strict';
    window.addEventListener('beforescriptexecute', function (e) {
        if (e.target.id === 'fence-snippet') {
            e.preventDefault();
            e.stopPropagation();
            window.removeEventListener(e.type, arguments.callee, true);
        }
    }, true);

})();
