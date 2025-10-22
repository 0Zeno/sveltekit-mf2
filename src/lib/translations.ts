import i18n from "@sveltekit-i18n/base";

const config = {
  loaders: [
    {
      locale: "en",
      key: "common",
      loader: async () =>
        (
          await import("./en/common.json")
        ).default,
    },
  ],
  parser: {
    parse(value: string, [props]: Record<string, any>[], locale: string) {
      return { value, props, locale}
    }
  } 
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
