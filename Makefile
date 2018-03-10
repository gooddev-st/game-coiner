PHONY: logs

#!make
include .env

logs:
	docker-compose logs --tail=50 -f -t

bash:
	docker-compose exec $(COMPOSE_PROJECT_NAME) sh
