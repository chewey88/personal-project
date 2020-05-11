SELECT * FROM trails
JOIN trails_minerals_join tmj on trails.trail_id = tmj.trail_id
JOIN minerals ON tmj.mineral_id = minerals.mineral_id;