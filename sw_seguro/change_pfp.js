const remoteUrl = "https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=";
const postUrl = "/profile"; // o la URL absoluta
const cookieIncluded = true; // include cookies if the endpoint requires session cookie

async function uploadRemoteImage(remoteUrl, postUrl) {
  // 1) bajar la imagen (CORS required en remote)
  const res = await fetch(remoteUrl, { mode: "cors" });
  if (!res.ok) throw new Error("No pude bajar la imagen: " + res.status);
  const blob = await res.blob(); // tipo MIME conservado si el servidor lo entrega

  // 2) preparar form-data
  const form = new FormData();
  form.append("bio", "None");
  // elegir nombre de archivo; algunos backends usan filename
  const filename = "cat.jpg";
  form.append("profile_pic", blob, filename);

  // 3) enviar con cookies (si el endpoint necesita session cookie)
  const postRes = await fetch(postUrl, {
    method: "POST",
    body: form,
    credentials: cookieIncluded ? "include" : "same-origin"
  });

  const text = await postRes.text();
  return { status: postRes.status, body: text };
}

// uso
uploadRemoteImage(remoteUrl, postUrl)
  .then(r => console.log("Respuesta:", r))
  .catch(e => console.error("Error:", e));

