import { useTranslation } from "react-i18next";
import { a, f, i, n, ss } from "../assets/index";

export const useProducts = () => {
  const { t } = useTranslation();

  const products = [
    {
      id: "phenotropil",
      image: f,
      name: t("products.phenotropil.name"),
      subname: t("products.phenotropil.subname"),
      description: t("products.phenotropil.description"),
      price: "$36.00",
      dosage: t("products.phenotropil.dosage"),
      research: t("products.phenotropil.research"),
    },
    {
      id: "semax",
      image: ss,
      name: t("products.semax.name"),
      subname: t("products.semax.subname"),
      description: t("products.semax.description"),
      price: "$50.00",
      dosage: t("products.semax.dosage"),
      research: t("products.semax.research"),
    },
    {
      id: "irs19",
      image: i,
      name: t("products.irs19.name"),
      subname: t("products.irs19.subname"),
      description: t("products.irs19.description"),
      price: "$25.00",
      dosage: t("products.irs19.dosage"),
      research: t("products.irs19.research"),
    },
    {
      id: "noopept",
      image: n,
      name: t("products.noopept.name"),
      subname: t("products.noopept.subname"),
      description: t("products.noopept.description"),
      price: "$29.00",
      dosage: t("products.noopept.dosage"),
      research: t("products.noopept.research"),
    },
    {
      id: "alpha_gpc",
      image: a,
      name: t("products.alpha_gpc.name"),
      subname: t("products.alpha_gpc.subname"),
      description: t("products.alpha_gpc.description"),
      price: "$40.00",
      dosage: t("products.alpha_gpc.dosage"),
      research: t("products.alpha_gpc.research"),
    },
  ];

  return products;
};
