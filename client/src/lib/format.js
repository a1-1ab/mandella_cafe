const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

const toArabicDigits = (value) =>
  String(value).replace(/[0-9]/g, (digit) => ARABIC_DIGITS[Number(digit)]);

const formatPrice = (value) => `${toArabicDigits(Math.round(Number(value) || 0))} ل.س`;

const formatItemsLabel = (count) => {
  const total = Number(count) || 0;
  if (total === 1) return 'مشروب واحد';
  if (total === 2) return 'مشروبان';
  return `${toArabicDigits(total)} مشروبات`;
};

export { toArabicDigits, formatPrice, formatItemsLabel };
