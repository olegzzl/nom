# -*- coding: utf-8 -*-
"""Полная сборка сайта: страницы медитаций + SEO-разметка и sitemap.

Запуск:  python tools/build_all.py

Порядок важен: сначала build_meditations.py пересобирает meditations*.html,
затем seo_patch.py обновляет главную, Suminigashi, sitemap.xml и robots.txt.
"""

from __future__ import annotations

import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main() -> None:
    for name in ("build_meditations.py", "seo_patch.py"):
        print(f"\n=== {name}")
        subprocess.run([sys.executable, os.path.join(ROOT, "tools", name)], check=True)
    print("\nГотово: страницы и SEO-файлы собраны.")


if __name__ == "__main__":
    main()
