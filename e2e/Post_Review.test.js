const assert = require("assert");

Feature("Post a Review name and review text");

/**
 * Skenario: Post a review with name and text review
 *
 * 1. Buka halaman utama
 * 2. Pilih salah satu restoran (contoh: restoran pertama)
 * 3. Klik restoran tersebut
 * 4. Aplikasi akan membawa ke halaman detail restoran
 * 5. Isi nama dan review restoran
 * 6. Tekan tombol submit
 * 7. Verifikasi bahwa review yang berhasil di-submit muncul di daftar review
 */
Scenario("Post a review with name and text review", async ({ I }) => {
  // Buka halaman utama
  I.amOnPage("/");

  // Pilih dan klik restoran pertama
  I.waitForElement(".resto-detail", 10);
  I.seeElement(".resto-detail");
  I.click(locate(".resto-detail").first());

  // Tunggu elemen form review di halaman detail restoran
  I.waitForElement("#name", 10);
  I.waitForElement("#review", 10);
  I.waitForElement(".submit-button", 10);

  // Data untuk pengisian form review
  const userName = "Testing e2e";
  const reviewResto = "Makanan sangat lezat dan enak";

  // Isi form review
  I.fillField("#name", userName);
  I.fillField("#review", reviewResto);

  // Submit review
  I.click(".submit-button");

  // Tunggu sampai review terbaru muncul setelah di-submit
  I.waitForElement(".review-name", 10);

  // Verifikasi bahwa review terakhir yang ditambahkan sesuai dengan input
  I.waitForText(userName, 10, locate(".review-name").last());
  const lastUserNameTag = locate(".review-name").last();
  const lastUserName = await I.grabTextFrom(lastUserNameTag);
  assert.strictEqual(lastUserName, userName);

  const lastReviewRestoTag = locate(".review-text").last();
  const lastReviewResto = (await I.grabTextFrom(lastReviewRestoTag)).trim();
  assert.strictEqual(lastReviewResto, reviewResto);
});
