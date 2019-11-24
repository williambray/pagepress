# We want to use the offical node environmnet
FROM node

# Set up env variables
ENV NPM_CONFIG_LOGLEVEL warn
ARG APP_ENV

# Create server directory
WORKDIR /backend

# Copy package into app and install modules
COPY package*.json ./
RUN npm install

# Copy the rest of the application into the directory
COPY . /backend

# Expose the port for the server
EXPOSE 4466

# Run the server
CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run start; \
	else \
	npm run dev; \
	fi
