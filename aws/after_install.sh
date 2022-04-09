#!/bin/bash
cd /home/elbarae/messenger-backend
GITHUB_TOKEN=$(aws ssm get-parameters --names 'MESSENGER_BACKEND_GITHUB_TOKEN' --with-decryption --query 'Parameters[0].Value' --profile elbarae)
eval echo $GITHUB_TOKEN | docker login ghcr.io -u elbarae1921 --password-stdin
docker-compose --file docker-compose.prod.yml pull
docker-compose --file docker-compose.prod.yml up -d
