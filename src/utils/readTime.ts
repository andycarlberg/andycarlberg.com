export function calculateReadTime(content: string): string {
  // Strip frontmatter if it exists
  const body = content.replace(/^---[\s\S]*?---/, "");

  // Remove markdown formatting (basic cleanup)
  const plainText = body
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links
    .replace(/[#*`_]/g, "") // Formatting chars
    .replace(/<[^>]*>/g, ""); // HTML tags

  // Average reading speed (words per minute)
  const WPM = 200;

  // Count words (splitting on whitespace, filtering empty strings)
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Calculate minutes and round up
  const minutes = Math.ceil(words / WPM);

  return `${minutes} min read`;
}
