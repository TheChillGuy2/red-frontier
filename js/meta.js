function injectJSONLD(drinkData, imageUrl, url) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": drinkData.name,
    "image": imageUrl,
    "recipeCategory": "Cocktail",
    "recipeIngredient": drinkData.ingredients || [],
    "description": drinkData.description || drinkData.flavorProfile || "Signature cocktail.",
    "author": {
      "@type": "Organization",
      "name": "Red Frontier Project"
    },
    "url": url
  };

  script.textContent = JSON.stringify(jsonLd, null, 2);
  document.head.appendChild(script);
}

function setMetaTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setPageTitle(title) {
  document.title = title;
}

function setOpenGraphMeta(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}
