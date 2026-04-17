"""Validate excalidraw JSON for common bugs before rendering.
Run: python3 validate_excalidraw.py <file.excalidraw>
Returns exit code 0 if valid, 1 if issues found.
"""
import json, sys
from collections import defaultdict

def validate(path):
    with open(path) as f:
        doc = json.load(f)

    elements = doc.get("elements", [])
    errors = []
    warnings = []

    # Index elements by ID
    by_id = {e["id"]: e for e in elements}

    for e in elements:
        eid = e["id"]
        etype = e["type"]

        # ═══ CHECK 1: Arrow points must have >= 2 points ═══
        if etype == "arrow":
            pts = e.get("points", [])
            if len(pts) < 2:
                errors.append(f"ARROW_POINTS: '{eid}' has {len(pts)} point(s) — need >= 2. Arrow won't render!")

        # ═══ CHECK 2: Bound element references must exist ═══
        if etype in ("rectangle", "ellipse", "diamond"):
            bounds = e.get("boundElements") or []
            for b in bounds:
                if b["id"] not in by_id:
                    warnings.append(f"BOUND_REF: '{eid}' references '{b['id']}' but it doesn't exist")

        # ═══ CHECK 3: ContainerId must reference existing element ═══
        if etype == "text" and e.get("containerId"):
            cid = e["containerId"]
            if cid not in by_id:
                warnings.append(f"CONTAINER_REF: text '{eid}' containerId='{cid}' doesn't exist")

        # ═══ CHECK 4: Text in container should fit ═══
        if etype == "text" and e.get("containerId"):
            cid = e["containerId"]
            if cid in by_id:
                container = by_id[cid]
                cw = container.get("width", 0)
                ch = container.get("height", 0)
                tw = e.get("width", 0)
                th = e.get("height", 0)
                # Rough check: text width shouldn't exceed container
                text_lines = e.get("text", "").split("\n")
                max_chars = max(len(l) for l in text_lines) if text_lines else 0
                fs = e.get("fontSize", 16)
                estimated_text_w = max_chars * fs * 0.55
                if estimated_text_w > cw * 1.1:  # 10% tolerance
                    warnings.append(f"TEXT_OVERFLOW: '{eid}' text ~{int(estimated_text_w)}px wide but container '{cid}' is {cw}px")

    # ═══ CHECK 5: Overlap detection (bounding box) ═══
    shapes = [(e["id"], e["x"], e["y"], e["x"]+e["width"], e["y"]+e["height"])
              for e in elements
              if e["type"] in ("rectangle", "ellipse", "diamond")
              and e.get("backgroundColor", "transparent") != "transparent"
              and e.get("width", 0) > 30 and e.get("height", 0) > 30]

    overlap_count = 0
    for i, (id1, x1, y1, x1b, y1b) in enumerate(shapes):
        for j, (id2, x2, y2, x2b, y2b) in enumerate(shapes):
            if j <= i:
                continue
            # Skip if one contains the other (parent-child)
            contains = (x1 <= x2 and y1 <= y2 and x1b >= x2b and y1b >= y2b) or \
                       (x2 <= x1 and y2 <= y1 and x2b >= x1b and y2b >= y1b)
            if contains:
                continue
            # Check overlap
            if x1 < x2b and x1b > x2 and y1 < y2b and y1b > y2:
                overlap_area = max(0, min(x1b, x2b) - max(x1, x2)) * max(0, min(y1b, y2b) - max(y1, y2))
                area1 = (x1b - x1) * (y1b - y1)
                area2 = (x2b - x2) * (y2b - y2)
                min_area = min(area1, area2)
                if min_area > 0 and overlap_area / min_area > 0.15:  # >15% overlap
                    overlap_count += 1
                    if overlap_count <= 5:  # limit output
                        warnings.append(f"OVERLAP: '{id1}' and '{id2}' overlap {int(overlap_area/min_area*100)}%")

    if overlap_count > 5:
        warnings.append(f"  ... and {overlap_count - 5} more overlaps")

    # ═══ CHECK 6: Line/Arrow with 0 width AND 0 height = invisible ═══
    for e in elements:
        if e["type"] in ("arrow", "line"):
            pts = e.get("points", [])
            if len(pts) >= 2:
                dx = abs(pts[-1][0] - pts[0][0])
                dy = abs(pts[-1][1] - pts[0][1])
                if dx < 2 and dy < 2:
                    warnings.append(f"ZERO_SIZE: '{e['id']}' arrow/line has ~0 length — invisible")

    # ═══ REPORT ═══
    print(f"\n{'='*60}")
    print(f"Excalidraw Validation: {path}")
    print(f"Elements: {len(elements)}")
    print(f"{'='*60}")

    if errors:
        print(f"\n❌ ERRORS ({len(errors)}) — will cause render bugs:")
        for e in errors:
            print(f"  {e}")

    if warnings:
        print(f"\n⚠ WARNINGS ({len(warnings)}) — may cause visual issues:")
        for w in warnings:
            print(f"  {w}")

    if not errors and not warnings:
        print("\n✅ All checks passed!")

    print(f"\nSummary: {len(errors)} errors, {len(warnings)} warnings")
    return 1 if errors else 0

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 validate_excalidraw.py <file.excalidraw>")
        sys.exit(1)
    sys.exit(validate(sys.argv[1]))
