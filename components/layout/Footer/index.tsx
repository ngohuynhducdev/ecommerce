import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const shopLinks = [
  { label: "Tất cả sản phẩm", href: "/products" },
  { label: "Phòng khách", href: "/categories/phong-khach" },
  { label: "Phòng ngủ", href: "/categories/phong-ngu" },
  { label: "Phòng ăn", href: "/categories/phong-an" },
  { label: "Sản phẩm mới", href: "/products?sort=createdAt:desc" },
];

const serviceLinks = [
  { label: "Chính sách đổi trả", href: "/chinh-sach-doi-tra" },
  { label: "Chính sách bảo hành", href: "/chinh-sach-bao-hanh" },
  { label: "Hướng dẫn mua hàng", href: "/huong-dan-mua-hang" },
  { label: "Theo dõi đơn hàng", href: "/orders" },
  { label: "Liên hệ", href: "/lien-he" },
];

export function Footer() {
  return (
    <footer className="bg-warm-800 text-warm-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div>
            <h3 className="text-white font-serif text-xl font-bold mb-4">
              Home Interior
            </h3>
            <p className="text-sm leading-relaxed text-warm-300">
              Nơi mang đến không gian sống đẹp, tinh tế với những sản phẩm nội
              thất chất lượng cao, được tuyển chọn kỹ càng.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-warm-400 hover:text-white transition-colors text-sm font-medium"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-warm-400 hover:text-white transition-colors text-sm font-medium"
              >
                Instagram
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-warm-400 hover:text-white transition-colors text-sm font-medium"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Mua sắm</h4>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-warm-300">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-warm-400" />
                <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-warm-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-warm-400" />
                <a
                  href="tel:+84901234567"
                  className="hover:text-white transition-colors"
                >
                  0901 234 567
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-warm-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-warm-400" />
                <a
                  href="mailto:hello@homeinterior.vn"
                  className="hover:text-white transition-colors"
                >
                  hello@homeinterior.vn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-warm-400">
            © {new Date().getFullYear()} Home Interior. Tất cả quyền được bảo
            lưu.
          </p>
          <div className="flex items-center gap-4 text-xs text-warm-400">
            <Link
              href="/chinh-sach-bao-mat"
              className="hover:text-warm-200 transition-colors"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/dieu-khoan-su-dung"
              className="hover:text-warm-200 transition-colors"
            >
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
