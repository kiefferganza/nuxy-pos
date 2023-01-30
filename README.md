## Dependencies
- Eslint
- Nuxt Axios
- Flowbite
- Tailwind CSS
- Prettier
- Sass Loader
- Node Sass
- Fibers

## Build Setup

```bash
# install dependencies
$ yarn

# copy environment variable examples
$ cp .env.example .env

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## How to create traxion-network in docker
$ Execute command in terminal
    - docker network create --driver=bridge --subnet=172.28.5.0/16 --ip-range=172.28.5.0/24 --gateway=172.28.5.254 traxion-network