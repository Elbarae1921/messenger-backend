#!/bin/bash
cd /home/elbarae/messenger-backend
docker-compose down
docker-compose up -d
docker image prune -f