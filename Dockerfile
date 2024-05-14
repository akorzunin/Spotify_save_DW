FROM node:20-alpine as frontend
WORKDIR /frontend
COPY ["src/frontend/package.json", "./"]
RUN npm install
COPY ["src/frontend", "./"]
RUN npm run build

# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.10-slim

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.5.1

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
COPY --from=frontend ["/frontend/dist", "./src/frontend/dist"]

EXPOSE 8000

CMD ["python", "/app/src/main.py"]
