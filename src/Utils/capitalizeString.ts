export default function capitalizeString(str: string): string {
  return str
    .replaceAll("_", "-")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
