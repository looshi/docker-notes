```sh
# Change directory into where this project is located on your computer
cd [project location]/docker-notes/nginx-app
# Builds a container with the tag "my-nginx app" and looks for the Dockerfile in the current location "."
docker build --tag my-nginx-app .

# Start the container exposing port 8080 to nginx port 80
docker run -p 8080:80 my-nginx-app

# Navigate to the app you should see the rendered html page with image
firefox http://localhost:8080/
```
