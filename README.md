# Async Race game app

[Deploy](https://anvianvi.github.io/async-race-angular/).

## Server Configuration

By default, the app is configured to communicate with a remote server located at `https://flint-brazen-catshark.glitch.me/`.

If you prefer to use a local server, you can comment out the line `const base = 'https://flint-brazen-catshark.glitch.me/';` in the `api.ts` file and uncomment `const base = 'http://127.0.0.1:3000/'`.
https://github.com/mikhama/async-race-api - repo with server.

Please note that the initial server response time may be around 20 seconds.
