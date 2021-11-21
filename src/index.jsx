// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'react-toastify/dist/ReactToastify.css';
import { render } from 'react-dom';
import io from 'socket.io-client';
import init from './init.jsx';

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const socket = io();

const startApp = async () => {
  const vdom = await init(socket);

  render(
    vdom,
    document.getElementById('chat'),
  );
};
startApp();
