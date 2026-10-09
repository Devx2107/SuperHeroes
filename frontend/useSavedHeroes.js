import { useCallback, useEffect, useState } from "react";

const key = "legendrium-saved-heroes-v1";
function decode(raw, ids) {
  try {
    const saved = JSON.parse(raw);
    return Array.isArray(saved)
      ? [...new Set(saved.filter((id) => ids.includes(id)))]
      : [];
  } catch {
    return [];
  }
}
export default function useSavedHeroes(ids) {
  const [saved, setSaved] = useState(() => {
    try {
      return decode(localStorage.getItem(key), ids);
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(saved));
    } catch {
      /* Saving is optional. */
    }
  }, [saved]);
  useEffect(() => {
    const sync = (event) => {
      if (event.key === key) setSaved(decode(event.newValue, ids));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [ids]);
  const toggle = useCallback(
    (id) =>
      setSaved((previous) =>
        previous.includes(id)
          ? previous.filter((value) => value !== id)
          : [...previous, id],
      ),
    [],
  );
  return [saved, toggle];
}
