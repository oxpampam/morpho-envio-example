-- Block Flow Summary view
-- Groups LPFlow events by timestamp + chainId for bar/chart visualisations.
-- Apply this in Hasura console → Data → SQL after deploying to Envio Cloud.

CREATE OR REPLACE VIEW block_flow_summary AS
SELECT
  "timestamp",
  split_part(vault_id, '-', 2)::integer AS "chainId",
  COUNT(*)  FILTER (WHERE "flowType" = 'DEPOSIT')  AS deposit_count,
  COUNT(*)  FILTER (WHERE "flowType" = 'WITHDRAW') AS withdraw_count,
  SUM(assets) FILTER (WHERE "flowType" = 'DEPOSIT')  AS deposit_assets,
  SUM(assets) FILTER (WHERE "flowType" = 'WITHDRAW') AS withdraw_assets,
  SUM(assets * CASE WHEN "flowType" = 'DEPOSIT' THEN 1 ELSE -1 END::numeric) AS net_flow,
  COUNT(*) AS total_flows
FROM "LPFlow" l
GROUP BY "timestamp", split_part(vault_id, '-', 2)::integer
ORDER BY "timestamp" DESC;
