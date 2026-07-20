document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Set minimum date to today on the date input ---------- */
  var dateInput = document.getElementById('travelDate');
  if (dateInput) {
    var today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  /* ---------- Navbar background on scroll ---------- */
  var nav = document.getElementById('mainNav');
  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('rb-scrolled');
    } else {
      nav.classList.remove('rb-scrolled');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  /* ---------- Swap From / To cities ---------- */
  var swapBtn = document.getElementById('swapBtn');
  var fromCity = document.getElementById('fromCity');
  var toCity = document.getElementById('toCity');
  if (swapBtn) {
    swapBtn.addEventListener('click', function () {
      var temp = fromCity.value;
      fromCity.value = toCity.value;
      toCity.value = temp;
    });
  }

  /* ---------- Search form submit ---------- */
  var searchForm = document.getElementById('searchForm');
  var toast = document.getElementById('searchToast');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!fromCity.value || !toCity.value || !dateInput.value) return;
      document.getElementById('toastFrom').textContent = fromCity.value;
      document.getElementById('toastTo').textContent = toCity.value;
      document.getElementById('toastDate').textContent = new Date(dateInput.value).toDateString();
      toast.classList.add('show');
      setTimeout(function () {
        toast.classList.remove('show');
      }, 4000);
    });
  }

  /* ---------- Scroll reveal using IntersectionObserver ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('rb-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('rb-visible'); });
  }

  /* ---------- Back to top button ---------- */
  var backTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      backTop.classList.add('show');
    } else {
      backTop.classList.remove('show');
    }
  });
  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          window.scrollTo({
            top: targetEl.offsetTop - 80,
            behavior: 'smooth'
          });
          var navMenu = document.getElementById('navMenu');
          if (navMenu.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
          }
        }
      }
    });
  });

});