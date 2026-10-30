export const toArabicDigits = (value) =>
  String(value).replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]);

export const roundMoney = (value) => Math.round(Number(value) || 0);
