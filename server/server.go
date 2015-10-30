package server

import (
	"github.com/gorilla/mux"
	"html/template"
	"log"
	"net/http"
)

func Serve() {
	router := mux.NewRouter()

	router.HandleFunc("/", index).Methods("GET")

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("/src/github.com/sirsean/dinoworld/static/")))

	http.Handle("/", router)

	log.Fatal(http.ListenAndServe(":80", nil))
}

var indexTemplate = template.Must(template.ParseFiles("/src/github.com/sirsean/dinoworld/template/index.html"))

func index(w http.ResponseWriter, r *http.Request) {
	indexTemplate.Execute(w, nil)
}
