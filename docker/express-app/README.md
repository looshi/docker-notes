```sh
# Change directory into where this project is located on your computer
cd [project location]/docker-notes/express-app
# Builds a container with the tag "my-nginx app" and looks for the Dockerfile in the current location "."
docker build --tag my-express-app .

# Start the container exposing port 3000 to where express is listening which is also port 3000
docker run -p 3000:3000 my-express-app

# Navigate to the app you should see the rendered html page with image
firefox http://localhost:3000
```
