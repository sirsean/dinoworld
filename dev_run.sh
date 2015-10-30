./build.sh
docker build -t dinoworld .
docker stop dinoworld
docker rm dinoworld
docker rmi $(docker images -q -f dangling=true)
docker run -p 1234:80 --link postgres:postgres --volumes-from files -e dinoworld --name dinoworld dinoworld
