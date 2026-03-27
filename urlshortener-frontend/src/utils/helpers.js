export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};
