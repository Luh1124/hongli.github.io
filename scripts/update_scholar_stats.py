"""Fetch public Google Scholar profile metrics for the homepage.

The previous implementation depended on ``scholarly``. Its multi-request
profile expansion is routinely blocked from GitHub-hosted runners, and the
workflow suppressed those errors. This implementation makes one browser-like
request to the public profile, uses only the standard library, and fails
visibly when Scholar rejects the request.
"""

import datetime
import html
import json
import pathlib
import re
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

SCHOLAR_ID = "5FBYzP8AAAAJ"
OUTPUT = pathlib.Path("assets/data/scholar.json")
PROFILE_URL = f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}


def fetch_profile() -> str:
    """Return the public profile HTML, retrying transient network failures."""
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            request = Request(PROFILE_URL, headers=HEADERS)
            with urlopen(request, timeout=30) as response:  # noqa: S310 - fixed HTTPS URL
                page = response.read().decode("utf-8", errors="replace")
            blocked_markers = ("unusual traffic", "not a robot", "recaptcha")
            if any(marker in page.lower() for marker in blocked_markers):
                raise RuntimeError("Google Scholar returned an anti-bot page")
            return page
        except (HTTPError, URLError, TimeoutError, RuntimeError) as exc:
            last_error = exc
            if attempt < 2:
                time.sleep(3 * (attempt + 1))
    raise RuntimeError(f"Unable to fetch Google Scholar profile: {last_error}")


def parse_metrics(page: str) -> tuple[int, int]:
    """Extract all-time citation count and h-index from Scholar's stats table."""
    stats_table = re.search(
        r'<table id="gsc_rsb_st".*?</table>', page, flags=re.DOTALL
    )
    if not stats_table:
        raise ValueError("Google Scholar stats table was not found")

    values = re.findall(r'class="gsc_rsb_std">([\d,]+)</td>', stats_table.group(0))
    if len(values) < 3:
        raise ValueError("Google Scholar metrics were not found")

    citations = int(html.unescape(values[0]).replace(",", ""))
    h_index = int(html.unescape(values[2]).replace(",", ""))
    if citations <= 0:
        raise ValueError("Google Scholar returned an invalid citation count")
    return citations, h_index


def main() -> int:
    try:
        citations, h_index = parse_metrics(fetch_profile())
    except Exception as exc:  # noqa: BLE001 - report every failure to GitHub Actions
        print(f"Failed to fetch Google Scholar profile: {exc}", file=sys.stderr)
        return 1

    data = {
        "citations": citations,
        "hIndex": h_index,
        "updated": datetime.date.today().isoformat(),
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(data, indent=2) + "\n")
    print(f"Updated {OUTPUT}: {data}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
