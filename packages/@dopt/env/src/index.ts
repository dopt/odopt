const isProd = () => process.env.NODE_ENV === 'production';
const inProd = isProd;
const isDev = () => process.env.NODE_ENV === 'development';
const inDev = isDev;

interface Config<T, Y> {
  prod: T;
  dev: Y;
}
function env<T, Y>({ prod, dev }: Config<T, Y>): T | Y {
  return isProd() ? prod : dev;
}

export { isProd, inProd, isDev, inDev, env };
