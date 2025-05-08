'use client'

import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import "./code.scss";
import { useEffect, useRef } from 'react';

export function HighlightedJSON({ code }: { code: object }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, [code]);

  return (
    <pre>
      <code ref={ref} className="language-json">
        {JSON.stringify(code, null, 2)}
      </code>
    </pre>
  );
}
