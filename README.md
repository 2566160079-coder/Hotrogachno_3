# Chương trình hỗ trợ gạch nợ cước viễn thông

Ứng dụng quản lý và gạch nợ cước viễn thông từ sổ phụ ngân hàng, hỗ trợ đối soát tự động và xử lý ngoại lệ.

## Tính năng chính

- **Dashboard**: Theo dõi tổng quan trạng thái giao dịch, tỷ lệ gạch nợ và xu hướng hàng ngày.
- **Quản lý sổ phụ**: Import và theo dõi toàn bộ giao dịch từ các ngân hàng liên kết.
- **Rổ lưu trữ**: Quản lý các giao dịch đang chờ xử lý gạch nợ.
- **Tính toán gạch nợ**: Công cụ hỗ trợ đối soát và gạch nợ cho từng thuê bao/khách hàng.
- **Giao dịch treo**: Xử lý các giao dịch gặp lỗi hoặc cần xác minh thêm.
- **Cấu hình ngoại lệ**: Thiết lập các quy tắc nhận diện tự động dựa trên từ khóa, mã số thuế hoặc số tài khoản.
- **Báo cáo**: Xuất báo cáo hiệu suất nhân viên và thống kê hàng ngày.

## Công nghệ sử dụng

- **Frontend**: React, TypeScript, Tailwind CSS, Lucide React, Motion.
- **Backend**: Node.js, Express, Better-SQLite3.
- **Build Tool**: Vite.

## Hướng dẫn cài đặt và chạy ứng dụng

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy ứng dụng trong môi trường phát triển

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`.

### 3. Build cho production

```bash
npm run build
npm start
```

## Cấu trúc thư mục

- `/src/components`: Chứa các component UI của ứng dụng.
- `/server.ts`: Entry point của backend Express và SQLite.
- `/database.sqlite`: File cơ sở dữ liệu (được tạo tự động khi chạy server).

## Giấy phép

Ứng dụng này được phát triển cho mục đích quản lý nội bộ.
