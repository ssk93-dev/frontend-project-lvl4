import debug from 'debug';

// eslint-disable-next-line testing-library/no-debugging-utils
export default (namespace) => debug(`chat:${namespace}`);
