-- Curator Scorecard view
-- Formula: 40% TVL (log-normalized) + 30% discipline + 30% activity (log-scale)
-- Aggregates multiple curator addresses under a single brand name.
-- Apply this in Hasura console → Data → SQL after deploying to Envio Cloud.

CREATE OR REPLACE VIEW curator_scorecard AS
WITH vault_tvl_usd AS (
  SELECT
    "Vault".id,
    "Vault".curator,
    "Vault"."chainId",
    CASE
      WHEN "Vault".asset = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' THEN "Vault".tvl / 1000000000000000000::numeric * 3000
      WHEN "Vault".asset = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' THEN "Vault".tvl / 1000000::numeric
      WHEN "Vault".asset = '0xdac17f958d2ee523a2206206994597c13d831ec7' THEN "Vault".tvl / 1000000::numeric
      WHEN "Vault".asset = '0x6b175474e89094c44da98b954eedeac495271d0f' THEN "Vault".tvl / 1000000000000000000::numeric
      WHEN "Vault".asset = '0x83f20f44975d03b1b09e64809b757c47f942beea' THEN "Vault".tvl / 1000000000000000000::numeric
      WHEN "Vault".asset = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' THEN "Vault".tvl / 100000000::numeric * 100000
      WHEN "Vault".asset = '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0' THEN "Vault".tvl / 1000000000000000000::numeric * 3200
      WHEN "Vault".asset = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84' THEN "Vault".tvl / 1000000000000000000::numeric * 3000
      WHEN "Vault".asset = '0xf939e0a03fb07f59a73314e73794be0e57ac1b4e' THEN "Vault".tvl / 1000000000000000000::numeric
      WHEN "Vault".asset = '0x6c3ea9036406852006290770bedfcaba0e23a0e8' THEN "Vault".tvl / 1000000::numeric
      WHEN "Vault".asset = '0x4200000000000000000000000000000000000006' THEN "Vault".tvl / 1000000000000000000::numeric * 3000
      WHEN "Vault".asset = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913' THEN "Vault".tvl / 1000000::numeric
      WHEN "Vault".asset = '0x50c5725949a6f0c72e6c4a641f24049a917db0cb' THEN "Vault".tvl / 1000000000000000000::numeric
      WHEN "Vault".asset = '0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf' THEN "Vault".tvl / 100000000::numeric * 100000
      WHEN "Vault".asset = '0xecac9c5f704e954931349da37f60e39f515c11c1' THEN "Vault".tvl / 100000000::numeric * 100000
      ELSE NULL
    END AS tvl_usd
  FROM "Vault"
),
vault_with_brand AS (
  SELECT
    "Vault".id,
    "Vault".curator,
    CASE
      WHEN "Vault".name ILIKE 'MEV Capital%'    THEN 'MEV Capital'
      WHEN "Vault".name ILIKE 'Block Analitica%' THEN 'BlockAnalitica'
      ELSE split_part(TRIM("Vault".name), ' ', 1)
    END AS brand_token
  FROM "Vault"
),
curator_brand AS (
  SELECT t.curator, t.brand_token AS brand
  FROM (
    SELECT
      curator, brand_token,
      ROW_NUMBER() OVER (PARTITION BY curator ORDER BY COUNT(*) DESC, brand_token) AS rn
    FROM vault_with_brand
    GROUP BY curator, brand_token
  ) t
  WHERE t.rn = 1
),
vault_stats AS (
  SELECT
    cb.brand,
    v.curator,
    v.id         AS vault_id,
    v."chainId",
    vt.tvl_usd,
    COALESCE(cc.cap_change_count,  0) AS cap_changes,
    COALESCE(cc.revoke_count,      0) AS revokes,
    COALESCE(r.reallocation_count, 0) AS reallocations,
    COALESCE(vm.market_count,      0) AS markets
  FROM "Vault" v
  JOIN curator_brand cb ON cb.curator = v.curator
  LEFT JOIN vault_tvl_usd vt ON vt.id = v.id
  LEFT JOIN (
    SELECT vault_id, COUNT(*) AS cap_change_count,
           COUNT(*) FILTER (WHERE "changeType" = 'REVOKE') AS revoke_count
    FROM "CapChange" GROUP BY vault_id
  ) cc ON cc.vault_id = v.id
  LEFT JOIN (
    SELECT vault_id, COUNT(*) AS reallocation_count
    FROM "Reallocation" GROUP BY vault_id
  ) r ON r.vault_id = v.id
  LEFT JOIN (
    SELECT vault_id, COUNT(*) AS market_count
    FROM "VaultMarket" GROUP BY vault_id
  ) vm ON vm.vault_id = v.id
),
brand_agg AS (
  SELECT
    brand,
    COUNT(DISTINCT curator)  AS address_count,
    COUNT(DISTINCT vault_id) AS vault_count,
    COUNT(DISTINCT "chainId") AS chain_count,
    COALESCE(SUM(tvl_usd), 0) AS total_tvl_usd,
    SUM(cap_changes)          AS total_cap_changes,
    SUM(revokes)              AS total_revokes,
    SUM(reallocations)        AS total_reallocations,
    SUM(markets)              AS total_markets,
    CASE WHEN SUM(cap_changes) > 0
         THEN ROUND(1.0 - SUM(revokes) / SUM(cap_changes), 4)
         ELSE 1.0 END AS discipline_score,
    ROUND(LEAST(
      CASE WHEN COUNT(DISTINCT vault_id) > 0
           THEN (LOG(GREATEST(SUM(reallocations) / COUNT(DISTINCT vault_id)::numeric, 1) + 1)
                 / LOG(10001.0))::numeric * 100
           ELSE 0 END,
      100
    ), 2) AS activity_score
  FROM vault_stats
  GROUP BY brand
  HAVING SUM(reallocations) > 0 OR SUM(cap_changes) > 0
),
brand_primary AS (
  SELECT t.brand, t.curator AS primary_curator
  FROM (
    SELECT cb.brand, v.curator, COUNT(*) AS n,
           ROW_NUMBER() OVER (PARTITION BY cb.brand ORDER BY COUNT(*) DESC, v.curator) AS rn
    FROM "Vault" v
    JOIN curator_brand cb ON cb.curator = v.curator
    GROUP BY cb.brand, v.curator
  ) t WHERE t.rn = 1
),
max_tvl AS (
  SELECT MAX(total_tvl_usd) AS max_tvl FROM brand_agg WHERE total_tvl_usd > 0
)
SELECT
  b.brand,
  p.primary_curator                        AS curator,
  b.address_count,
  b.vault_count,
  b.chain_count,
  ROUND(b.total_tvl_usd)                   AS total_tvl_usd,
  b.total_cap_changes,
  b.total_revokes,
  b.total_reallocations,
  b.total_markets,
  b.discipline_score,
  b.activity_score,
  ROUND(
    CASE WHEN m.max_tvl > 0 AND b.total_tvl_usd > 0
         THEN LOG(b.total_tvl_usd + 1) / LOG(m.max_tvl + 1) * 100
         ELSE 0 END
  ::numeric, 2) AS tvl_score,
  ROUND((
    CASE WHEN m.max_tvl > 0 AND b.total_tvl_usd > 0
         THEN LOG(b.total_tvl_usd + 1) / LOG(m.max_tvl + 1) * 40
         ELSE 0 END
    + CASE WHEN b.total_cap_changes > 0
           THEN 1.0 - b.total_revokes / b.total_cap_changes
           ELSE 1.0 END * 30
    + b.activity_score / 100.0 * 30
  )::numeric, 2) AS overall_score
FROM brand_agg b
JOIN brand_primary p ON p.brand = b.brand
CROSS JOIN max_tvl m
ORDER BY overall_score DESC;
