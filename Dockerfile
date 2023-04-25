# Use the official Node.js image as the base image
FROM node:16-alpine3.14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the required dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
