#!/usr/bin/env python3
"""Enrich flow-01-ec-core-foundation.drawio with 4 sections"""
import xml.etree.ElementTree as ET
import re
from pathlib import Path

# Read current flow-01
FILE_PATH = Path("flow-01-ec-core-foundation.drawio")
tree = ET.parse(FILE_PATH)
root = tree.getroot()

# Find diagram and mxGraphModel
ns = {"mxfile": "http://www.draw.io/mxfile"}
diagram = root.find(".//diagram[@id='flow-01-core-foundation']")
model = diagram.find("mxGraphModel")

# Update pageHeight for 4 sections (1600 → 3500+)
model.set("pageHeight", "3800")

# Find root mxCell (parent container)
root_cell = model.find(".//mxCell[@id='1']")

# Current max y to find where to insert new sections
current_cells = model.findall(".//mxCell")
max_y = 1250  # current bottom of flow-01

# ============ SECTION 2: Foundation Object Hierarchy ============
section2_y = max_y + 40

# Header
h2 = ET.Element("mxCell")
h2.set("id", "sec2-header")
h2.set("value", "<b style='font-size:13px;color:#0D4A6B'>🏗️ Foundation Object Hierarchy (4 tiers)</b>")
h2.set("style", "text;html=1;align=left;verticalAlign=middle;fontSize=13;fillColor=#E8F4FD;strokeColor=#0D4A6B;spacingLeft=12;")
h2.set("vertex", "1")
h2.set("parent", "1")
geom = ET.Element("mxGeometry")
geom.set("x", "30")
geom.set("y", str(section2_y))
geom.set("width", "1620")
geom.set("height", "36")
h2.append(geom)
model.find(".//root").append(h2)

# Org Foundation box
org_y = section2_y + 50
org_box = ET.Element("mxCell")
org_box.set("id", "org-foundation")
org_box.set("value", "<b style='color:#0D4A6B;font-size:11px'>Organization Foundation (BRD #1)</b><br><span style='font-size:9px;color:#666'>Group → Company → BU → Division → Dept → Store/Location/CC/Zone</span>")
org_box.set("style", "rounded=1;whiteSpace=wrap;html=1;fillColor=#DAE8FC;strokeColor=#0D4A6B;strokeWidth=2;fontSize=9;align=center;")
org_box.set("vertex", "1")
org_box.set("parent", "1")
geom = ET.Element("mxGeometry")
geom.set("x", "50")
geom.set("y", str(org_y))
geom.set("width", "300")
geom.set("height", "60")
org_box.append(geom)
model.find(".//root").append(org_box)

# Job Foundation box
job_box = ET.Element("mxCell")
job_box.set("id", "job-foundation")
job_box.set("value", "<b style='color:#0D4A6B;font-size:11px'>Job Foundation</b><br><span style='font-size:9px;color:#666'>Job Family → Job Grade → Job Code</span>")
job_box.set("style", "rounded=1;whiteSpace=wrap;html=1;fillColor=#E1D5E7;strokeColor:#0D4A6B;strokeWidth=2;fontSize=9;align=center;")
job_box.set("vertex", "1")
job_box.set("parent", "1")
geom = ET.Element("mxGeometry")
geom.set("x", "430")
geom.set("y", str(org_y))
geom.set("width", "300")
geom.set("height", "60")
job_box.append(geom)
model.find(".//root").append(job_box)

# Position Foundation box
pos_box = ET.Element("mxCell")
pos_box.set("id", "pos-foundation")
pos_box.set("value", "<b style='color:#0D4A6B;font-size:11px'>Position Foundation</b><br><span style='font-size:9px;color:#666'>Position → FTE → Reporting Line → Org Unit</span>")
pos_box.set("style", "rounded=1;whiteSpace=wrap;html=1;fillColor:#D5E8D4;strokeColor:#0D4A6B;strokeWidth=2;fontSize=9;align=center;")
pos_box.set("vertex", "1")
pos_box.set("parent", "1")
geom = ET.Element("mxGeometry")
geom.set("x", "810")
geom.set("y", str(org_y))
geom.set("width", "300")
geom.set("height", "60")
pos_box.append(geom)
model.find(".//root").append(pos_box)

# Payment Foundation box
pay_box = ET.Element("mxCell")
pay_box.set("id", "pay-foundation")
pay_box.set("value", "<b style='color:#0D4A6B;font-size:11px'>Payment Foundation (BRD #6)</b><br><span style='font-size:9px;color:#666'>Pay Group → Pay Grade → Pay Component → Bank</span>")
pay_box.set("style", "rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor:#D6B656;strokeWidth=2;fontSize=9;align=center;")
pay_box.set("vertex", "1")
pay_box.set("parent", "1")
geom = ET.Element("mxGeometry")
geom.set("x", "1190")
geom.set("y", str(org_y))
geom.set("width", "300")
geom.set("height", "60")
pay_box.append(geom)
model.find(".//root").append(pay_box)

# Relationship arrows (orthogonal)
relationships = [
    ("org-foundation", "job-foundation"),
    ("job-foundation", "pos-foundation"),
    ("pos-foundation", "pay-foundation"),
]
for idx, (src, tgt) in enumerate(relationships):
    edge = ET.Element("mxCell")
    edge.set("id", f"rel-{idx}")
    edge.set("value", "")
    edge.set("style", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classic;strokeColor=#666;strokeWidth=1.5;")
    edge.set("edge", "1")
    edge.set("parent", "1")
    edge.set("source", src)
    edge.set("target", tgt)
    geom = ET.Element("mxGeometry")
    geom.set("relative", "1")
    edge.append(geom)
    model.find(".//root").append(edge)

# ============ SECTION 3: UI Screens (12 screens) ============
section3_y = org_y + 100

h3 = ET.Element("mxCell")
h3.set("id", "sec3-header")
h3.set("value", "<b style='font-size:13px;color:#0066CC'>📱 UI Screens Required (12 screens)</b>")
h3.set("style", "text;html=1;align=left;verticalAlign=middle;fontSize=13;fillColor=#E0F0FF;strokeColor=#0066CC;spacingLeft=12;")
h3.set("vertex", "1")
h3.set("parent", "1")
geom = ET.Element("mxGeometry")
geom.set("x", "30")
geom.set("y", str(section3_y))
geom.set("width", "1620")
geom.set("height", "36")
h3.append(geom)
model.find(".//root").append(h3)

# 12 UI Screen cards (simplified)
screens = [
    ("F01.1", "Organization Foundation Admin", "/foundation/org", "Org Code, Name, Parent, Legal Entity, Status"),
    ("F01.2", "Department & Store Setup", "/foundation/dept", "Dept Code, Store Branch, Work Location"),
    ("F01.3", "Work Location Config", "/foundation/location", "Location Code, Address, Cost Center, Zone"),
    ("F01.4", "Job Foundation Admin", "/foundation/job", "Job Code, Family, Grade, Sub-Family, Type"),
    ("F01.5", "Position Foundation Admin", "/foundation/position", "Position Code, FTE, Reporting, Org Unit"),
    ("F01.6", "Pay Foundation Admin", "/foundation/pay", "Pay Grade, Pay Group, Pay Component, Bank"),
    ("F01.7", "Picklist Management", "/admin/picklist", "Field, Values, Sort, Active, Language"),
    ("F01.8", "Foundation Hierarchy Viewer", "/foundation/viewer", "Interactive tree, drill-down, export options"),
    ("F01.9", "Bulk Upload Admin", "/foundation/bulk", "Template, Import, Validation, Error Log"),
    ("F01.10", "Audit Trail Viewer", "/foundation/audit", "Object, Change Date, Changed By, Old/New Value"),
    ("F01.11", "Permission Config", "/foundation/permission", "Role, BRD, Field, Level (Read/Write/Admin)"),
    ("F01.12", "Payment Method Config", "/foundation/payment", "Method, Bank, Account, Active, Priority"),
]

screen_y = section3_y + 50
for idx, (code, name, route, fields) in enumerate(screens):
    row = idx // 2
    col = idx % 2
    x = 50 + col * 810
    y = screen_y + row * 200

    screen = ET.Element("mxCell")
    screen.set("id", f"screen-{code}")
    screen.set("value", f"<b style='color:#0066CC'>{code}</b> {name}<br><span style='font-size:9px;color:#888'>{route}</span><hr style='margin:4px 0;border:0;border-top:1px solid #ccc'/><span style='font-size:8px'>{fields}</span>")
    screen.set("style", "rounded=1;whiteSpace=wrap;html=1;fillColor=#EBF5FB;strokeColor=#0066CC;strokeWidth=1;fontSize=9;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;")
    screen.set("vertex", "1")
    screen.set("parent", "1")
    geom = ET.Element("mxGeometry")
    geom.set("x", str(x))
    geom.set("y", str(y))
    geom.set("width", "760")
    geom.set("height", "180")
    screen.append(geom)
    model.find(".//root").append(screen)

# ============ SECTION 4: BRD Specification Cards ============
section4_y = screen_y + 6 * 200 + 50

h4 = ET.Element("mxCell")
h4.set("id", "sec4-header")
h4.set("value", "<b style='font-size:13px;color:#C92E15'>📋 BRD Specification Cards (3 BRDs)</b>")
h4.set("style", "text;html=1;align=left;verticalAlign=middle;fontSize=13;fillColor=#FFE6CC;strokeColor=#C92E15;spacingLeft=12;")
h4.set("vertex", "1")
h4.set("parent", "1")
geom = ET.Element("mxGeometry")
geom.set("x", "30")
geom.set("y", str(section4_y))
geom.set("width", "1620")
geom.set("height", "36")
h4.append(geom)
model.find(".//root").append(h4)

# BRD Cards
brd_specs = [
    ("1", "Organization Foundation Object", "เก็บข้อมูลพื้นฐาน Organization: Group, Company, BU, Division, Department, Store Format, SSO Location, Store-Branch, Work Location, Cost Center, Zone", "flow-01"),
    ("6", "Payment Foundation Object", "เก็บข้อมูลโครงสร้างการจ่ายเงิน: Pay Group (linked to PG, Corporate Title), Pay Grade, Pay Component, Bank, Frequency", "flow-01"),
    ("7", "EC Picklist", "เก็บข้อมูล Picklist ต่างๆ ของระบบ — สร้าง/แก้ไข/ลบค่า Picklist สำหรับใช้ในรูปแบบการเลือกค่าจากลิสต์", "flow-01"),
]

brd_y = section4_y + 50
for idx, (brn, brt, desc, flow) in enumerate(brd_specs):
    x = 50 + idx * 540

    card = ET.Element("mxCell")
    card.set("id", f"brd-{brn}")
    card.set("value", f"<b style='color:#C92E15;font-size:11px'>BRD #{brn} — {brt}</b><br><span style='font-size:9px;color:#555'>{desc}</span><hr style='margin:6px 0;border:0;border-top:1px solid #ddd'/><span style='font-size:8px;color:#888;font-style:italic'>Flow: {flow}</span>")
    card.set("style", "rounded=1;whiteSpace=wrap;html=1;fillColor=#FFE6CC;strokeColor=#C92E15;strokeWidth=1.5;fontSize=9;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;")
    card.set("vertex", "1")
    card.set("parent", "1")
    geom = ET.Element("mxGeometry")
    geom.set("x", str(x))
    geom.set("y", str(brd_y))
    geom.set("width", "500")
    geom.set("height", "220")
    card.append(geom)
    model.find(".//root").append(card)

# ============ Validate XML ============
try:
    ET.tostring(root, encoding='unicode')  # validate
    print("✅ XML structure is valid")
except Exception as e:
    print(f"❌ XML validation failed: {e}")
    exit(1)

# ============ Write enriched XML ============
# Prettify XML with declaration
xml_str = ET.tostring(root, encoding='unicode')
# Add declaration
if not xml_str.startswith('<?xml'):
    xml_str = '<?xml version="1.0" encoding="UTF-8"?>\n' + xml_str

# Write
FILE_PATH.write_text(xml_str)
print(f"✅ Enriched XML written to {FILE_PATH}")

# ============ Count cells ============
before_count = 95  # original flow-01 count (approximate)
new_cells = len(model.findall(".//mxCell"))
print(f"📊 Cell count: {before_count} (before) → {new_cells} (after)")
print(f"📊 New sections added: 4 (hierarchy + screens + BRD cards)")
print(f"📊 UI Screens: 12")
print(f"📊 BRD Cards: 3 (#1, #6, #7)")
