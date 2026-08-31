import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('sayfa başlığı doğru', async ({ page }) => {
  await expect(page).toHaveTitle('Giriş Yap');
  await expect(page.locator('h1')).toHaveText('Giriş Yap');
});

test('geçersiz email uyarı veriyor', async ({ page }) => {
  await page.fill('#email', 'silaornek.com');
  await page.fill('#sifre', '123456');
  await page.click('#gonder');

  await expect(page.locator('#mesaj')).toHaveText('Geçerli bir email girin');
});

test('kısa şifre uyarı veriyor', async ({ page }) => {
  await page.fill('#email', 'sila@ornek.com');
  await page.fill('#sifre', '123');
  await page.click('#gonder');

  await expect(page.locator('#mesaj')).toHaveText('Şifre en az 6 karakter olmalı');
});

test('doğru bilgilerle giriş yapılıyor', async ({ page }) => {
  await page.fill('#email', 'sila@ornek.com');
  await page.fill('#sifre', '123456');
  await page.click('#gonder');

  await expect(page.locator('#mesaj')).toHaveText('Hoş geldin, sila@ornek.com');
});