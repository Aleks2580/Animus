import { useTranslation } from "react-i18next";

export const useCountries = () => {
  const { t } = useTranslation();

  const countries = [
    { code: "+1", name: t("countries.unitedStates") },
    { code: "+86", name: t("countries.china") },
    { code: "+44", name: t("countries.unitedKingdom") },
    { code: "+91", name: t("countries.india") },
    { code: "+49", name: t("countries.germany") },
    { code: "+33", name: t("countries.france") },
    { code: "+81", name: t("countries.japan") },
    { code: "+7", name: t("countries.russia") },
    { code: "+39", name: t("countries.italy") },
    { code: "+61", name: t("countries.australia") },
    { code: "+55", name: t("countries.brazil") },
    { code: "+82", name: t("countries.southKorea") },
    { code: "+34", name: t("countries.spain") },
    { code: "+31", name: t("countries.netherlands") },
    { code: "+1", name: t("countries.canada") },
    { code: "+27", name: t("countries.southAfrica") },
    { code: "+90", name: t("countries.turkey") },
    { code: "+60", name: t("countries.malaysia") },
    { code: "+63", name: t("countries.philippines") },
    { code: "+41", name: t("countries.switzerland") },
    { code: "+32", name: t("countries.belgium") },
    { code: "+65", name: t("countries.singapore") },
    { code: "+52", name: t("countries.mexico") },
    { code: "+46", name: t("countries.sweden") },
    { code: "+47", name: t("countries.norway") },
    { code: "+62", name: t("countries.indonesia") },
    { code: "+420", name: t("countries.czechRepublic") },
    { code: "+48", name: t("countries.poland") },
    { code: "+36", name: t("countries.hungary") },
    { code: "+64", name: t("countries.newZealand") },
  ];

  return countries;
};
