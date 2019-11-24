# We want to use the offical node environmnet
FROM node

# Set up env variables
ENV NPM_CONFIG_LOGLEVEL warn
ARG APP_ENV

# Create app directory
WORKDIR /frontend

# Copy package into app and install modules
COPY package*.json ./
RUN npm install

# Copy the rest of the application into the directory
COPY . /frontend

# Expose the port for the app
EXPOSE 3000

# Run the server
CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p 80; \
	else \
	npm run start; \
	fi
