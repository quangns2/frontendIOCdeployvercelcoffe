import { useEffect, useMemo, useState } from "react";
import {
  Search, Heart, ShoppingBag, User, Menu, Star, SlidersHorizontal,
  Minus, Plus, ChevronRight, Clock, Truck, CreditCard, PackageCheck,
  Coffee, CakeSlice, AlertCircle, Loader2, X, LogIn
} from "lucide-react";
import { AdminPanel } from "./components/AdminPanel";
import { AuthPage } from "./components/AuthPage";
import { ReviewPage } from "./components/ReviewPage";

// ── Data ──────────────────────────────────────────────────────────────────────
const categories = [
  { name: "Bánh sinh nhật", icon: "🎂", img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=280&h=180&fit=crop&auto=format" },
  { name: "Bánh mousse", icon: "🍮", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=280&h=180&fit=crop&auto=format" },
  { name: "Bánh tart", icon: "🥧", img: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=280&h=180&fit=crop&auto=format" },
  { name: "Bánh quy", icon: "🍪", img: "https://images.unsplash.com/photo-1590080875852-ba44f83ff2db?w=280&h=180&fit=crop&auto=format" },
  { name: "Cafe", icon: "☕", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=280&h=180&fit=crop&auto=format" },
  { name: "Trà", icon: "🍵", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=280&h=180&fit=crop&auto=format" },
  { name: "Đồ uống khác", icon: "🧋", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=280&h=180&fit=crop&auto=format" },
  { name: "Combo", icon: "🎁", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=280&h=180&fit=crop&auto=format" },
];

const products = [
  ["Bánh Tiramisu", "45.000đ", "Bánh mousse", "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=520&fit=crop&auto=format", "4.9", "Bán chạy"],
  ["Bánh Red Velvet", "55.000đ", "Bánh mousse", "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&h=520&fit=crop&auto=format", "4.8", "-10%"],
  ["Bánh sinh nhật socola", "350.000đ", "Bánh sinh nhật", "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&h=520&fit=crop&auto=format", "5.0", "Đặt trước"],
  ["Bánh mousse xoài", "60.000đ", "Bánh mousse", "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=520&fit=crop&auto=format", "4.7", "Mới"],
  ["Bánh tart trứng", "25.000đ", "Bánh tart", "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=600&h=520&fit=crop&auto=format", "4.8", "Hot"],
  ["Bánh quy bơ", "40.000đ", "Bánh quy", "https://images.unsplash.com/photo-1590080875852-ba44f83ff2db?w=600&h=520&fit=crop&auto=format", "4.6", "Còn hàng"],
  ["Cafe Latte", "55.000đ", "Cafe", "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=520&fit=crop&auto=format", "4.9", "S/M/L"],
  ["Cappuccino", "50.000đ", "Cafe", "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&h=520&fit=crop&auto=format", "4.8", "S/M/L"],
  ["Americano", "45.000đ", "Cafe", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=520&fit=crop&auto=format", "4.7", "S/M/L"],
  ["Matcha Latte", "59.000đ", "Trà", "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&h=520&fit=crop&auto=format", "4.9", "Mới"],
  ["Trà đào cam sả", "49.000đ", "Trà", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=520&fit=crop&auto=format", "4.8", "Mát lạnh"],
  ["Cold Brew", "60.000đ", "Cafe", "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=600&h=520&fit=crop&auto=format", "4.9", "Signature"],
  ["Combo Tiramisu + Latte", "89.000đ", "Combo", "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=520&fit=crop&auto=format", "5.0", "Combo"],
  ["Combo sinh nhật mini", "399.000đ", "Combo", "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&h=520&fit=crop&auto=format", "5.0", "Tiệc nhỏ"],
];

const navPages = ["Trang chủ", "Bánh ngọt", "Cafe/Đồ uống", "Combo"];
const heroBanners = [
  {
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1800&h=650&fit=crop&auto=format",
    alt: "Sweet Bean coffee and cakes",
  },
  {
    src: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=1800&h=650&fit=crop&auto=format",
    alt: "Fresh baked cookies and pastries",
  },
  {
    src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1800&h=650&fit=crop&auto=format",
    alt: "Dessert combo with coffee",
  },
];

// ── Shared components ─────────────────────────────────────────────────────────
function Btn({ children, variant = "primary", disabled = false, onClick, small = false }: any) {
  const cls = variant === "primary"
    ? "bg-primary text-primary-foreground hover:bg-primary/80"
    : variant === "ghost"
    ? "bg-transparent hover:bg-secondary text-foreground"
    : "bg-secondary text-secondary-foreground hover:bg-secondary/80";
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full ${small ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"} transition shadow-sm focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-45 ${cls}`}
    >
      {children}
    </button>
  );
}

function ProductCard({ p, compact = false, setView }: any) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <article
      onClick={() => setView?.("Chi tiết")}
      className="group cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-48 bg-muted">
        <img src={p[3]} alt={p[0]} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-primary">{p[5]}</span>
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          className={`absolute right-3 top-3 rounded-full p-2 transition ${wishlisted ? "bg-rose-100 text-rose-500" : "bg-card/90 hover:bg-accent"}`}
        >
          <Heart size={16} className={wishlisted ? "fill-rose-500" : ""} />
        </button>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{p[2]}</span>
          <span className="flex items-center gap-1"><Star className="fill-sidebar-primary text-sidebar-primary" size={14} />{p[4]}</span>
        </div>
        <h3 className="font-sans text-base">{p[0]}</h3>
        <div className="flex items-center justify-between">
          <b className="text-lg text-primary">{p[1]}</b>
          {!compact && (
            <div className="flex gap-2">
              <Btn small onClick={(e: any) => { e.stopPropagation(); setView?.("Giỏ hàng"); }}>Thêm</Btn>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Header({ view, setView }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button type="button" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Menu /></button>
        <button type="button" onClick={() => setView("Trang chủ")} className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><CakeSlice size={20} /></span>
          <span className="font-serif text-xl font-bold">Sweet Bean</span>
        </button>
        <nav className="hidden flex-1 justify-center gap-1 lg:flex">
          {navPages.map(v => (
            <button type="button" key={v} onClick={() => setView(v)} className={`rounded-full px-3 py-2 text-sm transition ${view === v ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{v}</button>
          ))}
        </nav>
        <div className="hidden w-56 items-center gap-2 rounded-full border bg-card px-3 py-2 md:flex">
          <Search size={16} /><span className="text-sm text-muted-foreground">Tìm bánh, cafe...</span>
        </div>
        <button
          type="button"
          onClick={() => setView("Yêu thích")}
          className={`relative rounded-full p-2 transition ${view === "Yêu thích" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
          title="Yêu thích"
        >
          <Heart size={20} className={view === "Yêu thích" ? "fill-current" : ""} />
          <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">4</span>
        </button>
        <button
          type="button"
          onClick={() => setView("Giỏ hàng")}
          className={`relative rounded-full p-2 transition ${view === "Giỏ hàng" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
          title="Giỏ hàng"
        >
          <ShoppingBag size={20} />
          <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
        </button>
        <button type="button" onClick={() => setView("Đăng nhập")} className="hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm hover:bg-secondary transition">
          <LogIn size={14} /> Đăng nhập
        </button>
        <button type="button" onClick={() => setView("Hồ sơ")} className={`rounded-full p-2 transition ${view === "Hồ sơ" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"}`} title="Hồ sơ">
          <User size={18} />
        </button>
      </div>
      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="border-t bg-background p-4 lg:hidden">
          <nav className="grid grid-cols-2 gap-2">
            {navPages.map(v => (
              <button type="button" key={v} onClick={() => { setView(v); setMobileOpen(false); }} className={`rounded-xl p-2.5 text-sm text-left transition ${view === v ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"}`}>{v}</button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-primary"><CakeSlice size={16} className="text-primary-foreground" /></span>
              <span className="font-serif text-xl font-bold">Sweet Bean</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-sidebar-foreground/70">Bánh tươi mỗi ngày, cafe thơm ngon, giao tận nơi trong 2 giờ tại TP.HCM.</p>
            <div className="mt-4 flex gap-3">
              {["FB", "IG", "TT"].map(s => <button key={s} className="size-8 rounded-full bg-sidebar-accent text-xs text-sidebar-foreground hover:bg-primary transition">{s}</button>)}
            </div>
          </div>
          {[
            { title: "Cửa hàng", links: ["Bánh sinh nhật", "Bánh mousse", "Cafe & Trà", "Combo ưu đãi"] },
            { title: "Hỗ trợ", links: ["Theo dõi đơn hàng", "Chính sách đổi trả", "Hướng dẫn đặt bánh", "Liên hệ chúng tôi"] },
            { title: "Voucher", links: ["CAKE10 — giảm 10%", "COFFEE20 — giảm 20%", "COMBO15 — giảm 15%", "NEWUSER50 — -50k"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map(l => <li key={l} className="text-sm text-sidebar-foreground/65 hover:text-sidebar-foreground cursor-pointer transition">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-sidebar-accent pt-6 text-xs text-sidebar-foreground/55">
          <p>© 2025 Sweet Bean Coffee & Cake. All rights reserved.</p>
          <div className="flex gap-4">
            {["Điều khoản", "Bảo mật", "Cookie"].map(l => <span key={l} className="cursor-pointer hover:text-sidebar-foreground transition">{l}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Section({ title, children, sub }: any) {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-9 sm:px-6 lg:px-10">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[.22em] text-primary">Sweet Bean</p>
          <h2 className="mt-1 text-3xl md:text-4xl">{title}</h2>
          {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
        </div>
        <Btn variant="secondary">Xem tất cả</Btn>
      </div>
      {children}
    </section>
  );
}

// ── Pages ─────────────────────────────────────────────────────────────────────
function Home({ setView }: any) {
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % heroBanners.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      {/* ── Single full-width hero banner ── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[430px] w-full md:h-[520px]">
          {heroBanners.map((banner, index) => (
            <img
              key={banner.src}
              src={banner.src}
              alt={banner.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeBanner === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sidebar/95 via-sidebar/70 to-sidebar/20" />
        <div className="absolute inset-0 bg-black/20" />
        {/* Content */}
        <div className="absolute inset-0 mx-auto flex w-full max-w-[1500px] flex-col justify-center px-5 sm:px-6 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[.3em] text-primary-foreground/85 drop-shadow">Sweet Bean Coffee & Cake</p>
          <h1 className="mt-4 max-w-2xl text-4xl leading-tight text-primary-foreground drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)] md:text-6xl">
            Bánh tươi mỗi ngày,<br />Cafe thơm ngon.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-primary-foreground/85 drop-shadow md:text-lg">
            Giao tận nơi trong 2 giờ — Nướng mới mỗi sáng — Đóng gói quà tặng.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => setView("Bánh ngọt")} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 shadow-lg">
              Đặt bánh ngay
            </button>
            <button onClick={() => setView("Cafe/Đồ uống")} className="rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/20 backdrop-blur">
              Khám phá cafe
            </button>
          </div>
          {/* Flash sale badge */}
          <div className="mt-6 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-primary-foreground/25 bg-sidebar/55 px-4 py-2 text-xs text-primary-foreground/90 shadow-lg backdrop-blur">
            <span className="size-2 rounded-full bg-green-400 animate-pulse" />
            Flash sale 14:00 hôm nay — Giảm 20% cafe khi mua cùng bánh. Dùng mã <b className="text-primary ml-1">COFFEE20</b>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 z-10 flex w-full max-w-[1500px] -translate-x-1/2 gap-2 px-5 sm:px-6 lg:px-10">
          {heroBanners.map((banner, index) => (
            <button
              key={banner.alt}
              type="button"
              aria-label={`Chuyển sang banner ${index + 1}`}
              onClick={() => setActiveBanner(index)}
              className={`h-2.5 rounded-full transition-all ${activeBanner === index ? "w-8 bg-primary" : "w-2.5 bg-primary-foreground/60 hover:bg-primary-foreground"}`}
            />
          ))}
        </div>
      </section>

      {/* ── Featured categories ── */}
      <Section title="Danh mục nổi bật" sub="Chọn món yêu thích của bạn">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setView(["Cafe", "Trà", "Đồ uống khác"].includes(c.name) ? "Cafe/Đồ uống" : c.name === "Combo" ? "Combo" : "Bánh ngọt")}
              className="group rounded-2xl border bg-card overflow-hidden text-center transition hover:border-primary hover:shadow-md"
            >
              <div className="relative h-24 bg-muted">
                <img src={c.img} alt={c.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
              <p className="p-2 text-xs font-semibold">{c.name}</p>
            </button>
          ))}
        </div>
      </Section>

      {/* ── Best sellers ── */}
      <Section title="Bán chạy hôm nay" sub="Được yêu thích nhất tuần này">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map(p => <ProductCard key={p[0]} p={p} setView={setView} />)}
        </div>
      </Section>

      {/* ── New + combos ── */}
      <Section title="Mới & Combo ưu đãi">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(8, 14).map(p => <ProductCard key={p[0]} p={p} setView={setView} />)}
        </div>
      </Section>

      {/* ── Why Sweet Bean ── */}
      <Section title="Vì sao chọn Sweet Bean">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            [Clock, "Nướng mới mỗi sáng", "Nguyên liệu tươi, không phẩm màu."],
            [Truck, "Giao nhanh nội thành", "Trong vòng 2 giờ tại TP.HCM."],
            [CreditCard, "COD, Momo, VNPay", "Thanh toán linh hoạt, an toàn."],
            [PackageCheck, "Đóng gói quà tặng", "Hộp quà đẹp, in thiệp miễn phí."],
          ].map(([I, t, sub]: any) => (
            <div key={t} className="rounded-2xl bg-card p-6 shadow-sm transition hover:shadow-md">
              <I className="text-primary" size={24} />
              <h3 className="mt-4 font-sans text-base">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Voucher banner ── */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-12">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider opacity-70">Ưu đãi thành viên</p>
              <h2 className="mt-3 text-3xl md:text-4xl text-primary-foreground">Nhận voucher ngay khi đăng ký!</h2>
              <p className="mt-3 text-primary-foreground/70">Đăng ký tài khoản để nhận mã giảm giá NEWUSER50 — tiết kiệm 50.000đ cho đơn đầu tiên.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              {["CAKE10", "COFFEE20", "COMBO15"].map(v => (
                <div key={v} className="rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 px-5 py-3 text-center backdrop-blur">
                  <p className="font-mono font-bold text-lg">{v}</p>
                  <p className="text-xs text-primary-foreground/60 mt-0.5">{v === "CAKE10" ? "Giảm 10% bánh" : v === "COFFEE20" ? "Giảm 20% cafe" : "Giảm 15% combo"}</p>
                </div>
              ))}
              <button className="rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-[#ecd0b4]">Đăng ký ngay</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Listing({ type, setView }: any) {
  const list = products.filter(p =>
    type === "cake" ? !["Cafe", "Trà"].includes(p[2])
    : type === "drink" ? ["Cafe", "Trà"].includes(p[2])
    : p[2] === "Combo"
  );
  const title = type === "cake" ? "Bánh ngọt" : type === "drink" ? "Cafe & Đồ uống" : "Combo";
  return (
    <>
      <div className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-sm text-muted-foreground">Trang chủ / {title}</p>
          <h1 className="mt-2 text-5xl">{title}</h1>
          <p className="mt-2 text-muted-foreground">{list.length} sản phẩm</p>
        </div>
      </div>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl border bg-card p-5">
          <h3 className="flex items-center gap-2 font-sans"><SlidersHorizontal size={18} /> Bộ lọc</h3>
          {["Loại", "Khoảng giá", "Đánh giá", "Còn hàng"].map(f => (
            <div key={f} className="mt-5 border-t pt-4">
              <p className="font-semibold text-sm">{f}</p>
              <label className="mt-2 flex gap-2 text-sm items-center"><input type="checkbox" defaultChecked /> Tất cả</label>
              <label className="mt-2 flex gap-2 text-sm items-center"><input type="checkbox" /> Đang giảm giá</label>
            </div>
          ))}
          <div className="mt-5 border-t pt-4">
            <Btn variant="secondary">Đặt lại bộ lọc</Btn>
          </div>
        </aside>
        <section>
          <div className="mb-5 flex flex-wrap justify-between gap-3 rounded-2xl border bg-card p-4">
            <span className="text-sm text-muted-foreground">{list.length} sản phẩm</span>
            <select className="rounded-full border bg-card px-3 text-sm py-1 outline-none">
              <option>Phổ biến nhất</option>
              <option>Giá thấp → cao</option>
              <option>Giá cao → thấp</option>
              <option>Mới nhất</option>
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map(p => <ProductCard key={p[0]} p={p} setView={setView} />)}
          </div>
          <div className="mt-8 flex justify-center gap-2">
            <Btn>1</Btn><Btn variant="secondary">2</Btn><Btn variant="secondary">Tiếp →</Btn>
          </div>
        </section>
      </main>
    </>
  );
}

function Detail({ setView }: any) {
  const p = products[2];
  const [qty, setQty] = useState(1);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <p className="text-sm text-muted-foreground">Trang chủ / Bánh sinh nhật / {p[0]}</p>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 md:grid-cols-[90px_1fr]">
          <div className="grid grid-cols-4 gap-3 md:grid-cols-1">
            {products.slice(0, 4).map(x => <img key={x[0]} className="h-20 rounded-xl object-cover cursor-pointer hover:ring-2 hover:ring-primary transition" src={x[3]} alt={x[0]} />)}
          </div>
          <img className="h-[480px] w-full rounded-[2rem] object-cover" src={p[3]} alt={p[0]} />
        </div>
        <div className="rounded-[2rem] border bg-card p-7 h-fit">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{p[2]}</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Còn hàng</span>
          </div>
          <h1 className="mt-3 text-5xl">{p[0]}</h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-sidebar-primary text-sidebar-primary" />)}</div>
            <span className="text-sm text-muted-foreground">5.0 · 128 đánh giá</span>
          </div>
          <p className="mt-5 text-4xl font-extrabold text-primary">{p[1]}</p>
          <p className="mt-4 text-muted-foreground leading-7">Cốt bánh cacao ẩm, kem chocolate Bỉ, trang trí trái cây theo mùa. Phù hợp sinh nhật 4–6 người. Giao trong hộp carton cứng, đảm bảo không bị méo.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Lời chúc</label>
              <input className="w-full rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary" placeholder="VD: Happy Birthday!" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Ngày giao</label>
              <input className="w-full rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary" type="datetime-local" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Size bánh</label>
              <select className="w-full rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary">
                <option>6 inch (4–6 người)</option><option>8 inch (6–8 người)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Số lượng</label>
              <div className="flex items-center gap-3 rounded-xl border bg-input-background p-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-full border p-1.5 hover:bg-secondary transition"><Minus size={14} /></button>
                <span className="flex-1 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="rounded-full border p-1.5 hover:bg-secondary transition"><Plus size={14} /></button>
              </div>
            </div>
          </div>
          <div className="mt-7 flex gap-3">
            <Btn onClick={() => setView("Giỏ hàng")}>Thêm giỏ hàng</Btn><Btn variant="secondary" onClick={() => setView("Giỏ hàng")}>Mua ngay</Btn>
          </div>
        </div>
      </div>
      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.22em] text-primary">Đánh giá</p>
              <h2 className="mt-1 text-3xl">Khách hàng nói gì</h2>
            </div>
            <div className="text-right">
              <p className="text-4xl font-extrabold text-primary">5.0</p>
              <div className="mt-1 flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={15} className="fill-sidebar-primary text-sidebar-primary" />)}</div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {[
              ["Nguyễn Minh Anh", "Bánh ngon, kem mịn, giao đúng giờ và hộp đóng gói rất đẹp."],
              ["Trần Thị Bình", "Đặt sinh nhật cho bé, cả nhà đều thích. Vị chocolate vừa miệng."],
              ["Lê Văn Cường", "Ảnh thực tế giống mẫu, phần trang trí trái cây tươi."],
            ].map(([name, comment]) => (
              <div key={name} className="rounded-2xl border bg-background p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{name[0]}</span>
                    <div>
                      <p className="font-semibold">{name}</p>
                      <p className="text-xs text-green-600">Đã mua hàng</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={13} className="fill-sidebar-primary text-sidebar-primary" />)}</div>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{comment}</p>
              </div>
            ))}
          </div>
        </div>
        <form className="h-fit rounded-[2rem] border bg-card p-6">
          <h3 className="font-sans text-xl">Viết đánh giá</h3>
          <p className="mt-1 text-sm text-muted-foreground">Chia sẻ trải nghiệm của bạn sau khi nhận bánh.</p>
          <div className="mt-4 flex gap-1">{[1,2,3,4,5].map(i => <button type="button" key={i}><Star size={24} className="fill-sidebar-primary text-sidebar-primary" /></button>)}</div>
          <textarea className="mt-4 w-full resize-none rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary" rows={5} placeholder="Nhận xét của bạn..." />
          <Btn>Gửi đánh giá</Btn>
        </form>
      </section>
      <Section title="Sản phẩm liên quan">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map(p => <ProductCard key={p[0]} p={p} setView={setView} />)}
        </div>
      </Section>
    </main>
  );
}

function CartCheckout({ checkout = false, setView }: any) {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_380px]">
      <section className="rounded-2xl border bg-card p-6">
        <h1 className="text-4xl">{checkout ? "Thanh toán" : "Giỏ hàng"}</h1>
        {checkout ? (
          <div className="mt-6 grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary" placeholder="Họ tên người nhận" />
              <input className="rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary" placeholder="Số điện thoại" />
            </div>
            <input className="rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary" placeholder="Địa chỉ giao hàng chi tiết" />
            <input className="rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary" type="datetime-local" />
            <textarea className="rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary resize-none" rows={3} placeholder="Ghi chú đơn hàng (tuỳ chọn)" />
            <div>
              <p className="mb-3 font-semibold text-sm">Phương thức thanh toán</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["COD", "Momo", "VNPay", "ZaloPay"].map((m, i) => (
                  <button key={m} className={`rounded-xl border p-3 text-sm font-medium transition ${i === 0 ? "border-primary bg-secondary text-primary" : "hover:bg-secondary"}`}>{m}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-[#eef7ed] p-4 text-sm text-[#355c31] flex items-center gap-2">
              <span>✓</span> Đơn hàng <b>#SB1024</b> đã được ghi nhận. Shipper sẽ liên hệ sớm.
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {products.slice(0, 3).map(p => (
              <div key={p[0]} className="flex items-center gap-4 border-b pb-4">
                <img src={p[3]} className="size-20 rounded-xl object-cover" alt={p[0]} />
                <div className="flex-1">
                  <h3 className="font-sans">{p[0]}</h3>
                  <p className="text-sm text-muted-foreground">Size M · Ít đường</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="rounded-full border p-1 hover:bg-secondary"><Minus size={12} /></button>
                    <span className="text-sm">1</span>
                    <button className="rounded-full border p-1 hover:bg-secondary"><Plus size={12} /></button>
                  </div>
                </div>
                <div className="text-right">
                  <b className="text-primary">{p[1]}</b>
                  <button className="mt-2 block text-xs text-muted-foreground hover:text-destructive"><X size={14} /></button>
                </div>
              </div>
            ))}
            <div className="rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
              Mua thêm <b className="text-foreground">150.000đ</b> để được miễn phí giao hàng!
            </div>
          </div>
        )}
      </section>
      <aside className="h-fit rounded-2xl border bg-card p-6">
        <h2 className="font-sans text-2xl">Tóm tắt đơn</h2>
        <div className="mt-4 flex gap-2">
          <input className="flex-1 rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary" placeholder="Nhập mã voucher (VD: CAKE10)" />
          <Btn>Áp dụng</Btn>
        </div>
        <div className="my-5 space-y-3 text-sm">
          <p className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><b>450.000đ</b></p>
          <p className="flex justify-between text-green-600"><span>Giảm giá (CAKE10)</span><b>-45.000đ</b></p>
          <p className="flex justify-between"><span className="text-muted-foreground">Phí giao hàng</span><b>25.000đ</b></p>
        </div>
        <div className="flex justify-between border-t pt-4 text-xl font-extrabold">
          <span>Tổng</span><span className="text-primary">430.000đ</span>
        </div>
        <div className="mt-5 grid gap-3">
          <Btn onClick={() => !checkout && setView("Thanh toán")}>{checkout ? "Xác nhận đặt hàng" : "Tiến hành thanh toán"}</Btn>
          <Btn variant="secondary" onClick={() => setView("Trang chủ")}>Tiếp tục mua sắm</Btn>
          <Btn variant="secondary" disabled>Hết lượt sử dụng voucher</Btn>
        </div>
      </aside>
    </main>
  );
}

function Tracking({ setView }: any) {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-2xl border bg-card p-4 h-fit">
        <div className="mb-4 flex items-center gap-3 border-b pb-4">
          <div className="size-12 rounded-full bg-primary grid place-items-center text-primary-foreground font-bold">N</div>
          <div><p className="font-semibold">Nguyễn Minh Anh</p><p className="text-xs text-muted-foreground">minhanh@email.com</p></div>
        </div>
        {[["Hồ sơ", "Hồ sơ"], ["Đơn hàng", "Lịch sử"], ["Theo dõi đơn", "Theo dõi"]].map(([l, v]) => (
          <button key={l} onClick={() => setView(v)} className={`mt-2 w-full rounded-xl p-3 text-left text-sm transition ${l === "Theo dõi đơn" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{l}</button>
        ))}
      </aside>
      <section className="rounded-[2rem] border bg-card p-7">
        <h1 className="text-5xl">Theo dõi đơn hàng</h1>
        <div className="mt-6 flex gap-3">
          <input className="flex-1 rounded-full border bg-input-background p-3 text-sm outline-none focus:border-primary" defaultValue="SB1024" />
          <Btn>Tra cứu</Btn>
        </div>
        <div className="mt-8">
          <div className="relative flex justify-between">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" />
            <div className="absolute top-4 left-0 h-0.5 bg-primary transition-all" style={{ width: "60%" }} />
            {["Đặt hàng", "Xác nhận", "Chuẩn bị", "Đang giao", "Hoàn thành"].map((s, i) => (
              <div key={s} className="relative flex flex-col items-center gap-2 text-center">
                <div className={`z-10 size-8 rounded-full border-2 grid place-items-center text-xs font-bold ${i < 4 ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-muted text-muted-foreground"}`}>{i + 1}</div>
                <span className={`text-xs ${i < 4 ? "text-primary font-semibold" : "text-muted-foreground"}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-2xl bg-secondary p-5">
          <div className="flex flex-wrap justify-between gap-3">
            <div><p className="text-sm font-semibold">Combo Tiramisu + Latte</p><p className="mt-1 text-sm text-muted-foreground">Đang giao · Dự kiến đến lúc 15:30</p></div>
            <div className="text-right"><p className="text-sm font-semibold">89.000đ</p><p className="text-xs text-muted-foreground">#SB1024</p></div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Shipper: Nguyễn Văn A · 0901 234 567 · Cách bạn ~2km</p>
        </div>
      </section>
    </main>
  );
}

function Account({ profile = false, setView }: any) {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-2xl border bg-card p-4 h-fit">
        <div className="mb-4 flex items-center gap-3 border-b pb-4">
          <div className="size-12 rounded-full bg-primary grid place-items-center text-primary-foreground font-bold">N</div>
          <div><p className="font-semibold">Nguyễn Minh Anh</p><p className="text-xs text-muted-foreground">minhanh@email.com</p></div>
        </div>
        {[["Hồ sơ", "Hồ sơ"], ["Đơn hàng", "Lịch sử"], ["Theo dõi đơn", "Theo dõi"]].map(([l, v]) => (
          <button key={l} onClick={() => setView(v)} className={`mt-2 w-full rounded-xl p-3 text-left text-sm transition ${(profile && l === "Hồ sơ") || (!profile && l === "Đơn hàng") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{l}</button>
        ))}
      </aside>
      <section className="rounded-2xl border bg-card p-6">
        <h1 className="text-4xl">{profile ? "Thông tin cá nhân" : "Lịch sử mua hàng"}</h1>
        {profile ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2 flex items-center gap-4">
              <div className="size-20 rounded-full bg-primary grid place-items-center text-primary-foreground text-2xl font-bold">N</div>
              <Btn variant="secondary">Đổi ảnh đại diện</Btn>
            </div>
            {[["Họ và tên", "Nguyễn Minh Anh"], ["Email", "minhanh@email.com"], ["Số điện thoại", "0909 888 777"], ["Ngày sinh", "1995-08-15"]].map(([l, v]) => (
              <div key={l}>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">{l}</label>
                <input className="w-full rounded-xl border bg-input-background p-3 text-sm outline-none focus:border-primary" defaultValue={v} />
              </div>
            ))}
            <div className="md:col-span-2 flex gap-3">
              <Btn>Cập nhật</Btn><Btn variant="secondary">Đổi mật khẩu</Btn>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {["Hoàn thành", "Đang giao", "Đang chuẩn bị", "Hoàn thành", "Đã huỷ"].map((s, i) => (
              <div key={i} className="rounded-xl border p-4 transition hover:shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">#SB10{i + 20} · {products[i][0]}</p>
                    <p className="mt-1 text-sm text-muted-foreground">2 sản phẩm · 144.000đ · {["20/06", "21/06", "22/06", "23/06", "24/06"][i]}/2025</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${s === "Hoàn thành" ? "bg-green-100 text-green-700" : s === "Đã huỷ" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{s}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Btn variant="secondary" small>Xem chi tiết</Btn>
                  {s !== "Hoàn thành" && s !== "Đã huỷ" && <Btn variant="secondary" small onClick={() => setView("Theo dõi")}>Theo dõi</Btn>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function WishlistPage({ setView }: any) {
  const favorites = [products[0], products[1], products[2], products[9]];

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-9 sm:px-6 lg:px-10">
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="grid gap-6 bg-secondary/55 p-6 md:grid-cols-[1fr_auto] md:items-end lg:p-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.22em] text-primary">Sweet Bean</p>
            <h1 className="mt-2 text-4xl md:text-5xl">Sản phẩm yêu thích</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Lưu lại những món bánh và đồ uống bạn thích để đặt nhanh hơn trong lần mua tiếp theo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn variant="secondary" onClick={() => setView("Bánh ngọt")}>Khám phá thêm</Btn>
            <Btn onClick={() => setView("Giỏ hàng")}>Xem giỏ hàng</Btn>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[260px_1fr] lg:p-8">
          <aside className="h-fit rounded-2xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
                <Heart size={19} className="fill-current" />
              </span>
              <div>
                <p className="font-semibold">{favorites.length} món đã lưu</p>
                <p className="text-xs text-muted-foreground">Cập nhật hôm nay</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <p className="flex justify-between"><span className="text-muted-foreground">Bánh ngọt</span><b>3</b></p>
              <p className="flex justify-between"><span className="text-muted-foreground">Đồ uống</span><b>1</b></p>
              <p className="flex justify-between"><span className="text-muted-foreground">Có ưu đãi</span><b>2</b></p>
            </div>
            <div className="mt-5 rounded-xl bg-secondary p-4 text-sm leading-6 text-muted-foreground">
              Mẹo nhỏ: thêm các món yêu thích vào giỏ cùng lúc để không bỏ lỡ voucher combo.
            </div>
          </aside>

          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-sans text-xl font-semibold">Danh sách yêu thích</h2>
              <select className="rounded-full border bg-card px-4 py-2 text-sm outline-none focus:border-primary">
                <option>Mới lưu gần đây</option>
                <option>Giá thấp đến cao</option>
                <option>Đánh giá cao nhất</option>
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {favorites.map((p) => (
                <article key={p[0]} className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-52 bg-muted">
                    <img src={p[3]} alt={p[0]} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-card/95 px-3 py-1 text-xs font-bold text-primary">{p[5]}</span>
                    <button className="absolute right-3 top-3 rounded-full bg-card/95 p-2 text-rose-500 shadow-sm transition hover:bg-rose-50" title="Bỏ yêu thích">
                      <Heart size={16} className="fill-rose-500" />
                    </button>
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{p[2]}</span>
                      <span className="flex items-center gap-1"><Star className="fill-sidebar-primary text-sidebar-primary" size={14} />{p[4]}</span>
                    </div>
                    <h3 className="font-sans text-base">{p[0]}</h3>
                    <div className="flex items-center justify-between gap-3">
                      <b className="text-lg text-primary">{p[1]}</b>
                      <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/80">
                        <ShoppingBag size={14} /> Thêm
                      </button>
                    </div>
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition hover:text-destructive">
                      <X size={13} /> Xóa khỏi yêu thích
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("Trang chủ");


  const page = useMemo(() => {
    switch (view) {
      case "Trang chủ":    return <Home setView={setView} />;
      case "Bánh ngọt":    return <Listing type="cake" setView={setView} />;
      case "Cafe/Đồ uống": return <Listing type="drink" setView={setView} />;
      case "Combo":        return <Listing type="combo" setView={setView} />;
      case "Chi tiết":     return <Detail setView={setView} />;
      case "Giỏ hàng":    return <CartCheckout setView={setView} />;
      case "Thanh toán":   return <CartCheckout checkout setView={setView} />;
      case "Theo dõi":     return <Tracking setView={setView} />;
      case "Lịch sử":     return <Account setView={setView} />;
      case "Hồ sơ":       return <Account profile setView={setView} />;
      case "Yêu thích":    return <WishlistPage setView={setView} />;
      default:             return <Home setView={setView} />;
    }
  }, [view]);

  if (view === "Admin") return <AdminPanel onExit={() => setView("Trang chủ")} />;
  if (view === "Đăng nhập") return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header view={view} setView={setView} />
      <div className="flex-1">
        <AuthPage onSuccess={() => setView("Hồ sơ")} onAdminDemo={() => setView("Admin")} />
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header view={view} setView={setView} />
      <div className="flex-1">
        {page}
      </div>
      <Footer />
      {/* Mobile bottom nav */}
      <div className="fixed bottom-4 left-4 right-4 z-40 flex gap-1 overflow-x-auto rounded-full border bg-card/95 p-1.5 shadow-xl backdrop-blur lg:hidden">
        {[["🏠", "Trang chủ"], ["🍰", "Bánh ngọt"], ["☕", "Cafe/Đồ uống"], ["🎁", "Combo"]].map(([icon, v]) => (
          <button
            type="button"
            key={v}
            onClick={() => setView(v)}
            className={`flex shrink-0 flex-col items-center gap-0.5 rounded-full px-2.5 py-1.5 text-xs transition ${view === v ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
          >
            <span>{icon}</span>
            <span className="hidden sm:block">{v}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
