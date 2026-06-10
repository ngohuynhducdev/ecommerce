"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useAtom } from "jotai";
import { wishlistAtom } from "@/features/wishlist/atoms";
import { WishlistCard } from "@/features/account/components/wishlist-card";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useAtom(wishlistAtom);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">
          My Wishlist ({wishlist.length})
        </h1>
        {wishlist.length > 0 && (
          <button
            onClick={() => setWishlist([])}
            className="text-sm text-muted hover:text-red-500 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart size={48} className="text-border mb-4" />
          <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
          <p className="text-sm text-muted mb-6">
            Save items you love and find them here later
          </p>
          <Link
            href="/shop"
            className="h-11 px-6 bg-primary text-white text-sm font-medium rounded-sm flex items-center hover:bg-primary-hover transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <WishlistCard key={item.product.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
