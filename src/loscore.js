// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      if (!result.includes(array[i])) {
        result.push(array[i]);
      }
    }
    return result;
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    const result = [];
    this.each(collection, (val) => result.push(iteratee(val)));
    return result;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    const result = [];
    this.filter(collection, (val) => !test(val) && result.push(val));
    return result;
  }

  reduce(collection, iterator, accumulator) {
    let array2 = collection;
    if (accumulator === undefined) {
      accumulator = collection[0];
      array2 = collection.slice(1);
    }
    let result = accumulator;
    this.each(array2, (val) => {
      result = iterator(result, val);
    });
    return result;
  }

  every(collection, test) {
    if (test === undefined) {
      test = (val) => val;
    }
    if (collection.length === 0) return true;
    return this.reduce(
      collection,
      (acc, val) => {
        if (test(val)) {
          if (acc) {
            return true;
          }
        }
        return false;
      },
      true
    );
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(target, ...sources) {
    let result = target;
    this.each(sources, (item) => {
      for (let key in item) {
        result[key] = item[key];
      }
    });
    return result;
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    let isCalled = false;
    let result;
    return function() {
      if (isCalled) return result;
      isCalled = true;
      result = func();
      return result;
    };
  }

  memoize(func) {
    let cache = {};
    return function(...val) {
      let key = JSON.stringify([val]);
      if (!cache[key]) {
        cache[key] = func(val);
      }
      return cache[key];
    };
  }

  invoke(collection, functionOrKey) {
    if (typeof functionOrKey === "function") {
      return this.map(collection, (val) => functionOrKey.apply(val));
    }
    return this.map(collection, (val) => val[functionOrKey].apply(val));
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
