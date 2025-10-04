const url = "https://chl-7308acb4-20c3-4120-9c1b-66a116c133ab-blog-hacklab-v2.softwareseguro.com.ar/comment";
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
