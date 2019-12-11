# Red Tetris

## Network

Set host in `params.js` to be accessible across network

## Dev

`$ npm run client-dev` and `$ npm run srv-dev`

or

`docker-compose up`

In case of conflicts with dependencies in docker:

`$ docker system prune`

`$ docker-compose up --build`

## Test

### Socket

Open two terminals:

`$ npm run srv-dev`

`$ npm test`
