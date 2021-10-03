#!/bin/bash
cd /home/elbarae/skeduler_backend
docker-compose down
docker-compose up -d
docker image prune -f