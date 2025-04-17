// Get drink ID from URL or fallback to red-frontier
function getDrinkId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('drink') || 'red-frontier';
}

// Load JSON and render drink
async function loadCocktail() {
  const drinkId = getDrinkId();
  const jsonPath = `cocktails/${drinkId}.json`;

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error('Cocktail not found.');
    const data = await response.json();

    // Meta & SEO
    setPageTitle(`${data.name} – Signature Cocktail`);
    setMetaTag('description', data.description);
    setMetaTag('keywords', data.keywords.join(', '));
    setOpenGraphMeta('og:title', `${data.name} – Signature Cocktail`);
    setOpenGraphMeta('og:description', data.description);
    setOpenGraphMeta('og:image', data.image);
    setOpenGraphMeta('og:url', window.location.href);

    // JSON-LD
    const imageUrl = data.image || 'https://thechillguy2.github.io/red-frontier/img/default.png';
    const drinkUrl = window.location.href;
    injectJSONLD(data, imageUrl, drinkUrl);

    // Name & Bild
    document.getElementById('cocktail-name').textContent = data.name;
    document.getElementById('cocktail-image').src = data.image;
    document.getElementById('cocktail-image').alt = data.name;

    // Beschreibung & Flavor
    document.getElementById('cocktail-description').textContent = data.description;
    document.getElementById('flavor-profile').textContent = data.flavorProfile;

    // Stärke
    const strengthBar = document.getElementById('strength-bar');
    strengthBar.innerHTML = `
      <strong>Strength:</strong>
      <div style="background:#eee;width:100%;height:10px;border-radius:5px;margin-top:5px">
        <div style="width:${data.strength * 10}%;height:10px;background:#c00;border-radius:5px"></div>
      </div>`;

    // Zutaten
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    data.ingredients.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ingredientsList.appendChild(li);
    });

    // Anleitung
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    data.instructions.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      instructionsList.appendChild(li);
    });

    // Links
    const externalLinks = document.getElementById('external-links');
    externalLinks.innerHTML = '';
    for (const [name, url] of Object.entries(data.externalLinks || {})) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      li.appendChild(a);
      externalLinks.appendChild(li);
    }

    // Tags
    const tagsDiv = document.getElementById('tags');
    tagsDiv.innerHTML = data.tags.map(tag =>
      `<span style="background:#ddd;padding:4px 8px;border-radius:4px;margin:3px;display:inline-block">#${tag}</span>`
    ).join(' ');

    // Variationen
    const variationLinks = document.getElementById('variation-links');
    variationLinks.innerHTML = '';
    if (data.variationOf) {
      variationLinks.innerHTML = `This is a variation of <a href="?drink=${data.variationOf}">${data.variationOf.replace('-', ' ')}</a>.`;
    } else if (data.variations && data.variations.length > 0) {
      variationLinks.innerHTML = `<strong>Variations:</strong> ` +
        data.variations.map(v =>
          `<a href="?drink=${v}">${v.replace('-', ' ')}</a>`
        ).join(', ');
    }

  } catch (err) {
    document.body.innerHTML = `<main><h1>Error</h1><p>${err.message}</p></main>`;
  }
}

// Start
loadCocktail();
