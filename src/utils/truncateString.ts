export default function truncateString(str: string, maxLength: number): string {
    // Check if the string length is greater than the maximum length
    if (str.length > maxLength) {
        // Truncate the string and add ellipsis
        return str.substring(0, maxLength) + "...";
    }
    // Return the original string if it is shorter than or equal to the maximum length
    return str;
}