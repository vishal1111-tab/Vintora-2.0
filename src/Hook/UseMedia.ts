import { useEffect, useState } from 'react';

const useMedia = () => {
  const query = '(max-width: 991px)';
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return {
    isMobile: matches,
  } as const;
};

export default useMedia;
