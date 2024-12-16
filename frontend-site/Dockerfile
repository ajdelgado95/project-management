# Use Node 20.18.1 image
FROM node:20.18.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose port 3000 for React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]

