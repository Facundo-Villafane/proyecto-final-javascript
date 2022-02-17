function get(element) {
    return document.getElementById(element);
}
let open = get("navOpen");
let nav = get("nav");
let close = get("navClose");

open.addEventListener('click', function () {
    nav.classList.add('nav-open');
})

close.addEventListener('click', function () {
    nav.classList.remove('nav-open');
})