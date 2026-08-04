/**
 * Scoped styles for the Proyecto1 artifact shell.
 */
export const ARTIFACT_CSS = "\n  .dc-artifact--proyecto1,.dc-artifact--proyecto1 *{box-sizing:border-box}\n  .dc-artifact--proyecto1{margin:0;background:#C4AEFF;color:#120720;font-family:'IBM Plex Mono',monospace;-webkit-font-smoothing:antialiased}\n  .dc-artifact--proyecto1 a{color:#3B0764;text-decoration:none;border-bottom:3px solid #120720}\n  .dc-artifact--proyecto1 a:hover{color:#7C3AED;background:#C6FF3D}\n  .dc-artifact--proyecto1 select,.dc-artifact--proyecto1 button,.dc-artifact--proyecto1 input{font-family:'IBM Plex Mono',monospace}\n  .dc-artifact--proyecto1 ::selection{background:#C6FF3D;color:#120720}\n  @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}\n  @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:.15}}\n  @keyframes pop{from{transform:scale(.4);opacity:.2}to{transform:scale(1);opacity:1}}\n  @keyframes jit{0%,100%{transform:translate(0,0)}25%{transform:translate(1px,-1px)}50%{transform:translate(-1px,1px)}75%{transform:translate(1px,1px)}}\n  @keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(198,255,61,0)}50%{box-shadow:0 0 0 6px rgba(198,255,61,.45)}}\n  @keyframes drift{from{background-position:0 0}to{background-position:60px 60px}}\n  @keyframes rise{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}\n"

/**
 * Injects artifact CSS into the document.
 */
export function ArtifactStyles() {
  return (
    <style>{`${ARTIFACT_CSS}
.dc-artifact--proyecto1 { min-height: 100%; }
`}</style>
  )
}
