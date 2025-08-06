const legalTexts = {
  "tr": {
    "legal_notice": `
      <h2>Yasal Bilgilendirme</h2>
      <p>NOVAKAYN, yapay zeka destekli içerik analizi hizmetleri sunan bir teknoloji platformudur.<br>
      Sitede yer alan tüm içerikler, NOVAKAYN’a aittir veya lisanslanmıştır.<br>
      İzinsiz çoğaltma, kopyalama veya ticari kullanım yasaktır.<br>
      Bu site üzerinden paylaşılan hiçbir bilgi, hukuki veya teknik danışmanlık niteliği taşımaz.</p>
    `,
    "privacy_policy": `
      <h2>Gizlilik Politikası</h2>
      <p>Kullanıcı gizliliği bizim için önceliklidir.<br>
      NOVAKAYN, yalnızca hizmetlerin sunulması için gerekli olan kişisel verileri toplar ve asla üçüncü taraflarla izinsiz paylaşmaz.<br>
      Çerezler (cookies), kullanıcı deneyimini geliştirmek amacıyla kullanılabilir.<br>
      Gizlilik politikamız, uluslararası veri koruma standartlarına uygundur.</p>
    `,
    "terms_of_use": `
      <h2>Kullanım Şartları</h2>
      <p>Bu siteyi kullanarak, kullanım şartlarını kabul etmiş sayılırsınız.<br>
      Kullanıcılar, platformu yalnızca yasal ve etik çerçevede kullanmakla yükümlüdür.<br>
      NOVAKAYN, hizmetlerde değişiklik yapma veya hizmeti sonlandırma hakkını saklı tutar.<br>
      Şartlar, zaman zaman güncellenebilir.</p>
    `,
    "report_abuse": `
      <h2>Kötüye Kullanım Bildir</h2>
      <p>NOVAKAYN, kötüye kullanım ve yasa dışı faaliyetlere karşı sıfır tolerans politikası uygular.<br>
      Herhangi bir kötüye kullanım veya ihlali bildirmek için lütfen <b>official.novakayn@gmail.com</b> adresine e-posta gönderin.<br>
      Gerekli inceleme yapıldıktan sonra ilgili aksiyon alınacaktır.</p>
    `
  },
  "en": {
    "legal_notice": `
      <h2>Legal Notice</h2>
      <p>NOVAKAYN is a technology platform providing AI-powered content analysis services.<br>
      All content on this site is owned or licensed by NOVAKAYN.<br>
      Unauthorized reproduction, copying, or commercial use is prohibited.<br>
      No information shared on this site constitutes legal or technical advice.</p>
    `,
    "privacy_policy": `
      <h2>Privacy Policy</h2>
      <p>User privacy is our priority.<br>
      NOVAKAYN collects only the personal data necessary to provide its services and never shares it with third parties without consent.<br>
      Cookies may be used to enhance user experience.<br>
      Our privacy policy complies with international data protection standards.</p>
    `,
    "terms_of_use": `
      <h2>Terms of Use</h2>
      <p>By using this site, you agree to the terms of use.<br>
      Users are responsible for using the platform only within legal and ethical boundaries.<br>
      NOVAKAYN reserves the right to modify or terminate services at any time.<br>
      These terms may be updated periodically.</p>
    `,
    "report_abuse": `
      <h2>Report Abuse</h2>
      <p>NOVAKAYN enforces a zero-tolerance policy against abuse and illegal activities.<br>
      To report any abuse or violations, please send an email to <b>support@novakayn.ai</b>.<br>
      Appropriate action will be taken after necessary review.</p>
    `
  }
};

let languages = {};
let currentLang = navigator.language.startsWith("tr") ? "tr" : "en";

fetch("translations.json")
  .then(res => res.json())
  .then(data => {
    languages = data;
    setLanguage(currentLang);
  });

function setLanguage(lang) {
  currentLang = lang;
  const data = languages[lang] || languages.tr;

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (data[key]) el.textContent = data[key];
  });

  document.querySelectorAll("[data-news]").forEach((el, i) => {
    el.textContent = data.news[i];
  });

  const footer = document.querySelector("footer p");
  if (footer && data.footer_text) footer.textContent = data.footer_text;

  const openModal = document.getElementById("legalModal").style.display === "block";
  if (openModal) {
  const type = document.getElementById("legalContent").dataset.type;
  document.getElementById("legalContent").innerHTML = `
    ${legalTexts[lang][type] || "<p>İçerik bulunamadı.</p>"}
    <button onclick="closeLegal()" class="btn backBtn">⬅ Masaüstüne Dön</button>
  `;
}

  document.getElementById("lang-info").style.display = "none";
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

let contentIndex = 0;
const contents = document.querySelectorAll(".rotatingContent");
let contentInterval;

function showContent(index) {
  contents.forEach(c => c.classList.remove("active"));
  contents[index].classList.add("active");
  contentIndex = index;
}

function startContentRotation(delay = 2000) {
  clearInterval(contentInterval);
  contentInterval = setInterval(() => {
    contentIndex = (contentIndex + 1) % contents.length;
    showContent(contentIndex);
  }, delay);
}

showContent(0);
setTimeout(() => startContentRotation(2000), 1000);

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    const sectionId = link.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
    if (sectionId) {
      e.preventDefault();
      const targetIndex = Array.from(contents).findIndex(c => c.id === sectionId);
      if (targetIndex !== -1) {
        showContent(targetIndex);
        clearInterval(contentInterval);
        setTimeout(() => startContentRotation(2000), 5000); // 5sn bekle
      }
    }
  });
});

let newsIndex = 0;
const newsItems = document.querySelectorAll(".newsItem");
function rotateNews() {
  newsItems.forEach((item, i) => {
    item.style.transform = `translateY(${(i - newsIndex) * 100}%)`;
    item.style.opacity = i === newsIndex ? "1" : "0";
  });
  newsIndex = (newsIndex + 1) % newsItems.length;
}
setInterval(rotateNews, 3000);

function closeLegal() {
  document.getElementById("legalModal").style.display = "none";
  document.querySelectorAll("section").forEach(sec => sec.style.display = "");
  document.getElementById("legalContent").innerHTML = "";
  window.scrollTo(0, 0);
}

document.querySelectorAll('.legal-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const type = this.dataset.type;
    const lang = currentLang;
    const content = legalTexts?.[lang]?.[type] || "<p>İçerik bulunamadı.</p>";

    document.getElementById("legalModal").style.display = "block";
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");

    document.getElementById("legalContent").dataset.type = type;
    document.getElementById("legalContent").innerHTML = `
      ${content}
      <button onclick="closeLegal()" class="btn backBtn">⬅ Masaüstüne Dön</button>
    `;
    window.scrollTo(0, 0);
  });
});

