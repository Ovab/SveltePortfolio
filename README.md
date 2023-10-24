#ABOUT

For school project I made a portfolio website, I used Svelte, Tailwind, threeJS, SQL, Express and Docker



## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server for Svelte:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### .env variables

Enter your gmail credentials in the .env file (see example .env), use gmail and make an [app password](https://support.google.com/accounts/answer/185833?hl=en) instead of your normal password.

```bash
node app.cjs
```

## Production

Pull the repo on your server and install dependencies with `npm install` (or `pnpm install` or `yarn`).
add the .env file to the root of the project.

### Docker (recommended)

After installing docker and docker-compose simply run the following command in the root of the project:

```bash
sudo docker-compose up -d
```

Now you can access the app on port 80 of your server, api should be on port 8000.


### Regular server
To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

To use this app on a regular non Docker server I'd reccomend using [pm2](https://pm2.keymetrics.io/) to run the app and its api.
I did not make a pm2 config file for this app so you'll have to make one yourself.


### Updating

Simply git pull, kill all running containers with docker kill 
```bash
$(docker ps -q)
```
delete all images 
```bash
docker system prune -a
``` 
and run
 ```bash
sudo docker-compose up -d
  ``` 
again.
