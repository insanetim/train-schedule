/**
 * Formats a date string into a readable format
 * @param dateString - ISO date string or any valid date string
 * @param locale - Locale string for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  locale: string = 'en-US'
): string => {
  const date = new Date(dateString);
  
  return date.toLocaleDateString(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Formats a date string into a short format (MM/DD/YYYY)
 * @param dateString - ISO date string or any valid date string
 * @param locale - Locale string for formatting (default: 'en-US')
 * @returns Short formatted date string
 */
export const formatDateShort = (
  dateString: string,
  locale: string = 'en-US'
): string => {
  const date = new Date(dateString);
  
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Formats a date string with time
 * @param dateString - ISO date string or any valid date string
 * @param locale - Locale string for formatting (default: 'en-US')
 * @returns Formatted date and time string
 */
export const formatDateTime = (
  dateString: string,
  locale: string = 'en-US'
): string => {
  const date = new Date(dateString);
  
  return date.toLocaleString(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
