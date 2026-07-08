# Assistance Dogs South Africa — Website

A clean, modern, five-page website for Assistance Dogs South Africa: Home, About Us, Our Dogs, Training Programs, and Contact Us.

## Structure
```
index.html          Home page
about.html           About Us
dogs.html            Our Dogs
programs.html        Training Programs
contact.html         Contact Us (enquiry form)
assets/css/style.css Design system (colours, type, components)
assets/js/main.js    Paw-print scroll progress, mobile nav, reveal animations
assets/img/logo.png  Site logo (also used as favicon)
```

## Brand system
- **Colours:** Navy `#3f5781` · Leaf Green `#93ce53` · Gold `#e3a745` · White, on a soft neutral background.
- **Type:** Manrope (headings) + Inter (body), loaded from Google Fonts.
- **Signature detail:** a paw print walks along a gold-to-green progress rail at the top of every page as you scroll, and paw icons replace plain numbered steps throughout the site.

## Publish it with GitHub Pages (free hosting)
1. Create a new repository on GitHub (e.g. `assistancedog-website`).
2. Upload all the files in this folder, keeping the folder structure intact (the `assets` folder must stay next to the HTML files).
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, choose the `main` branch and `/ (root)` folder, then **Save**.
5. GitHub will give you a live URL (e.g. `https://yourusername.github.io/assistancedog-website/`) within a minute or two.

## Connecting your own domain (www.assistancedog.co.za)
1. In the same repo, add a file named `CNAME` (no extension) containing just:
   ```
   www.assistancedog.co.za
   ```
2. With your domain registrar, add a `CNAME` record for `www` pointing to `yourusername.github.io`.
3. Back in **Settings → Pages**, enter the custom domain and enable **Enforce HTTPS** once it's verified.

## Things to personalise before launch
- Swap the WhatsApp number placeholder (`27000000000`) in the WhatsApp buttons across all five pages for the real number.
- Add real social media links in the footer and Contact page (currently `#` placeholders).
- The contact form currently shows a confirmation message on submit but does not send email yet — connect it to a form service (e.g. Formspree, Netlify Forms) or your own backend to receive real enquiries.
- Replace any placeholder copy you'd like refined further, and feel free to swap in real photography of dogs and handlers once available.
