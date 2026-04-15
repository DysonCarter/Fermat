"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math-extended";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import styles from "./FermatEditor.module.css";

const PLACEHOLDER = `# Welcome to Fermat

Write **Markdown** and *LaTeX* together, seamlessly.

---

## Inline Math

Euler's identity: $e^{i\\pi} + 1 = 0$

The quadratic formula gives us $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ inline.

## Block Math

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

Maxwell's equations in differential form:

$$
\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}
$$

$$
\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}
$$

## Mixed Content

Here's a list with math:

- The **Pythagorean theorem**: $a^2 + b^2 = c^2$
- **Bayes' theorem**: $P(A|B) = \\frac{P(B|A) \\, P(A)}{P(B)}$
- A matrix: $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$

> "I have discovered a truly marvelous proof of this, which this margin is too narrow to contain." — *Pierre de Fermat*

\`\`\`python
# Code blocks are left alone
def fermat(n):
    return n ** 2
\`\`\`
`;

export default function FermatEditor() {
  const [content, setContent] = useState(PLACEHOLDER);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoSymbol}>∫</span>
          <span className={styles.logoText}>Fermat</span>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.charCount}>
            {content.length} chars
          </span>
        </div>
      </header>

      {/* Editor Area */}
      <div className={styles.editorArea}>
        {/* Left: Input */}
        <div className={styles.pane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneLabel}>Editor</span>
            <span className={styles.paneSublabel}>Markdown + LaTeX</span>
          </div>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            placeholder="Start writing Markdown and LaTeX..."
          />
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Right: Preview */}
        <div className={styles.pane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneLabel}>Preview</span>
            <span className={styles.paneSublabel}>Rendered output</span>
          </div>
          <div className={styles.preview}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}