$("#send").keyup(function () {
  var characterCount = $(this).val().length,
    current = $("#current"),
    maximum = $("#maximum"),
    theCount = $("#the-count");

  current.text(characterCount);
  if (characterCount >= 2500) {
    maximum.css("color", "#EF4D7D");
    current.css("color", "#EF4D7D");
    theCount.css("font-weight", "bold");
  } else {
    maximum.css("color", "#FFFFFF");
    current.css("color", "#FFFFFF");
    theCount.css("font-weight", "normal");
  }
});
