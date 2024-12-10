export function MoneyFormat({ currency = 'TRY', locale = 'tr-TR', value = 0 }: { currency?: string; locale?: string; value?: number; }) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency || 'TRY' }).format(value || 0);
}
