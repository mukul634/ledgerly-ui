
/**
 * Converts a Gregorian date string to Bikram Sambat (Nepali Calendar)
 * This is a simplified implementation for demonstration
 * A real implementation would use a proper library like 'bikram-sambat' or 'nepali-date-converter'
 * 
 * @param gregorianDateStr - A date string in the format YYYY-MM-DD
 * @returns A string representing the date in Bikram Sambat
 */
export const convertToBikramSambat = (gregorianDateStr: string): string => {
  if (!gregorianDateStr) return '';
  
  try {
    // Parse the Gregorian date
    const dateParts = gregorianDateStr.split('-');
    if (dateParts.length !== 3) {
      return 'Invalid date format';
    }
    
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // JS months are 0-indexed
    const day = parseInt(dateParts[2], 10);
    
    const gregorianDate = new Date(year, month, day);
    
    // Simple approximation: Bikram Sambat is ~56.7 years ahead of Gregorian
    // This is a rough conversion for demonstration purposes
    const bsYear = year + 56;
    
    // Month names in Nepali
    const bsMonths = [
      'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 
      'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 
      'Poush', 'Magh', 'Falgun', 'Chaitra'
    ];
    
    // Offset the month by ~3.5 months (approximate)
    // This is a very simplified approach
    let bsMonth = (month + 8) % 12;
    let monthName = bsMonths[bsMonth];
    
    // Day might vary due to different month lengths, this is an approximation
    let bsDay = day;
    
    return `${bsYear} ${monthName} ${bsDay}`;
  } catch (error) {
    console.error("Error converting date to Bikram Sambat:", error);
    return 'Conversion Error';
  }
};
