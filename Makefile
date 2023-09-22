# CLI cmds:

cli-install:
	@echo "Installing the cli tool, available with tmanager command"
	npm install -g .

cli-uninstall:
	@echo "Uninstalling the cli tool, maybe run hash -d tmanager after that to remove the tmanager reference immediately"
	npm uninstall -g clinicorp-test-dev

# API cmds:

up:
	@echo "Running the API..."
	docker-compose up

build_up:
	@echo "Building and running the API"
	docker-compose up --build

down:
	@echo "Shutdown API"
	docker-compose down

# CLI and API

init: cli-install build_up
purge: down cli-uninstall
	



	