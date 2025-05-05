export function serializeFormData(values: Record<string, unknown>): FormData {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === 'boolean') {
      formData.append(key, value.toString());
    } else if (value != null) {
      formData.append(key, String(value));
    }
  });
  return formData;
}
