# Enron email analysis

A SQL/Python exploration of the historical Enron email corpus. This is a public-data study, not evidence of individuals' intentions.

## Data required
The database is **not included**. Supply an SQLite database called enron.db in this directory, using the relational schema expected by this notebook: message(mid, sender, date, subject, body), recipientinfo(mid, rvalue, rtype), employeelist(Email_id), and referenceinfo for the optional completeness check. An arbitrary email CSV or raw mailbox archive is not a drop-in replacement.

The original database acquisition source and transformation history have not been established. The public corpus is documented at https://www.cs.cmu.edu/~enron/ ; it is a mailbox corpus, not this SQLite database. Record its source, version, license/terms, import process, and record counts when supplying a compatible database. Do not present historical notebook totals as reproduced until this is done.

## Run
Install pandas, matplotlib, ipywidgets, nltk, wordcloud and jupyter. Open Enron Email Analysis.ipynb from this directory and run its cells. NLTK downloads its stopword resource on first use. The database connection is read-only and fails clearly if the file is absent.

## Counting decisions
communication_scope.sql counts each message once. Sender and recipient membership are independent. Duplicate recipient and employee rows do not inflate message totals. Messages with unlisted recipients, unlisted senders, or no recipients remain separate; absence from an employee roster is not proof that an address is external. Group totals reconcile to all message rows.

Sender counts in the joined exploration use distinct message IDs. Recipient frequency elsewhere describes delivery records. These measures have different grains.

## Regression check
Run: python -m unittest -v test_communication_scope.py
The fixture is synthetic and tests cross-employee communication, mixed recipients, duplicate roster/recipient rows, normalized addresses, and missing recipients. It is not a corpus finding.

## Audit correction
The old query matched sender and recipient to the same employee address. That excluded ordinary messages between different employees. Affected outputs were cleared rather than retained as valid results. Full corpus results must be recomputed once the source database is supplied.
