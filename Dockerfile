# 1️⃣ Base image (Node 24, lightweight)
# FROM node:24-alpine

# # 2️⃣ App ka folder container ke andar
# WORKDIR /app


# # 3️⃣ Pehle package files copy (cache optimization)
# COPY package*.json ./

# # 4️⃣ Dependencies install
# RUN npm install

# # 5️⃣ Baaki source code copy
# COPY . .


# # 6️⃣ App ka port expose
# EXPOSE 8000

# # 7️⃣ App start command
# CMD [ "npm", "start" ]

# FROM ubuntu

# RUN apt-get update
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get upgrade -y
# RUN apt-get install -y nodejs

# COPY package.json package.json
# COPY package-lock.json package-lock.json
# COPY main.js main.js

# RUN npm install

# ENTRYPOINT [ "node", "main.js" ]

# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci --only=production

# COPY main.js .

# EXPOSE 8000

# CMD ["node", "main.js"]


#-------------- pro level ---------------------#

# ======================
# BUILD STAGE
# ======================

FROM  node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./ 

RUN npm ci --only=production

COPY main.js .

# ======================
# RUNTIME STAGE
# ======================
FROM node:18-alpine


WORKDIR /app

RUN addgroup -S app && adduser -S app -G app
USER app

COPY --from=builder /app .

EXPOSE 8000

CMD [ "node", "main.js" ]



