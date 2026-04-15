import type { ProductItem } from "@/lib/types/product";
import type { CategoryItem } from "@/lib/types/category";

// Placeholder image — a beautiful interior photo from public domain
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop",
];

const CATEGORY_IMAGES = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop",
];

function makeImage(url: string, id: number) {
  return {
    data: [
      {
        id,
        documentId: `img-${id}`,
        attributes: {
          url,
          alternativeText: "Product image",
          width: 800,
          height: 800,
        },
      },
    ],
  };
}

export const MOCK_CATEGORIES: CategoryItem[] = [
  {
    id: 1,
    documentId: "cat-1",
    attributes: {
      name: "Phòng khách",
      slug: "phong-khach",
      description: "Sofa, bàn trà, kệ TV và tất cả cho phòng khách của bạn",
      image: {
        data: {
          id: 101,
          documentId: "cat-img-1",
          attributes: {
            url: CATEGORY_IMAGES[0],
            alternativeText: "Phòng khách",
            width: 600,
            height: 800,
          },
        },
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 2,
    documentId: "cat-2",
    attributes: {
      name: "Phòng ngủ",
      slug: "phong-ngu",
      description: "Giường, tủ quần áo và phụ kiện phòng ngủ",
      image: {
        data: {
          id: 102,
          documentId: "cat-img-2",
          attributes: {
            url: CATEGORY_IMAGES[1],
            alternativeText: "Phòng ngủ",
            width: 600,
            height: 800,
          },
        },
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 3,
    documentId: "cat-3",
    attributes: {
      name: "Phòng ăn",
      slug: "phong-an",
      description: "Bàn ăn, ghế và tủ bát đĩa cao cấp",
      image: {
        data: {
          id: 103,
          documentId: "cat-img-3",
          attributes: {
            url: CATEGORY_IMAGES[2],
            alternativeText: "Phòng ăn",
            width: 600,
            height: 800,
          },
        },
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 4,
    documentId: "cat-4",
    attributes: {
      name: "Văn phòng",
      slug: "van-phong",
      description: "Bàn làm việc, ghế văn phòng và kệ sách",
      image: {
        data: {
          id: 104,
          documentId: "cat-img-4",
          attributes: {
            url: CATEGORY_IMAGES[3],
            alternativeText: "Văn phòng",
            width: 600,
            height: 800,
          },
        },
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
];

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    documentId: "prod-1",
    attributes: {
      name: "Sofa góc chữ L Nordic",
      slug: "sofa-goc-chu-l-nordic",
      description:
        "Sofa góc chữ L phong cách Bắc Âu với chất liệu vải cao cấp, khung gỗ sồi tự nhiên. Thiết kế hiện đại, dễ phối hợp với nhiều phong cách nội thất.",
      price: 12500000,
      compareAtPrice: 15000000,
      stock: 10,
      images: makeImage(PLACEHOLDER_IMAGES[0], 1),
      variants: [
        { label: "Xám nhạt", value: "#D1D5DB" },
        { label: "Xanh sage", value: "#84A98C" },
        { label: "Kem", value: "#F5F0E8" },
      ],
      isFeatured: true,
      category: { data: MOCK_CATEGORIES[0] },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 2,
    documentId: "prod-2",
    attributes: {
      name: "Bàn cà phê gỗ óc chó",
      slug: "ban-ca-phe-go-oc-cho",
      description:
        "Bàn cà phê làm từ gỗ óc chó nguyên khối, mặt bàn hình tròn qua xử lý sơn bóng. Chân kim loại mạ đen tuyệt đẹp.",
      price: 3800000,
      compareAtPrice: undefined,
      stock: 25,
      images: makeImage(PLACEHOLDER_IMAGES[1], 2),
      variants: [],
      isFeatured: true,
      category: { data: MOCK_CATEGORIES[0] },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 3,
    documentId: "prod-3",
    attributes: {
      name: "Giường ngủ gỗ thông Japandi",
      slug: "giuong-ngu-go-thong-japandi",
      description:
        "Giường ngủ phong cách Japandi với gỗ thông tự nhiên, đầu giường thấp đặc trưng. Thiết kế tối giản, mang lại không gian yên bình.",
      price: 8900000,
      compareAtPrice: 11000000,
      stock: 8,
      images: makeImage(PLACEHOLDER_IMAGES[2], 3),
      variants: [
        { label: "1m6", value: "160x200", priceModifier: 0 },
        { label: "1m8", value: "180x200", priceModifier: 1200000 },
      ],
      isFeatured: true,
      category: { data: MOCK_CATEGORIES[1] },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 4,
    documentId: "prod-4",
    attributes: {
      name: "Tủ quần áo 4 cánh trắng",
      slug: "tu-quan-ao-4-canh-trang",
      description:
        "Tủ quần áo 4 cánh màu trắng tinh, thiết kế hiện đại với gương toàn thân. Không gian bên trong được tổ chức khoa học.",
      price: 7200000,
      compareAtPrice: undefined,
      stock: 5,
      images: makeImage(PLACEHOLDER_IMAGES[3], 4),
      variants: [],
      isFeatured: true,
      category: { data: MOCK_CATEGORIES[1] },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 5,
    documentId: "prod-5",
    attributes: {
      name: "Bộ bàn ăn 6 ghế gỗ sồi",
      slug: "bo-ban-an-6-ghe-go-soi",
      description:
        "Bộ bàn ăn 6 người với mặt bàn gỗ sồi tự nhiên, chân bàn và ghế bọc vải xám cao cấp. Hoàn hảo cho gia đình 4-6 thành viên.",
      price: 18500000,
      compareAtPrice: 22000000,
      stock: 3,
      images: makeImage(PLACEHOLDER_IMAGES[4], 5),
      variants: [],
      isFeatured: true,
      category: { data: MOCK_CATEGORIES[2] },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 6,
    documentId: "prod-6",
    attributes: {
      name: "Kệ sách treo tường gỗ thông",
      slug: "ke-sach-treo-tuong-go-thong",
      description:
        "Kệ sách treo tường 5 tầng bằng gỗ thông, thiết kế tối giản. Dễ lắp đặt, phù hợp phòng khách và phòng làm việc.",
      price: 1950000,
      compareAtPrice: undefined,
      stock: 30,
      images: makeImage(PLACEHOLDER_IMAGES[5], 6),
      variants: [
        { label: "Màu tự nhiên", value: "natural" },
        { label: "Màu walnut", value: "walnut", priceModifier: 200000 },
      ],
      isFeatured: false,
      category: { data: MOCK_CATEGORIES[3] },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 7,
    documentId: "prod-7",
    attributes: {
      name: "Ghế armchair bọc nhung",
      slug: "ghe-armchair-boc-nhung",
      description:
        "Ghế armchair sang trọng với vải nhung cao cấp màu xanh rêu, chân gỗ sồi. Điểm nhấn hoàn hảo cho phòng khách.",
      price: 4500000,
      compareAtPrice: 5500000,
      stock: 15,
      images: makeImage(PLACEHOLDER_IMAGES[6], 7),
      variants: [
        { label: "Xanh rêu", value: "#6B7C5A" },
        { label: "Hồng đất", value: "#C4785A" },
        { label: "Xám", value: "#9CA3AF" },
      ],
      isFeatured: true,
      category: { data: MOCK_CATEGORIES[0] },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 8,
    documentId: "prod-8",
    attributes: {
      name: "Đèn cây đứng hiện đại",
      slug: "den-cay-dung-hien-dai",
      description:
        "Đèn cây phong cách hiện đại với chao đèn vải linen, chân kim loại màu đồng. Ánh sáng ấm áp tạo không gian cozy.",
      price: 1280000,
      compareAtPrice: undefined,
      stock: 20,
      images: makeImage(PLACEHOLDER_IMAGES[7], 8),
      variants: [],
      isFeatured: false,
      category: { data: MOCK_CATEGORIES[0] },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
];
