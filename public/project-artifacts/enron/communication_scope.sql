-- Grain: one row per message, regardless of recipient count or duplicate roster entries.
WITH classified AS (
 SELECT m.mid,
 CASE
 WHEN NOT EXISTS (SELECT 1 FROM employeelist e WHERE lower(trim(e.Email_id)) = lower(trim(m.sender))) THEN 'Other or unknown sender'
 WHEN NOT EXISTS (SELECT 1 FROM recipientinfo r WHERE r.mid=m.mid) THEN 'No recipient recorded'
 WHEN EXISTS (SELECT 1 FROM recipientinfo r WHERE r.mid=m.mid AND NOT EXISTS (SELECT 1 FROM employeelist e WHERE lower(trim(e.Email_id))=lower(trim(r.rvalue)))) THEN 'Contains unlisted recipients'
 ELSE 'Internal-only recipients'
 END AS communication_scope
 FROM message m
)
SELECT communication_scope, COUNT(*) AS message_count
FROM classified GROUP BY communication_scope ORDER BY communication_scope;
