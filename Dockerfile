# Dockerfile
FROM oven/bun:latest

# สร้าง working directory
WORKDIR /app

# คัดลอกไฟล์ทั้งหมด
COPY . .

# ติดตั้ง dependencies
RUN bun install

# Build สำหรับ production
RUN bun run build

# เปิดพอร์ต 5173 (Vite dev port) หรือ 3000
EXPOSE 5173

# รัน Bun Vite server
CMD ["bun", "run", "preview", "--port", "5173", "--host"]
