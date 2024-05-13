# Spotify_save_DW

Website: https://savespotifydw.duckdns.org/

## How it works

- Spotify generate Discover Weekly playlist like [this](https://open.spotify.com/playlist/37i9dQZEVXcWlsrx2rT0bU?si=2f332d0c91bb4362) with unique tracks for each user.
- But once playlist is regenerated all old track that you like in DW playlist will disappear
- You can save them manually if you don't forget
- OR use this service

## How to use

1. Press Save DW button to login with you Spotify account
2. Now site listening you playback
3. If current playlist is not a DW playlist this panel will be yellow
   ![enter image description here](https://user-images.githubusercontent.com/54314123/178078452-f82753d4-a958-430f-93cf-7eb075ae661e.png)
   But don't worry it just an indicator ![enter image description here](https://user-images.githubusercontent.com/54314123/178078679-22ff5738-bbda-4adc-9eaf-587bd9b978d7.png)
4. Now if you don't have Spotify Premium (that means site can't control user playback) you can quickly play all songs in playlist to add them to new playlist ![enter image description here](https://user-images.githubusercontent.com/54314123/178078970-9bd523e4-bfed-4b35-a50a-e041c0c675b1.png)
5. When playlist start repeating itself a little dot will appear to indicate that you didn't lost any tracks
   ![enter image description here](https://user-images.githubusercontent.com/54314123/178079135-72a64c12-d283-462c-b8e1-a1b3d778af8c.png)
6. That's it! Just press Save button and playlist will be automatically created
   ![enter image description here](https://user-images.githubusercontent.com/54314123/178079251-484d8a93-b0d6-4c8d-94f7-c1da0f2f57a6.png)


# For developers

## How to setup dev environment

### Backend

Need python 3.10+, poetry 1.5+, caddy

   git clone ...
   poetry shell
   poetry install
   cp .env.example .env

- setup .env values
- copy/create test db
- start python and caddy server\

   python src/main.py
   sudo caddy run --config .\caddy\dev\Caddyfile

Export depenencies

   poetry export -f requirements.txt --output requirements.txt --without-hashes --without-urls

### Frontend

Need node, npm, caddy to be installed

   cd src/fronend
   npm i
   # create env file w/ url to dev backend
   echo "VITE_API_URL=https://test-dwman.duckdns.org" > .env
   npm run dev
   # run caddy in different treminal
   # use sudo cuz caddy need accsess to port 443
   sudo caddy run --config .\caddy\dev\Caddyfile.frontend
   # or just run it w/o caddyfile
   caddy reverse-proxy --from test-dwman.localhost --to localhost:3000
   # optionally u need to run `caddy trust` in another trminal w/o closing this one

go to test-dwman.localhost

### Update npm deps

   npx npm-check-updates -u
   npm i

## Deploy

   ansible-playbook ./deploy/deploy-test/deploy-test.yml

## Generate ts client

   npx openapi-typescript-codegen --input http://localhost:8000/openapi.json --output ./src/frontend/src/api/client --client fetch && pre-commit run --all-files

## License

Spotify_save_DW is free and open-source software licensed under the [Apache 2.0 License](https://github.com/create-go-app/cli/blob/master/LICENSE).
