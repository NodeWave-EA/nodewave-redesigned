# install dependencies for the entire monorepo

```bash
bun install
```

# create nodewave-net - 172.17.0.1

```bash
docker network create nodewave-net
```

# install dependencies for cms

```bash
cd apps/cms && bun add <package-name>
```

# minio client

```bash
docker exec -it nodewave-minio-client /bin/sh
#
sh-5.1# /usr/bin/mc alias set local http://nodewave-minio:19000 minioadmin minioadmin123
```
