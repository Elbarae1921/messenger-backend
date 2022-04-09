#!/bin/bash
cd /home/elbarae/messenger-backend
docker image prune -f
docker exec -it messenger-graphql yarn migration:up:prod
