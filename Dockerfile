# Multistage build

# Stage 1:
# Gets node image
FROM node:20.11.1-alpine AS build

# Adds git for version control
RUN apk update
RUN apk add --no-cache git

# Creates application folder on container
WORKDIR /app

# Copies package and package-lock files
COPY package*.json ./

# Installs all npm modules
RUN npm install

# Runs Angular-Ivy compatibility compiler (es2023 processing) - Takes non-ivy libraries and makes them understandable
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

# Copies the rest of the files
COPY . .

# Runs application
RUN npm run prebuild
RUN npm run build-docker

# Stage 2:
# Gets Nginx image
FROM nginx:stable-alpine

# Serves app files to nginx folder
COPY --from=build /app/dist/angular-escomio /usr/share/nginx/html

# Copies nginx configuration file to container
COPY --from=build /app/nginx.conf  /etc/nginx/conf.d/default.conf

# Exposes port 80 (Web server - http)
EXPOSE 4200
