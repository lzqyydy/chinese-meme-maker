let browser = {};

// Opera 8.0+
browser.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
browser.isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
browser.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
browser.isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
browser.isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
browser.isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
browser.isBlink = (isChrome || isOpera) && !!window.CSS;

export default browser;