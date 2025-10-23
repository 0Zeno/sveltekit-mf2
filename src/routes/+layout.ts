import { loadTranslations } from '$lib/translations';

export const load = async ({ url }) => {
  const { pathname } = url;

  const initLocale = 'es'; 

  await loadTranslations(initLocale, pathname); 

  return {};
}
