export function encodeURIComponentWhenLocal(uri: string): string {
  if (process.env.NODE_ENV === 'development') {
    return encodeURIComponent(uri);
  }
  
  return uri;
}