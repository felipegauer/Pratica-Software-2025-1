import { useEffect, useState } from 'react';

export function useOpenCV() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkOpenCV = () => {
      if ((window as any).cv && (window as any).cv.imread) {
        setLoaded(true);
      } else {
        setTimeout(checkOpenCV, 100);
      }
    };
    checkOpenCV();
  }, []);

  return loaded;
}