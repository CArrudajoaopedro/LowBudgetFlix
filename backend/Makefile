-include .env
export

migrations: bin/migrate
	./bin/migrate

bin/migrate: migrate.cpp
	g++ migrate.cpp -o bin/migrate -lpqxx -lpq