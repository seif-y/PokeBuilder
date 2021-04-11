/**
 * In Mathematics an identity function always returns
 * the same output as its input.
 * These identity functions will be used as the initial values for Array.reduce later on
 */
const fnIdentity = (x) => x;
const promiseFnIdentity = (x) => Promise.resolve(x);

/**
 * Sugar for combining functions into one function
 * pipe2PromiseFns is the async version
 * The name pipe is used because these functions work like the Unix pipe "|"
 */
const pipe2Fns = (fn1, fn2) => (value) => fn2(fn1(value));
const pipe2PromiseFns = (promiseFn1, promiseFn2) => (value) => promiseFn1(value).then(promiseFn2);

/**
 * pipe2Fns and pipe2PromiseFns take 2 functions and return a single function
 * This means that they can be used to reduce a list of functions into one function
 */
export const pipe = (...fns) => fns.reduce(pipe2Fns, fnIdentity);
export const pipePromise = (...promiseFns) => promiseFns.reduce(pipe2PromiseFns, promiseFnIdentity);

/**
 * Most of the below functions are:
 * - curried, i.e. they keep returning a function until all parameters have been given
 * - structured so that the important parameters come first
 *
 * This means we can easily feed them into pipes and pipePromises
 */
export const filter = (predicate) => (array) => array.filter(predicate);

export const last = (array) => array[array.length - 1];

export const mapPromise = (promiseFn) => (array) => Promise.all(array.map(promiseFn));

export const replace = (regex, replacement) => (string) => string.replace(regex, replacement);

/**
 * - The keys of an array are its indices as well as its length
 * - The keys of an object are explicitly named
 */

/**
 * prop(0)(["first", "second", "third"]) => "first"
 * prop("first")({first: 1, second: 2, third: 3}) => 1
 */
export const prop = (key) => (arrayOrObject) => arrayOrObject[key];

/**
 * The big brother of prop
 * we pass in an extra parameter value so we can make a comparison
 */
export const propEq = (value) => (key) => (arrayOrObject) => arrayOrObject[key] === value;

/**
 * (["a", "b"], ["y", "z"]) => ({a: "y", b: "z"})
 */
export const zipToObject = (arrayOfKeys, arrayOfValues) =>
    arrayOfKeys.reduce((object, key, index) => {
        object[key] = arrayOfValues[index];
        return object;
    }, {});
