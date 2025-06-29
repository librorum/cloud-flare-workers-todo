# cloudflarefrontend (com.companyname.myapp)

Frontend for cloudflare workers

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).


* 개발시에 프론트엔드와 백엔드를 동시에 실행하려면
```sh
pnpm add -D concurrently
```

* package.json에서 아래와 같이 수정
```json
		"dev": "concurrently \"pnpm dev:backend\" \"pnpm dev:frontend\"",
		"dev:backend": "wrangler dev",
		"dev:frontend": "pnpm --filter frontend dev",
```

* 각자 실행시 프론트엔드에서 서버 api 포트를 접속하려면
```js
    devServer: {
      // https: true,
      open: true, // opens browser window automatically
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:8787',
          changeOrigin: true,
          secure: false,
        }
      }
    },
```