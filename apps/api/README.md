## Environment variables

`.env` file

```env
# App
APP_PORT=3333
APP_GLOBAL_PREFIX=api

# Database
DATABASE_ENGINE=postgres
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_DB_NAME=dolarvzla_wallet
DATABASE_LOGGING=true

# Swagger
SWAGGER_ENABLE=true
SWAGGER_TITLE=DolarVzla Wallet
SWAGGER_DESCRIPTION=Dolarvzla wallet app implementation
SWAGGER_PATH=docs

# Currency
CURRENCY_PRICE_COINBASE_BITCOIN=https://api.coinbase.com/v2/prices/spot?currency=USD
CURRENCY_PRICE_COINBASE_ETHEREUM=https://api.coinbase.com/v2/prices/ETH-USD/spot
```
