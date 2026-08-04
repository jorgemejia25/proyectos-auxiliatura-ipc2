/**
 * Scoped styles for the Practica1 artifact shell.
 */
export const ARTIFACT_CSS = "\n  .dc-artifact--practica1,.dc-artifact--practica1 *{box-sizing:border-box}\n  .dc-artifact--practica1{margin:0;background:#A8C6FF;color:#06142E;font-family:'IBM Plex Mono',monospace;-webkit-font-smoothing:antialiased}\n  .dc-artifact--practica1 a{color:#082A63;text-decoration:none;border-bottom:3px solid #06142E}\n  .dc-artifact--practica1 a:hover{color:#1E4FD8;background:#35E0FF}\n  .dc-artifact--practica1 select,.dc-artifact--practica1 button,.dc-artifact--practica1 input{font-family:'IBM Plex Mono',monospace}\n  .dc-artifact--practica1 ::selection{background:#35E0FF;color:#06142E}\n  @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}\n  @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:.15}}\n  @keyframes drift{from{background-position:0 0}to{background-position:30px 30px}}\n  @keyframes rise{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}\n"

/**
 * Injects artifact CSS into the document.
 */
export function ArtifactStyles() {
  return (
    <style>{`${ARTIFACT_CSS}
.dc-artifact--practica1 { min-height: 100%; }
`}</style>
  )
}
