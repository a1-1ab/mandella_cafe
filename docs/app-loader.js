/**
 * GitHub Pages ships this demo as a single gzipped bundle (base64) plus this
 * loader, because the Pages deploy path can only publish small text files.
 * Decompresses in the browser, then boots the real app bundle.
 */
const bundleUrl = new URL('app.bundle.b64', import.meta.url);

const fail = (message) => {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div style="font-family:Cairo,system-ui,sans-serif;direction:rtl;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F8F5EF;color:#172321;padding:24px;text-align:center">
      <div><h1 style="font-size:18px;margin:0 0 8px">تعذّر تشغيل العرض</h1>
      <p style="font-size:13px;color:#7C8A85;margin:0">${message}</p></div>
    </div>`;
};

const boot = async () => {
  const response = await fetch(bundleUrl);
  if (!response.ok) throw new Error(`bundle ${response.status}`);

  const base64 = (await response.text()).trim();
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  if (typeof DecompressionStream === 'undefined') {
    fail('المتصفح قديم ولا يدعم فك الضغط. جرّب Chrome أو Safari حديث.');
    return;
  }

  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  const code = await new Response(stream).text();
  const moduleUrl = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
  await import(moduleUrl);
};

boot().catch((error) => fail(error.message || 'خطأ غير معروف'));
