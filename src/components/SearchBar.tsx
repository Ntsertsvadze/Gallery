import { useState, useRef, useEffect } from "react";

interface Props {
  setQuery: (query: string) => void;
}

export default function SearchBar({ setQuery }: Props) {
  const [inputValue, setInputValue] = useState("");
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(() => {
      setQuery(inputValue);
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue, setQuery]);

  return (
    <input
      type="text"
      placeholder="Search photos..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    />
  );
}
