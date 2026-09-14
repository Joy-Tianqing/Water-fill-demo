from pathlib import Path
import hashlib, base64
root=Path(__file__).resolve().parent.parent
html=(root/'src/template.html').read_text().replace('/* CORE */',(root/'src/core.js').read_text())
script=html.split('<script>',1)[1].split('</script>',1)[0]
digest=base64.b64encode(hashlib.sha256(script.encode()).digest()).decode()
csp="<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; script-src 'sha256-"+digest+"'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'\">"
html=html.replace('<head>','<head>\n  '+csp)
(root/'index.html').write_text(html)
print('Built offline index.html:',len(html.encode()),'bytes')
