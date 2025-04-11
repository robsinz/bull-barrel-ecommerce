export const isLightColor = (hexColor: string): boolean => {
  // Remove the # if present
  const hex = hexColor.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 2), 16);
  const b = parseInt(hex.substring(2, 2), 16);

  // Calculate perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the color is light (brightness >  128)
  return brightness > 128;
};
