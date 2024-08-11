FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*
  
RUN git clone https://github.com/HACKING995/HACKING--MD9.git /root/Zokou_BOt
WORKDIR /root/Zokou_Bot/


COPY package.json .
RUN npm install pm2 -g
RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]
