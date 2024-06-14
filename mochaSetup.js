import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`<body></body>`);

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = window.Node;
global.MouseEvent = window.MouseEvent;
