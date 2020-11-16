//default
document.querySelector(".btn-min").setAttribute("disabled", "disabled");

//quantity
var valueCount;

//- button
document.querySelector(".btn-min").addEventListener("click", function () {
  valueCount = document.getElementById("quantity").value;
  valueCount--;
  document.getElementById("quantity").value = valueCount;

  if (valueCount == 1) {
    document.querySelector(".btn-min").setAttribute("disabled", "disabled");
  }
});

//+ button
document.querySelector(".btn-plus").addEventListener("click", function () {
  valueCount = document.getElementById("quantity").value;
  valueCount++;
  document.getElementById("quantity").value = valueCount;

  if (valueCount > 1) {
    document.querySelector(".btn-min").removeAttribute("disabled");
    document.querySelector(".btn-min").classList.remove("disabled");
  }
});
