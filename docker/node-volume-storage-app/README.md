```sh
# General Concept:
# ... you can’t mount a host directory from within the Dockerfile
# You must specify the mountpoint when you create or run the container.
# https://docs.docker.com/engine/reference/builder/#notes-about-specifying-volumes

# Similar to symlinks.  maybe it just is a symlink ? nobody knows for certain...

# What does this do ?
# mounts the host's my-docker-volume in the run command below
# the container then has read/write access to that host folder.
# Upon running this container, the-docker-volume/data.json "updated" will be changed.

# Build
cd ./node-volume-storage-app
docker build --tag node-volume-storage-app .

# Run, this will just run index.js and then exit.
docker run --rm --env DATA_PATH=/my-docker-volume -v "$(pwd)"/my-docker-volume:/my-docker-volume/ node-volume-storage-app:latest

# Run then just exit
--rm

# This passes the arbitrary host volume path to the node index.js via env var.
# right now this is actually relative but could be changed to absolute
--env DATA_PATH=/my-docker-volume

# create the volume from "print workind dir"/host folder -> to name of folder within container
-v "$(pwd)"/my-docker-volume:/my-docker-volume/
```
