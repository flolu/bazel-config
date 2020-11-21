The `json` files in `config/configs` and `config/secrets` are used to generate several ouputs:

- Kubernetes config map
- Kubernetes secret

## Setup

```
yarn install
```

## Commands

- `yarn bazelisk run //:k8s` to generate kubernetes production configurations
- `yarn bazelisk run //:microk8s` to generate kubernetes staging configurations
