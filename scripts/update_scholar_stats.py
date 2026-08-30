"""Fetch Google Scholar citation stats and write them to assets/data/scholar.json.

Runs daily via .github/workflows/scholar-stats.yml. Uses the `scholarly`
package; falls back to leaving the existing JSON untouched on failure so the
site never shows an empty value.
"""

import datetime
import json
import pathlib
import sys

from scholarly import scholarly

SCHOLAR_ID = "5FBYzP8AAAAJ"
OUTPUT = pathlib.Path("assets/data/scholar.json")


def main() -> int:
    try:
        author = scholarly.search_author_id(SCHOLAR_ID)
        author = scholarly.fill(author, sections=["basics", "indices"])
    except Exception as exc:  # noqa: BLE001 - network/scrape failures are expected occasionally
        print(f"Failed to fetch scholar profile: {exc}", file=sys.stderr)
        return 1

    citations = author.get("citedby")
    if not citations:
        print("No citation count returned; keeping existing data.", file=sys.stderr)
        return 1

    data = {
        "citations": citations,
        "hIndex": author.get("hindex", 0),
        "updated": datetime.date.today().isoformat(),
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(data, indent=2) + "\n")
    print(f"Updated {OUTPUT}: {data}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
