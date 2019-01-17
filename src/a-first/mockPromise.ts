

namespace a_first {

  export function mockPromise() {
    const global = getGlobal();
    global.Promise = promiseScope.Promise;
  }

  function getGlobal(this: any) {
    if (typeof this !== 'undefined' && this)
      return this;
    else if (typeof global !== 'undefined' && global)
      return global;
    else if (typeof window !== 'undefined' && window)
      return window;
    else
      return (new Function('return this')());
  }

  namespace promiseScope {

    export function Promise(callback: (resolve: any, reject: any) => void) {
      let done = false;
      let success = false;
      let promiseResult: any = null;
      let promiseError: any = null;

      let thens: { onsuccess: any, onerror: any }[] | undefined;

      const callThens = () => {
        if (thens) {
          for (const th of thens) {
            try {
              // TODO: fire th.onsuccess or th.onerror
            }
            catch (error) {
              // TODO: check with original promise
            }
          }
      };

      const resolve = (value: any) => {
        if (done)
          return;

        done = true;
        success = true;
        promiseResult = value;
      };

      const reject = (error: any) => {

      };

      try {
        callback(resolve, reject);
      }
      catch (error) {
        reject(error);
      }
    }
  }

}