# Use an official PHP runtime as a parent image
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk --no-cache add \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    nginx \
    git \
    nodejs \
    npm \
    mysql-client \
    zip libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql mbstring exif pcntl bcmath zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application source code to the container
COPY . /var/www

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install Node.js dependencies and build frontend
WORKDIR /var/www/resources/js
RUN npm install
RUN npm run build

# Set working directory back to the root of the project
WORKDIR /var/www

# Copy the nginx configuration file
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
# Expose port 80 to the outside world
EXPOSE 80

# Start PHP-FPM and Nginx using the correct commands for Alpine Linux
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
