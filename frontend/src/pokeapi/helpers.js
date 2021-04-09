/**
 * FUNCTION REDUCERS
 */

// These functions are initial values for Array.reduce
// They're handy for when said array only has a length of 1 or 2
// Identity here means not changing anything
const fnIdentity = (x) => x;
const promiseFnIdentity = (x) => Promise.resolve(x);

// Reducing functions, does not handle promise rejections
const pipe2PromiseFns = (promiseFn1, promiseFn2) => (value) => promiseFn1(value).then(promiseFn2);

const pipe2Fns = (fn1, fn2) => (value) => fn2(fn1(value));

// Sugar for reducing functions into one function
// They're called pipe because they work exactly like the Unix pipe "|"
export const pipe = (...fns) => fns.reduce(pipe2Fns, fnIdentity);
export const pipePromise = (...promiseFns) => promiseFns.reduce(pipe2PromiseFns, promiseFnIdentity);

/**
 * OTHER HELPERS
 */

export const filter = (predicate) => (array) => array.filter(predicate);

export const last = (array) => array[array.length - 1];

export const mapPromise = (promiseFn) => (array) => Promise.all(array.map(promiseFn));

export const prop = (key) => (keyable) => keyable[key];

export const propEq = (value) => (key) => (keyable) => keyable[key] === value;

export const replace = (regex, replacement) => (string) => string.replace(regex, replacement);

// (["a", "b"], ["y", "z"]) => ({a: "y", b: "z"})
export const zipToObject = (arrayOfKeys, arrayOfValues) =>
    arrayOfKeys.reduce((object, key, index) => {
        object[key] = arrayOfValues[index];
        return object;
    }, {});
