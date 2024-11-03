FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production
#RUN npm install

COPY . .

RUN npm run build

# Crea el directorio de uploads (para los archivos subidos)
RUN mkdir -p uploads

EXPOSE 3000

# Start the Next.js app using the production build
CMD ["npm", "run", "start"]