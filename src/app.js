let pronoun = ['the', 'our'];
let adj = ['great', 'big'];
let noun = ['jogger', 'racoon'];
let extensions = ['.com', '.net', '.us', '.io'];

function generateRandomDomain() {
  const p = pronoun[Math.floor(Math.random() * pronoun.length)];
  const a = adj[Math.floor(Math.random() * adj.length)];
  const n = noun[Math.floor(Math.random() * noun.length)];
  const ext = extensions[Math.floor(Math.random() * extensions.length)];

  return `${p}${a}${n}${ext}`;
}

window.onload = () => {
  const button = document.querySelector("#generate-btn");
  const output = document.querySelector("#generated-domain");

  button.addEventListener("click", () => {
    const domain = generateRandomDomain();
    output.textContent = domain;
  });
};
