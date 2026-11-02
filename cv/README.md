# CV (LaTeX)

This folder contains the two-page public English CV and its PDF. The publication list follows the public homepage, with preprints explicitly marked.

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

This file **must not** be built with **pdfLaTeX** because it uses `fontspec`.
The body uses TeX Gyre Termes. The Chinese name uses `Songti SC` on macOS,
with Fandol Song as a fallback for the built-in editor and other TeX environments.

- The first line `% !TEX program = xelatex` tells LaTeX Workshop to use **XeLaTeX**.
- The repo root `.vscode/settings.json` sets the default recipe to **latexmk (xelatex)**.

If you still see pdfLaTeX in the log, use **LaTeX Workshop: Build LaTeX project** and pick **latexmk (xelatex)** from the recipe list.

## Build on Overleaf

Upload `Hong_Li_CV.tex` to Overleaf and set **Compiler** to **XeLaTeX**.
The font fallback is selected automatically.
