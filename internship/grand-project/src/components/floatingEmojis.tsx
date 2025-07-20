"use client";
import { useMemo } from "react";

const icons = [
  "🍅", "🥕", "🍞", "🍗", "🧀", "🍳", "🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐",
  "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🥬", "🥦", "🫑", "🧄", "🧅", "🥔", "🌽", "🍠",
  "🍕", "🍔", "🍟", "🌭", "🥪", "🌮", "🌯", "🥙", "🧆", "🍝", "🍜", "🍲", "🍛", "🍣",
  "🍱", "🥟", "🦪", "🍤", "🍙", "🍚", "🍘", "🥚", "🥓", "🥩", "🦴", "🦞", "🦐", "🦑",
  "🐟", "🐠", "🧈", "🍯", "🥫", "🫙", "🧊", "🍰", "🎂", "🧁", "🥧", "🍩", "🍪", "🍫",
  "🍕", "🍔", "🍟", "🌭", "🥪", "🌮", "🌯", "🥙", "🧆", "🍝", "🍜", "🍲", "🍛", "🍣",
  "🍅", "🥕", "🍞", "🍗", "🧀", "🍳", "🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐",
];

export default function FloatingEmojis() {
  const iconPositions = useMemo(() => {
    return icons.map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        {icons.map((icon, i) => (
          <span
            key={i}
            className={`absolute text-4xl opacity-20 animate-float-${(i % 3) + 1}`}
            style={iconPositions[i]}
          >
            {icon}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 10s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
