# Multistage build

# Stage 1:
# Gets node image
FROM node:20.11.1-alpine AS build

# Creates application folder on container
WORKDIR /app

# Copies package and package-lock files 
COPY package*.json ./

# Installs all npm module
RUN npm install

# Runs Angular-Ivy compatibility compiler (es2023 processing) - Takes non-ivy libraries and makes them understandable
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

# Copies the rest of the files
COPY . .

# Runs application
RUN npm run build

# Stage 2:
# Gets Nginx image
FROM nginx:stable-alpine

# Serves app files to nginx folder
COPY --from=build /app/angular-escomio/ /usr/share/nginx/html

# Exposes port 80 (Web server - http)
EXPOSE 80