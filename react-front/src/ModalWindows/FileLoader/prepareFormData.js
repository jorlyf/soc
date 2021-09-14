export const prepareFormData = ({ files, text }, ACCESS_TOKEN) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file);
  };

  if (!text)
    text = '';
  if (!ACCESS_TOKEN)
    ACCESS_TOKEN = '';

  formData.set('text', text);
  formData.set('token', ACCESS_TOKEN);
  return formData;
}