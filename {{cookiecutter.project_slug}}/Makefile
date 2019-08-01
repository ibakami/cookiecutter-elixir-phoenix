.PHONY: help

APP_NAME ?= `grep 'app:' apps/{{cookiecutter.phoenix_app_slug}}/mix.exs | sed -e 's/\[//g' -e 's/ //g' -e 's/app://' -e 's/[:,]//g'`
APP_VSN ?= `grep 'version:' mix.exs | cut -d '"' -f2`
BUILD ?= `git rev-parse --short HEAD`
ALPINE_VERSION ?= '3.9'
TZ ?= 'Asia/Manila'
IMAGE_REPO ?= 'registry.gitlab.com/ibakami/medilink'
IMAGE_NAME = $(IMAGE_REPO)/$(APP_NAME)

help:
	@echo "$(APP_NAME):$(BUILD)"
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build the Docker image
	docker build \
	--build-arg TZ=${TZ} \
	--build-arg ALPINE_VERSION=${ALPINE_VERSION} \
	--build-arg APP_NAME=$(APP_NAME) \
	--build-arg APP_VSN=$(APP_VSN) \
	-t $(IMAGE_NAME):$(BUILD) \
	-t $(IMAGE_NAME):latest .

run: ## Run the app in Docker
	docker run --env-file config/docker.env \
	--expose 4000 -p 4000:4000 \
	--rm -it $(IMAGE_NAME):latest
