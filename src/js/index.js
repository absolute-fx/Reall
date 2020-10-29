import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import '../styles/main.scss';

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}

ReactDom.render(<App />, document.getElementById('app'));