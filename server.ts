import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.sqlite");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT UNIQUE,
    date TEXT,
    amount INTEGER,
    description TEXT,
    bank TEXT,
    account TEXT,
    name TEXT,
    status TEXT DEFAULT 'PENDING',
    note TEXT
  );

  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name TEXT,
    tax_id TEXT
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id TEXT PRIMARY KEY,
    customer_id TEXT,
    phone_number TEXT,
    debt_start INTEGER,
    debt_current INTEGER,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS exception_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword TEXT,
    type TEXT,
    target_id TEXT,
    description TEXT,
    status TEXT DEFAULT 'ACTIVE'
  );
`);

// Seed data if empty
const txCount = db.prepare("SELECT COUNT(*) as count FROM transactions").get() as { count: number };
if (txCount.count === 0) {
  const transactions = [
    ['REF123456789', '24/05/2024', 5000000, 'Thanh toán cước viễn thông tháng 05/2024 cho các thuê bao gia đình', 'Techcombank (TCB)', '19038827712xxx', 'NGUYEN VAN A', 'PENDING', null],
    ['REF998877665', '25/05/2024', 1250000, 'TT CUOC THANG 05 - MA KH: KH-12345', 'Vietcombank (VCB)', '0071001234567', 'TRAN THI B', 'PROCESSED', 'Đã gạch nợ tự động'],
    ['REF112233445', '26/05/2024', 3500000, 'CHUYEN TIEN THANH TOAN CUOC DI DONG', 'BIDV', '12010000123456', 'LE VAN C', 'PROCESSING', 'Đang đối soát dữ liệu'],
    ['REF556677889', '26/05/2024', 750000, 'THANH TOAN CUOC INTERNET', 'Agribank', '1500205123456', 'PHAM THI D', 'PENDING', null],
    ['REF001122334', '27/05/2024', 2100000, 'NOP TIEN CUOC - KHONG RO MA KH', 'MB Bank', '0680101234567', 'HOANG VAN E', 'PENDING', 'Thiếu mã khách hàng'],
    ['REF443322110', '27/05/2024', 4200000, 'THANH TOAN CUOC DOANH NGHIEP', 'VietinBank', '101870123456', 'CONG TY TNHH X', 'PROCESSED', 'Hoàn tất'],
    ['REF667788990', '28/05/2024', 1500000, 'THANH TOAN CUOC - SAI SO THUE BAO', 'Sacombank', '060123456789', 'VO VAN F', 'ON_HOLD', 'Sai số thuê bao'],
    ['REF778899001', '29/05/2024', 8900000, 'THANH TOAN CUOC TAP DOAN - THANG 05', 'Vietcombank', '0011004321987', 'TAP DOAN VIEN THONG A', 'PENDING', null],
    ['REF889900112', '30/05/2024', 450000, 'CUOC DI DONG CA NHAN', 'TPBank', '01234567890', 'LY THI G', 'PENDING', null],
    ['REF990011223', '31/05/2024', 12000000, 'THANH TOAN HOP DONG 456/2024', 'HDBank', '09876543210', 'CONG TY TNHH ABC', 'ON_HOLD', 'Lỗi timeout kết nối'],
    ['REF004', '24/10/2023', 1250000, 'THANH TOAN HOA DON NUOC T10/2023', 'BIDV', '0987654321', 'LE VAN LUONG', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF005', '24/10/2023', 3000000, 'CHUYEN TIEN HOC PHI - NGUYEN ANH THU', 'Vietcombank (VCB)', '1122334455', 'NGUYEN ANH THU', 'PENDING', 'Chờ đối soát'],
    ['REF006', '23/10/2023', 500000, 'THANH TOAN CUOC INTERNET FPT', 'Techcombank', '5544332211', 'FPT TELECOM', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF007', '23/10/2023', 15000000, 'CHUYEN KHOAN MUA XE MAY', 'Agribank', '6677889900', 'TRAN VAN DUNG', 'ON_HOLD', 'Số tiền lớn, cần xác minh'],
    ['REF008', '22/10/2023', 200000, 'NAP TIEN DIEN THOAI', 'MB Bank', '0123456789', 'VIETTEL', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF009', '22/10/2023', 4500000, 'THANH TOAN TIEN NHA THANG 10', 'ACB', '9988776655', 'PHAN THI MAI', 'PENDING', 'Chờ đối soát'],
    ['REF010', '21/10/2023', 1200000, 'MUA SAM TAI SIEU THI COOP MART', 'Sacombank', '4455667788', 'COOP MART', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF011', '21/10/2023', 850000, 'AN UONG TAI NHA HANG', 'VietinBank', '2233445566', 'NHA HANG SEN', 'ON_HOLD', 'Nội dung không rõ ràng'],
    ['REF012', '20/10/2023', 2500000, 'THANH TOAN TRA GOP FE CREDIT', 'VPBank', '7788990011', 'FE CREDIT', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF013', '20/10/2023', 1000000, 'CHUYEN TIEN MUNG DAM CUOI', 'TPBank', '3344556677', 'NGUYEN VAN B', 'PENDING', 'Chờ đối soát'],
    ['REF014', '19/10/2023', 750000, 'THANH TOAN TIEN DIEN T9/2023', 'Vietcombank', '1122334455', 'DIEN LUC TP.HCM', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF015', '19/10/2023', 12000000, 'THANH TOAN TIEN THUE MAT BANG', 'BIDV', '0099887766', 'TRAN THI C', 'ON_HOLD', 'Nội dung không hợp lệ'],
    ['REF016', '18/10/2023', 350000, 'NAP TIEN GAME', 'Techcombank', '5566778899', 'GARENA', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF017', '18/10/2023', 5000000, 'THANH TOAN TIEN QUANG CAO FACEBOOK', 'VietinBank', '4433221100', 'FACEBOOK ADS', 'PENDING', 'Chờ đối soát'],
    ['REF018', '17/10/2023', 1500000, 'MUA SAM TAI SHOPEE', 'Sacombank', '0011223344', 'SHOPEE', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF019', '17/10/2023', 2000000, 'CHUYEN TIEN CHO ME', 'Agribank', '9900112233', 'NGUYEN THI D', 'ON_HOLD', 'Cần xác minh danh tính'],
    ['REF020', '16/10/2023', 800000, 'THANH TOAN TIEN NUOC T9/2023', 'MB Bank', '8877665544', 'CAP NUOC CHO LON', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF021', '16/10/2023', 10000000, 'THANH TOAN TIEN LUONG THANG 10', 'Vietcombank', '7766554433', 'CONG TY ABC', 'PENDING', 'Chờ đối soát'],
    ['REF022', '15/10/2023', 500000, 'THANH TOAN TIEN INTERNET VIETTEL', 'TPBank', '6655443322', 'VIETTEL TELECOM', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF023', '15/10/2023', 3000000, 'THANH TOAN TIEN TRA GOP HOME CREDIT', 'VPBank', '5544332211', 'HOME CREDIT', 'ON_HOLD', 'Sai mã hợp đồng'],
    ['REF024', '14/10/2023', 1200000, 'MUA SAM TAI LAZADA', 'Techcombank', '4433221100', 'LAZADA', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF025', '14/10/2023', 4500000, 'THANH TOAN TIEN BAO HIEM MANULIFE', 'BIDV', '3322110099', 'MANULIFE', 'PENDING', 'Chờ đối soát'],
    ['REF026', '13/10/2023', 2000000, 'THANH TOAN TIEN HOC PHI TIENG ANH', 'VietinBank', '2211009988', 'ILA VIETNAM', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF027', '13/10/2023', 1500000, 'CHUYEN TIEN MUNG SINH NHAT', 'Sacombank', '1100998877', 'LE VAN D', 'ON_HOLD', 'Nội dung không rõ ràng'],
    ['REF028', '12/10/2023', 500000, 'THANH TOAN TIEN TRUYEN HINH CAP', 'Agribank', '0099887766', 'VTVCAB', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF029', '12/10/2023', 8000000, 'THANH TOAN TIEN THUE NHA T10/2023', 'MB Bank', '9988776655', 'NGUYEN VAN E', 'PENDING', 'Chờ đối soát'],
    ['REF030', '11/10/2023', 1000000, 'THANH TOAN TIEN DIEN THOAI TRA SAU', 'Vietcombank', '8877665544', 'MOBIFONE', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF031', '11/10/2023', 2500000, 'THANH TOAN TIEN TRA GOP MCREDIT', 'TPBank', '7766554433', 'MCREDIT', 'ON_HOLD', 'Thiếu thông tin khách hàng'],
    ['REF032', '10/10/2023', 1500000, 'MUA SAM TAI TIKI', 'Techcombank', '6655443322', 'TIKI', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF033', '10/10/2023', 6000000, 'THANH TOAN TIEN QUANG CAO GOOGLE', 'BIDV', '5544332211', 'GOOGLE ADS', 'PENDING', 'Chờ đối soát'],
    ['REF034', '09/10/2023', 1200000, 'THANH TOAN TIEN NUOC T8/2023', 'Agribank', '4433221100', 'CAP NUOC THU DUC', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF035', '09/10/2023', 2500000, 'CHUYEN TIEN THANH TOAN TIEN AN', 'Vietcombank', '3322110099', 'NHA HANG NGON', 'ON_HOLD', 'Nội dung không hợp lệ'],
    ['REF036', '08/10/2023', 500000, 'NAP TIEN DIEN THOAI VIETTEL', 'TPBank', '2211009988', 'VIETTEL', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF037', '08/10/2023', 1500000, 'THANH TOAN TIEN HOC PHI T10/2023', 'Techcombank', '1100998877', 'TRUONG TIEU HOC A', 'PENDING', 'Chờ đối soát'],
    ['REF038', '07/10/2023', 3000000, 'THANH TOAN TIEN TRA GOP FE', 'BIDV', '0099887766', 'FE CREDIT', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF039', '07/10/2023', 4500000, 'THANH TOAN TIEN BAO HIEM AIA', 'VietinBank', '9988776655', 'AIA VIETNAM', 'ON_HOLD', 'Sai số hợp đồng'],
    ['REF040', '06/10/2023', 1200000, 'MUA SAM TAI COOP MART', 'Sacombank', '8877665544', 'COOP MART', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF041', '06/10/2023', 10000000, 'THANH TOAN TIEN LUONG T9/2023', 'Agribank', '7766554433', 'CONG TY XYZ', 'PENDING', 'Chờ đối soát'],
    ['REF042', '05/10/2023', 500000, 'THANH TOAN TIEN INTERNET FPT', 'MB Bank', '6655443322', 'FPT TELECOM', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF043', '05/10/2023', 2000000, 'CHUYEN TIEN MUNG TAN GIA', 'Vietcombank', '5544332211', 'NGUYEN VAN F', 'ON_HOLD', 'Nội dung không rõ ràng'],
    ['REF044', '04/10/2023', 800000, 'THANH TOAN TIEN DIEN T8/2023', 'TPBank', '4433221100', 'DIEN LUC GIA DINH', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF045', '04/10/2023', 3500000, 'THANH TOAN TIEN TRA GOP HOME', 'Techcombank', '3322110099', 'HOME CREDIT', 'PENDING', 'Chờ đối soát'],
    ['REF046', '03/10/2023', 1500000, 'MUA SAM TAI WINMART', 'BIDV', '2211009988', 'WINMART', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF047', '03/10/2023', 5000000, 'THANH TOAN TIEN QUANG CAO TIKTOK', 'VietinBank', '1100998877', 'TIKTOK ADS', 'ON_HOLD', 'Cần xác minh giao dịch'],
    ['REF048', '02/10/2023', 1200000, 'THANH TOAN TIEN NUOC T8/2023', 'Sacombank', '0099887766', 'CAP NUOC BEN THANH', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF049', '02/10/2023', 9000000, 'THANH TOAN TIEN THUE VAN PHONG', 'Agribank', '9988776655', 'CONG TY BDS', 'PENDING', 'Chờ đối soát'],
    ['REF050', '01/10/2023', 1000000, 'THANH TOAN TIEN DIEN THOAI VINAPHONE', 'MB Bank', '8877665544', 'VINAPHONE', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF051', '01/10/2023', 2500000, 'THANH TOAN TIEN TRA GOP MCREDIT', 'Vietcombank', '7766554433', 'MCREDIT', 'ON_HOLD', 'Thiếu mã khách hàng'],
    ['REF052', '30/09/2023', 1500000, 'MUA SAM TAI BACH HOA XANH', 'TPBank', '6655443322', 'BACH HOA XANH', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF053', '30/09/2023', 4000000, 'THANH TOAN TIEN HOC PHI DAI HOC', 'Techcombank', '5544332211', 'DAI HOC QUOC GIA', 'PENDING', 'Chờ đối soát'],
    ['REF054', '29/09/2023', 1200000, 'THANH TOAN TIEN DIEN T7/2023', 'BIDV', '4433221100', 'DIEN LUC BINH THANH', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF055', '29/09/2023', 2000000, 'CHUYEN TIEN MUNG THO', 'VietinBank', '3322110099', 'NGUYEN VAN G', 'ON_HOLD', 'Nội dung không hợp lệ'],
    ['REF056', '28/09/2023', 500000, 'NAP TIEN DIEN THOAI MOBIFONE', 'Sacombank', '2211009988', 'MOBIFONE', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF057', '28/09/2023', 3000000, 'THANH TOAN TIEN TRA GOP FE', 'Agribank', '1100998877', 'FE CREDIT', 'PENDING', 'Chờ đối soát'],
    ['REF058', '27/09/2023', 1500000, 'MUA SAM TAI LOTTE MART', 'MB Bank', '0099887766', 'LOTTE MART', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF059', '27/09/2023', 7000000, 'THANH TOAN TIEN QUANG CAO ZALO', 'Vietcombank', '9988776655', 'ZALO ADS', 'ON_HOLD', 'Cần xác minh danh tính'],
    ['REF060', '26/09/2023', 1200000, 'THANH TOAN TIEN NUOC T7/2023', 'TPBank', '8877665544', 'CAP NUOC TRUNG AN', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF061', '25/09/2023', 5000000, 'THANH TOAN TIEN QUANG CAO FACEBOOK', 'Vietcombank', '7766554433', 'FACEBOOK ADS', 'PENDING', 'Chờ đối soát'],
    ['REF062', '25/09/2023', 1500000, 'CHUYEN TIEN MUNG SINH NHAT', 'BIDV', '6655443322', 'NGUYEN VAN H', 'ON_HOLD', 'Nội dung không rõ ràng'],
    ['REF063', '24/09/2023', 800000, 'THANH TOAN TIEN DIEN T7/2023', 'Techcombank', '5544332211', 'DIEN LUC TAN BINH', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF064', '24/09/2023', 3000000, 'THANH TOAN TIEN TRA GOP HOME', 'VietinBank', '4433221100', 'HOME CREDIT', 'PENDING', 'Chờ đối soát'],
    ['REF065', '23/09/2023', 1200000, 'MUA SAM TAI COOP FOOD', 'Sacombank', '3322110099', 'COOP FOOD', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF066', '23/09/2023', 4500000, 'THANH TOAN TIEN BAO HIEM PRUDENTIAL', 'Agribank', '2211009988', 'PRUDENTIAL', 'ON_HOLD', 'Sai mã hợp đồng'],
    ['REF067', '22/09/2023', 500000, 'THANH TOAN TIEN INTERNET VNPT', 'MB Bank', '1100998877', 'VNPT', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF068', '22/09/2023', 2000000, 'CHUYEN TIEN MUNG DAY THANG', 'Vietcombank', '0099887766', 'NGUYEN VAN I', 'PENDING', 'Chờ đối soát'],
    ['REF069', '21/09/2023', 1000000, 'THANH TOAN TIEN DIEN THOAI TRA SAU', 'TPBank', '9988776655', 'VIETTEL', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF070', '21/09/2023', 2500000, 'THANH TOAN TIEN TRA GOP MCREDIT', 'Techcombank', '8877665544', 'MCREDIT', 'ON_HOLD', 'Thiếu thông tin khách hàng'],
    ['REF071', '20/09/2023', 1500000, 'MUA SAM TAI TIKI', 'BIDV', '7766554433', 'TIKI', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF072', '20/09/2023', 6000000, 'THANH TOAN TIEN QUANG CAO GOOGLE', 'VietinBank', '6655443322', 'GOOGLE ADS', 'PENDING', 'Chờ đối soát'],
    ['REF073', '19/09/2023', 1200000, 'THANH TOAN TIEN NUOC T6/2023', 'Sacombank', '5544332211', 'CAP NUOC PHU HOA TAN', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF074', '19/09/2023', 2500000, 'CHUYEN TIEN THANH TOAN TIEN AN', 'Agribank', '4433221100', 'NHA HANG NGON', 'ON_HOLD', 'Nội dung không hợp lệ'],
    ['REF075', '18/09/2023', 500000, 'NAP TIEN DIEN THOAI VIETTEL', 'MB Bank', '3322110099', 'VIETTEL', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF076', '18/09/2023', 1500000, 'THANH TOAN TIEN HOC PHI T9/2023', 'Vietcombank', '2211009988', 'TRUONG TIEU HOC B', 'PENDING', 'Chờ đối soát'],
    ['REF077', '17/09/2023', 3000000, 'THANH TOAN TIEN TRA GOP FE', 'TPBank', '1100998877', 'FE CREDIT', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF078', '17/09/2023', 4500000, 'THANH TOAN TIEN BAO HIEM AIA', 'Techcombank', '0099887766', 'AIA VIETNAM', 'ON_HOLD', 'Sai số hợp đồng'],
    ['REF079', '16/09/2023', 1200000, 'MUA SAM TAI COOP MART', 'BIDV', '9988776655', 'COOP MART', 'PROCESSED', 'Gạch nợ tự động thành công'],
    ['REF080', '16/09/2023', 10000000, 'THANH TOAN TIEN LUONG T8/2023', 'VietinBank', '8877665544', 'CONG TY XYZ', 'PENDING', 'Chờ đối soát']
  ];

  const insertTx = db.prepare(`
    INSERT INTO transactions (ref, date, amount, description, bank, account, name, status, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const tx of transactions) {
    insertTx.run(...tx);
  }

  db.prepare(`INSERT INTO customers (id, name, tax_id) VALUES (?, ?, ?)`).run('KH-992031', 'NGUYEN VAN HOANG ANH', '0102030405');
  db.prepare(`INSERT INTO customers (id, name, tax_id) VALUES (?, ?, ?)`).run('KH-12345', 'TRAN THI B', '0102030406');
  db.prepare(`INSERT INTO customers (id, name, tax_id) VALUES (?, ?, ?)`).run('KH-55667', 'CONG TY TNHH X', '0102030407');
  
  db.prepare(`INSERT INTO subscribers (id, customer_id, phone_number, debt_start, debt_current) VALUES (?, ?, ?, ?, ?)`).run('SUB-01', 'KH-992031', '0901234567', 3000000, 3500000);
  db.prepare(`INSERT INTO subscribers (id, customer_id, phone_number, debt_start, debt_current) VALUES (?, ?, ?, ?, ?)`).run('SUB-02', 'KH-992031', '0907654321', 1250000, 2300000);
  db.prepare(`INSERT INTO subscribers (id, customer_id, phone_number, debt_start, debt_current) VALUES (?, ?, ?, ?, ?)`).run('SUB-03', 'KH-12345', '0912345678', 1250000, 0);
  db.prepare(`INSERT INTO subscribers (id, customer_id, phone_number, debt_start, debt_current) VALUES (?, ?, ?, ?, ?)`).run('SUB-04', 'KH-55667', '0988888888', 4200000, 0);

  const rules = [
    ['THANH TOAN CUOC', 'KEYWORD', 'KH-SYSTEM', 'Nhận diện từ khóa thanh toán cước'],
    ['MA KH:', 'REGEX', 'KH-EXTRACT', 'Trích xuất mã khách hàng từ nội dung'],
    ['0102030405', 'TAX_ID', 'KH-992031', 'Nhận diện qua mã số thuế'],
    ['19038827712xxx', 'ACCOUNT', 'KH-992031', 'Nhận diện qua số tài khoản ngân hàng'],
  ];

  const insertRule = db.prepare(`
    INSERT INTO exception_rules (keyword, type, target_id, description)
    VALUES (?, ?, ?, ?)
  `);

  for (const rule of rules) {
    insertRule.run(...rule);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/transactions", (req, res) => {
    const { status } = req.query;
    let query = "SELECT * FROM transactions";
    let params: any[] = [];
    
    if (status) {
      query += " WHERE status = ?";
      params.push(status);
    }
    
    const transactions = db.prepare(query).all(...params);
    res.json(transactions);
  });

  app.get("/api/exception-rules", (req, res) => {
    const rules = db.prepare("SELECT * FROM exception_rules").all();
    res.json(rules);
  });

  app.get("/api/dashboard-stats", (req, res) => {
    const totalTx = db.prepare("SELECT COUNT(*) as count FROM transactions").get() as any;
    const pendingTx = db.prepare("SELECT COUNT(*) as count FROM transactions WHERE status = 'PENDING'").get() as any;
    const processingTx = db.prepare("SELECT COUNT(*) as count FROM transactions WHERE status = 'PROCESSING'").get() as any;
    const processedTx = db.prepare("SELECT COUNT(*) as count FROM transactions WHERE status = 'PROCESSED'").get() as any;
    const onHoldTx = db.prepare("SELECT COUNT(*) as count FROM transactions WHERE status = 'ON_HOLD'").get() as any;
    const totalAmount = db.prepare("SELECT SUM(amount) as total FROM transactions WHERE status = 'PROCESSED'").get() as any;

    res.json({
      total: totalTx.count,
      pending: pendingTx.count,
      processing: processingTx.count,
      processed: processedTx.count,
      onHold: onHoldTx.count,
      totalAmount: totalAmount.total || 0
    });
  });

  app.get("/api/reports/employee", (req, res) => {
    const data = [
      { id: 'NL', name: 'Nguyễn Văn Linh', total: 156, completed: 144, pending: 12, amount: 450200000 },
      { id: 'TH', name: 'Trần Thị Hoa', total: 203, completed: 203, pending: 0, amount: 580000000 },
      { id: 'LM', name: 'Lê Minh', total: 89, completed: 84, pending: 5, amount: 220500000 },
    ];
    res.json(data);
  });

  app.get("/api/reports/daily", (req, res) => {
    const data = [
      { date: '24/10', total: 448, completed: 431, pending: 17, amount: 1250800000 },
      { date: '23/10', total: 512, completed: 502, pending: 10, amount: 1410200000 },
      { date: '22/10', total: 390, completed: 382, pending: 8, amount: 985400000 },
    ];
    res.json(data);
  });

  app.get("/api/subscribers/:query", (req, res) => {
    const { query } = req.params;
    const subscribers = db.prepare(`
      SELECT s.*, c.name as customer_name, c.tax_id 
      FROM subscribers s
      JOIN customers c ON s.customer_id = c.id
      WHERE s.phone_number LIKE ? OR c.tax_id LIKE ? OR c.id LIKE ?
    `).all(`%${query}%`, `%${query}%`, `%${query}%`);
    res.json(subscribers);
  });

  app.post("/api/process-payment", (req, res) => {
    const { transactionRef, subscriberIds, amount, note } = req.body;
    
    const processPayment = db.transaction(() => {
      // Update transaction status
      db.prepare("UPDATE transactions SET status = 'PROCESSED' WHERE ref = ?").run(transactionRef);
      
      // In a real app, we would update debt balances here
    });

    try {
      processPayment();
      res.json({ success: true });
    } catch (error) {
      console.error("Payment processing error:", error);
      res.status(500).json({ error: "Failed to process payment" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
