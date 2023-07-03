# node-crud-api

## Routes

```bash
default_port 4000
load_balancer_port 8000

```

```bash
GET      api/users
GET      api/users/{userId}
POST     api/users
PUT      api/users/{userId}
DELETE   api/users/{userId}

```

## Installation

```bash
# Install dependencies
npm install

# Run in development
npm run start:dev

# Run in production
npm run start:prod

# Run with Load balancer
npm run start:multi
```
