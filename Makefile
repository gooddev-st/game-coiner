PHONY: logs

#!make
include .env

logs:
	docker-compose logs --tail=50 -f -t $(COMPOSE_PROJECT_NAME)-server

bash:
	docker-compose exec $(COMPOSE_PROJECT_NAME)-server sh
