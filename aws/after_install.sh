#!/bin/bash
cd /home/elbarae/messenger-backend
GITHUB_TOKEN=$(aws ssm get-parameters --names 'MESSENGER_BACKEND_GITHUB_TOKEN' --with-decryption --query 'Parameters[0].Value')
echo $GITHUB_TOKEN | docker login ghcr.io -u elbarae1921 --password-stdin
docker-compose up -d --build
