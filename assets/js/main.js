/* Assistance Dogs South Africa — site behaviour */
(function(){
  "use strict";

  /* ---------- Paw print that walks the scroll progress ---------- */
  var pawSVG =
    '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
    '<ellipse cx="32" cy="40" rx="16" ry="14"/>' +
    '<ellipse cx="14" cy="20" rx="7" ry="9"/>' +
    '<ellipse cx="30" cy="10" rx="7.5" ry="9.5"/>' +
    '<ellipse cx="48" cy="14" rx="7" ry="9"/>' +
    '<ellipse cx="54" cy="30" rx="6.5" ry="8.5"/>' +
    '</svg>';

  function initPawTrack(){
    var track = document.createElement('div');
    track.id = 'paw-track';
    track.innerHTML =
      '<div class="rail"></div><div class="rail-fill"></div>' + pawSVG;
    document.body.appendChild(track);

    var fill = track.querySelector('.rail-fill');
    var paw = track.querySelector('svg');
    var ticking = false;

    function update(){
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - window.innerHeight;
      var pct = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0;
      fill.style.width = pct + '%';
      var x = (pct / 100) * (window.innerWidth - 40);
      var wobble = (Math.sin(scrollTop / 40) * 10);
      paw.style.transform = 'translateX(' + x + 'px) rotate(' + wobble + 'deg)';
      ticking = false;
    }

    window.addEventListener('scroll', function(){
      if(!ticking){
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ---------- Mobile nav toggle ---------- */
  function initNavToggle(){
    var btn = document.querySelector('.nav-toggle');
    var nav = document.querySelector('nav.main-nav');
    if(!btn || !nav) return;
    btn.addEventListener('click', function(){
      btn.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        btn.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal(){
    var items = document.querySelectorAll('.reveal');
    if(!items.length) return;
    if(!('IntersectionObserver' in window)){
      items.forEach(function(el){ el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Highlight current nav link ---------- */
  function initActiveNav(){
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav.main-nav a').forEach(function(a){
      var href = a.getAttribute('href');
      if(href === path || (path === '' && href === 'index.html')){
        a.classList.add('is-active');
      }
    });
  }

  /* ---------- Contact form (static-site friendly demo handling) ---------- */
  function initForm(){
    var form = document.getElementById('enquiry-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = document.getElementById('form-note');
      var name = form.querySelector('#name').value || 'there';
      if(note){
        note.textContent = 'Thank you, ' + name.split(' ')[0] + ' — your enquiry has been noted. Our team will be in touch soon.';
        note.classList.add('is-visible');
      }
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initPawTrack();
    initNavToggle();
    initReveal();
    initActiveNav();
    initForm();
  });
})();
