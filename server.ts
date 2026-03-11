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
`);

// Seed data if empty
const txCount = db.prepare("SELECT COUNT(*) as count FROM transactions").get() as { count: number };
if (txCount.count === 0) {
  db.prepare(`
    INSERT INTO transactions (ref, date, amount, description, bank, account, name, status, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run('REF123456789', '24/05/2024', 5000000, 'Thanh toán cước viễn thông tháng 05/2024 cho các thuê bao gia đình', 'Techcombank (TCB)', '19038827712xxx', 'NGUYEN VAN A', 'PENDING', null);

  db.prepare(`
    INSERT INTO transactions (ref, date, amount, description, bank, account, name, status, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run('REF998877665', '25/05/2024', 1250000, 'TT CUOC THANG 05 - MA KH: KH-12345', 'Vietcombank (VCB)', '0071001234567', 'TRAN THI B', 'PROCESSED', 'Đã gạch nợ tự động');

  db.prepare(`
    INSERT INTO transactions (ref, date, amount, description, bank, account, name, status, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run('REF112233445', '26/05/2024', 3500000, 'CHUYEN TIEN THANH TOAN CUOC DI DONG', 'BIDV', '12010000123456', 'LE VAN C', 'PROCESSING', 'Đang đối soát dữ liệu');

  db.prepare(`
    INSERT INTO transactions (ref, date, amount, description, bank, account, name, status, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run('REF556677889', '26/05/2024', 750000, 'THANH TOAN CUOC INTERNET', 'Agribank', '1500205123456', 'PHAM THI D', 'PENDING', null);

  db.prepare(`
    INSERT INTO transactions (ref, date, amount, description, bank, account, name, status, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run('REF001122334', '27/05/2024', 2100000, 'NOP TIEN CUOC - KHONG RO MA KH', 'MB Bank', '0680101234567', 'HOANG VAN E', 'PENDING', 'Thiếu mã khách hàng');

  db.prepare(`
    INSERT INTO transactions (ref, date, amount, description, bank, account, name, status, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run('REF443322110', '27/05/2024', 4200000, 'THANH TOAN CUOC DOANH NGHIEP', 'VietinBank', '101870123456', 'CONG TY TNHH X', 'PROCESSED', 'Hoàn tất');

  db.prepare(`
    INSERT INTO transactions (ref, date, amount, description, bank, account, name, status, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run('REF667788990', '28/05/2024', 1500000, 'THANH TOAN CUOC - SAI SO THUE BAO', 'Sacombank', '060123456789', 'VO VAN F', 'ON_HOLD', 'Sai số thuê bao');

  db.prepare(`INSERT INTO customers (id, name, tax_id) VALUES (?, ?, ?)`).run('KH-992031', 'NGUYEN VAN HOANG ANH', '0102030405');
  
  db.prepare(`INSERT INTO subscribers (id, customer_id, phone_number, debt_start, debt_current) VALUES (?, ?, ?, ?, ?)`).run('SUB-01', 'KH-992031', '0901234567', 3000000, 3500000);
  db.prepare(`INSERT INTO subscribers (id, customer_id, phone_number, debt_start, debt_current) VALUES (?, ?, ?, ?, ?)`).run('SUB-02', 'KH-992031', '0907654321', 1250000, 2300000);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/transactions", (req, res) => {
    const transactions = db.prepare("SELECT * FROM transactions").all();
    res.json(transactions);
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
