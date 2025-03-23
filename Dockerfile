# 使用 Node.js 22 作为基础镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 设置构建环境变量
ENV NODE_OPTIONS='--experimental-global-webcrypto --no-warnings' \
    VITE_CJS_IGNORE_WARNING=true

# 构建项目
RUN npm run build

# 安装 serve 用于托管静态文件
RUN npm install -g serve

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["serve", "-s", "dist"]
