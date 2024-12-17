FROM node:20-alpine AS frontend
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm
WORKDIR /frontend
COPY ["src/frontend/package.json", "./"]
COPY ["src/frontend/pnpm-lock.yaml", "./"]
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY ["src/frontend", "./"]
RUN pnpm run build

FROM python:3.11-slim AS runner

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.8.4

WORKDIR /app
# NOTE: poetry not work on linux/arm/v7
# Install dependencies
RUN if [ "$TARGETPLATFORM" != "linux/arm/v7" ] ; then pip install "poetry==$POETRY_VERSION" ; fi
# Copy only dependencies file to cache them in docker layer
COPY poetry.lock pyproject.toml /app/
COPY requirements.txt /app/

RUN if [ "$TARGETPLATFORM" != "linux/arm/v7" ] ; then poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --no-dev; else pip install -r /app/requirements.txt; fi

# Creating folders, and files for a project:
COPY ["src/main.py", "./src/main.py"]
COPY ["src/backend", "./src/backend"]
COPY ["src/configs", "./src/configs"]
COPY ["src/frontend/templates", "./src/frontend/templates"]
COPY --from=frontend ["/frontend/dist", "./src/frontend/dist"]

EXPOSE 8000

CMD ["python", "/app/src/main.py"]
