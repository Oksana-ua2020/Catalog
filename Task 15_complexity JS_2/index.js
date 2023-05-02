'use strict'

function methodCall(method) {
    const curentCallsCount = localStorage.getItem(method);
    const nextCallsCount = curentCallsCount === null ? 1 : curentCallsCount + 1;
    localStorage.setItem(method, nextCallsCount);
}

function countedConsoleFactory() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)} total number`);
    }
    localStorage.clear();
}

function ConsoleFactory(type) {
    const action = (text, methodName) => {
        console[type](text);
        methodCall(methodName)
    }
    const typesMap = {
        log: () => action('I call console.log', 'LOG'),
        info: () => action('I call console.info', 'INFO'),
        debug: () => action('I call console.debug', 'DEBUG'),
        warn: () => action('I call console.warn', 'WARN'),
        error: () => action('I call console.error', 'ERROR'),
    }

    if (typesMap[type]) typesMap[type]();
}

ConsoleFactory('log');
ConsoleFactory('info');
ConsoleFactory('info');
ConsoleFactory('debug');
ConsoleFactory('debug');
ConsoleFactory('debug');
ConsoleFactory('error');
ConsoleFactory('error');
ConsoleFactory('error');
ConsoleFactory('error');
ConsoleFactory('warn');
ConsoleFactory('warn');
ConsoleFactory('warn');
ConsoleFactory('warn');
ConsoleFactory('warn');

countedConsoleFactory();
