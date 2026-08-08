export default function GlobalBackground() {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%",
      height: "100dvh",
      zIndex: 0,
      pointerEvents: "none",
      background: "#0a0a0a",
    }} />
  );
}
