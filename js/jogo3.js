document.addEventListener("DOMContentLoaded", () => {

  const imagens = document.querySelectorAll("main img");

  imagens.forEach(img => {

    img.style.cursor = "pointer";
    img.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";

   
    let subir = false;
    setInterval(() => {
      img.style.transform = subir ? "translateY(0)" : "translateY(-10px)";
      subir = !subir;
    }, 2000);

   
    img.addEventListener("click", () => {
      const ativa = img.classList.toggle("zoom-ativo");

      if (ativa) {
        img.style.transform = "scale(1.4)";
        img.style.boxShadow = "0 0 30px rgba(209, 10, 10, 0.8)";
        img.style.zIndex = "10";
        img.style.position = "relative";
      } else {
        img.style.transform = "";
        img.style.boxShadow = "";
        img.style.zIndex = "";
        img.style.position = "";
      }
    });

  });

});

