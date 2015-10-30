package main

import (
	"github.com/sirsean/dinoworld/server"
	"log"
)

func main() {
	log.Println("starting dinoworld")

	server.Serve()
}
