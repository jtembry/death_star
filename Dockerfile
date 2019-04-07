# base image
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY angular.json /usr/src/app/angular.json
COPY tsconfig.json /usr/src/app/tsconfig.json
RUN npm install
RUN npm install -g @angular/cli@6.0.8

# add app
COPY . /usr/src/app

RUN chmod 777 /usr/src/app/src/assets/fonts

#Expose Port
EXPOSE 4200

# start app
CMD ["ng","serve"]

# set user who runs app in container (by Default Docker runs as root.)
#USER node
