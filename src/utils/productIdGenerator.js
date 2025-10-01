/**
 * Generate unique product ID with category prefix
 * Category prefixes:
 * - bridal: BR
 * - fusion: FS
 * - occasion: OC
 */
export function generateProductId(category) {
  const prefixMap = {
    bridal: 'BR',
    fusion: 'FS',
    occasion: 'OC'
  };

  const prefix = prefixMap[category] || 'PR';
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNum}`;
}
