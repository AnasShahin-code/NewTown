// filtering buttons in the home page logic
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    console.log("Filter clicked:", filter);
  });
});

// Switching between the themes :

const switchInput = document.getElementById("darkModeSwitch");
const htmlEl = document.documentElement;
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("theme") || "light";

function setTheme(theme) {
  htmlEl.setAttribute("data-bs-theme", theme);
  if (theme === "dark") {
    switchInput.checked = true;
    themeIcon.className = "fas fa-moon";
  } else {
    switchInput.checked = false;
    themeIcon.className = "fas fa-sun";
  }
  localStorage.setItem("theme", theme);
}

setTheme(savedTheme);

switchInput.addEventListener("change", () => {
  const theme = switchInput.checked ? "dark" : "light";
  setTheme(theme);
});

// scroll to top button in the home page :
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when scrolled down
window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// Scroll to top smoothly
scrollTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

//   filter buttons in the Home page : هاد يلي بيخلينا نعمل فلترة

const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".service-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    cards.forEach((card) => {
      const categories = card
        .getAttribute("data-category")
        .split(",")
        .map((c) => c.trim());

      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

//   handling the Form functionality :
// رح ينبعتوا الرسائل على بريد  عمرو
// ورح يعطيني اذا نجحت العملبة او لا
//  ورح يختفي بغد تلت ثواني
const form = document.getElementById("contactForm");
const alertContainer = document.getElementById("alert-container");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(
      "https://formsubmit.co/amroaljabali5@gmail.com",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      showAlert("✅ تم إرسال رسالتك بنجاح!", "success");
      form.reset();
    } else {
      showAlert("❌ حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.", "danger");
    }
  } catch (error) {
    showAlert("⚠️ فشل الاتصال بالسيرفر. تحقق من الإنترنت.", "danger");
  }
});

function showAlert(message, type) {
  alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;

  setTimeout(() => {
    const alert = alertContainer.querySelector(".alert");
    if (alert) {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
      bsAlert.close();
    }
  }, 3000);
}

// Search bar in events page :
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector('form[role="search"]');
  const searchInput = document.querySelector('input[type="search"]');
  const cards = document.querySelectorAll(".card__article");
  const noResults = document.querySelector(".no-results");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    filterCards();
  });

  searchInput.addEventListener("input", () => {
    filterCards();
  });

  function filterCards() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCards = 0;

    cards.forEach((card) => {
      const name = card.dataset.name?.toLowerCase() || "";
      const date = card.dataset.date?.toLowerCase() || "";
      const location = card.dataset.location?.toLowerCase() || "";
      const category = card.dataset.category?.toLowerCase() || "";
      const description =
        card.querySelector(".info__description")?.textContent.toLowerCase() ||
        "";

      const matches =
        name.includes(query) ||
        date.includes(query) ||
        location.includes(query) ||
        category.includes(query) ||
        description.includes(query);

      card.style.display = matches || query === "" ? "" : "none";
      if (matches || query === "") visibleCards++;
    });

    noResults.style.display =
      visibleCards === 0 && query !== "" ? "block" : "none";
  }
});

// event page:
const events = {
  football1: {
    title: "لعبة كرة قدم",
    subtitle: "مباراة حماسية في ملعب الفيحاء",
    start: "2025-10-01T18:00:00+03:00",
    end: "2025-10-01T20:00:00+03:00",
    location: "ملعب الفيحاء",
    description: `
          <p>مباراة ودية ممتعة مع حضور جماهيري كبير.</p>
          <p><strong>الفرق:</strong> الوحدة  ×  الكرامة</p>
          <p><strong>الملعب:</strong> ملعب الفيحاء  </p>
        `,
    gallery: [
      "images/event_page/fehaa_1.jpg",
      "images/event_page/fehaa_2.jpg",
      "images/event_page/fehaa_3.jpg",
    ],
    map: "images/event_page/fehaa_map.jpg",
  },
  conference1: {
    title: "مؤتمر علمي",
    subtitle: "جامعة دمشق - التكنولوجيا والابتكار",
    start: "2025-11-15",
    end: "2025-11-15",
    location: "جامعة دمشق - قاعة المؤتمرات",
    description: `
          <p>مؤتمر دولي حول التكنولوجيا والابتكار بمشاركة خبراء عالميين.</p>
          <p><strong>المكان:</strong> قاعة المؤتمرات، جامعة دمشق</p>
        `,
    gallery: [
      "images/event_page/Reda_said.jpg",
      "images/event_page/Reda_said_2.jpg",
      "images/event_page/Reda_said_3.jpg",
    ],
    map: "images/event_page/Reda_said_map.png",
  },
  musuem: {
    title: "زيارة متحف",
    subtitle: "رحلة مليئة بالمتعة والمعرفة",
    start: "2025-12-1",
    end: "2025-12-2",
    location: "المتحف الوطني",
    description: `
          <p>انطلق معنا في رحلة ممتعة إلى المتحف الوطني، حيث يلتقي التاريخ العريق مع الفن والثقافة. سنأخذكم في جولة بين القاعات والمعارض التي تحتضن كنوزاً أثرية نادرة، ولوحات فنية تحكي قصص الماضي والحضارات. فرصة مميزة لاكتشاف الجمال والإبداع، والتعرّف على إرثنا الوطني الغني بطريقة شيقة وممتعة.</p>
          <p><strong>المكان:</strong> المتحف الوطني</p>
        `,
    gallery: [
      "images/event_page/national_museum_1.jpg",
      "images/event_page/national_museum_2.jpg",
      "images/event_page/national_museum_3.jpg",
    ],
    map: "images/event_page/national_museum_map.png",
  },
  book_exhibition: {
    title: "معرض الكتاب",
    subtitle: "رحلة ممتعة إلى معرض الكتاب الدولي",
    start: "30/11/2025",
    end: "2/12/2025",
    location: "المكتبة الوطنية",
    description:
      "رحلة ثقافية ممتعة إلى معرض الكتاب، لاكتشاف أحدث الإصدارات وعيش أجواء المعرفة والإلهام",
    gallery: [
      "images/event_page/national_library_1.jpg",
      "images/event_page/national_library_2.jpg",
    ],
    map: "images/event_page/national_library_map.png",
  },
  musical_event: {
    title: "حفلة غنائية",
    subtitle: "أمسية على أنغام الموسيقى",
    start: "18/12/2025",
    end: "18/12/2025",
    location: "دار الأوبرا",
    description:
      "عِشوا أمسية من الطرب الأصيل مع صوت الأسطورة صباح فخري، حيث تأخذكم الألحان الدمشقية الساحرة في رحلة زمنية تعبق بالموشحات والقدود الحلبية، لتصنع ذكرى لا تُنسى",
    gallery: [
      "images/event_page/opera_1.jpg",
      "images/event_page/opera_2.jpg",
      "images/event_page/opera_3.jpg",
      "images/event_page/opera_4.jpg",
    ],
    map: "images/event_page/opera_map.png",
  },
  cleaning_campaign: {
    title: "حملة تنظيف المدينة",
    subtitle: "معًا من أجل مدينة نظيفة",
    start: "30/12/2025",
    end: "1/1/2026",
    location: "مدينة دمشق-حي الميدان",
    description:
      "انضموا إلينا في مبادرة تطوعية لتنظيف مدينتنا وجعلها أكثر جمالًا وحياة",
    gallery: [
      "images/event_page/clean_1.jpg",
      "images/event_page/clean_2.jpg",
      "images/event_page/clean_3.jpg",
    ],
    map: "images/event_page/clean_map.jpg",
  },
};

//  Load event after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const event = events[id];

  if (event) {
    document.getElementById("header-title").textContent = event.title;
    document.getElementById("event-title").textContent = event.title;
    document.getElementById("event-subtitle").textContent = event.subtitle;
    document.getElementById("event-details").innerHTML = event.description;

    // Gallery
    const galleryDiv = document.getElementById("gallery");
    event.gallery.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.onclick = () => openModal(src);
      galleryDiv.appendChild(img);
    });

    // Map
    document.getElementById("map").style.backgroundImage = `url(${event.map})`;
  }

  // Modal
  window.openModal = function (src) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modalImg.src = src;
    modal.style.display = "flex";
    modal.onclick = () => (modal.style.display = "none");
  };

  // Calendar
  window.addToCalendar = function () {
    if (!event) return;
    const start = event.start.replace(/[-:]/g, "").replace(/\.\d\d\d/g, "");
    const end = event.end.replace(/[-:]/g, "").replace(/\.\d\d\d/g, "");

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      event.subtitle
    )}&location=${encodeURIComponent(event.location)}`;
    window.open(gCalUrl, "_blank");
  };

  // Share button
  window.shareEvent = function () {
    if (!event) return;
    const shareData = {
      title: event.title,
      text: `${event.title} - ${event.subtitle}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      prompt("انسخ الرابط لمشاركته:", window.location.href);
    }
  };
});

function loadRelatedCards(currentId) {
  const container = document.getElementById("related-cards");
  if (!container) return;

  // خذ كل الأحداث ما عدا الفعالية الحالية
  const related = Object.keys(events).filter((key) => key !== currentId);

  related.forEach((key) => {
    const e = events[key];

    const article = document.createElement("article");
    article.className = "card__article card-yellow";
    article.dataset.name = e.title;
    article.dataset.date = e.start.split("T")[0];
    article.dataset.location = e.location;
    article.dataset.category = "ثقافة"; // يمكنك التعديل حسب الحاجة

    article.innerHTML = `
      <img src="${e.gallery[0]}" alt="image" class="card__img" />
      <div class="card__shadow"></div>
      <div class="card__data">
        <h2 class="card__name">${e.title}</h2>
        <span style="color: white" class="card__profession">${e.start.split("T")[0]}</span>
      </div>
      <div class="card__clip">
        <i class="ri-menu-4-line"></i>
      </div>
      <div class="info">
        <div class="info__data">
          <h2 class="info__name">${e.title}</h2>
          <p class="info__description">${e.description.replace(/<[^>]+>/g,'')}</p>
          <a href="event.html?id=${key}" class="info__button">تفاصيل أكثر</a>
        </div>
      </div>
    `;

    container.appendChild(article);
  });
}

// استدعاء الدالة بعد تحميل الفعالية الحالية
if (event) {
  loadRelatedCards(id);
}









var currentLang = 'en';

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',        // Official page language (no auto translate)
        includedLanguages: 'en,ar' // Only allow switching between en and ar
    }, 'google_translate_element');
}

function toggleLanguage() {
    if (currentLang === 'en') {
        // User asks for Arabic
        translateTo('ar');
        currentLang = 'ar';
        document.getElementById('lang-flag').src = "https://flagcdn.com/us.svg";
        document.getElementById('lang-label').textContent = "English";
    } else {
        // User asks for English, go back to original
        translateTo('en');
        currentLang = 'en';
        document.getElementById('lang-flag').src = "https://flagcdn.com/sy.svg";
        document.getElementById('lang-label').textContent = "Arabic";
    }
}

function translateTo(lang) {
    var selectField = document.querySelector("select.goog-te-combo");
    if (selectField) {
        selectField.value = lang;
        selectField.dispatchEvent(new Event('change'));
    }
}