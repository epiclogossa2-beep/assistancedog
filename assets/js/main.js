/* Assistance Dogs South Africa — site behaviour */
(function(){
  "use strict";

  /* ---------- Parallax drift on scroll ---------- */
  function initParallax(){
    var items = document.querySelectorAll('.parallax');
    if(!items.length) return;
    var ticking = false;
    function update(){
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      items.forEach(function(el){
        var speed = parseFloat(el.getAttribute('data-speed')) || 0.15;
        el.style.transform = 'translateY(' + (scrollTop * speed * -1) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Program-matching quiz ---------- */
  var QUIZ_QUESTIONS = [
    {
      q: "Do you already have a dog?",
      options: [
        { label: "Yes — an adult dog, roughly 12–18 months old, that may be suitable", score: { adult: 2 } },
        { label: "Yes — but a young puppy", score: { puppy: 2 } },
        { label: "No, I don't have a dog yet", score: { org: 2 } }
      ]
    },
    {
      q: "How involved do you want to be in the day-to-day training?",
      options: [
        { label: "Very hands-on — I want to train directly alongside an instructor", score: { adult: 1, puppy: 1 } },
        { label: "I'd prefer the organisation to handle most of the training", score: { org: 2 } }
      ]
    },
    {
      q: "What's your ideal timeline for having a working assistance dog?",
      options: [
        { label: "Sooner — within about a year", score: { adult: 1 } },
        { label: "I'm fine with an 18–24 month journey", score: { puppy: 1 } },
        { label: "No rush — whatever gets the best outcome", score: { org: 1 } }
      ]
    },
    {
      q: "Would a payment plan help make this more affordable for you?",
      options: [
        { label: "Yes, that would help", score: { org: 1 } },
        { label: "Not necessary for us", score: {} }
      ]
    },
    {
      q: "What type of assistance dog do you think you need?",
      options: [
        { label: "Guide Dog", dogType: "Guide Dog" },
        { label: "Autism Assistance Dog", dogType: "Autism Assistance Dog" },
        { label: "Psychiatric Assistance Dog", dogType: "Psychiatric Assistance Dog" },
        { label: "Hearing Dog", dogType: "Hearing Dog" },
        { label: "Service Mobility Dog", dogType: "Service Mobility Dog" },
        { label: "Multipurpose Assistance Dog", dogType: "Multipurpose Assistance Dog" },
        { label: "Facility Dog", dogType: "Facility Dog" },
        { label: "Not sure yet", dogType: "Not sure yet" }
      ]
    }
  ];

  var QUIZ_RESULTS = {
    adult: {
      name: "Owner-Trained Adult Dog Program",
      program: "Owner-Trained Adult Dog",
      blurb: "Best for clients who already own a suitable adult or rescue dog. A qualified instructor trains your dog directly, then teaches you how to confidently work with and maintain its skills.",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#3f5781" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>'
    },
    puppy: {
      name: "Owner-Trained Puppy Program",
      program: "Owner-Trained Puppy",
      blurb: "Best for clients starting with a young puppy. You'll work closely with an instructor over roughly 18–24 months, from foundation training through advanced assistance work.",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#3f5781" stroke-width="1.8"><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/></svg>'
    },
    org: {
      name: "Organisation-Trained Assistance Dog Program",
      program: "Organisation-Trained",
      blurb: "Our most supported option. We source, raise, socialise, and train the dog, then guide a structured handover to you — with payment plans and ongoing support available.",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#3f5781" stroke-width="1.8"><path d="M12 21s-7-4.5-9.5-9C1 8 3 4 7 4c2 0 4 1.5 5 3 1-1.5 3-3 5-3 4 0 6 4 4.5 8-2.5 4.5-9.5 9-9.5 9z"/></svg>'
    }
  };

  function initQuiz(){
    var root = document.getElementById('program-quiz');
    if(!root) return;

    var state = { step: -1, scores: { adult: 0, puppy: 0, org: 0 }, dogType: null };

    function renderStart(){
      root.innerHTML =
        '<div class="quiz-start">' +
          '<div class="icon-badge" style="margin:0 auto;"><svg viewBox="0 0 24 24" fill="none" stroke="#3f5781" stroke-width="1.8"><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/></svg></div>' +
          '<h3 style="margin-bottom:0;">Not sure which program fits?</h3>' +
          '<p style="margin-bottom:0;">Answer 5 quick questions and we\'ll recommend the pathway that suits your situation — then carry it straight into an enquiry.</p>' +
          '<button type="button" class="btn btn-primary" id="quiz-start-btn">Start the Quiz</button>' +
        '</div>';
      document.getElementById('quiz-start-btn').addEventListener('click', function(){
        state.step = 0;
        renderQuestion();
      });
    }

    function renderProgress(){
      var dots = '';
      for(var i=0;i<QUIZ_QUESTIONS.length;i++){
        var cls = i < state.step ? 'is-done' : (i === state.step ? 'is-current' : '');
        dots += '<span class="' + cls + '"></span>';
      }
      return '<div class="quiz-progress">' + dots + '</div>';
    }

    function renderQuestion(){
      var q = QUIZ_QUESTIONS[state.step];
      var optsHtml = q.options.map(function(opt, idx){
        return '<button type="button" class="quiz-option" data-idx="' + idx + '">' + opt.label + '</button>';
      }).join('');

      root.innerHTML =
        renderProgress() +
        '<div class="quiz-question">' +
          '<h3>' + q.q + '</h3>' +
          '<div class="quiz-options">' + optsHtml + '</div>' +
        '</div>' +
        (state.step > 0 ? '<button type="button" class="quiz-back" id="quiz-back-btn">← Back</button>' : '');

      root.querySelectorAll('.quiz-option').forEach(function(btn){
        btn.addEventListener('click', function(){
          var opt = q.options[parseInt(btn.getAttribute('data-idx'), 10)];
          if(opt.score){
            Object.keys(opt.score).forEach(function(k){
              state.scores[k] = (state.scores[k] || 0) + opt.score[k];
            });
          }
          if(opt.dogType){ state.dogType = opt.dogType; }
          state.step++;
          if(state.step >= QUIZ_QUESTIONS.length){
            renderResult();
          } else {
            renderQuestion();
          }
        });
      });

      var backBtn = document.getElementById('quiz-back-btn');
      if(backBtn){
        backBtn.addEventListener('click', function(){
          state.step--;
          renderQuestion();
        });
      }
    }

    function renderResult(){
      var winner = 'org';
      var best = -1;
      ['adult','puppy','org'].forEach(function(k){
        if(state.scores[k] > best){ best = state.scores[k]; winner = k; }
      });
      var result = QUIZ_RESULTS[winner];
      var params = new URLSearchParams();
      params.set('program', result.program);
      if(state.dogType){ params.set('dogtype', state.dogType); }

      root.innerHTML =
        '<div class="quiz-result">' +
          '<div class="icon-badge">' + result.icon + '</div>' +
          '<span class="crumb">Recommended for you</span>' +
          '<h3>' + result.name + '</h3>' +
          '<p>' + result.blurb + '</p>' +
          '<div class="quiz-result-actions">' +
            '<a href="contact.html?' + params.toString() + '" class="btn btn-primary">Continue to Contact Form</a>' +
            '<button type="button" class="btn btn-outline" id="quiz-retake-btn">Retake Quiz</button>' +
          '</div>' +
        '</div>';

      document.getElementById('quiz-retake-btn').addEventListener('click', function(){
        state = { step: -1, scores: { adult: 0, puppy: 0, org: 0 }, dogType: null };
        renderStart();
      });
    }

    renderStart();
  }

  /* ---------- Prefill contact form from quiz result (contact.html) ---------- */
  function initPrefillFromQuiz(){
    var form = document.getElementById('enquiry-form');
    if(!form) return;
    var params = new URLSearchParams(window.location.search);
    var program = params.get('program');
    var dogtype = params.get('dogtype');
    var programSelect = document.getElementById('program');
    var dogTypeSelect = document.getElementById('dog-type');
    var didPrefill = false;

    if(program && programSelect){
      for(var i=0;i<programSelect.options.length;i++){
        if(programSelect.options[i].value === program){ programSelect.selectedIndex = i; didPrefill = true; }
      }
    }
    if(dogtype && dogTypeSelect){
      for(var j=0;j<dogTypeSelect.options.length;j++){
        if(dogTypeSelect.options[j].value === dogtype){ dogTypeSelect.selectedIndex = j; didPrefill = true; }
      }
    }
    if(didPrefill){
      var banner = document.createElement('div');
      banner.style.cssText = 'background:var(--mist-deep);color:var(--navy-deep);font-weight:600;font-size:.88rem;padding:14px 18px;border-radius:12px;margin-bottom:22px;';
      banner.textContent = "We've pre-filled a few answers from your quiz — feel free to adjust anything before sending.";
      form.parentNode.insertBefore(banner, form);
    }
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

    // Safety net: force-reveal anything still hidden after 2s
    setTimeout(function(){
      items.forEach(function(el){ el.classList.add('is-visible'); });
    }, 2000);
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

  /* ---------- Contact form (Web3Forms) ---------- */
function initForm() {
    const form = document.getElementById("enquiry-form");

    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const note = document.getElementById("form-note");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const replyTo = form.querySelector('input[name="replyto"]');
        if (replyTo) {
            replyTo.value = document.getElementById("email").value;
        }

        const formData = new FormData(form);

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        note.textContent = "";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                note.style.color = "#2e7d32";
                note.textContent =
                    "Thank you! Your enquiry has been sent successfully.";

                form.reset();
            } else {
                note.style.color = "#c62828";
                note.textContent =
                    result.message || "Something went wrong. Please try again.";
            }

        } catch (error) {
            note.style.color = "#c62828";
            note.textContent =
                "Something went wrong. Please try again.";

        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/* ---------- Initialise everything ---------- */
document.addEventListener('DOMContentLoaded', function () {
    initNavToggle();
    initReveal();
    initParallax();
    initActiveNav();
    initForm();
    initQuiz();
    initPrefillFromQuiz();
});

})();
