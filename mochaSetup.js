import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`<body><div id="app"></div></body>`, { url: 'https://example.org/' });

global.window = jsdom.window;
global.history = jsdom.window.history;
global.document = jsdom.window.document;
global.Node = window.Node;
global.MouseEvent = window.MouseEvent;
