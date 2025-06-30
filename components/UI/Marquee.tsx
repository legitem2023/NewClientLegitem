// components/Marquee.js
export default function Marquee() {
  return (
    <div className="marquee-container">
      <div className="marquee">
        This is a custom marquee using CSS animation.
      </div>
      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 10s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
