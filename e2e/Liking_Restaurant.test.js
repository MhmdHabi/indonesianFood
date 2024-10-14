const assert = require("assert");

Feature("Liking Restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorites");
});
Scenario("showing empty liked restaurant", ({ I }) => {
  I.seeElement("#searchInput");
  I.see("Belum ada restoran favorit", ".message-not-found");
});

/**
 * Buka halaman utama.
 * Pilih salah satu resto. Misalnya resto pertama.
 * Klik resto tersebut.
 * Aplikasi membawa user ke halaman detail resto.
 * Kita menekan tombol menyukai resto.
 * Kita buka halaman daftar resto yang disukai.
 * Kita melihat satu resto yang telah disukai.
 */
Scenario("liking one resto", async ({ I }) => {
  // Pastikan tidak ada restoran favorit
  I.see("Belum ada restoran favorit", ".message-not-found");

  // Buka halaman daftar restoran
  I.amOnPage("/");

  // Tunggu elemen detail restoran muncul
  I.waitForElement(".resto-detail", 5);
  I.seeElement(".resto-detail");

  // Ambil judul restoran pertama
  const firstResto = locate(".resto-detail").first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);

  // Klik pada restoran pertama
  I.click(firstResto);

  // Tunggu tombol like muncul
  I.waitForElement("#likeButton", 10);
  I.seeElement("#likeButton");

  // Klik tombol like
  I.click("#likeButton");

  // Buka halaman favorit
  I.amOnPage("/#/favorites");

  // Tunggu elemen kartu restoran favorit muncul
  I.waitForElement(".restaurant-card", 5);
  I.seeElement(".restaurant-card");

  // Ambil judul restoran yang sudah disukai
  const likedRestoTitle = await I.grabTextFrom(".resto-detail");

  // Bandingkan judul restoran pertama dengan judul restoran yang disukai
  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

/**
 * Buka halaman utama.
 * Pilih salah satu resto. Misalnya resto pertama.
 * Klik resto tersebut.
 * Aplikasi membawa user ke halaman detail resto.
 * Kita menekan tombol menyukai resto.
 * Kita buka halaman daftar resto yang disukai.
 * Kita melihat satu resto yang telah disukai.
 * Kita menekan tombol batal menyukai resto
 * Kita buka halaman daftar resto yang disukai
 * Kita melihat pesan "belum ada resto favorite"
 */
Scenario("cancel liking one resto", async ({ I }) => {
  I.see("Belum ada restoran favorit", ".message-not-found");
  // Buka halaman utama
  I.amOnPage("/");

  // Tunggu elemen detail restoran muncul
  I.waitForElement(".resto-detail", 5);
  I.seeElement(".resto-detail");

  // Ambil judul restoran pertama
  const firstResto = locate(".resto-detail").first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);

  // Klik pada restoran pertama
  I.click(firstResto);

  // Tunggu tombol like muncul
  I.waitForElement("#likeButton", 10);
  I.seeElement("#likeButton");

  // Klik tombol like untuk menyukai restoran
  I.click("#likeButton");

  // Buka halaman daftar restoran yang disukai
  I.amOnPage("/#/favorites");

  // Tunggu elemen kartu restoran favorit muncul
  I.waitForElement(".restaurant-card", 5);
  I.seeElement(".restaurant-card");

  // Verifikasi bahwa restoran yang disukai muncul
  I.see(firstRestoTitle, ".restaurant-card");

  // Klik pada restoran yang telah disukai
  I.click(locate(".restaurant-card").first());

  // Tunggu tombol batal menyukai restoran muncul
  I.waitForElement(".remove-favorite-button", 10);
  I.seeElement(".remove-favorite-button");

  // Klik tombol untuk membatalkan menyukai restoran
  I.click(".remove-favorite-button");

  // Kembali ke halaman daftar restoran yang disukai
  I.amOnPage("/#/favorites");

  // Tunggu elemen yang menunjukkan tidak ada restoran favorit
  I.waitForElement(".message-not-found", 5);
  I.see("Belum ada restoran favorit", ".message-not-found");
});

/**
 * Pastikan belum ada resto yang disukai.
 * Buka halaman utama.
 * Pilih tiga resto untuk disukai.
 * Buka halaman daftar resto yang disukai.
 * Pastikan tiga resto di atas ditampilkan.
 * Lakukan pencarian terhadap salah satu resto.
 * Pastikan hasil pencarian resto benar.
 * - Jumlah resto sesuai.
 * - Judul resto sesuai.
 */

Scenario("searching restaurant", async ({ I }) => {
  I.amOnPage("/#/favorites");
  I.see("Belum ada restoran favorit", ".message-not-found");

  I.amOnPage("/");
  I.waitForElement(".resto-detail", 10); // Increased timeout
  I.seeElement(".resto-detail");

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.waitForElement(locate(".resto-detail").at(i), 10); // Increased timeout
    I.click(locate(".resto-detail").at(i));
    I.waitForElement("#likeButton", 10); // Wait for like button to appear
    I.seeElement("#likeButton");
    I.click("#likeButton");
    titles.push(await I.grabTextFrom(".restaurant-name"));
    I.amOnPage("/");
    I.wait(1);
  }

  I.amOnPage("/#/favorites");
  I.waitForElement("#searchInput", 10); // Increased timeout
  I.seeElement("#searchInput");
  const visibleCardResto = await I.grabNumberOfVisibleElements(".restaurant-card");
  assert.strictEqual(titles.length, visibleCardResto);

  const searchValue = titles[1].substring(1, 3);
  I.fillField("#searchInput", searchValue);

  const matchingResto = titles.filter((title) => title.indexOf(searchValue) !== -1);
  const visibleSearchedLikedResto = await I.grabNumberOfVisibleElements(".restaurant-card");

  // Assert whether the number of cards matches
  assert.strictEqual(matchingResto.length, visibleSearchedLikedResto);
});
