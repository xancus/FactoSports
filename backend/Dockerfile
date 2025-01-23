FROM python:3.13.1-alpine

WORKDIR /usr/src/app

RUN apk update \
    && apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    postgresql-dev \
    dos2unix \
    && rm -rf /var/cache/apk/*

RUN pip install --upgrade pip

COPY . .

RUN pip install --no-cache-dir -r requirements_freeze.txt

RUN dos2unix /usr/src/app/entrypoint.sh

RUN chmod +x /usr/src/app/entrypoint.sh

EXPOSE 5000

CMD ["sh", "/usr/src/app/entrypoint.sh"]