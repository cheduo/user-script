// ==UserScript==
// @name         The Wall Street Journal Full Text Articles
// @namespace    https://andrealazzarotto.com/
// @version      1.0.4
// @description  Fetch the full text of The Wall Street Journal from the AMP version
// @author       Andrea Lazzarotto
// @match        https://www.wsj.com/articles/*
// @match        https://cn.wsj.com/articles/*
// @require      https://code.jquery.com/jquery-latest.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/* Greasemonkey 4 wrapper */
if (typeof GM !== "undefined" && !!GM.xmlHttpRequest) {
    GM_xmlhttpRequest = GM.xmlHttpRequest;
}

function fetch(params) {
    return new Promise(function (resolve, reject) {
        params.onload = resolve;
        params.onerror = reject;
        GM_xmlhttpRequest(params);
    });
}

(function () {
    'use strict';

    let paywalled = jQuery(".snippet-promotion").is(':visible');

    if (paywalled) {
        fetch({
            method: 'GET',
            url: '/amp' + location.pathname,
        }).then(function (responseDetails) {
            var r = responseDetails.responseText;
            r = r.replace(/<script/gi, '<div').replace(/script>/gi, 'div>');
            r = r.replace(/\?width=/gi, '?__=').replace(/<amp-img/gi, '<img').replace(/<.amp-img>/, '').replace(/amp-iframe/gi, 'iframe');
            var data = jQuery(r);
            jQuery('.wsj-snippet-body').replaceWith(data.find('[amp-access=access]').css('margin-bottom', '5rem'));
            jQuery('.wsj-snippet-login, .wsj-ad, .banner-ad-b, .media-object:not(:has(>*))').remove();
            jQuery('.responsive-media').css('height', 'auto');
            jQuery('.responsive-media img').css({
                'height': 'auto',
                'width': 'auto',
                'max-width': '100%',
                'display': 'block',
                'position': 'relative',
            });
            jQuery('.media-object-video iframe').addClass('video-wrapper').wrap('<div class="video-container"></div>');
            jQuery('.imageCaption').each(function () {
                var element = jQuery(this);
                var parent = element.parent();
                var wrapper = jQuery('<div class="wsj-article-caption"></div>');
                wrapper.append(element.html()).appendTo(parent);
                element.remove();
            }).find('.imageCredit').addClass('wsj-article-credit').prepend(' ');
            jQuery('.media-object').addClass('media-object-image');
            jQuery('.media-object img').css('height', 'auto');
        });
    }

})();
