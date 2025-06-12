// List of disallowed file extensions (lowercase)
export const disallowedExtensions = [
  "zip",
  "rar",
  "tar",
  "gz",
  "7z",
  "bz2",
  "iso",
  "cab",
];

// List of disallowed MIME types
export const disallowedMimeTypes = [
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/gzip",
  "application/x-7z-compressed",
  "application/x-bzip2",
  "application/x-iso9660-image",
];

export function isCompressedFile(file: File): {
  isDisallowed: boolean;
  extension?: string;
} {
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();
  const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);

  // Check by extension
  if (disallowedExtensions.includes(fileExtension)) {
    return { isDisallowed: true, extension: fileExtension };
  }

  // Check by MIME type
  if (fileType && disallowedMimeTypes.includes(fileType)) {
    return { isDisallowed: true, extension: fileExtension };
  }

  return { isDisallowed: false };
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytes" : sizes[i] ?? "Bytes"
  }`;
}
