/*

Intro:

    For some unknown reason most of our developers left
    the company. We need to actively hire now.
    In the media we've read that companies that invent
    and publish new technologies attract more potential
    candidates. We need to use this opportunity and
    invent and publish some npm packages. Following the
    new trend of functional programming in JS we
    decided to develop a functional utility library.
    This will put us on the bleading edge since we are
    pretty much sure no one else did anything similar.
    We also provided some jsdoc along with the
    functions, but it might sometimes be inaccurate.

Exercise:

    Provide proper typing for the specified functions.

Bonus:

    Could you please also refactor the code to reduce
    code duplication?
    You might need some excessive type casting to make
    it really short.

*/

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being mapped using
 * the specified mapper.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being mapped using original mapper.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} mapper
 * @param {Array} input
 * @return {Array | Function}
 */
export function map<T, U>(mapper?: (arg: T) => U, input?: T[]): any {
  if (arguments.length === 0) return map;

  if (arguments.length === 1) (
    (subInput?: T[]) => (arguments.length === 0) ?
      arguments.callee :
      subInput!.map(mapper!)
  )

  return input!.map(mapper!);
}

/**
* 2 arguments passed: returns a new array
* which is a result of input being filtered using
* the specified filter function.
*
* 1 argument passed: returns a function which accepts
* an input and returns a new array which is a result
* of input being filtered using original filter
* function.
*
* 0 arguments passed: returns itself.
*
* @param {Function} filterer
* @param {Array} input
* @return {Array | Function}
*/
export function filter<T, U>(filterer?: (arg: T) => U, input?: T[]): any {
  if (arguments.length === 0) return filter;

  if (arguments.length === 1) {
    return (subInput?: T[]) => (
      (arguments.length === 0) ?
        arguments.callee :
        subInput!.filter(filterer!)
    )
  }
  return input!.filter(filterer!);
}

/**
* 3 arguments passed: reduces input array it using the
* specified reducer and initial value and returns
* the result.
*
* 2 arguments passed: returns a function which accepts
* input array and reduces it using previously specified
* reducer and initial value and returns the result.
*
* 1 argument passed: returns a function which:
*   * when 2 arguments is passed to the subfunction, it
*     reduces the input array using specified initial
*     value and previously specified reducer and returns
*     the result.
*   * when 1 argument is passed to the subfunction, it
*     returns a function which expects the input array
*     and reduces the specified input array using
*     previously specified reducer and inital value.
*   * when 0 argument is passed to the subfunction, it
*     returns itself.
*
* 0 arguments passed: returns itself.
*
* @param {Function} reducer
* @param {*} initialValue
* @param {Array} input
* @return {* | Function}
*/
export function reduce<T, U>(reducer?: (acc: U, val: T) => U, initialValue?: U, input?: T[]) {

  if (arguments.length === 0) return reduce;

  if (arguments.length === 1) {
    return (subInitialValue?: U, subInput?: T[]) => {
      if (arguments.length === 0) return arguments.callee;


      if (arguments.length === 1) {
        return (subSubInput?: T[]) => {
          if (arguments.length === 0) return arguments.callee;

          return subSubInput!.reduce(reducer!, subInitialValue!);
        };
      }
      return subInput!.reduce(reducer!, subInitialValue!);
    }
  }

  if (arguments.length === 2) {
    return (subInput?: T[]) => (
      (arguments.length === 0) ?
        arguments.callee :
        subInput!.reduce(reducer!, initialValue!)
    )

  }
  return input!.reduce(reducer!, initialValue!);
}

/**
* 2 arguments passed: returns sum of a and b.
*
* 1 argument passed: returns a function which expects
* b and returns sum of a and b.
*
* 0 arguments passed: returns itself.
*
* @param {Number} a
* @param {Number} b
* @return {Number | Function}
*/
export function add(a: number, b: number): any {
  if (arguments.length === 0) return add;

  if (arguments.length === 1) {
    return (subB: number) => {
      if (arguments.length === 0) return arguments.callee;

      return a + subB;
    };
  }
  return a + b;
}

/**
* 2 arguments passed: subtracts b from a and
* returns the result.
*
* 1 argument passed: returns a function which expects
* b and subtracts b from a and returns the result.
*
* 0 arguments passed: returns itself.
*
* @param {Number} a
* @param {Number} b
* @return {Number | Function}
*/
export function subtract(a: number, b: number): any {
  if (arguments.length === 0) return subtract;

  if (arguments.length === 1) {
    return (subB: number) => {
      if (arguments.length === 0) return arguments.callee;
      return a - subB;
    };
  }
  return a - b;
}

/**
* 2 arguments passed: returns value of property
* propName of the specified object.
*
* 1 argument passed: returns a function which expects
* propName and returns value of property propName
* of the specified object.
*
* 0 arguments passed: returns itself.
*
* @param {Object} obj
* @param {String} propName
* @return {* | Function}
*/
export function prop<O, K extends keyof O>(obj?: O, propName?: K) {
  if (arguments.length === 0) return prop;

  if (arguments.length === 1) {
    return (subPropName?: K) => (
      (arguments.length === 0) ?
        arguments.callee :
        obj![subPropName!]
    )
  }
  return obj![propName!];
}

/**
* >0 arguments passed: expects each argument to be
* a function. Returns a function which accepts the
* same arguments as the first function. Passes these
* arguments to the first function, the result of
* the first function passes to the second function,
* the result of the second function to the third
* function... and so on. Returns the result of the
* last function execution.
*
* 0 arguments passed: returns itself.
*
* TODO TypeScript
*   * Should properly handle at least 5 arguments.
*   * Should also make sure argument of the next
*     function matches the return type of the previous
*     function.
*
* @param {Function[]} functions
* @return {*}
*/
export function pipe<A, B>(fun1: (a: A) => B): (a: A) => B;
export function pipe<A, B, C>(fun1: (a: A) => B, fun2: (b: B) => C): (a: A) => C;
export function pipe<A, B, C, D>(fun1: (a: A) => B, fun2: (b: B) => C, fun3: (c: C) => D): (a: A) => D;
export function pipe<A, B, C, D, E>(fun1: (a: A) => B, fun2: (b: B) => C, fun3: (c: C) => D, fun: (d: D) => E): (a: A) => E;
export function pipe<A, B, C, D, E, F>(fun1: (a: A) => B, fun2: (b: B) => C, fun3: (c: C) => D, fun4: (d: D) => E, fun5: (e: E) => F): (a: A) => F;
export function pipe(...functions: Function[]): any {
  if (arguments.length === 0) return pipe;

  return (input: any) => functions.reduce((acc, fn) => fn(acc), input);
}
