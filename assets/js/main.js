/* Assistance Dogs South Africa — site behaviour */
(function(){
  "use strict";

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
    initNavToggle();
    initReveal();
    initActiveNav();
    initForm();
  });
})();
