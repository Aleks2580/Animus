import { useTranslation } from "react-i18next";
import {a, f, i, n, s, ss} from "../assets/index"

export const useProducts = () => {
    const { t } = useTranslation()

    const products = [
        { id: 'semax', image: ss, name: t('products.semax.name'), description: t('products.semax.description') },
        { id: 'irs19', image: i, name: t('products.irs19.name'), description: t('products.irs19.description') },
        { id: 'fenotropil', image: f, name: t('products.fenotropil.name'), description: t('products.fenotropil.description') },
        { id: 'noopept', image: n, name: t('products.noopept.name'), description: t('products.noopept.description') },
        { id: 'alpha_gpc', image: a, name: t('products.alpha_gpc.name'), description: t('products.alpha_gpc.description') },
      ];

    return products
}