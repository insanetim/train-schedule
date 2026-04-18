/**
 * Formats a price number into a currency string
 * @param price - Price number to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale string for formatting (default: 'en-US')
 * @returns Formatted price string
 */
export const formatPrice = (
  price: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Formats a price number into a decimal string without currency symbol
 * @param price - Price number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted price string without currency symbol
 */
export const formatPriceDecimal = (
  price: number,
  decimals: number = 2
): string => {
  return price.toFixed(decimals);
};

/**
 * Formats a price number with custom options
 * @param price - Price number to format
 * @param options - Formatting options
 * @returns Formatted price string
 */
export const formatPriceWithOptions = (
  price: number,
  options: {
    currency?: string;
    locale?: string;
    showSymbol?: boolean;
    decimals?: number;
  } = {}
): string => {
  const {
    currency = 'USD',
    locale = 'en-US',
    showSymbol = true,
    decimals = 2
  } = options;

  if (showSymbol) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(price);
  } else {
    return price.toFixed(decimals);
  }
};
