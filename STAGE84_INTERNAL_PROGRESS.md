# Stage84 internal progress
Version: v8.1.12.263
Schema: 26 (unchanged)
Release: internal candidate only
Node: 918/918
Round157 merged: 90/90
Round242 D&D XLSX / Office sparse re-save: 68/68
Private D&D tool: 17/17
Native attestation fixtures: 21/21
Native local: BLOCKED before navigation; 0 recovery assertions
Production: frozen

Key increments:
- D&D read-only XLSX verification now accepts safe Office/WPS re-saves that omit physically empty cells, while rejecting invalid coordinates, formulas, macros, extra sheets and unknown package parts.
- Native restore release evidence now requires four equal archive hashes AND four equal attachment hashes. Attachment hashes cover original image bytes, thumbnails, workbook bytes, MIME, metadata and orphan attachments without publishing those values.
