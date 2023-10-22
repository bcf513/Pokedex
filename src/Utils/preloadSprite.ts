export async function preloadSprite(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = reject;
  }).catch((error) => console.error("Erro: " + error));
}
