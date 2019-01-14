namespace node {

  export function bootNode() {
    try {
      const promise = main();
      if (promise && typeof promise.then === 'function')
        promise.then(
          () => {
            // success: OK
          },
          error => {
            console.error(error);
          });
    }
    catch (error) {
      console.error(error);
    }
  }

}