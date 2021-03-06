namespace node {

  export async function main() {
    let puppeteer: typeof import("puppeteer");
    try {
      console.log('puppeteer...');
      puppeteer = require('puppeteer');
    }
    catch (error) {
      error.message = 'Google Puppeteer is missing: ' + error.message;
      throw error;
    }

    console.log('browser...');
    const browser = await puppeteer.launch({
      headless: false
    });

    try {

      console.log('mainPage...');
      const mainPage = (await browser.pages())[0] || await browser.newPage();

      await withBrowser(browser, mainPage);
    }
    finally {
      console.log('close...');
      await browser.close();
    }
  }

  async function withBrowser(browser: import("puppeteer").Browser, mainPage: import("puppeteer").Page) {

    const navigate = (async () => {
      try {
        console.log('goto...');
        await mainPage.goto('http://maps.google.com/');
      }
      catch (error) {
        return error
      }
    })();

    await prompt('Navigate to the place and press ENTER');

    const [width, height] = await mainPage.evaluate('[window.innerWidth, window.innerHeight]');
    console.log({ width, height });

    console.log('viewport/scale...')
    const zoom = 3;
    await mainPage.emulate({
      viewport: {
        width: width * zoom,
        height: height * zoom,
        deviceScaleFactor: zoom,
        isMobile: true
      }
    });

    console.log('canvas...');
    const canvasSelector: string = await mainPage.evaluate(`(function() {
    var canvasList = document.getElementsByTagName('canvas');
    var maxW = 0, maxH = 0, maxCanvas;
    for (var i = 0; i < canvasList.length; i++) {
      var cv = canvasList[i];
      var rect = cv.getBoundingClientRect();
      if (rect.width * rect.height > maxW*maxH) {
        maxW = rect.width;
        maxH = rect.height;
        maxCanvas = cv;
      }
    }
    var path = [];
    var parent = maxCanvas;
    while (parent && !/^body$/i.test(parent.tagName)) {
      parent.style.zIndex = 1000 - path.length;
      path.unshift(parent.tagName+(parent.id ? '#' + parent.id : ''));
      parent = parent.parentElement;
    }
    return path.join(' ');
  })()`);
    
    console.log('canvas: ', canvasSelector + '...');
    const canvasElem = (await mainPage.$(canvasSelector))!;

    await prompt('Wait for all ready...');


    console.log('screenshot...');
    await canvasElem.screenshot({ path: './canvas.png' });


    await prompt('exit');
  }

  function prompt(message?: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {

      if (message)
        process.stdout.write(message);

      process.stdin.on('data', onData);
      process.stdin.on('error', onError);

      let buf = '';

      function onData(dt: string | Buffer) {
        buf += dt.toString();
        if (/\n/.test(buf)) {
          unsubscribe();
          resolve(buf);
        }
      }

      function onError(error: any) {
        unsubscribe();
        reject(error);
      }

      function unsubscribe() {
        process.stdin.off('data', onData);
        process.stdin.off('error', onError);
      }
    });
  }
}