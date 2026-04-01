# CV (LaTeX)

This folder contains a LaTeX version of the CV.

- `Hong_Li_CV.tex`

## Build locally

If you have TeX installed:

```bash
cd cv
latexmk -xelatex -pdf Hong_Li_CV.tex
```

Or:

```bash
cd cv
xelatex Hong_Li_CV.tex
xelatex Hong_Li_CV.tex
```

## VS Code / Cursor (LaTeX Workshop)

This file **must not** be built with **pdfLaTeX** (you will get missing Chinese font errors like `unihei5b`).

- The first line `% !TEX program = xelatex` tells LaTeX Workshop to use **XeLaTeX**.
- The repo root `.vscode/settings.json` sets the default recipe to **latexmk (xelatex)**.

If you still see pdfLaTeX in the log, use **LaTeX Workshop: Build LaTeX project** and pick **latexmk (xelatex)** from the recipe list.

## Build on Overleaf

Upload `Hong_Li_CV.tex` to Overleaf, then set **Compiler** to **XeLaTeX** and compile.
