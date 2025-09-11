"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

export type CountryItem = {
  code: string;
  dialCode: string;
  name_en: string;
  name_ar: string;
};

type Props = {
  locale: "ar" | "en";
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  // If true, keeps the user's typed query after closing the list.
  // If false (default), restores the selected country's label when closing.
  persistQueryOnClose?: boolean;
};

export default function CountryCodeSelect({
  locale,
  value,
  onChange,
  placeholder,
  persistQueryOnClose = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<CountryItem[]>([]);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const listId = "cc-listbox";

  useEffect(() => {
    let cancelled = false;
    fetch("/country-codes.json")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => setItems([]));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 50);
    return items
      .filter((it) => {
        const name = (locale === "ar" ? it.name_ar : it.name_en).toLowerCase();
        return (
          name.includes(q) ||
          it.dialCode.toLowerCase().includes(q) ||
          it.code.toLowerCase().includes(q)
        );
      })
      .slice(0, 50);
  }, [items, query, locale]);

  function select(it: CountryItem) {
    onChange(it.dialCode.replace(/[^\d]/g, ""));
    setQuery(`${locale === "ar" ? it.name_ar : it.name_en} ${it.dialCode}`);
    setOpen(false);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(0, filtered.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = filtered[active];
      if (it) select(it);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const selected = useMemo(() => {
    if (!value) return undefined;
    return items.find(
      (x) => x.dialCode.replace(/[^\d]/g, "") === value.replace(/[^\d]/g, "")
    );
  }, [value, items]);

  const selectedLabel = useMemo(() => {
    if (!selected) return "";
    return `${locale === "ar" ? selected.name_ar : selected.name_en} ${
      selected.dialCode
    }`;
  }, [selected, locale]);

  useEffect(() => {
    // If parent sets a value, reflect it in the query display
    if (selected) setQuery(selectedLabel);
  }, [selected, selectedLabel]);

  // When dropdown closes without a selection or typing, restore the current selection label
  useEffect(() => {
    if (!open) {
      if (!persistQueryOnClose || query.trim() === "") {
        if (selected) setQuery(selectedLabel);
        else setQuery("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selected, selectedLabel, persistQueryOnClose]);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="cc" ref={boxRef} dir={dir}>
      <input
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        placeholder={placeholder}
        className="input"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          // Open and show full list by clearing the search if we're just showing the selection label
          setOpen(true);
          if (query.trim() === selectedLabel.trim()) setQuery("");
          setActive(0);
        }}
        onClick={() => {
          // Ensure click also opens the list
          if (!open) setOpen(true);
          if (query.trim() === selectedLabel.trim()) setQuery("");
        }}
        onKeyDown={onKey}
      />
      {open && filtered.length > 0 && (
        <ul id={listId} role="listbox" className="list">
          {filtered.map((it, idx) => (
            <li
              key={`${it.code}-${it.dialCode}`}
              role="option"
              aria-selected={idx === active}
              className={`opt${idx === active ? " active" : ""}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(it)}
            >
              <span className="name">
                {locale === "ar" ? it.name_ar : it.name_en}
              </span>
              <span className="dial">{it.dialCode}</span>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .cc {
          position: relative;
        }
        .input {
          width: 100%;
          padding: 0.75rem 0.9rem;
          border-radius: 8px;
          border: 1px solid #333;
          background: #111;
          color: #fff;
          box-sizing: border-box;
        }
        .list {
          position: absolute;
          margin: 0.25rem 0 0;
          padding: 0.25rem;
          list-style: none;
          z-index: 50;
          background: #0b0b0b;
          color: #fff;
          border: 1px solid #333;
          border-radius: 8px;
          max-height: 260px;
          overflow: auto;
          width: 100%;
        }
        .opt {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.6rem;
          border-radius: 6px;
          cursor: pointer;
        }
        .opt:hover,
        .opt.active {
          background: #151515;
        }
        .name {
          opacity: 0.95;
        }
        .dial {
          color: var(--color-accent);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
