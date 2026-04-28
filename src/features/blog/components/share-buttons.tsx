"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.36-.719-.36-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

export function ShareButtons() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShare(platform: string) {
    const url = encodeURIComponent(window.location.href);
    const links: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}`,
    };
    window.open(links[platform], "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex items-center gap-3 mt-10 pt-8 border-t border-[#E8ECEF]">
      <span className="text-sm text-[#807D7E]">Share:</span>
      <button
        onClick={() => handleShare("twitter")}
        className="w-9 h-9 flex items-center justify-center border border-[#E8ECEF] rounded-full text-[#807D7E] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors"
        aria-label="Share on Twitter"
      >
        <TwitterIcon />
      </button>
      <button
        onClick={() => handleShare("facebook")}
        className="w-9 h-9 flex items-center justify-center border border-[#E8ECEF] rounded-full text-[#807D7E] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors"
        aria-label="Share on Facebook"
      >
        <FacebookIcon />
      </button>
      <button
        onClick={() => handleShare("pinterest")}
        className="w-9 h-9 flex items-center justify-center border border-[#E8ECEF] rounded-full text-[#807D7E] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors"
        aria-label="Share on Pinterest"
      >
        <PinterestIcon />
      </button>
      <button
        onClick={handleCopy}
        className="w-9 h-9 flex items-center justify-center border border-[#E8ECEF] rounded-full text-[#807D7E] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check size={15} className="text-green-500" /> : <Link2 size={15} />}
      </button>
    </div>
  );
}
