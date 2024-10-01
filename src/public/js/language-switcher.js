$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const currentLang = params.get("lang") || "en";
  $(".item-lang").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      const newLang = $(this).data("lang");
      const newUrl = new URL(window.location);
      newUrl.searchParams.set("lang", newLang);
      window.location.href = newUrl;
    });
    if ($(this).data("lang") === currentLang) {
      $(this).addClass("active-lang");
    }
  });
});
