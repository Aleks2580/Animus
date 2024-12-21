
import { useTranslation } from "react-i18next";

export const useFaqs = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      key: "1",
      label: t("faqs.one"),
      children: t("answers.one"),
    },
    {
      key: "2",
      label: t("faqs.two"),
      children: t("answers.two"),
    },
    {
      key: "3",
      label: t("faqs.three"),
      children: t("answers.three"),
    },
    {
      key: "4",
      label: t("faqs.four"),
      children: t("answers.four"),
    },
    {
      key: "5",
      label: t("faqs.five"),
      children: t("answers.five"),
    },
    {
      key: "6",
      label: t("faqs.six"),
      children: t("answers.six"),
    },
    {
      key: "7",
      label: t("faqs.seven"),
      children: t("answers.seven"),
    },
    {
      key: "8",
      label: t("faqs.eight"),
      children: t("answers.eight"),
    },
    {
      key: "9",
      label: t("faqs.nine"),
      children: t("answers.nine"),
    },
    {
      key: "10",
      label: t("faqs.ten"),
      children: t("answers.ten"),
    },
  ];

  return faqs;
};
