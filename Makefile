.PHONY: dev

dev:
	cd app && yarn
	cd app && yarn dev &
	cd worker && yarn && yarn build && yarn start &
	
	@while true; do sleep 1; done

build:
	cd app && yarn build