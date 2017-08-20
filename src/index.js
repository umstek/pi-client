import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
