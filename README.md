The `json` files in `config/configs` and `config/secrets` are used to generate several ouputs:

- Kubernetes config map
- Kubernetes secret

## Setup

```
yarn install
```

## Commands

- `yarn k8s:prod` to generate kubernetes production configurations
- `yarn k8s:staging` to generate kubernetes staging configurations
- `yarn client:dev` to generate client `dev` environment
- `yarn client:prod` to generate client `prod` environment
