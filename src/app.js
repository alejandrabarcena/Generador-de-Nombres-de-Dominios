let pronouns = ["the", "our"];
let adjectives = ["great", "big"];
let nouns = ["jogger", "racoon"];
let extensions = [".com", ".net", ".us", ".io"];

function generateDomains(keyword) {
  let domains = [];

  for (let p of pronouns) {
    for (let a of adjectives) {
      for (let n of nouns) {
        for (let ext of extensions) {
          domains.push(`${p}${a}${n}${keyword}${ext}`);
        }
      }
    }
  }

  return domains;
}

window.onload = () => {
  const btn = document.querySelector("#generate-btn");
  const input = document.querySelector("#keyword");
  const output = document.querySelector("#results");

  btn.addEventListener("click", () => {
    const keyword = input.value.trim();
    if (!keyword) return;

    const domains = generateDomains(keyword);
    output.innerHTML = "<h4 class='mb-3'>🔎 Resultados:</h4>";

    domains.forEach(domain => {
      const p = document.createElement("p");
      p.className = "text-primary";
      p.textContent = domain;
      output.appendChild(p);
    });
  });
};
