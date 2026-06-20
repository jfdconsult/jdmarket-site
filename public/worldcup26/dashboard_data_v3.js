window.WC_DATA_V3 = {
  "v3_discipline": true,
  "n": 12,
  "fixtures": [
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
        "ax": 1.2,
        "1x2_pct": {
          "home": 60.5,
          "draw": 23.7,
          "away": 15.8
        },
        "over_2_5_pct": 68.8,
        "btts_yes_pct": 65.6
      },
      "v3_adjustment": {
        "hx_baseline": 2.35,
        "ax_baseline": 1.2,
        "hx_v3": 2.379,
        "ax_v3": 1.207,
        "delta_total_lambda_pct": 1.01,
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
          "home": 61.0,
          "draw": 23.4,
          "away": 15.6
        },
        "over_2_5_pct": 69.5,
        "btts_yes_pct": 66.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 60.5,
          "v3_pct": 61.0,
          "delta_pts": 0.43
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.7,
          "v3_pct": 23.4,
          "delta_pts": -0.28
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 15.8,
          "v3_pct": 15.6,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 65.6,
          "v3_pct": 66.0,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 34.4,
          "v3_pct": 34.0,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 89.4,
          "v3_pct": 89.7,
          "delta_pts": 0.32
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 10.6,
          "v3_pct": 10.3,
          "delta_pts": -0.32
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 68.8,
          "v3_pct": 69.5,
          "delta_pts": 0.65
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 31.2,
          "v3_pct": 30.5,
          "delta_pts": -0.65
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 47.4,
          "v3_pct": 48.2,
          "delta_pts": 0.77
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 52.6,
          "v3_pct": 51.8,
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
        "ax": 0.35,
        "1x2_pct": {
          "home": 80.8,
          "draw": 16.8,
          "away": 2.4
        },
        "over_2_5_pct": 50.6,
        "btts_yes_pct": 28.4
      },
      "v3_adjustment": {
        "hx_baseline": 2.35,
        "ax_baseline": 0.35,
        "hx_v3": 2.3564,
        "ax_v3": 0.35,
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
          "home": 80.9,
          "draw": 16.7,
          "away": 2.4
        },
        "over_2_5_pct": 50.8,
        "btts_yes_pct": 28.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 80.8,
          "v3_pct": 80.9,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 16.8,
          "v3_pct": 16.7,
          "delta_pts": -0.08
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.8,
          "v3_pct": 76.9,
          "delta_pts": 0.11
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.2,
          "v3_pct": 23.1,
          "delta_pts": -0.11
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 50.6,
          "v3_pct": 50.8,
          "delta_pts": 0.16
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 49.4,
          "v3_pct": 49.2,
          "delta_pts": -0.16
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 28.6,
          "v3_pct": 28.7,
          "delta_pts": 0.14
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 71.4,
          "v3_pct": 71.3,
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
        "ax": 1.97,
        "1x2_pct": {
          "home": 13.9,
          "draw": 27.3,
          "away": 58.8
        },
        "over_2_5_pct": 55.2,
        "btts_yes_pct": 54.8
      },
      "v3_adjustment": {
        "hx_baseline": 0.92,
        "ax_baseline": 1.97,
        "hx_v3": 0.9249,
        "ax_v3": 1.981,
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
          "home": 13.9,
          "draw": 27.1,
          "away": 59.0
        },
        "over_2_5_pct": 55.5,
        "btts_yes_pct": 55.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.3,
          "v3_pct": 27.1,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 58.8,
          "v3_pct": 59.0,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 54.8,
          "v3_pct": 55.0,
          "delta_pts": 0.24
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 45.2,
          "v3_pct": 45.0,
          "delta_pts": -0.24
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.4,
          "v3_pct": 81.6,
          "delta_pts": 0.24
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 18.6,
          "v3_pct": 18.4,
          "delta_pts": -0.24
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 55.2,
          "v3_pct": 55.5,
          "delta_pts": 0.37
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 44.8,
          "v3_pct": 44.5,
          "delta_pts": -0.37
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 32.8,
          "v3_pct": 33.2,
          "delta_pts": 0.35
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 67.2,
          "v3_pct": 66.8,
          "delta_pts": -0.36
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
        "ax": 1.16,
        "1x2_pct": {
          "home": 61.4,
          "draw": 23.6,
          "away": 15.0
        },
        "over_2_5_pct": 68.1,
        "btts_yes_pct": 64.5
      },
      "v3_adjustment": {
        "hx_baseline": 2.35,
        "ax_baseline": 1.16,
        "hx_v3": 2.3722,
        "ax_v3": 1.1661,
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
          "home": 61.7,
          "draw": 23.4,
          "away": 14.9
        },
        "over_2_5_pct": 68.6,
        "btts_yes_pct": 64.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 61.4,
          "v3_pct": 61.7,
          "delta_pts": 0.31
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.6,
          "v3_pct": 23.4,
          "delta_pts": -0.22
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 15.0,
          "v3_pct": 14.9,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 64.5,
          "v3_pct": 64.8,
          "delta_pts": 0.28
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 35.5,
          "v3_pct": 35.2,
          "delta_pts": -0.28
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 89.0,
          "v3_pct": 89.2,
          "delta_pts": 0.26
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 11.0,
          "v3_pct": 10.8,
          "delta_pts": -0.26
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 68.1,
          "v3_pct": 68.6,
          "delta_pts": 0.52
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 31.9,
          "v3_pct": 31.4,
          "delta_pts": -0.52
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 46.6,
          "v3_pct": 47.2,
          "delta_pts": 0.61
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 53.4,
          "v3_pct": 52.8,
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
        "hx": 2.06,
        "ax": 0.84,
        "1x2_pct": {
          "home": 62.8,
          "draw": 25.7,
          "away": 11.4
        },
        "over_2_5_pct": 55.4,
        "btts_yes_pct": 52.4
      },
      "v3_adjustment": {
        "hx_baseline": 2.06,
        "ax_baseline": 0.84,
        "hx_v3": 2.0711,
        "ax_v3": 0.84,
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
          "home": 63.1,
          "draw": 25.6,
          "away": 11.4
        },
        "over_2_5_pct": 55.7,
        "btts_yes_pct": 52.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 62.8,
          "v3_pct": 63.1,
          "delta_pts": 0.24
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.7,
          "v3_pct": 25.6,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 11.4,
          "v3_pct": 11.4,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 52.4,
          "v3_pct": 52.5,
          "delta_pts": 0.06
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 47.6,
          "v3_pct": 47.5,
          "delta_pts": -0.06
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.4,
          "v3_pct": 81.6,
          "delta_pts": 0.16
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 18.6,
          "v3_pct": 18.4,
          "delta_pts": -0.16
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 55.4,
          "v3_pct": 55.7,
          "delta_pts": 0.26
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 44.6,
          "v3_pct": 44.3,
          "delta_pts": -0.26
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 33.0,
          "v3_pct": 33.3,
          "delta_pts": 0.25
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 67.0,
          "v3_pct": 66.7,
          "delta_pts": -0.25
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
        "ax": 2.06,
        "1x2_pct": {
          "home": 17.6,
          "draw": 26.7,
          "away": 55.7
        },
        "over_2_5_pct": 62.0,
        "btts_yes_pct": 62.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.14,
        "ax_baseline": 2.06,
        "hx_v3": 1.1543,
        "ax_v3": 2.0828,
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
          "home": 17.6,
          "draw": 26.5,
          "away": 55.9
        },
        "over_2_5_pct": 62.8,
        "btts_yes_pct": 62.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.7,
          "v3_pct": 26.5,
          "delta_pts": -0.24
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 55.7,
          "v3_pct": 55.9,
          "delta_pts": 0.19
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 62.2,
          "v3_pct": 62.8,
          "delta_pts": 0.55
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 37.8,
          "v3_pct": 37.2,
          "delta_pts": -0.55
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 85.8,
          "v3_pct": 86.2,
          "delta_pts": 0.44
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 14.2,
          "v3_pct": 13.8,
          "delta_pts": -0.44
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 62.0,
          "v3_pct": 62.8,
          "delta_pts": 0.77
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 38.0,
          "v3_pct": 37.2,
          "delta_pts": -0.77
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 39.7,
          "v3_pct": 40.6,
          "delta_pts": 0.83
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 60.3,
          "v3_pct": 59.4,
          "delta_pts": -0.82
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
        "hx": 2.06,
        "ax": 0.99,
        "1x2_pct": {
          "home": 59.2,
          "draw": 26.4,
          "away": 14.5
        },
        "over_2_5_pct": 58.8,
        "btts_yes_pct": 57.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.06,
        "ax_baseline": 0.99,
        "hx_v3": 2.066,
        "ax_v3": 1.0021,
        "delta_total_lambda_pct": 0.59,
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
          "home": 59.0,
          "draw": 26.3,
          "away": 14.6
        },
        "over_2_5_pct": 59.2,
        "btts_yes_pct": 58.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 59.2,
          "v3_pct": 59.0,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 14.5,
          "v3_pct": 14.6,
          "delta_pts": 0.19
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 57.7,
          "v3_pct": 58.2,
          "delta_pts": 0.43
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 42.3,
          "v3_pct": 41.8,
          "delta_pts": -0.43
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 83.7,
          "v3_pct": 84.0,
          "delta_pts": 0.25
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 16.3,
          "v3_pct": 16.0,
          "delta_pts": -0.25
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 58.8,
          "v3_pct": 59.2,
          "delta_pts": 0.4
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 41.2,
          "v3_pct": 40.8,
          "delta_pts": -0.4
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 36.4,
          "v3_pct": 36.8,
          "delta_pts": 0.4
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 63.6,
          "v3_pct": 63.2,
          "delta_pts": -0.4
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
    },
    {
      "fixture_id": "42",
      "event_name": "França x Iraque",
      "home_team": "France",
      "away_team": "Iraq",
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
        "hx": 2.41,
        "ax": 0.29,
        "1x2_pct": {
          "home": 83.2,
          "draw": 15.1,
          "away": 1.7
        },
        "over_2_5_pct": 50.6,
        "btts_yes_pct": 24.3
      },
      "v3_adjustment": {
        "hx_baseline": 2.41,
        "ax_baseline": 0.29,
        "hx_v3": 2.4357,
        "ax_v3": 0.2871,
        "delta_total_lambda_pct": 0.84,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.06,
          "away_discipline": -1.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 83.6,
          "draw": 14.8,
          "away": 1.6
        },
        "over_2_5_pct": 51.2,
        "btts_yes_pct": 24.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 83.2,
          "v3_pct": 83.6,
          "delta_pts": 0.41
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 15.1,
          "v3_pct": 14.8,
          "delta_pts": -0.34
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 1.7,
          "v3_pct": 1.6,
          "delta_pts": -0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 24.3,
          "v3_pct": 24.1,
          "delta_pts": -0.17
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 75.7,
          "v3_pct": 75.8,
          "delta_pts": 0.17
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.5,
          "v3_pct": 76.9,
          "delta_pts": 0.38
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.5,
          "v3_pct": 23.1,
          "delta_pts": -0.38
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 50.6,
          "v3_pct": 51.2,
          "delta_pts": 0.56
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 49.4,
          "v3_pct": 48.8,
          "delta_pts": -0.56
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 28.6,
          "v3_pct": 29.1,
          "delta_pts": 0.5
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 71.4,
          "v3_pct": 70.9,
          "delta_pts": -0.5
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.85,
        "lambda_red_card": 0.3527,
        "prob_red_card_in_match_pct": 29.7,
        "lambda_penalty": 0.1983,
        "prob_penalty_in_match_pct": 18.0,
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
        "fixture_id": "42",
        "event_name": "França x Iraque",
        "home_team": "France",
        "away_team": "Iraq",
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
          "discipline_score": 0.1452,
          "fouls_received_score": 0.4714,
          "penalty_team_score": 0.616,
          "yellow_per_match_combined": 1.1033,
          "red_per_match_combined": 0.0196,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.8333,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 3.0,
          "red_per_match_combined": 0.3333,
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
      "fixture_id": "43",
      "event_name": "Noruega x Senegal",
      "home_team": "Norway",
      "away_team": "Senegal",
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
        "hx": 1.85,
        "ax": 1.59,
        "1x2_pct": {
          "home": 41.4,
          "draw": 28.0,
          "away": 30.7
        },
        "over_2_5_pct": 66.8,
        "btts_yes_pct": 69.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.85,
        "ax_baseline": 1.59,
        "hx_v3": 1.8739,
        "ax_v3": 1.5991,
        "delta_total_lambda_pct": 0.96,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.29,
          "away_discipline": 0.57
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 41.8,
          "draw": 27.8,
          "away": 30.5
        },
        "over_2_5_pct": 67.4,
        "btts_yes_pct": 70.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 41.4,
          "v3_pct": 41.8,
          "delta_pts": 0.39
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.0,
          "v3_pct": 27.8,
          "delta_pts": -0.22
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 30.7,
          "v3_pct": 30.5,
          "delta_pts": -0.17
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 69.9,
          "v3_pct": 70.3,
          "delta_pts": 0.41
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 30.1,
          "v3_pct": 29.7,
          "delta_pts": -0.41
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 88.6,
          "v3_pct": 88.9,
          "delta_pts": 0.32
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 11.4,
          "v3_pct": 11.1,
          "delta_pts": -0.32
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 66.8,
          "v3_pct": 67.4,
          "delta_pts": 0.62
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 33.2,
          "v3_pct": 32.6,
          "delta_pts": -0.62
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 45.0,
          "v3_pct": 45.8,
          "delta_pts": 0.72
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 55.0,
          "v3_pct": 54.2,
          "delta_pts": -0.72
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.21,
        "lambda_red_card": 0.225,
        "prob_red_card_in_match_pct": 20.1,
        "lambda_penalty": 0.2105,
        "prob_penalty_in_match_pct": 19.0,
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
        "fixture_id": "43",
        "event_name": "Noruega x Senegal",
        "home_team": "Norway",
        "away_team": "Senegal",
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
          "discipline_score": 0.0694,
          "fouls_received_score": null,
          "penalty_team_score": 0.6943,
          "yellow_per_match_combined": 0.9167,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.3097,
          "fouls_received_score": 0.675,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 1.9,
          "red_per_match_combined": 0.025,
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
      "fixture_id": "44",
      "event_name": "Jordânia x Argélia",
      "home_team": "Jordan",
      "away_team": "Algeria",
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
        "hx": 1.13,
        "ax": 2.17,
        "1x2_pct": {
          "home": 16.2,
          "draw": 25.5,
          "away": 58.3
        },
        "over_2_5_pct": 64.1,
        "btts_yes_pct": 62.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.13,
        "ax_baseline": 2.17,
        "hx_v3": 1.13,
        "ax_v3": 2.1946,
        "delta_total_lambda_pct": 0.75,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.0,
          "away_discipline": 1.13
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 15.9,
          "draw": 25.2,
          "away": 58.9
        },
        "over_2_5_pct": 64.5,
        "btts_yes_pct": 62.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 16.2,
          "v3_pct": 15.9,
          "delta_pts": -0.25
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.5,
          "v3_pct": 25.2,
          "delta_pts": -0.27
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 58.3,
          "v3_pct": 58.9,
          "delta_pts": 0.53
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 62.7,
          "v3_pct": 62.8,
          "delta_pts": 0.15
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 37.3,
          "v3_pct": 37.2,
          "delta_pts": -0.15
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 86.9,
          "v3_pct": 87.1,
          "delta_pts": 0.26
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 13.1,
          "v3_pct": 12.9,
          "delta_pts": -0.26
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 64.1,
          "v3_pct": 64.5,
          "delta_pts": 0.49
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 35.9,
          "v3_pct": 35.5,
          "delta_pts": -0.49
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 42.0,
          "v3_pct": 42.5,
          "delta_pts": 0.54
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 58.0,
          "v3_pct": 57.5,
          "delta_pts": -0.54
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.32,
        "lambda_red_card": 0.2598,
        "prob_red_card_in_match_pct": 22.9,
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
        "fixture_id": "44",
        "event_name": "Jordânia x Argélia",
        "home_team": "Jordan",
        "away_team": "Algeria",
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
          "discipline_score": null,
          "fouls_received_score": null,
          "penalty_team_score": null,
          "yellow_per_match_combined": null,
          "red_per_match_combined": null,
          "data_quality": "no_public_foul_card_history_found_in_loaded_sources",
          "confidence": "low"
        },
        "away_discipline": {
          "discipline_score": 0.1218,
          "fouls_received_score": null,
          "penalty_team_score": 0.2563,
          "yellow_per_match_combined": 1.2308,
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
    "scope_start": "2026-06-20T12:04:50",
    "scope_end": "2026-06-23T12:04:50",
    "original_fixtures_before_filter": 72
  }
};
