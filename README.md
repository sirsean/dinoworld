# Dino World

This is a game that runs as a web app, where you fight dinosaurs against other dinosaurs.

You buy dinosaurs, and feed them to level them up to make them more powerful, and enter battle against an AI opponent who has similarly powerful dinosaurs.

Each dinosaur generates currency over time, which you can use to level them up or to buy new dinosaurs.

## Development

You need `react-tools` and `browserify` to compile the Javascript:

```
npm install -g react-tools browserify
```

You run it with Docker.

```
./build.sh
docker build -t dinoworld .
docker stop dinoworld
docker rm dinoworld
docker rmi $(docker images -q -f dangling=true)
docker run -p 1234:80 --name dinoworld -d dinoworld
docker logs -f --tail=20 dinoworld
```
