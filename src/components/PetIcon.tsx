export function PetIcon({ petType, className }: { petType: string; className?: string }) {
  switch (petType) {
    case "cat":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M4 6l4 3h8l4-3v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6zm5 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      );
    case "rabbit":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M8 2c1 0 2 1 2 4v4c-4 1-6 3-6 7 0 3 3 5 8 5s8-2 8-5c0-4-2-6-6-7V6c0-3 1-4 2-4-2-1-4 1-4 4 0 0-2-3-4-4z" />
        </svg>
      );
    case "bird":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M14 4c-3 0-5 2-6 5l-4 3 4 .5L7 16l5-2 2 4 2-5 5-1-4-2c0-3-1-6-3-6z" />
        </svg>
      );
    case "reptile":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M3 13c2-3 5-4 8-3 2 .8 4 1 6 0l4-2-2 5c-1 3-4 5-8 5-5 0-8-2-8-5z" />
        </svg>
      );
    case "dog":
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M5 7l2-3 3 2h4l3-2 2 3-1 4c0 5-3 8-6 8s-6-3-6-8L5 7zm4 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      );
  }
}
