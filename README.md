# Benford_test
Kick and dirty way of plotting Benford's distribution of cripto assests values from binance market

# Installing
```
npm install
```

# Add api keys of binance in .env
```
API_KEY=[api key from binance]
API_SECRET=[api secret from binance]
```

# Run
## Command

```
node benford_binance.js PAIR REFRESH
```

## Example
```
node benford_binance.js BTCUSD 100
```

Will plot BTCUSD pair Benford distribution each 100 operations from the order book
