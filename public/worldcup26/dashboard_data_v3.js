window.WC_DATA_V3 = {
  "v3_discipline": true,
  "n": 13,
  "fixtures": [
    {
      "fixture_id": "29",
      "event_name": "EUA x Austrália",
      "home_team": "United States",
      "away_team": "Australia",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021462",
        "event_name": "USA vs. Australia",
        "kickoff": "19 June 2026, 16:00",
        "referee": "",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Seattle",
        "location": "Seattle Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 2.18,
        "ax": 1.37,
        "1x2_pct": {
          "home": 53.3,
          "draw": 25.6,
          "away": 21.1
        },
        "over_2_5_pct": 68.8,
        "btts_yes_pct": 68.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.18,
        "ax_baseline": 1.37,
        "hx_v3": 2.1999,
        "ax_v3": 1.3774,
        "delta_total_lambda_pct": 0.77,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.91,
          "away_discipline": 0.54
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 53.6,
          "draw": 25.4,
          "away": 21.0
        },
        "over_2_5_pct": 69.3,
        "btts_yes_pct": 69.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 53.3,
          "v3_pct": 53.6,
          "delta_pts": 0.28
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.6,
          "v3_pct": 25.4,
          "delta_pts": -0.19
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 21.1,
          "v3_pct": 21.0,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 68.7,
          "v3_pct": 69.0,
          "delta_pts": 0.3
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 31.3,
          "v3_pct": 31.0,
          "delta_pts": -0.3
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 89.5,
          "v3_pct": 89.7,
          "delta_pts": 0.24
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 10.5,
          "v3_pct": 10.3,
          "delta_pts": -0.24
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 68.8,
          "v3_pct": 69.3,
          "delta_pts": 0.49
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 31.2,
          "v3_pct": 30.7,
          "delta_pts": -0.49
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 47.4,
          "v3_pct": 48.0,
          "delta_pts": 0.58
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 52.6,
          "v3_pct": 52.0,
          "delta_pts": -0.58
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.21,
        "lambda_red_card": 0.2355,
        "prob_red_card_in_match_pct": 21.0,
        "lambda_penalty": 0.1655,
        "prob_penalty_in_match_pct": 15.3,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "29",
        "event_name": "EUA x Austrália",
        "home_team": "United States",
        "away_team": "Australia",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.1964,
          "fouls_received_score": 0.25,
          "penalty_team_score": 0.5363,
          "yellow_per_match_combined": 1.1888,
          "red_per_match_combined": 0.0138,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.3201,
          "fouls_received_score": 0.175,
          "penalty_team_score": 0.29,
          "yellow_per_match_combined": 1.6359,
          "red_per_match_combined": 0.0326,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021462",
          "event_name": "USA vs. Australia",
          "kickoff": "19 June 2026, 16:00",
          "referee": "",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Seattle",
          "location": "Seattle Stadium",
          "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
        }
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "30",
      "event_name": "Escócia x Marrocos",
      "home_team": "Scotland",
      "away_team": "Morocco",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021454",
        "event_name": "Scotland vs. Morocco",
        "kickoff": "19 June 2026, 19:00",
        "referee": "",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Boston",
        "location": "Boston Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.53,
        "ax": 1.58,
        "1x2_pct": {
          "home": 9.1,
          "draw": 30.7,
          "away": 60.2
        },
        "over_2_5_pct": 35.3,
        "btts_yes_pct": 35.7
      },
      "v3_adjustment": {
        "hx_baseline": 0.53,
        "ax_baseline": 1.58,
        "hx_v3": 0.5362,
        "ax_v3": 1.586,
        "delta_total_lambda_pct": 0.58,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.16,
          "away_discipline": 0.38
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 9.2,
          "draw": 30.7,
          "away": 60.1
        },
        "over_2_5_pct": 35.6,
        "btts_yes_pct": 36.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 9.1,
          "v3_pct": 9.2,
          "delta_pts": 0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 35.7,
          "v3_pct": 36.1,
          "delta_pts": 0.35
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 64.3,
          "v3_pct": 63.9,
          "delta_pts": -0.35
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 65.3,
          "v3_pct": 65.7,
          "delta_pts": 0.32
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 34.7,
          "v3_pct": 34.3,
          "delta_pts": -0.32
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 35.3,
          "v3_pct": 35.6,
          "delta_pts": 0.33
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 64.7,
          "v3_pct": 64.4,
          "delta_pts": -0.33
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 16.3,
          "v3_pct": 16.6,
          "delta_pts": 0.23
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 83.7,
          "v3_pct": 83.4,
          "delta_pts": -0.23
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.92,
        "lambda_red_card": 0.276,
        "prob_red_card_in_match_pct": 24.1,
        "lambda_penalty": 0.1923,
        "prob_penalty_in_match_pct": 17.5,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "30",
        "event_name": "Escócia x Marrocos",
        "home_team": "Scotland",
        "away_team": "Morocco",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.1122,
          "fouls_received_score": null,
          "penalty_team_score": 0.3847,
          "yellow_per_match_combined": 0.8846,
          "red_per_match_combined": 0.0385,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.3738,
          "fouls_received_score": 0.3714,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 1.3565,
          "red_per_match_combined": 0.1,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021454",
          "event_name": "Scotland vs. Morocco",
          "kickoff": "19 June 2026, 19:00",
          "referee": "",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Boston",
          "location": "Boston Stadium",
          "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
        }
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "31",
      "event_name": "Brasil x Haiti",
      "home_team": "Brazil",
      "away_team": "Haiti",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021457",
        "event_name": "Brazil vs. Haiti",
        "kickoff": "19 June 2026, 21:30",
        "referee": "",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Philadelphia",
        "location": "Philadelphia Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 2.53,
        "ax": 0.39,
        "1x2_pct": {
          "home": 82.3,
          "draw": 15.4,
          "away": 2.4
        },
        "over_2_5_pct": 55.9,
        "btts_yes_pct": 31.3
      },
      "v3_adjustment": {
        "hx_baseline": 2.53,
        "ax_baseline": 0.39,
        "hx_v3": 2.5503,
        "ax_v3": 0.3949,
        "delta_total_lambda_pct": 0.86,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.8,
          "away_discipline": 1.25
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 82.4,
          "draw": 15.2,
          "away": 2.4
        },
        "over_2_5_pct": 56.4,
        "btts_yes_pct": 31.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 82.3,
          "v3_pct": 82.4,
          "delta_pts": 0.15
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 15.4,
          "v3_pct": 15.2,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 31.3,
          "v3_pct": 31.7,
          "delta_pts": 0.35
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 68.7,
          "v3_pct": 68.3,
          "delta_pts": -0.35
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 80.5,
          "v3_pct": 80.8,
          "delta_pts": 0.39
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 19.5,
          "v3_pct": 19.2,
          "delta_pts": -0.39
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 55.9,
          "v3_pct": 56.4,
          "delta_pts": 0.58
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 44.1,
          "v3_pct": 43.6,
          "delta_pts": -0.58
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 33.5,
          "v3_pct": 34.0,
          "delta_pts": 0.56
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 66.5,
          "v3_pct": 66.0,
          "delta_pts": -0.56
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.87,
        "lambda_red_card": 0.2174,
        "prob_red_card_in_match_pct": 19.5,
        "lambda_penalty": 0.2156,
        "prob_penalty_in_match_pct": 19.4,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "31",
        "event_name": "Brasil x Haiti",
        "home_team": "Brazil",
        "away_team": "Haiti",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.2327,
          "fouls_received_score": 0.76,
          "penalty_team_score": 0.428,
          "yellow_per_match_combined": 1.138,
          "red_per_match_combined": 0.0101,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.0833,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 1.0,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021457",
          "event_name": "Brazil vs. Haiti",
          "kickoff": "19 June 2026, 21:30",
          "referee": "",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Philadelphia",
          "location": "Philadelphia Stadium",
          "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
        }
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "32",
      "event_name": "Turquia x Paraguai",
      "home_team": "Turkey",
      "away_team": "Paraguay",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.81,
        "ax": 1.34,
        "1x2_pct": {
          "home": 45.4,
          "draw": 29.2,
          "away": 25.4
        },
        "over_2_5_pct": 61.0,
        "btts_yes_pct": 64.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.81,
        "ax_baseline": 1.34,
        "hx_v3": 1.8186,
        "ax_v3": 1.3517,
        "delta_total_lambda_pct": 0.64,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.47,
          "away_discipline": 0.87
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 45.4,
          "draw": 29.1,
          "away": 25.5
        },
        "over_2_5_pct": 61.4,
        "btts_yes_pct": 65.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.2,
          "v3_pct": 29.1,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 25.4,
          "v3_pct": 25.5,
          "delta_pts": 0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 64.9,
          "v3_pct": 65.2,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 35.1,
          "v3_pct": 34.8,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 85.3,
          "v3_pct": 85.6,
          "delta_pts": 0.25
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 14.7,
          "v3_pct": 14.4,
          "delta_pts": -0.25
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 61.0,
          "v3_pct": 61.4,
          "delta_pts": 0.43
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 39.0,
          "v3_pct": 38.6,
          "delta_pts": -0.43
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 38.6,
          "v3_pct": 39.1,
          "delta_pts": 0.45
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 61.4,
          "v3_pct": 60.9,
          "delta_pts": -0.45
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.44,
        "lambda_red_card": 0.2754,
        "prob_red_card_in_match_pct": 24.1,
        "lambda_penalty": 0.2,
        "prob_penalty_in_match_pct": 18.1,
        "confidence": "low",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "32",
        "event_name": "Turquia x Paraguai",
        "home_team": "Turkey",
        "away_team": "Paraguay",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.3417,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 1.8,
          "red_per_match_combined": 0.1,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.2098,
          "fouls_received_score": null,
          "penalty_team_score": 0.1233,
          "yellow_per_match_combined": 1.4815,
          "red_per_match_combined": 0.037,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "33",
      "event_name": "Holanda x Suécia",
      "home_team": "Netherlands",
      "away_team": "Sweden",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.28,
        "ax": 1.08,
        "1x2_pct": {
          "home": 61.8,
          "draw": 24.1,
          "away": 14.1
        },
        "over_2_5_pct": 65.2,
        "btts_yes_pct": 61.9
      },
      "v3_adjustment": {
        "hx_baseline": 2.28,
        "ax_baseline": 1.08,
        "hx_v3": 2.2711,
        "ax_v3": 1.0932,
        "delta_total_lambda_pct": 0.13,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": -0.39,
          "away_discipline": 1.22
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 61.3,
          "draw": 24.3,
          "away": 14.5
        },
        "over_2_5_pct": 65.3,
        "btts_yes_pct": 62.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 61.8,
          "v3_pct": 61.3,
          "delta_pts": -0.48
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.1,
          "v3_pct": 24.3,
          "delta_pts": 0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 14.1,
          "v3_pct": 14.5,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 61.9,
          "v3_pct": 62.2,
          "delta_pts": 0.35
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 38.1,
          "v3_pct": 37.8,
          "delta_pts": -0.35
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 87.4,
          "v3_pct": 87.5,
          "delta_pts": 0.06
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 12.6,
          "v3_pct": 12.5,
          "delta_pts": -0.06
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 65.2,
          "v3_pct": 65.3,
          "delta_pts": 0.08
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 34.8,
          "v3_pct": 34.7,
          "delta_pts": -0.08
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 43.3,
          "v3_pct": 43.4,
          "delta_pts": 0.09
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 56.7,
          "v3_pct": 56.6,
          "delta_pts": -0.1
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.34,
        "lambda_red_card": 0.2907,
        "prob_red_card_in_match_pct": 25.2,
        "lambda_penalty": 0.1904,
        "prob_penalty_in_match_pct": 17.3,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "33",
        "event_name": "Holanda x Suécia",
        "home_team": "Netherlands",
        "away_team": "Sweden",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.6301,
          "fouls_received_score": 0.34,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.1982,
          "red_per_match_combined": 0.1536,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.0925,
          "fouls_received_score": null,
          "penalty_team_score": 0.3663,
          "yellow_per_match_combined": 0.8901,
          "red_per_match_combined": 0.022,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "34",
      "event_name": "Alemanha x Costa do Marfim",
      "home_team": "Germany",
      "away_team": "Ivory Coast",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.35,
        "ax": 1.28,
        "1x2_pct": {
          "home": 58.8,
          "draw": 23.8,
          "away": 17.3
        },
        "over_2_5_pct": 70.3,
        "btts_yes_pct": 67.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.35,
        "ax_baseline": 1.28,
        "hx_v3": 2.379,
        "ax_v3": 1.2875,
        "delta_total_lambda_pct": 1.0,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.23,
          "away_discipline": 0.58
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 59.3,
          "draw": 23.6,
          "away": 17.2
        },
        "over_2_5_pct": 70.9,
        "btts_yes_pct": 68.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 58.8,
          "v3_pct": 59.3,
          "delta_pts": 0.43
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.8,
          "v3_pct": 23.6,
          "delta_pts": -0.28
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 17.3,
          "v3_pct": 17.2,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 67.7,
          "v3_pct": 68.0,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 32.3,
          "v3_pct": 32.0,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 90.1,
          "v3_pct": 90.4,
          "delta_pts": 0.3
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 9.9,
          "v3_pct": 9.6,
          "delta_pts": -0.3
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 70.3,
          "v3_pct": 70.9,
          "delta_pts": 0.63
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 29.7,
          "v3_pct": 29.1,
          "delta_pts": -0.63
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 49.1,
          "v3_pct": 49.9,
          "delta_pts": 0.77
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 50.9,
          "v3_pct": 50.1,
          "delta_pts": -0.77
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.51,
        "lambda_red_card": 0.2138,
        "prob_red_card_in_match_pct": 19.3,
        "lambda_penalty": 0.182,
        "prob_penalty_in_match_pct": 16.6,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "34",
        "event_name": "Alemanha x Costa do Marfim",
        "home_team": "Germany",
        "away_team": "Ivory Coast",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.0893,
          "fouls_received_score": 0.2,
          "penalty_team_score": 0.5673,
          "yellow_per_match_combined": 1.0798,
          "red_per_match_combined": 0.0032,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.3055,
          "fouls_received_score": null,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.3333,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "35",
      "event_name": "Equador x Curaçao",
      "home_team": "Ecuador",
      "away_team": "Curaçao",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.35,
        "ax": 0.34,
        "1x2_pct": {
          "home": 81.0,
          "draw": 16.7,
          "away": 2.3
        },
        "over_2_5_pct": 50.4,
        "btts_yes_pct": 27.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.35,
        "ax_baseline": 0.34,
        "hx_v3": 2.3564,
        "ax_v3": 0.34,
        "delta_total_lambda_pct": 0.24,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.27,
          "away_discipline": 0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 81.1,
          "draw": 16.6,
          "away": 2.3
        },
        "over_2_5_pct": 50.5,
        "btts_yes_pct": 27.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 81.0,
          "v3_pct": 81.1,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 16.7,
          "v3_pct": 16.6,
          "delta_pts": -0.08
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.6,
          "v3_pct": 76.7,
          "delta_pts": 0.11
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.4,
          "v3_pct": 23.3,
          "delta_pts": -0.11
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 50.4,
          "v3_pct": 50.5,
          "delta_pts": 0.16
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 49.6,
          "v3_pct": 49.5,
          "delta_pts": -0.16
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 28.4,
          "v3_pct": 28.5,
          "delta_pts": 0.14
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 71.6,
          "v3_pct": 71.5,
          "delta_pts": -0.14
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.35,
        "lambda_red_card": 0.2756,
        "prob_red_card_in_match_pct": 24.1,
        "lambda_penalty": 0.204,
        "prob_penalty_in_match_pct": 18.5,
        "confidence": "low",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "35",
        "event_name": "Equador x Curaçao",
        "home_team": "Ecuador",
        "away_team": "Curaçao",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.409,
          "fouls_received_score": 0.5667,
          "penalty_team_score": 0.4167,
          "yellow_per_match_combined": 1.3,
          "red_per_match_combined": 0.0375,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": null,
          "fouls_received_score": null,
          "penalty_team_score": null,
          "yellow_per_match_combined": null,
          "red_per_match_combined": null,
          "data_quality": "no_public_foul_card_history_found_in_loaded_sources",
          "confidence": "low"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "36",
      "event_name": "Tunísia x Japão",
      "home_team": "Tunisia",
      "away_team": "Japan",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.92,
        "ax": 2.04,
        "1x2_pct": {
          "home": 13.2,
          "draw": 26.4,
          "away": 60.4
        },
        "over_2_5_pct": 56.8,
        "btts_yes_pct": 55.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.92,
        "ax_baseline": 2.04,
        "hx_v3": 0.9249,
        "ax_v3": 2.0514,
        "delta_total_lambda_pct": 0.55,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.53,
          "away_discipline": 0.56
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 13.2,
          "draw": 26.3,
          "away": 60.5
        },
        "over_2_5_pct": 57.1,
        "btts_yes_pct": 55.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.4,
          "v3_pct": 26.3,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 60.4,
          "v3_pct": 60.5,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 55.2,
          "v3_pct": 55.5,
          "delta_pts": 0.24
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 44.8,
          "v3_pct": 44.5,
          "delta_pts": -0.24
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 82.4,
          "v3_pct": 82.6,
          "delta_pts": 0.23
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 17.6,
          "v3_pct": 17.4,
          "delta_pts": -0.23
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 56.8,
          "v3_pct": 57.1,
          "delta_pts": 0.37
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 43.2,
          "v3_pct": 42.9,
          "delta_pts": -0.37
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 34.4,
          "v3_pct": 34.7,
          "delta_pts": 0.36
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 65.6,
          "v3_pct": 65.3,
          "delta_pts": -0.37
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.39,
        "lambda_red_card": 0.2121,
        "prob_red_card_in_match_pct": 19.1,
        "lambda_penalty": 0.1595,
        "prob_penalty_in_match_pct": 14.7,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "36",
        "event_name": "Tunísia x Japão",
        "home_team": "Tunisia",
        "away_team": "Japan",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.3222,
          "fouls_received_score": 0.2,
          "penalty_team_score": 0.3703,
          "yellow_per_match_combined": 1.8,
          "red_per_match_combined": 0.0,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.314,
          "fouls_received_score": 0.125,
          "penalty_team_score": 0.23,
          "yellow_per_match_combined": 1.3759,
          "red_per_match_combined": 0.0,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "37",
      "event_name": "Espanha x Arábia Saudita",
      "home_team": "Spain",
      "away_team": "Saudi Arabia",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.46,
        "ax": 0.31,
        "1x2_pct": {
          "home": 83.3,
          "draw": 14.9,
          "away": 1.8
        },
        "over_2_5_pct": 52.3,
        "btts_yes_pct": 25.8
      },
      "v3_adjustment": {
        "hx_baseline": 2.46,
        "ax_baseline": 0.31,
        "hx_v3": 2.49,
        "ax_v3": 0.3083,
        "delta_total_lambda_pct": 1.02,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.22,
          "away_discipline": -0.54
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 83.7,
          "draw": 14.6,
          "away": 1.7
        },
        "over_2_5_pct": 53.0,
        "btts_yes_pct": 25.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 83.3,
          "v3_pct": 83.7,
          "delta_pts": 0.42
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 14.9,
          "v3_pct": 14.6,
          "delta_pts": -0.35
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 1.8,
          "v3_pct": 1.7,
          "delta_pts": -0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 25.8,
          "v3_pct": 25.7,
          "delta_pts": -0.08
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 74.2,
          "v3_pct": 74.3,
          "delta_pts": 0.08
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.8,
          "v3_pct": 78.3,
          "delta_pts": 0.46
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.2,
          "v3_pct": 21.7,
          "delta_pts": -0.46
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 52.3,
          "v3_pct": 53.0,
          "delta_pts": 0.68
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 47.7,
          "v3_pct": 47.0,
          "delta_pts": -0.68
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 30.1,
          "v3_pct": 30.8,
          "delta_pts": 0.63
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 69.9,
          "v3_pct": 69.2,
          "delta_pts": -0.63
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 4.05,
        "lambda_red_card": 0.2224,
        "prob_red_card_in_match_pct": 19.9,
        "lambda_penalty": 0.2005,
        "prob_penalty_in_match_pct": 18.2,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "37",
        "event_name": "Espanha x Arábia Saudita",
        "home_team": "Spain",
        "away_team": "Saudi Arabia",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.0941,
          "fouls_received_score": 0.375,
          "penalty_team_score": 0.8107,
          "yellow_per_match_combined": 0.6419,
          "red_per_match_combined": 0.0041,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.6798,
          "fouls_received_score": 0.6333,
          "penalty_team_score": 0.7017,
          "yellow_per_match_combined": 3.8509,
          "red_per_match_combined": 0.0158,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "38",
      "event_name": "Bélgica x Irã",
      "home_team": "Belgium",
      "away_team": "Iran",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.35,
        "ax": 1.14,
        "1x2_pct": {
          "home": 61.8,
          "draw": 23.5,
          "away": 14.6
        },
        "over_2_5_pct": 67.7,
        "btts_yes_pct": 64.0
      },
      "v3_adjustment": {
        "hx_baseline": 2.35,
        "ax_baseline": 1.14,
        "hx_v3": 2.3722,
        "ax_v3": 1.146,
        "delta_total_lambda_pct": 0.81,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.94,
          "away_discipline": 0.53
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 62.2,
          "draw": 23.3,
          "away": 14.5
        },
        "over_2_5_pct": 68.2,
        "btts_yes_pct": 64.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 61.8,
          "v3_pct": 62.2,
          "delta_pts": 0.31
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.5,
          "v3_pct": 23.3,
          "delta_pts": -0.22
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 14.6,
          "v3_pct": 14.5,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 64.0,
          "v3_pct": 64.3,
          "delta_pts": 0.28
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 36.0,
          "v3_pct": 35.7,
          "delta_pts": -0.28
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 88.8,
          "v3_pct": 89.0,
          "delta_pts": 0.26
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 11.2,
          "v3_pct": 11.0,
          "delta_pts": -0.26
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 67.7,
          "v3_pct": 68.2,
          "delta_pts": 0.52
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 32.3,
          "v3_pct": 31.8,
          "delta_pts": -0.52
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 46.1,
          "v3_pct": 46.7,
          "delta_pts": 0.61
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 53.9,
          "v3_pct": 53.3,
          "delta_pts": -0.61
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.6,
        "lambda_red_card": 0.2183,
        "prob_red_card_in_match_pct": 19.6,
        "lambda_penalty": 0.17,
        "prob_penalty_in_match_pct": 15.6,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "38",
        "event_name": "Bélgica x Irã",
        "home_team": "Belgium",
        "away_team": "Iran",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.1858,
          "fouls_received_score": 0.3667,
          "penalty_team_score": 0.196,
          "yellow_per_match_combined": 1.4843,
          "red_per_match_combined": 0.0118,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.3241,
          "fouls_received_score": 0.1333,
          "penalty_team_score": 0.3703,
          "yellow_per_match_combined": 2.1166,
          "red_per_match_combined": 0.0,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "39",
      "event_name": "Uruguai x Cabo Verde",
      "home_team": "Uruguay",
      "away_team": "Cape Verde",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.14,
        "ax": 0.9,
        "1x2_pct": {
          "home": 63.0,
          "draw": 25.0,
          "away": 11.9
        },
        "over_2_5_pct": 58.6,
        "btts_yes_pct": 55.1
      },
      "v3_adjustment": {
        "hx_baseline": 2.14,
        "ax_baseline": 0.9,
        "hx_v3": 2.1516,
        "ax_v3": 0.9,
        "delta_total_lambda_pct": 0.38,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.54,
          "away_discipline": 0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 63.3,
          "draw": 24.9,
          "away": 11.8
        },
        "over_2_5_pct": 58.8,
        "btts_yes_pct": 55.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 63.0,
          "v3_pct": 63.3,
          "delta_pts": 0.24
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.0,
          "v3_pct": 24.9,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 11.9,
          "v3_pct": 11.8,
          "delta_pts": -0.1
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 55.1,
          "v3_pct": 55.2,
          "delta_pts": 0.06
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 44.9,
          "v3_pct": 44.8,
          "delta_pts": -0.06
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 83.4,
          "v3_pct": 83.6,
          "delta_pts": 0.15
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 16.6,
          "v3_pct": 16.4,
          "delta_pts": -0.15
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 58.6,
          "v3_pct": 58.8,
          "delta_pts": 0.26
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 41.4,
          "v3_pct": 41.2,
          "delta_pts": -0.25
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 36.2,
          "v3_pct": 36.4,
          "delta_pts": 0.26
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 63.8,
          "v3_pct": 63.6,
          "delta_pts": -0.26
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.81,
        "lambda_red_card": 0.2685,
        "prob_red_card_in_match_pct": 23.5,
        "lambda_penalty": 0.198,
        "prob_penalty_in_match_pct": 18.0,
        "confidence": "low",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "39",
        "event_name": "Uruguai x Cabo Verde",
        "home_team": "Uruguay",
        "away_team": "Cape Verde",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.32,
          "fouls_received_score": 0.4667,
          "penalty_team_score": 0.226,
          "yellow_per_match_combined": 2.2277,
          "red_per_match_combined": 0.0203,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": null,
          "fouls_received_score": null,
          "penalty_team_score": null,
          "yellow_per_match_combined": null,
          "red_per_match_combined": null,
          "data_quality": "no_public_foul_card_history_found_in_loaded_sources",
          "confidence": "low"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "40",
      "event_name": "Nova Zelândia x Egito",
      "home_team": "New Zealand",
      "away_team": "Egypt",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.14,
        "ax": 2.07,
        "1x2_pct": {
          "home": 17.5,
          "draw": 26.6,
          "away": 55.9
        },
        "over_2_5_pct": 62.2,
        "btts_yes_pct": 62.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.14,
        "ax_baseline": 2.07,
        "hx_v3": 1.1543,
        "ax_v3": 2.0929,
        "delta_total_lambda_pct": 1.16,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.25,
          "away_discipline": 1.11
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 17.5,
          "draw": 26.4,
          "away": 56.1
        },
        "over_2_5_pct": 63.0,
        "btts_yes_pct": 62.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.6,
          "v3_pct": 26.4,
          "delta_pts": -0.24
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 55.9,
          "v3_pct": 56.1,
          "delta_pts": 0.19
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 62.3,
          "v3_pct": 62.8,
          "delta_pts": 0.55
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 37.7,
          "v3_pct": 37.2,
          "delta_pts": -0.55
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 85.9,
          "v3_pct": 86.3,
          "delta_pts": 0.44
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 14.1,
          "v3_pct": 13.7,
          "delta_pts": -0.44
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 62.2,
          "v3_pct": 63.0,
          "delta_pts": 0.77
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 37.8,
          "v3_pct": 37.0,
          "delta_pts": -0.77
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 40.0,
          "v3_pct": 40.8,
          "delta_pts": 0.83
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 60.0,
          "v3_pct": 59.2,
          "delta_pts": -0.83
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.94,
        "lambda_red_card": 0.2121,
        "prob_red_card_in_match_pct": 19.1,
        "lambda_penalty": 0.2,
        "prob_penalty_in_match_pct": 18.1,
        "confidence": "low",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "40",
        "event_name": "Nova Zelândia x Egito",
        "home_team": "New Zealand",
        "away_team": "Egypt",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.0833,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 1.0,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.131,
          "fouls_received_score": null,
          "penalty_team_score": 0.9523,
          "yellow_per_match_combined": 1.2857,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    },
    {
      "fixture_id": "41",
      "event_name": "Argentina x Áustria",
      "home_team": "Argentina",
      "away_team": "Austria",
      "referee": {
        "assigned_name": null,
        "assignment_status": "not_available_or_not_loaded",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_assignment",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.05,
        "ax": 0.99,
        "1x2_pct": {
          "home": 58.9,
          "draw": 26.5,
          "away": 14.6
        },
        "over_2_5_pct": 58.6,
        "btts_yes_pct": 57.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.05,
        "ax_baseline": 0.99,
        "hx_v3": 2.056,
        "ax_v3": 1.0021,
        "delta_total_lambda_pct": 0.6,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.29,
          "away_discipline": 1.22
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 58.8,
          "draw": 26.5,
          "away": 14.7
        },
        "over_2_5_pct": 59.0,
        "btts_yes_pct": 58.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 58.9,
          "v3_pct": 58.8,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 14.6,
          "v3_pct": 14.7,
          "delta_pts": 0.19
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 57.7,
          "v3_pct": 58.1,
          "delta_pts": 0.43
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 42.3,
          "v3_pct": 41.9,
          "delta_pts": -0.43
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 83.6,
          "v3_pct": 83.8,
          "delta_pts": 0.25
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 16.4,
          "v3_pct": 16.2,
          "delta_pts": -0.25
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 58.6,
          "v3_pct": 59.0,
          "delta_pts": 0.4
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 41.4,
          "v3_pct": 41.0,
          "delta_pts": -0.4
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 36.2,
          "v3_pct": 36.6,
          "delta_pts": 0.41
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 63.8,
          "v3_pct": 63.4,
          "delta_pts": -0.41
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.22,
        "lambda_red_card": 0.2415,
        "prob_red_card_in_match_pct": 21.5,
        "lambda_penalty": 0.2231,
        "prob_penalty_in_match_pct": 20.0,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.3,
          "ref_pen_shrunk": 0.2,
          "note": "Taxas do arbitro suavizadas pelo baseline de Copa do Mundo (Bayes shrinkage). Piso minimo de 1% em P(red) e P(penalti)."
        },
        "ranges": {
          "yellow_cards": "media de Copa ~6; >9 incomum",
          "red_card_prob": "media de Copa ~26%; <10% arbitro/equipe muito limpos",
          "penalty_prob": "media de Copa ~18%; >30% indica risco alto"
        }
      },
      "discipline_block": {
        "fixture_id": "41",
        "event_name": "Argentina x Áustria",
        "home_team": "Argentina",
        "away_team": "Austria",
        "referee": {
          "assigned_name": null,
          "assignment_status": "not_available_or_not_loaded",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_assignment",
          "confidence": "low",
          "notes": "Sem histórico de Copa para o árbitro escalado."
        },
        "home_discipline": {
          "discipline_score": 0.4029,
          "fouls_received_score": 0.8857,
          "penalty_team_score": 0.4467,
          "yellow_per_match_combined": 2.0546,
          "red_per_match_combined": 0.0248,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.092,
          "fouls_received_score": null,
          "penalty_team_score": 0.3447,
          "yellow_per_match_combined": 0.7931,
          "red_per_match_combined": 0.0345,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": null
      },
      "weights_used": {
        "baseline": 0.8,
        "team_discipline": 0.08,
        "referee": 0.06,
        "referee_x_discipline": 0.06,
        "lambda_cap_pct": 5.0
      },
      "_note": "v3 ajusta levemente Over/Under e adiciona mercados novos. Nunca derruba o favorito 1X2 do motor v2."
    }
  ],
  "weights": {
    "baseline": 0.8,
    "team_discipline": 0.08,
    "referee": 0.06,
    "referee_x_discipline": 0.06,
    "lambda_cap_pct": 5.0
  },
  "active_scope": {
    "mode": "rolling_now_next_72h",
    "scope_start": "2026-06-19T14:55:06",
    "scope_end": "2026-06-22T14:55:06",
    "original_fixtures_before_filter": 72
  }
};
