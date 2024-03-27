export default {
  async fetch(request) {
    const pathname = new URL(request.url).pathname;
    const entrypoint =
      pathname === '/medium' ? 'medium'
      : pathname === '/large' ? 'large'
      : pathname === '/titanic' ? 'titanic'
      // default to small for all other routes
      : 'small';

    let text = '';
    const t0 = Date.now();
    try {
      text = (await import(`./lazy/${entrypoint}.js`)).text;
    } catch (e) {
      text = `ERROR: ${e instanceof Error ? e.message : e}`
    }
    const t1 = Date.now();
    const duration = t1 - t0;

    return new Response(
      `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dynamic Imports Cold Start</title>
            <style>h1 { font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif; }</style>
        </head>
        <body>
            <h1>imported ${text} in ${duration}ms</h1>
        </html>
        `,
      {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      }
    );
  },
};
