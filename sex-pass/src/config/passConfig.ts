export const passConfig = {
  holderName: 'Диана',
  issuerName: 'Андрей',
  passId: () => `SP-2026-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  telegramUrl: 'https://t.me/almandrz',
}
