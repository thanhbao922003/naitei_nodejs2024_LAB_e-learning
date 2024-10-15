$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get("lang");
  $(".item-lang").each(function () {
    const langAttr = $(this).data("lang");
    if (lang === langAttr) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });
});
