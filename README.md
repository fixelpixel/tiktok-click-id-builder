# ttclidappender

A small local web form that appends TikTok's `ttclid=__CLICKID__` macro to a landing-page URL. It uses `?` or `&` according to the existing query string.

## Run locally

Use Node.js 22 or later.

```sh
npm ci
npm run check
npm start
```

Open http://localhost:8080. Set `PORT` to change the port. The server binds to the loopback interface. No advertising account is needed.

## Stack and limits

Node.js and Express. This is an early prototype: it uses a URL regex, does not normalize fragments or existing click IDs, and renders supplied text into HTML. Use it locally with trusted inputs. The stylesheet loads from jsDelivr and needs internet access. No automated test suite or sample customer data is included.

Licensed under Apache-2.0. See [LICENSE](LICENSE).
