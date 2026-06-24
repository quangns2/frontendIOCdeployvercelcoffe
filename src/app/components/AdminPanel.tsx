import { useState } from "react";
import {
  LayoutDashboard, Package, Tag, Settings, ShoppingBag, Users, Star,
  BarChart2, Image, Edit, Trash2, Eye, Plus, CheckCircle, XCircle,
  TrendingUp, AlertCircle, Loader2, ToggleLeft, Search, Filter,
  ArrowUpRight, DollarSign, Clock, ChevronDown
} from "lucide-react";

const products = [
  { id: 1, name: "Bánh Tiramisu", cat: "Bánh mousse", price: "45.000đ", stock: 24, status: "Đang bán", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=80&h=80&fit=crop&auto=format" },
  { id: 2, name: "Bánh Red Velvet", cat: "Bánh mousse", price: "55.000đ", stock: 12, status: "Đang bán", img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=80&h=80&fit=crop&auto=format" },
  { id: 3, name: "Bánh sinh nhật socola", cat: "Bánh sinh nhật", price: "350.000đ", stock: 8, status: "Đặt trước", img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=80&h=80&fit=crop&auto=format" },
  { id: 4, name: "Bánh mousse xoài", cat: "Bánh mousse", price: "60.000đ", stock: 0, status: "Hết hàng", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=80&h=80&fit=crop&auto=format" },
  { id: 5, name: "Cafe Latte", cat: "Cafe", price: "55.000đ", stock: 999, status: "Đang bán", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=80&h=80&fit=crop&auto=format" },
  { id: 6, name: "Matcha Latte", cat: "Trà", price: "59.000đ", stock: 999, status: "Đang bán", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=80&h=80&fit=crop&auto=format" },
  { id: 7, name: "Combo Tiramisu + Latte", cat: "Combo", price: "89.000đ", stock: 20, status: "Đang bán", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=80&h=80&fit=crop&auto=format" },
  { id: 8, name: "Bánh tart trứng", cat: "Bánh tart", price: "25.000đ", stock: 36, status: "Đang bán", img: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=80&h=80&fit=crop&auto=format" },
];

const orders = [
  { id: "#SB1024", customer: "Nguyễn Minh Anh", items: "Bánh Tiramisu, Cafe Latte", total: "100.000đ", status: "Đang giao", time: "12:45" },
  { id: "#SB1023", customer: "Trần Thị Bình", items: "Bánh sinh nhật socola", total: "350.000đ", status: "Đang chuẩn bị", time: "12:10" },
  { id: "#SB1022", customer: "Lê Văn Cường", items: "Combo Tiramisu + Latte", total: "89.000đ", status: "Hoàn thành", time: "11:30" },
  { id: "#SB1021", customer: "Phạm Thu Hà", items: "Matcha Latte x2", total: "118.000đ", status: "Xác nhận", time: "11:00" },
  { id: "#SB1020", customer: "Vũ Đức Minh", items: "Bánh tart trứng x3", total: "75.000đ", status: "Huỷ", time: "10:15" },
  { id: "#SB1019", customer: "Đinh Lan Hương", items: "Bánh Red Velvet, Cold Brew", total: "115.000đ", status: "Hoàn thành", time: "09:40" },
];

const users = [
  { id: 1, name: "Nguyễn Minh Anh", email: "minhanh@email.com", phone: "0909888777", orders: 12, total: "1.240.000đ", joined: "01/01/2025", status: "Hoạt động" },
  { id: 2, name: "Trần Thị Bình", email: "binhtran@email.com", phone: "0912345678", orders: 7, total: "850.000đ", joined: "15/02/2025", status: "Hoạt động" },
  { id: 3, name: "Lê Văn Cường", email: "cuongle@email.com", phone: "0987654321", orders: 3, total: "267.000đ", joined: "20/03/2025", status: "Hoạt động" },
  { id: 4, name: "Phạm Thu Hà", email: "hapt@email.com", phone: "0901112233", orders: 22, total: "2.100.000đ", joined: "10/11/2024", status: "VIP" },
  { id: 5, name: "Vũ Đức Minh", email: "minhvd@email.com", phone: "0977123456", orders: 1, total: "75.000đ", joined: "18/06/2025", status: "Mới" },
];

const reviews = [
  { id: 1, product: "Bánh Tiramisu", user: "Nguyễn Minh Anh", rating: 5, comment: "Bánh ngon tuyệt, cream mịn, không ngọt quá. Giao hàng nhanh!", date: "20/06/2025", status: "Đã duyệt" },
  { id: 2, product: "Cafe Latte", user: "Trần Thị Bình", rating: 4, comment: "Cafe thơm, vị chuẩn ý. Sẽ order tiếp.", date: "19/06/2025", status: "Đã duyệt" },
  { id: 3, product: "Bánh mousse xoài", user: "Lê Văn Cường", rating: 3, comment: "Vị xoài nhạt hơn tôi mong đợi nhưng vẫn ổn.", date: "18/06/2025", status: "Chờ duyệt" },
  { id: 4, product: "Combo sinh nhật mini", user: "Phạm Thu Hà", rating: 5, comment: "Đặt tiệc sinh nhật cho con, mọi người khen nức nở!", date: "17/06/2025", status: "Chờ duyệt" },
  { id: 5, product: "Bánh tart trứng", user: "Vũ Đức Minh", rating: 2, comment: "Vỏ tart bị mềm do ship xa, mong shop cải thiện.", date: "16/06/2025", status: "Ẩn" },
];

const vouchers = [
  { code: "CAKE10", type: "Phần trăm", value: "10%", min: "0đ", used: 42, limit: 100, expiry: "31/07/2025", status: "Đang hoạt động" },
  { code: "COFFEE20", type: "Phần trăm", value: "20%", min: "50.000đ", used: 18, limit: 50, expiry: "30/06/2025", status: "Đang hoạt động" },
  { code: "COMBO15", type: "Phần trăm", value: "15%", min: "80.000đ", used: 9, limit: 30, expiry: "15/07/2025", status: "Đang hoạt động" },
  { code: "NEWUSER50", type: "Cố định", value: "50.000đ", min: "100.000đ", used: 5, limit: 20, expiry: "31/12/2025", status: "Đang hoạt động" },
  { code: "SUMMER30", type: "Phần trăm", value: "30%", min: "200.000đ", used: 30, limit: 30, expiry: "30/06/2025", status: "Hết lượt" },
];

const banners = [
  { id: 1, title: "Flash Sale 14:00 – Cafe giảm 20%", position: "Hero chính", status: "Hiển thị", start: "01/06/2025", end: "30/06/2025", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=180&h=80&fit=crop&auto=format" },
  { id: 2, title: "Combo sinh nhật mini từ 399.000đ", position: "Banner phụ 1", status: "Hiển thị", start: "01/06/2025", end: "31/07/2025", img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=180&h=80&fit=crop&auto=format" },
  { id: 3, title: "Matcha mới – Thử ngay!", position: "Banner phụ 2", status: "Ẩn", start: "15/06/2025", end: "15/07/2025", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=180&h=80&fit=crop&auto=format" },
  { id: 4, title: "Voucher CAKE10 toàn bộ bánh", position: "Popup", status: "Hiển thị", start: "01/06/2025", end: "31/07/2025", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=180&h=80&fit=crop&auto=format" },
];

const categories = [
  { id: 1, name: "Bánh sinh nhật", slug: "banh-sinh-nhat", count: 8, status: "Hiển thị" },
  { id: 2, name: "Bánh mousse", slug: "banh-mousse", count: 12, status: "Hiển thị" },
  { id: 3, name: "Bánh tart", slug: "banh-tart", count: 6, status: "Hiển thị" },
  { id: 4, name: "Bánh quy", slug: "banh-quy", count: 9, status: "Hiển thị" },
  { id: 5, name: "Cafe", slug: "cafe", count: 15, status: "Hiển thị" },
  { id: 6, name: "Trà", slug: "tra", count: 7, status: "Hiển thị" },
  { id: 7, name: "Đồ uống khác", slug: "do-uong-khac", count: 5, status: "Ẩn" },
  { id: 8, name: "Combo", slug: "combo", count: 4, status: "Hiển thị" },
];

const options = [
  { id: 1, name: "Size", values: "S / M / L", applies: "Cafe, Trà, Đồ uống khác", type: "Size" },
  { id: 2, name: "Đường", values: "Ít / Bình thường / Nhiều", applies: "Cafe, Trà, Đồ uống khác", type: "Tùy chỉnh" },
  { id: 3, name: "Đá", values: "Ít đá / Bình thường / Nhiều đá", applies: "Cafe, Trà, Đồ uống khác", type: "Tùy chỉnh" },
  { id: 4, name: "Size bánh", values: "4 inch / 6 inch / 8 inch", applies: "Bánh sinh nhật, Bánh mousse", type: "Size" },
  { id: 5, name: "Lời chúc", values: "Nhập văn bản", applies: "Bánh sinh nhật", type: "Text" },
  { id: 6, name: "Topping", values: "Dâu / Việt quất / Kiwi / Không", applies: "Bánh tart, Bánh mousse", type: "Topping" },
];

const statusColor: Record<string, string> = {
  "Đang giao": "bg-blue-100 text-blue-700",
  "Đang chuẩn bị": "bg-yellow-100 text-yellow-700",
  "Hoàn thành": "bg-green-100 text-green-700",
  "Xác nhận": "bg-purple-100 text-purple-700",
  "Huỷ": "bg-red-100 text-red-700",
  "Đang bán": "bg-green-100 text-green-700",
  "Hết hàng": "bg-red-100 text-red-700",
  "Đặt trước": "bg-yellow-100 text-yellow-700",
  "Hoạt động": "bg-green-100 text-green-700",
  "VIP": "bg-amber-100 text-amber-700",
  "Mới": "bg-blue-100 text-blue-700",
  "Đã duyệt": "bg-green-100 text-green-700",
  "Chờ duyệt": "bg-yellow-100 text-yellow-700",
  "Ẩn": "bg-gray-100 text-gray-700",
  "Đang hoạt động": "bg-green-100 text-green-700",
  "Hết lượt": "bg-red-100 text-red-700",
  "Hiển thị": "bg-green-100 text-green-700",
};

function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${statusColor[status] ?? "bg-gray-100 text-gray-600"}`}>{status}</span>;
}

function AdminBtn({ children, variant = "primary", onClick }: any) {
  const cls = variant === "primary"
    ? "bg-primary text-primary-foreground hover:bg-primary/80"
    : variant === "danger"
    ? "bg-red-100 text-red-700 hover:bg-red-200"
    : "bg-sidebar-accent text-primary-foreground hover:bg-sidebar-accent/80";
  return <button onClick={onClick} className={`rounded-lg px-3 py-1.5 text-sm transition ${cls}`}>{children}</button>;
}

function TableHeader({ cols }: { cols: string[] }) {
  return <thead><tr className="border-b border-sidebar-accent">{cols.map(c => <th key={c} className="pb-3 text-left text-xs uppercase tracking-wider text-muted-foreground">{c}</th>)}</tr></thead>;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const stats = [
    { label: "Doanh thu hôm nay", value: "4.820.000đ", delta: "+12%", icon: DollarSign },
    { label: "Tổng đơn hàng", value: "42", delta: "+8 hôm nay", icon: ShoppingBag },
    { label: "Sản phẩm", value: "128", delta: "3 sắp hết", icon: Package },
    { label: "Khách hàng mới", value: "7", delta: "+2 so hôm qua", icon: Users },
  ];
  const weekly = [
    { day: "T2", revenue: 3200000, orders: 28 },
    { day: "T3", revenue: 4100000, orders: 35 },
    { day: "T4", revenue: 3800000, orders: 31 },
    { day: "T5", revenue: 5200000, orders: 44 },
    { day: "T6", revenue: 6400000, orders: 52 },
    { day: "T7", revenue: 7800000, orders: 63 },
    { day: "CN", revenue: 4820000, orders: 42 },
  ];
  const maxRev = Math.max(...weekly.map(d => d.revenue));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
       <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
       <span className="text-sm text-muted-foreground">Cập nhật: 24/06/2025 — 14:32</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, delta, icon: Icon }) => (
         <div key={label} className="rounded-2xl bg-sidebar p-5 transition hover:bg-sidebar-accent">
            <div className="flex items-center justify-between">
             <p className="text-sm text-muted-foreground">{label}</p>
             <span className="rounded-xl bg-sidebar-accent p-2"><Icon size={16} className="text-primary" /></span>
            </div>
           <h3 className="mt-3 text-2xl font-bold text-foreground">{value}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-green-400"><TrendingUp size={12} />{delta}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
       <div className="rounded-2xl bg-sidebar p-5">
         <h3 className="mb-4 font-semibold text-foreground">Doanh thu 7 ngày qua</h3>
          <div className="flex items-end gap-3 h-40">
            {weekly.map(d => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
               <span className="text-xs text-muted-foreground">{(d.revenue / 1000000).toFixed(1)}M</span>
                <div className="w-full rounded-t-lg bg-primary opacity-80 transition hover:opacity-100" style={{ height: `${(d.revenue / maxRev) * 100}%` }} />
               <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
       <div className="rounded-2xl bg-sidebar p-5">
         <h3 className="mb-4 font-semibold text-foreground">Đơn hàng gần đây</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="flex items-center justify-between text-sm">
                <div>
                 <p className="text-foreground">{o.id} · {o.customer}</p>
                 <p className="text-xs text-muted-foreground">{o.time} — {o.items.slice(0, 22)}…</p>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
       <div className="rounded-2xl bg-sidebar p-5">
          <Loader2 className="animate-spin text-primary mb-2" size={18} />
         <p className="text-sm text-muted-foreground">Đang tải dữ liệu báo cáo tháng…</p>
        </div>
       <div className="rounded-2xl bg-sidebar p-5 flex items-center gap-3">
          <AlertCircle className="text-yellow-400 shrink-0" size={18} />
         <p className="text-sm text-muted-foreground">3 sản phẩm sắp hết hàng. Kiểm tra ngay.</p>
        </div>
       <div className="rounded-2xl bg-sidebar p-5 flex items-center gap-3">
          <CheckCircle className="text-green-400 shrink-0" size={18} />
         <p className="text-sm text-muted-foreground">Tất cả cổng thanh toán hoạt động bình thường.</p>
        </div>
      </div>
    </div>
  );
}

// ── Products ──────────────────────────────────────────────────────────────────
function AdminProducts() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-foreground">Quản lý sản phẩm</h2>
        <AdminBtn><span className="flex items-center gap-1"><Plus size={14} />Thêm sản phẩm</span></AdminBtn>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-sidebar px-3 py-2 text-sm"><Search size={14} className="text-muted-foreground" /><input className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground" placeholder="Tìm sản phẩm…" value={search} onChange={e => setSearch(e.target.value)} /></div>
        <select className="rounded-xl bg-sidebar px-3 py-2 text-sm text-foreground outline-none"><option>Tất cả danh mục</option>{categories.map(c => <option key={c.id}>{c.name}</option>)}</select>
        <select className="rounded-xl bg-sidebar px-3 py-2 text-sm text-foreground outline-none"><option>Tất cả trạng thái</option><option>Đang bán</option><option>Hết hàng</option><option>Đặt trước</option></select>
      </div>
      <div className="overflow-auto rounded-2xl bg-sidebar">
        <table className="w-full text-sm">
          <TableHeader cols={["Sản phẩm", "Danh mục", "Giá", "Tồn kho", "Trạng thái", "Thao tác"]} />
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-t border-sidebar-accent hover:bg-sidebar-accent transition">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <img src={p.img} alt={p.name} className="size-10 rounded-lg object-cover" />
                    <span className="text-foreground">{p.name}</span>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{p.cat}</td>
                <td className="py-3 font-semibold text-primary">{p.price}</td>
                <td className="py-3 text-muted-foreground">{p.stock === 999 ? "∞" : p.stock}</td>
                <td className="py-3"><StatusBadge status={p.status} /></td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <AdminBtn variant="ghost"><Eye size={14} /></AdminBtn>
                    <AdminBtn variant="ghost"><Edit size={14} /></AdminBtn>
                    <AdminBtn variant="danger"><Trash2 size={14} /></AdminBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">{filtered.length} sản phẩm</p>
    </div>
  );
}

// ── Categories ────────────────────────────────────────────────────────────────
function AdminCategories() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Quản lý danh mục</h2>
        <AdminBtn><span className="flex items-center gap-1"><Plus size={14} />Thêm danh mục</span></AdminBtn>
      </div>
      <div className="overflow-auto rounded-2xl bg-sidebar">
        <table className="w-full text-sm">
          <TableHeader cols={["#", "Tên danh mục", "Slug", "Số sản phẩm", "Trạng thái", "Thao tác"]} />
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-t border-sidebar-accent hover:bg-sidebar-accent transition">
                <td className="py-3 text-muted-foreground">{c.id}</td>
                <td className="py-3 font-medium text-foreground">{c.name}</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">{c.slug}</td>
                <td className="py-3 text-muted-foreground">{c.count}</td>
                <td className="py-3"><StatusBadge status={c.status} /></td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <AdminBtn variant="ghost"><Edit size={14} /></AdminBtn>
                    <AdminBtn variant="danger"><Trash2 size={14} /></AdminBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Options ───────────────────────────────────────────────────────────────────
function AdminOptions() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Quản lý tùy chọn sản phẩm</h2>
        <AdminBtn><span className="flex items-center gap-1"><Plus size={14} />Thêm tùy chọn</span></AdminBtn>
      </div>
      <div className="overflow-auto rounded-2xl bg-sidebar">
        <table className="w-full text-sm">
          <TableHeader cols={["#", "Tên tùy chọn", "Kiểu", "Giá trị", "Áp dụng cho", "Thao tác"]} />
          <tbody>
            {options.map(o => (
              <tr key={o.id} className="border-t border-sidebar-accent hover:bg-sidebar-accent transition">
                <td className="py-3 text-muted-foreground">{o.id}</td>
                <td className="py-3 font-medium text-foreground">{o.name}</td>
                <td className="py-3"><span className="rounded-full bg-sidebar-accent px-2 py-0.5 text-xs text-primary">{o.type}</span></td>
                <td className="py-3 text-muted-foreground">{o.values}</td>
                <td className="py-3 text-xs text-muted-foreground">{o.applies}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <AdminBtn variant="ghost"><Edit size={14} /></AdminBtn>
                    <AdminBtn variant="danger"><Trash2 size={14} /></AdminBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-2xl bg-sidebar p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Thêm tùy chọn mới</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input className="rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Tên tùy chọn" />
          <select className="rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none"><option>Kiểu: Size</option><option>Tùy chỉnh</option><option>Topping</option><option>Text</option></select>
          <input className="rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Giá trị (ngăn cách bằng /)" />
          <AdminBtn>Lưu tùy chọn</AdminBtn>
        </div>
      </div>
    </div>
  );
}

// ── Orders ────────────────────────────────────────────────────────────────────
function AdminOrders() {
  const [filter, setFilter] = useState("Tất cả");
  const tabs = ["Tất cả", "Xác nhận", "Đang chuẩn bị", "Đang giao", "Hoàn thành", "Huỷ"];
  const filtered = filter === "Tất cả" ? orders : orders.filter(o => o.status === filter);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Quản lý đơn hàng</h2>
        <div className="flex items-center gap-2 rounded-xl bg-sidebar px-3 py-2 text-sm"><Search size={14} className="text-muted-foreground" /><input className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-40" placeholder="Tìm đơn #SB…" /></div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`rounded-full px-3 py-1.5 text-sm transition ${filter === t ? "bg-primary text-primary-foreground" : "bg-sidebar text-muted-foreground hover:bg-sidebar-accent"}`}>{t}</button>
        ))}
      </div>
      <div className="overflow-auto rounded-2xl bg-sidebar">
        <table className="w-full text-sm">
          <TableHeader cols={["Mã đơn", "Khách hàng", "Sản phẩm", "Tổng tiền", "Giờ", "Trạng thái", "Thao tác"]} />
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-t border-sidebar-accent hover:bg-sidebar-accent transition">
                <td className="py-3 font-mono text-xs text-primary">{o.id}</td>
                <td className="py-3 text-foreground">{o.customer}</td>
                <td className="py-3 text-muted-foreground max-w-[200px] truncate">{o.items}</td>
                <td className="py-3 font-semibold text-foreground">{o.total}</td>
                <td className="py-3 text-muted-foreground">{o.time}</td>
                <td className="py-3"><StatusBadge status={o.status} /></td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <AdminBtn variant="ghost"><Eye size={14} /></AdminBtn>
                    <AdminBtn variant="ghost"><Edit size={14} /></AdminBtn>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">Không có đơn hàng nào trong trạng thái này.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Users ─────────────────────────────────────────────────────────────────────
function AdminUsers() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Quản lý người dùng</h2>
        <div className="flex items-center gap-2 rounded-xl bg-sidebar px-3 py-2 text-sm"><Search size={14} className="text-muted-foreground" /><input className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-44" placeholder="Tìm tên, email…" /></div>
      </div>
      <div className="overflow-auto rounded-2xl bg-sidebar">
        <table className="w-full text-sm">
          <TableHeader cols={["#", "Họ tên", "Email", "SĐT", "Đơn hàng", "Tổng chi", "Tham gia", "Phân loại", "Thao tác"]} />
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t border-sidebar-accent hover:bg-sidebar-accent transition">
                <td className="py-3 text-muted-foreground">{u.id}</td>
                <td className="py-3 font-medium text-foreground">{u.name}</td>
                <td className="py-3 text-muted-foreground">{u.email}</td>
                <td className="py-3 text-muted-foreground">{u.phone}</td>
                <td className="py-3 text-center text-muted-foreground">{u.orders}</td>
                <td className="py-3 text-primary font-medium">{u.total}</td>
                <td className="py-3 text-muted-foreground">{u.joined}</td>
                <td className="py-3"><StatusBadge status={u.status} /></td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <AdminBtn variant="ghost"><Eye size={14} /></AdminBtn>
                    <AdminBtn variant="danger"><XCircle size={14} /></AdminBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Reviews ───────────────────────────────────────────────────────────────────
function AdminReviews() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Quản lý đánh giá</h2>
        <div className="flex gap-2">
          <span className="rounded-full bg-yellow-900/50 px-3 py-1.5 text-xs text-yellow-300">2 chờ duyệt</span>
        </div>
      </div>
      <div className="grid gap-4">
        {reviews.map(r => (
          <div key={r.id} className="rounded-2xl bg-sidebar p-5 transition hover:bg-sidebar-accent">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/20 grid place-items-center text-primary text-xs font-bold">{r.user[0]}</div>
                  <div>
                    <p className="font-medium text-foreground">{r.user}</p>
                    <p className="text-xs text-muted-foreground">{r.date} · {r.product}</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < r.rating ? "fill-[sidebar-primary] text-[sidebar-primary]" : "text-[sidebar-accent]"} />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={r.status} />
                <div className="flex gap-2 mt-1">
                  {r.status === "Chờ duyệt" && <AdminBtn><CheckCircle size={14} /></AdminBtn>}
                  <AdminBtn variant="ghost"><Edit size={14} /></AdminBtn>
                  <AdminBtn variant="danger"><Trash2 size={14} /></AdminBtn>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Vouchers ──────────────────────────────────────────────────────────────────
function AdminVouchers() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Quản lý voucher</h2>
        <AdminBtn><span className="flex items-center gap-1"><Plus size={14} />Tạo voucher</span></AdminBtn>
      </div>
      <div className="overflow-auto rounded-2xl bg-sidebar">
        <table className="w-full text-sm">
          <TableHeader cols={["Mã", "Kiểu", "Giá trị", "Đơn tối thiểu", "Đã dùng", "Giới hạn", "Hết hạn", "Trạng thái", "Thao tác"]} />
          <tbody>
            {vouchers.map(v => (
              <tr key={v.code} className="border-t border-sidebar-accent hover:bg-sidebar-accent transition">
                <td className="py-3 font-mono font-bold text-primary">{v.code}</td>
                <td className="py-3 text-muted-foreground">{v.type}</td>
                <td className="py-3 font-semibold text-foreground">{v.value}</td>
                <td className="py-3 text-muted-foreground">{v.min}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-[sidebar-accent]">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(v.used / v.limit) * 100}%` }} />
                    </div>
                    <span className="text-muted-foreground">{v.used}/{v.limit}</span>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{v.limit}</td>
                <td className="py-3 text-muted-foreground">{v.expiry}</td>
                <td className="py-3"><StatusBadge status={v.status} /></td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <AdminBtn variant="ghost"><Edit size={14} /></AdminBtn>
                    <AdminBtn variant="danger"><Trash2 size={14} /></AdminBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-2xl bg-sidebar p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Tạo voucher mới</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <input className="rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Mã voucher (VD: SUMMER30)" />
          <select className="rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none"><option>Loại: Phần trăm (%)</option><option>Cố định (đ)</option></select>
          <input className="rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Giá trị (VD: 20)" />
          <input className="rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Đơn tối thiểu (đ)" />
          <input className="rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Giới hạn lượt dùng" />
          <input className="rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none" type="date" />
          <div className="sm:col-span-2 lg:col-span-1">
            <AdminBtn>Tạo voucher</AdminBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Banners ───────────────────────────────────────────────────────────────────
function AdminBanners() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Quản lý banner</h2>
        <AdminBtn><span className="flex items-center gap-1"><Plus size={14} />Thêm banner</span></AdminBtn>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {banners.map(b => (
          <div key={b.id} className="rounded-2xl bg-sidebar overflow-hidden transition hover:bg-sidebar-accent">
            <img src={b.img} alt={b.title} className="h-28 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{b.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{b.position} · {b.start} → {b.end}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
              <div className="mt-3 flex gap-2">
                <AdminBtn variant="ghost"><Edit size={14} /></AdminBtn>
                <AdminBtn variant="ghost"><ToggleLeft size={14} /></AdminBtn>
                <AdminBtn variant="danger"><Trash2 size={14} /></AdminBtn>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-dashed border-sidebar-accent p-8 text-center">
        <Image size={24} className="mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">Kéo thả hoặc <span className="text-primary cursor-pointer">chọn ảnh</span> để tạo banner mới</p>
      </div>
    </div>
  );
}

// ── Revenue ───────────────────────────────────────────────────────────────────
function AdminRevenue() {
  const monthly = [
    { month: "T1", revenue: 42000000, orders: 310 },
    { month: "T2", revenue: 38000000, orders: 280 },
    { month: "T3", revenue: 55000000, orders: 420 },
    { month: "T4", revenue: 61000000, orders: 470 },
    { month: "T5", revenue: 72000000, orders: 560 },
    { month: "T6", revenue: 48000000, orders: 380 },
  ];
  const max = Math.max(...monthly.map(m => m.revenue));
  const topProducts = [
    { name: "Combo Tiramisu + Latte", revenue: "8.900.000đ", units: 100 },
    { name: "Bánh sinh nhật socola", revenue: "7.000.000đ", units: 20 },
    { name: "Cafe Latte", revenue: "6.600.000đ", units: 120 },
    { name: "Matcha Latte", revenue: "4.720.000đ", units: 80 },
    { name: "Combo sinh nhật mini", revenue: "3.990.000đ", units: 10 },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Thống kê doanh thu</h2>
        <select className="rounded-xl bg-sidebar px-3 py-2 text-sm text-foreground outline-none"><option>6 tháng gần nhất</option><option>12 tháng</option><option>Năm 2025</option></select>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Tổng doanh thu", "316.000.000đ", "+18% so tháng trước"], ["Tổng đơn hàng", "2.420", "+24 đơn hôm nay"], ["Giá trị trung bình", "130.578đ", "mỗi đơn hàng"]].map(([l, v, s]) => (
          <div key={l} className="rounded-2xl bg-sidebar p-5">
            <p className="text-sm text-muted-foreground">{l}</p>
            <h3 className="mt-2 text-2xl font-bold text-foreground">{v}</h3>
            <p className="mt-1 text-xs text-green-400">{s}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-sidebar p-5">
        <h3 className="mb-5 font-semibold text-foreground">Doanh thu theo tháng</h3>
        <div className="flex items-end gap-4 h-48">
          {monthly.map(d => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">{(d.revenue / 1000000).toFixed(0)}M</span>
              <div className="w-full rounded-t-xl bg-primary transition hover:opacity-90" style={{ height: `${(d.revenue / max) * 100}%` }} />
              <span className="text-xs text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-sidebar p-5">
        <h3 className="mb-4 font-semibold text-foreground">Top sản phẩm bán chạy</h3>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="w-5 text-center text-xs font-bold text-muted-foreground">#{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{p.name}</span>
                  <span className="font-semibold text-primary">{p.revenue}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-[sidebar-accent]">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(p.units / 120) * 100}%` }} />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{p.units} sp</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Settings ──────────────────────────────────────────────────────────────────
function AdminSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Cài đặt hệ thống</h2>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-sidebar p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Thông tin cửa hàng</h3>
          {["Tên cửa hàng", "Email liên hệ", "Số điện thoại", "Địa chỉ"].map((label, i) => (
            <div key={label}>
              <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
              <input className="w-full rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none" defaultValue={["Sweet Bean Coffee & Cake", "hello@sweetbean.vn", "0909 888 777", "123 Nguyễn Huệ, Q1, TP.HCM"][i]} />
            </div>
          ))}
          <AdminBtn>Lưu thay đổi</AdminBtn>
        </div>
        <div className="rounded-2xl bg-sidebar p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Cấu hình giao hàng</h3>
          {[["Phí giao hàng cơ bản", "25.000đ"], ["Miễn phí từ", "200.000đ"], ["Bán kính giao (km)", "15"], ["Thời gian giao (phút)", "45-90"]].map(([l, v]) => (
            <div key={l}>
              <label className="mb-1 block text-xs text-muted-foreground">{l}</label>
              <input className="w-full rounded-xl bg-sidebar-accent px-3 py-2 text-sm text-foreground outline-none" defaultValue={v} />
            </div>
          ))}
          <AdminBtn>Lưu cấu hình</AdminBtn>
        </div>
        <div className="rounded-2xl bg-sidebar p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Cổng thanh toán</h3>
          {[["COD", true], ["Momo", true], ["VNPay", true], ["ZaloPay", false]].map(([name, active]) => (
            <div key={name as string} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{name as string}</span>
              <button className={`rounded-full px-3 py-1 text-xs transition ${active ? "bg-green-900/50 text-green-400" : "bg-sidebar-accent text-muted-foreground"}`}>{active ? "Bật" : "Tắt"}</button>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-sidebar p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Thông báo</h3>
          {["Email đơn hàng mới", "SMS xác nhận", "Thông báo hết hàng", "Báo cáo doanh thu hàng ngày"].map(n => (
            <div key={n} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{n}</span>
              <button className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">Bật</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main AdminPanel ───────────────────────────────────────────────────────────
const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "products", label: "Sản phẩm", icon: Package },
  { key: "categories", label: "Danh mục", icon: Tag },
  { key: "options", label: "Tùy chọn SP", icon: Settings },
  { key: "orders", label: "Đơn hàng", icon: ShoppingBag },
  { key: "users", label: "Người dùng", icon: Users },
  { key: "reviews", label: "Đánh giá", icon: Star },
  { key: "vouchers", label: "Voucher", icon: Tag },
  { key: "banners", label: "Banner", icon: Image },
  { key: "revenue", label: "Thống kê", icon: BarChart2 },
  { key: "settings", label: "Cài đặt", icon: Settings },
];

export function AdminPanel({ onExit }: { onExit: () => void }) {
  const [active, setActive] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);

  const content: Record<string, JSX.Element> = {
    dashboard: <Dashboard />,
    products: <AdminProducts />,
    categories: <AdminCategories />,
    options: <AdminOptions />,
    orders: <AdminOrders />,
    users: <AdminUsers />,
    reviews: <AdminReviews />,
    vouchers: <AdminVouchers />,
    banners: <AdminBanners />,
    revenue: <AdminRevenue />,
    settings: <AdminSettings />,
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Admin top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-sidebar-accent bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setMobileNav(!mobileNav)}>
            <ChevronDown size={20} className={`transition ${mobileNav ? "rotate-180" : ""}`} />
          </button>
          <span className="font-serif text-lg font-bold text-primary">Sweet Bean Admin</span>
        </div>
        <button onClick={onExit} className="rounded-full bg-sidebar px-4 py-1.5 text-sm text-muted-foreground hover:bg-sidebar-accent transition">
          ← Về website
        </button>
      </header>

      <div className="mx-auto grid max-w-screen-xl gap-0 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className={`${mobileNav ? "block" : "hidden"} lg:block bg-sidebar border-r border-sidebar-accent min-h-screen p-4`}>
          <nav className="space-y-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { setActive(key); setMobileNav(false); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active === key ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:bg-sidebar-accent"}`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="p-5 lg:p-7">
          {content[active]}
        </main>
      </div>
    </div>
  );
}
