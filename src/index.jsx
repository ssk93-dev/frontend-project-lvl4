// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { render } from 'react-dom';
import io from 'socket.io-client';
import init from './init.jsx';

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const socket = io();
const vdom = init(socket);

render(
  vdom,
  document.getElementById('chat'),
);
