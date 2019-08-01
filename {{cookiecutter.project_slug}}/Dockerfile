
# The version of Alpine to use for the final image
ARG ALPINE_VERSION=3.9

FROM elixir:1.9.0-alpine AS builder

# The following are build arguments used to change variable parts of the image.
# The name of your application/release (required)
ARG APP_NAME
# The version of the application we are building (required)
ARG APP_VSN
# The environment to build with
ARG MIX_ENV=prod
# Set this to true if this release is not a Phoenix app
ARG SKIP_PHOENIX=false
# If you are using an umbrella project, you can change this
# argument to the directory the Phoenix app is in so that the assets
# can be built
ARG PHOENIX_SUBDIR=apps/{{cookiecutter.phoenix_app_slug}}_web

ENV SKIP_PHOENIX=${SKIP_PHOENIX} \
    APP_NAME=${APP_NAME} \
    APP_VSN=${APP_VSN} \
    MIX_ENV=${MIX_ENV}

# By convention, /opt is typically used for applications
RUN mkdir -p /opt/app
WORKDIR /opt/app

# This step installs all the build tools we'll need
RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache \
    nodejs \
    yarn \
    git \
    build-base && \
    mix local.rebar --force && \
    mix local.hex --force

# install mix dependencies
COPY mix.exs mix.lock ./
COPY config config
COPY apps apps

RUN mix deps.get --only production

# This step builds assets for the Phoenix app (if there is one)
# If you aren't building a Phoenix app, pass `--build-arg SKIP_PHOENIX=true`
# This is mostly here for demonstration purposes
RUN if [ ! "$SKIP_PHOENIX" = "true" ]; then \
    mix deps.clean --all && \
    mix deps.get --only prod && \
    cd ${PHOENIX_SUBDIR}/assets && \
    yarn install && \
    yarn deploy && \
    cd .. && \
    mix phx.digest.clean; \
    fi

COPY rel rel
RUN MIX_ENV=${MIX_ENV} mix release

# From this line onwards, we're in a new image, which will be the image used in production
FROM alpine:${ALPINE_VERSION}

# The name of your application/release (required)
ARG APP_NAME
# The environment to build with
ARG MIX_ENV=prod

# The time zone (needed by Timex)
ARG TZ=Asia/Manila

EXPOSE 4000

RUN apk update && \
    apk add --no-cache \
    bash \
    openssl-dev

ENV TZ=${TZ} \
    APP_NAME=${APP_NAME} \
    HOSTNAME=localhost \
    PORT=4000 \
    HOME=/app

WORKDIR /opt/app

COPY --from=builder /opt/app/_build/${MIX_ENV}/rel/${APP_NAME} .
RUN chown -R nobody: /opt/app
USER nobody

ENV HOME=/opt/app

CMD trap 'exit' INT; /opt/app/bin/${APP_NAME} start
