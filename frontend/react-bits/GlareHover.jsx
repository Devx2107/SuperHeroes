// Glare Hover's diagonal light band adapted from React Bits. See LICENSE.md and SOURCES.md.
export default function GlareHover({ reduced }) {
  return reduced ? null : (
    <span className="rb-glare" data-react-bits="GlareHover" aria-hidden="true">
      <span className="rb-glare-band" />
    </span>
  );
}
