# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.10-slim

EXPOSE ${PORT}

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.2.1

WORKDIR /app
# use MASHINE var to distinguish x86 platform from raspberry pi witch cant run poetry
ARG MASHINE
# Install dependencies
RUN if [ "${MASHINE}" != "pi" ] ; then pip install "poetry==$POETRY_VERSION" ; fi
# Copy only dependencies file to cache them in docker layer
COPY poetry.lock pyproject.toml /app/
COPY requirements.txt /app/

RUN if [ "${MASHINE}" != "pi" ] ; then poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --no-dev; else pip install -r /app/requirements.txt; fi

# Creating folders, and files for a project:
COPY . /app

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser \
    && chown -R appuser /app
USER appuser

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["python", "/app/src/main.py"]