# Repeatable reporting pipeline — synthetic demonstration

A small-file Python example showing incremental ingestion, validation, duplicate handling, and recoverable reporting. The sample orders are invented test data. No operational savings or production scale are claimed.

## Run (Python 3.12+; no extra packages)

    python pipeline.py sample-input output
    python pipeline.py sample-input output
    python -m unittest -v test_pipeline.py

The sample yields three accepted orders, three rejected rows, January total 12,000 cents and February total 3,500 cents. The second run ingests zero new files and preserves the same totals.

## Flow
CSV snapshots → schema/row checks → durable JSON state → monthly report.json.

Files are hashed and treated as immutable snapshots. Duplicate order IDs and invalid rows are recorded with file, row and reason. Schema changes fail the batch before saved state changes. Integer cents avoid binary floating-point aggregation. Atomic file replacement prevents a partial JSON file becoming current. State is committed before report export; rerunning repairs an interrupted report export.

A single-run marker prevents simultaneous writers. If a process crashes, confirm it has stopped before removing output/.running. Keep original input files. To rebuild, use a new output directory. Protect the output directory: rejected rows may contain source data.

## Scheduling & monitoring
The same command can be run by an existing scheduler using absolute paths. Capture stdout/stderr and alert on a non-zero exit. The JSON summary reports new files, accepted orders and rejected rows. No scheduler or hosted service is configured by this demonstration.

## Limits
All state is held in memory and rewritten each run. This is suitable for a small reproducible demonstration, not a large warehouse or financial ledger. Updates, deletions, currency conversion and distributed execution are deliberately unsupported. Use a database-backed design and agreed correction semantics for those requirements.
