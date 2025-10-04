const url = "https://chl-865516cc-357a-4dc0-8056-d5376781e146-blog-hacklab-v2.softwareseguro.com.ar/comment";
const form = new URLSearchParams();
form.append("content", "Hallo from Simeal");

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: form.toString(),
  // Crucial: permitir que el navegador incluya las cookies del sitio
  credentials: "same-origin" // usar "include" si haces una petición cross-site y el servidor lo permite
})
.then(async res => {
  console.log("Status:", res.status);
  console.log("Response:", await res.text());
})
.catch(err => console.error("Fetch error:", err));

