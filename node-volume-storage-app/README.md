```sh
# General Concept:
# ... you can’t mount a host directory from within the Dockerfile
# You must specify the mountpoint when you create or run the container.
# https://docs.docker.com/engine/reference/builder/#notes-about-specifying-volumes

# What does this do ?
# This app will mount a host directory as a data volume
# The files in my-docker-volume are readable/writeable by the container.
# Running this container should update my-docker-volume/data.json "updated" to current time.

# Build
cd ./node-volume-storage-app
docker build --tag node-volume-storage-app .

# Run, this will just run index.js and then exit.
sudo docker run --rm --env DATA_PATH=/my-docker-volume -v "$(pwd)"/my-docker-volume:/my-docker-volume/ node-volume-storage-app:latest
```
