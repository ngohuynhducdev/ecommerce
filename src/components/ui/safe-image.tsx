import Image from "next/image";
import type { ImageProps } from "next/image";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string | null | undefined;
};

export function SafeImage({ src, alt, ...props }: SafeImageProps) {
  const resolved = src?.trim() ?? "";

  if (!resolved) {
    return props.fill ? (
      <div
        className="absolute inset-0 bg-mist flex items-center justify-center"
        aria-label={alt}
        role="img"
      >
        <PlaceholderIcon />
      </div>
    ) : (
      <div
        className="bg-mist flex items-center justify-center"
        style={{ width: props.width, height: props.height }}
        aria-label={alt}
        role="img"
      >
        <PlaceholderIcon />
      </div>
    );
  }

  return <Image src={resolved} alt={alt} {...props} />;
}

function PlaceholderIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D1D5DB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
