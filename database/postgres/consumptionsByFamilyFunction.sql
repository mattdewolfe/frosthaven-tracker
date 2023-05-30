CREATE FUNCTION puff.get_consumptions_by_family(IN p_family_id integer)
    RETURNS SETOF puff.test_observation
    LANGUAGE 'sql'

AS $BODY$
WITH obs AS
	(SELECT
	 	*,
	 	TRUNC(observation.pre_mass - observation.post_mass, 4) AS "delta_mass",
	 	SUM(observation.puff_count) OVER (PARTITION BY observation.device_id ORDER BY observation.date_created ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS "accumulated_puff_count",
	 	TRUNC(observation.filled_weight - observation.post_mass, 4)  AS "residual_payload"
	FROM (
		SELECT
			o.*,
			d.filled_weight,
			TRUNC(COALESCE(LAG(CAST(o.data->>'post_mass' AS NUMERIC), 1) OVER (PARTITION BY o.device_id ORDER BY o.date_created), d.filled_weight, -1), 4) AS "pre_mass",
			GREATEST(COALESCE(CAST(o.data->>'number_puffs' AS INTEGER), 1), 1) AS "puff_count",
			TRUNC(COALESCE(CAST(o.data->>'post_mass' AS NUMERIC), 0), 4) AS "post_mass",
			ROW_NUMBER() OVER (PARTITION BY o.device_id ORDER BY o.date_created) AS "session_count"
		FROM
			puff.test_observation o,
			puff.device d
		WHERE
			o.observation_type_id = 1 AND
			d.id = o.device_id
		ORDER BY
			o.date_created
	) observation
), calculated AS
(
	SELECT
		obs.id as id,
		TRUNC(CAST((obs.delta_mass / obs.puff_count) * 1000 AS NUMERIC), 4) AS "mass_per_puff",
		SUM(obs.delta_mass) OVER (PARTITION BY obs.device_id ORDER BY obs.date_created ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS "accumulated_puff_mass"
	FROM
		obs
)

SELECT
	obs.id,
	obs.device_id,
	obs.test_case_id,
	obs.family_id,
	obs.observation_type_id,
	obs.date_created,
	obs.observation_time,
	obs.operator,
	obs.comment,
	obs.images,
	(obs.data::jsonb || json_build_object('pre_mass', obs.pre_mass,
                    'post_mass', obs.post_mass,
                    'delta_mass', obs.delta_mass,
                    'mass_per_puff', calculated.mass_per_puff,
                    'puff_session_count', obs.session_count,
                    'accumulated_puff_count', obs.accumulated_puff_count,
                    'accumulated_puff_mass', calculated.accumulated_puff_mass,
                    'residual_payload', obs.residual_payload,
                    'average_consumption_rate', TRUNC(CAST(calculated.accumulated_puff_mass/obs.puff_count AS NUMERIC), 4))::jsonb)::json AS data,
	obs.tags

FROM
	obs,
	calculated
WHERE
	obs.family_id = p_family_id AND
	calculated.id = obs.id
ORDER BY
	obs.date_created, obs.device_id;
$BODY$;

ALTER FUNCTION puff.get_consumptions_by_family(integer)
    OWNER TO master_user;
