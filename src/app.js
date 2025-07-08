
// Domain generation data
const domainData = {
  divertido: {
    pronouns: ["the", "our", "my", "super"],
    adjectives: ["funny", "crazy", "wild", "awesome", "epic", "mega", "ultra", "happy"],
    nouns: ["jogger", "racoon", "party", "adventure", "smile", "dance", "laugh", "fun"]
  },
  profesional: {
    pronouns: ["the", "our", "pro", "elite"],
    adjectives: ["professional", "expert", "premium", "elite", "advanced", "smart", "top", "best"],
    nouns: ["consulting", "solutions", "services", "group", "company", "firm", "agency", "corp"]
  },
  magico: {
    pronouns: ["the", "our", "magic", "mystic"],
    adjectives: ["magical", "mystic", "enchanted", "cosmic", "stellar", "divine", "sacred", "ethereal"],
    nouns: ["wizard", "spell", "crystal", "potion", "realm", "dimension", "universe", "energy"]
  },
  "domain-hack": {
    pronouns: ["", "my", "go", "get"],
    adjectives: ["", "quick", "fast", "instant", "smart", "tech", "digital", "cyber"],
    nouns: ["app", "tech", "hub", "lab", "code", "dev", "web", "net"]
  }
};

const extensions = [".com", ".net", ".org", ".io", ".co", ".dev", ".app", ".tech", ".online", ".digital"];

let currentCategory = "divertido";
let generatedDomains = [];

// DOM Elements
const keywordInput = document.getElementById('keyword-input');
const enviarBtn = document.getElementById('enviar-btn');
const borrarBtn = document.getElementById('borrar-btn');
const copiarBtn = document.getElementById('copiar-btn');
const descargarBtn = document.getElementById('descargar-btn');
const resultsSection = document.getElementById('results-section');
const domainList = document.getElementById('domain-list');
const categoryBtns = document.querySelectorAll('.category-btn');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Category button listeners
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      categoryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
    });
  });

  // Set default active category
  document.querySelector('.category-btn[data-category="divertido"]').classList.add('active');

  // Action button listeners
  enviarBtn.addEventListener('click', generateDomains);
  borrarBtn.addEventListener('click', clearResults);
  copiarBtn.addEventListener('click', copyAllDomains);
  descargarBtn.addEventListener('click', downloadDomains);

  // Enter key listener for input
  keywordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      generateDomains();
    }
  });
});

function generateDomains() {
  const keyword = keywordInput.value.trim().toLowerCase();
  
  if (!keyword) {
    alert('Por favor ingresa una palabra clave');
    return;
  }

  showLoading();
  
  setTimeout(() => {
    generatedDomains = [];
    const data = domainData[currentCategory];
    
    // Generate combinations with keyword
    for (let pronoun of data.pronouns) {
      for (let adjective of data.adjectives) {
        for (let extension of extensions.slice(0, 4)) { // Limit extensions for better UX
          if (pronoun && adjective) {
            generatedDomains.push(`${pronoun}${adjective}${keyword}${extension}`);
          } else if (pronoun) {
            generatedDomains.push(`${pronoun}${keyword}${extension}`);
          } else if (adjective) {
            generatedDomains.push(`${adjective}${keyword}${extension}`);
          } else {
            generatedDomains.push(`${keyword}${extension}`);
          }
        }
      }
    }
    
    // Remove duplicates and limit results
    generatedDomains = [...new Set(generatedDomains)].slice(0, 12);
    
    displayDomains();
  }, 1000);
}

function showLoading() {
  resultsSection.classList.remove('d-none');
  domainList.innerHTML = '<div class="loading">Generando dominios...</div>';
}

function displayDomains() {
  domainList.innerHTML = '';
  
  generatedDomains.forEach((domain, index) => {
    const domainItem = document.createElement('div');
    domainItem.className = 'domain-item';
    domainItem.textContent = domain;
    domainItem.style.animationDelay = `${index * 0.1}s`;
    
    domainItem.addEventListener('click', function() {
      copyToClipboard(domain);
      this.classList.add('copied');
      setTimeout(() => this.classList.remove('copied'), 2000);
    });
    
    domainList.appendChild(domainItem);
  });
}

function clearResults() {
  keywordInput.value = '';
  resultsSection.classList.add('d-none');
  generatedDomains = [];
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copiado: ${text}`);
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(`Copiado: ${text}`);
  });
}

function copyAllDomains() {
  if (generatedDomains.length === 0) {
    alert('No hay dominios para copiar');
    return;
  }
  
  const allDomains = generatedDomains.join('\n');
  copyToClipboard(allDomains);
}

function downloadDomains() {
  if (generatedDomains.length === 0) {
    alert('No hay dominios para descargar');
    return;
  }
  
  const content = `Dominios generados para: ${keywordInput.value}\nCategoría: ${currentCategory}\n\n${generatedDomains.join('\n')}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dominios_${keywordInput.value}_${currentCategory}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  showToast('Archivo descargado exitosamente');
}

function showToast(message) {
  // Create a simple toast notification
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    font-weight: 600;
    z-index: 1000;
    animation: slideInToast 0.3s ease-out;
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutToast 0.3s ease-out';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Add toast animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInToast {
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutToast {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

