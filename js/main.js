document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".needs-validation");

  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          shortLink(input.value);
          event.preventDefault();
        }
        // Add Bootstrap's validation classes
        form.classList.add("was-validated");
      },
      false
    );
  });
});

let submit = document.getElementById("submit");
let input = document.getElementsByClassName("input")[0];

// console.log(input);
// console.log(submit);

// submit.onclick = function (e) {
//   e.preventDefault();
//   // console.log(input.value);
//   shortLink(input.value);
// };

function shortLink(link) {
  // console.log(link);
  let linksRow = document.getElementById("links-row");
  // console.log(linksRow);
  linksRow.innerHTML += `
    <div class="col-lg-12">
      <div
        class="link bg-white py-2 px-3 mb-2 w-100 d-flex justify-content-between align-items-center flex-wrap rounded-1"
      >
        <div class="main-link">${link}</div>
        <div class="left-part d-flex align-items-center">
          <div class="shorten-link">shorttenLink</div>
          <button class="btn btn-primary sign-up ms-3 border-0 copy">
            Copy
          </button>
        </div>
      </div>
    </div>
  `;
  axios
    .post(
      "https://cleanuri.com/api/v1/shorten",
      { url: link },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then((response) => {
      let linksRow = document.getElementById("links-row");
      // console.log(response);
      let shorttenLink = response.data.result_url;
      linksRow.innerHTML += `
            <div class="col-lg-12">
              <div
                class="link bg-white py-2 px-3 mb-2 w-100 d-flex justify-content-between align-items-center flex-wrap rounded-1"
              >
                <div class="main-link">${link}</div>
                <div class="left-part d-flex align-items-center">
                  <div class="shorten-link">${shorttenLink}</div>
                  <button class="btn btn-primary sign-up ms-3 border-0 copy" >
                    Copy
                  </button>
                </div>
              </div>
            </div>
      `;
    })
    .catch((error) => {
      // console.log(error);
    });
}
