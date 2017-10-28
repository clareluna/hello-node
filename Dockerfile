FROM node:6.9.4
EXPOSE 8080
COPY server.js .
CMD node server.js
