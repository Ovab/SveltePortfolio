## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server for Svelte:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

And then start it for expressJS if you want the mailer to work:

Enter your email credentials in the .env file (see example .env), if you're using gmail it's advised to use an [app password](https://support.google.com/accounts/answer/185833?hl=en) instead of your normal password.

```bash
node app.cjs
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.