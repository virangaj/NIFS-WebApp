# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory to /app
WORKDIR /src

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Set the environment variable for the backend server URL
ENV REACT_APP_BACKEND_SERVER=http://localhost:8080

# Build the React application
RUN npm run build

# Set the command to start the application
CMD ["npm", "start"]