# MailTag - Puppeteer Automation

> Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). Puppeteer runs [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) by default, but can be configured to run full (non-headless) Chrome or Chromium.


## Getting Started

### Installation

To use Puppeteer in your project, run:

```bash
npm install
# or "yarn install"
```


### Execution

To execute test cases, run:

```bash
node index
```

### Reporting

Report automatically get generated, path will be printed on the console after execution of the tests.

<!-- [START runtimesettings] -->

## Default runtime settings

**1. Uses Headless mode**

Puppeteer launches Chromium in [headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome). To launch a full version of Chromium, set the [`headless` option](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions.headless) when launching a browser:

```ts
const browser = await puppeteer.launch({headless: false}); // default is true
```

**2. Runs a bundled version of Chromium**

By default, Puppeteer downloads and uses a specific version of Chromium so its API
is guaranteed to work out of the box. To use Puppeteer with a different version of Chrome or Chromium,
pass in the executable's path when creating a `Browser` instance:

```ts
const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
```

You can also use Puppeteer with Firefox Nightly (experimental support). See [`Puppeteer.launch`](https://pptr.dev/api/puppeteer.puppeteernode.launch) for more information.

See [`this article`](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for a description of the differences between Chromium and Chrome. [`This article`](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/chromium_browser_vs_google_chrome.md) describes some differences for Linux users.

**3. Creates a fresh user profile**

Puppeteer creates its own browser user profile which it **cleans up on every run**.

<!-- [END runtimesettings] -->

## Resources

- [API Documentation](https://pptr.dev/api)
- [Examples](https://github.com/puppeteer/puppeteer/tree/main/examples)
- [Community list of Puppeteer resources](https://github.com/transitive-bullshit/awesome-puppeteer)

<!-- [START debugging] -->

## Debugging tips

1.  Turn off headless mode - sometimes it's useful to see what the browser is
    displaying. Instead of launching in headless mode, launch a full version of
    the browser using `headless: false`:

    ```ts
    const browser = await puppeteer.launch({headless: false});
    ```

2.  Slow it down - the `slowMo` option slows down Puppeteer operations by the
    specified amount of milliseconds. It's another way to help see what's going on.

    ```ts
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
    });
    ```

3.  Capture console output - You can listen for the `console` event.
    This is also handy when debugging code in `page.evaluate()`:

    ```ts
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.evaluate(() => console.log(`url is ${location.href}`));
    ```

4.  Use debugger in node.js

    This will let you debug test code. For example, you can step over `await page.click()` in the node.js script and see the click happen in the application code browser.

    Note that you won't be able to run `await page.click()` in
    DevTools console due to this [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=833928). So if
    you want to try something out, you have to add it to your test file.

    - Add `debugger;` to your test, eg:

      ```ts
      debugger;
      await page.click('a[target=_blank]');
      ```

    - Set `headless` to `false`
    - Run `node --inspect-brk`, eg `node --inspect-brk node_modules/.bin/jest tests`
    - In Chrome open `chrome://inspect/#devices` and click `inspect`
    - In the newly opened test browser, type `F8` to resume test execution
    - Now your `debugger` will be hit and you can debug in the test browser

5.  Enable verbose logging - internal DevTools protocol traffic
    will be logged via the [`debug`](https://github.com/visionmedia/debug) module under the `puppeteer` namespace.

         # Basic verbose logging
         env DEBUG="puppeteer:*" node script.js

         # Protocol traffic can be rather noisy. This example filters out all Network domain messages
         env DEBUG="puppeteer:*" env DEBUG_COLORS=true node script.js 2>&1 | grep -v '"Network'

6.  Debug your Puppeteer (node) code easily, using [ndb](https://github.com/GoogleChromeLabs/ndb)

- `npm install -g ndb` (or even better, use [npx](https://github.com/zkat/npx)!)

- add a `debugger` to your Puppeteer (node) code

- add `ndb` (or `npx ndb`) before your test command.

- debug your test inside chromium like a boss!

<!-- [END debugging] -->