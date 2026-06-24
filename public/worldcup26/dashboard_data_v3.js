window.WC_DATA_V3 = {
  "v3_discipline": true,
  "n": 18,
  "fixtures": [
    {
      "fixture_id": "49",
      "event_name": "Bósnia & Herzegovina x Qatar",
      "home_team": "Bosnia and Herzegovina",
      "away_team": "Qatar",
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
        "hx": 2.34,
        "ax": 1.1,
        "1x2_pct": {
          "home": 62.8,
          "draw": 23.0,
          "away": 14.2
        },
        "over_2_5_pct": 66.8,
        "btts_yes_pct": 62.5
      },
      "v3_adjustment": {
        "hx_baseline": 2.34,
        "ax_baseline": 1.1,
        "hx_v3": 2.3693,
        "ax_v3": 1.1072,
        "delta_total_lambda_pct": 1.06,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.25,
          "away_discipline": 0.66
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 63.2,
          "draw": 22.7,
          "away": 14.1
        },
        "over_2_5_pct": 67.5,
        "btts_yes_pct": 62.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 62.8,
          "v3_pct": 63.2,
          "delta_pts": 0.42
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.0,
          "v3_pct": 22.7,
          "delta_pts": -0.29
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 14.2,
          "v3_pct": 14.1,
          "delta_pts": -0.13
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 62.5,
          "v3_pct": 62.9,
          "delta_pts": 0.36
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 37.5,
          "v3_pct": 37.1,
          "delta_pts": -0.36
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 88.0,
          "v3_pct": 88.3,
          "delta_pts": 0.36
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 12.0,
          "v3_pct": 11.7,
          "delta_pts": -0.36
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 66.8,
          "v3_pct": 67.5,
          "delta_pts": 0.69
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 33.2,
          "v3_pct": 32.5,
          "delta_pts": -0.69
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 45.0,
          "v3_pct": 45.8,
          "delta_pts": 0.79
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 55.0,
          "v3_pct": 54.2,
          "delta_pts": -0.79
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.47,
        "lambda_red_card": 0.2121,
        "prob_red_card_in_match_pct": 19.1,
        "lambda_penalty": 0.214,
        "prob_penalty_in_match_pct": 19.3,
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
        "fixture_id": "49",
        "event_name": "Bósnia & Herzegovina x Qatar",
        "home_team": "Bosnia and Herzegovina",
        "away_team": "Qatar",
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
          "discipline_score": 0.2815,
          "fouls_received_score": 0.7333,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 2.3333,
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
      "fixture_id": "50",
      "event_name": "Suíça x Canadá",
      "home_team": "Switzerland",
      "away_team": "Canada",
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
        "hx": 1.19,
        "ax": 1.13,
        "1x2_pct": {
          "home": 33.8,
          "draw": 35.3,
          "away": 30.9
        },
        "over_2_5_pct": 40.9,
        "btts_yes_pct": 50.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.19,
        "ax_baseline": 1.13,
        "hx_v3": 1.1958,
        "ax_v3": 1.137,
        "delta_total_lambda_pct": 0.55,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.49,
          "away_discipline": 0.62
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 33.8,
          "draw": 35.2,
          "away": 30.9
        },
        "over_2_5_pct": 41.3,
        "btts_yes_pct": 50.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 35.3,
          "v3_pct": 35.2,
          "delta_pts": -0.1
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 30.9,
          "v3_pct": 30.9,
          "delta_pts": 0.08
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 50.7,
          "v3_pct": 50.9,
          "delta_pts": 0.27
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 49.3,
          "v3_pct": 49.1,
          "delta_pts": -0.27
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 70.9,
          "v3_pct": 71.2,
          "delta_pts": 0.29
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 29.1,
          "v3_pct": 28.8,
          "delta_pts": -0.29
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 40.9,
          "v3_pct": 41.3,
          "delta_pts": 0.34
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 59.1,
          "v3_pct": 58.7,
          "delta_pts": -0.34
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 20.5,
          "v3_pct": 20.7,
          "delta_pts": 0.26
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 79.5,
          "v3_pct": 79.3,
          "delta_pts": -0.26
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.88,
        "lambda_red_card": 0.2191,
        "prob_red_card_in_match_pct": 19.7,
        "lambda_penalty": 0.195,
        "prob_penalty_in_match_pct": 17.7,
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
        "fixture_id": "50",
        "event_name": "Suíça x Canadá",
        "home_team": "Switzerland",
        "away_team": "Canada",
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
          "discipline_score": 0.3372,
          "fouls_received_score": 0.45,
          "penalty_team_score": 0.074,
          "yellow_per_match_combined": 1.935,
          "red_per_match_combined": 0.0133,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.2923,
          "fouls_received_score": 0.4667,
          "penalty_team_score": 0.202,
          "yellow_per_match_combined": 2.2303,
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
      "fixture_id": "51",
      "event_name": "Escócia x Brasil",
      "home_team": "Scotland",
      "away_team": "Brazil",
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
        "hx": 1.04,
        "ax": 2.41,
        "1x2_pct": {
          "home": 12.5,
          "draw": 22.0,
          "away": 65.5
        },
        "over_2_5_pct": 67.0,
        "btts_yes_pct": 61.0
      },
      "v3_adjustment": {
        "hx_baseline": 1.04,
        "ax_baseline": 2.41,
        "hx_v3": 1.0521,
        "ax_v3": 2.4293,
        "delta_total_lambda_pct": 0.91,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.16,
          "away_discipline": 0.8
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 12.6,
          "draw": 21.9,
          "away": 65.6
        },
        "over_2_5_pct": 67.6,
        "btts_yes_pct": 61.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 12.5,
          "v3_pct": 12.6,
          "delta_pts": 0.06
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 22.0,
          "v3_pct": 21.9,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 65.5,
          "v3_pct": 65.6,
          "delta_pts": 0.1
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 61.0,
          "v3_pct": 61.5,
          "delta_pts": 0.47
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 39.0,
          "v3_pct": 38.5,
          "delta_pts": -0.47
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 88.0,
          "v3_pct": 88.3,
          "delta_pts": 0.31
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 12.0,
          "v3_pct": 11.7,
          "delta_pts": -0.32
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 67.0,
          "v3_pct": 67.6,
          "delta_pts": 0.59
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 33.0,
          "v3_pct": 32.4,
          "delta_pts": -0.59
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 45.3,
          "v3_pct": 45.9,
          "delta_pts": 0.68
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 54.7,
          "v3_pct": 54.1,
          "delta_pts": -0.68
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.81,
        "lambda_red_card": 0.2365,
        "prob_red_card_in_match_pct": 21.1,
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
        "fixture_id": "51",
        "event_name": "Escócia x Brasil",
        "home_team": "Scotland",
        "away_team": "Brazil",
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
          "discipline_score": 0.2327,
          "fouls_received_score": 0.76,
          "penalty_team_score": 0.428,
          "yellow_per_match_combined": 1.138,
          "red_per_match_combined": 0.0101,
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
      "fixture_id": "52",
      "event_name": "Marrocos x Haiti",
      "home_team": "Morocco",
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
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.37,
        "ax": 0.64,
        "1x2_pct": {
          "home": 74.0,
          "draw": 19.8,
          "away": 6.2
        },
        "over_2_5_pct": 57.9,
        "btts_yes_pct": 44.9
      },
      "v3_adjustment": {
        "hx_baseline": 2.37,
        "ax_baseline": 0.64,
        "hx_v3": 2.379,
        "ax_v3": 0.648,
        "delta_total_lambda_pct": 0.56,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.38,
          "away_discipline": 1.25
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 73.9,
          "draw": 19.8,
          "away": 6.3
        },
        "over_2_5_pct": 58.3,
        "btts_yes_pct": 45.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.away",
          "baseline_pct": 6.2,
          "v3_pct": 6.3,
          "delta_pts": 0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.9,
          "v3_pct": 45.3,
          "delta_pts": 0.42
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.1,
          "v3_pct": 54.7,
          "delta_pts": -0.42
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 82.3,
          "v3_pct": 82.5,
          "delta_pts": 0.25
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 17.7,
          "v3_pct": 17.5,
          "delta_pts": -0.25
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 57.9,
          "v3_pct": 58.3,
          "delta_pts": 0.38
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 42.1,
          "v3_pct": 41.7,
          "delta_pts": -0.38
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 35.5,
          "v3_pct": 35.9,
          "delta_pts": 0.38
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 64.5,
          "v3_pct": 64.1,
          "delta_pts": -0.38
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.98,
        "lambda_red_card": 0.2598,
        "prob_red_card_in_match_pct": 22.9,
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
        "fixture_id": "52",
        "event_name": "Marrocos x Haiti",
        "home_team": "Morocco",
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
          "discipline_score": 0.3738,
          "fouls_received_score": 0.3714,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 1.3565,
          "red_per_match_combined": 0.1,
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
      "fixture_id": "53",
      "event_name": "República Tcheca x México",
      "home_team": "Czech Republic",
      "away_team": "Mexico",
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
        "match_id_fifa": "400021442",
        "event_name": "Mexico vs. Korea Republic",
        "kickoff": "18 June 2026, 22:00",
        "referee": "Gustavo Tejera",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Guadalajara",
        "location": "Guadalajara Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.1,
        "ax": 1.9,
        "1x2_pct": {
          "home": 18.9,
          "draw": 27.9,
          "away": 53.2
        },
        "over_2_5_pct": 57.7,
        "btts_yes_pct": 59.5
      },
      "v3_adjustment": {
        "hx_baseline": 1.1,
        "ax_baseline": 1.9,
        "hx_v3": 1.0945,
        "ax_v3": 1.9011,
        "delta_total_lambda_pct": -0.15,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": -0.5,
          "away_discipline": 0.06
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 18.8,
          "draw": 27.9,
          "away": 53.4
        },
        "over_2_5_pct": 57.6,
        "btts_yes_pct": 59.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 18.9,
          "v3_pct": 18.8,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 53.2,
          "v3_pct": 53.4,
          "delta_pts": 0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 59.5,
          "v3_pct": 59.4,
          "delta_pts": -0.14
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 40.5,
          "v3_pct": 40.6,
          "delta_pts": 0.15
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 82.9,
          "v3_pct": 82.8,
          "delta_pts": -0.07
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 17.1,
          "v3_pct": 17.2,
          "delta_pts": 0.07
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 57.7,
          "v3_pct": 57.6,
          "delta_pts": -0.1
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 42.3,
          "v3_pct": 42.4,
          "delta_pts": 0.1
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 35.3,
          "v3_pct": 35.2,
          "delta_pts": -0.1
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 64.7,
          "v3_pct": 64.8,
          "delta_pts": 0.1
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.82,
        "lambda_red_card": 0.3506,
        "prob_red_card_in_match_pct": 29.6,
        "lambda_penalty": 0.224,
        "prob_penalty_in_match_pct": 20.1,
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
        "fixture_id": "53",
        "event_name": "República Tcheca x México",
        "home_team": "Czech Republic",
        "away_team": "Mexico",
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
          "discipline_score": 0.6666,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 2.0,
          "red_per_match_combined": 0.3333,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.4812,
          "fouls_received_score": 0.9,
          "penalty_team_score": 0.483,
          "yellow_per_match_combined": 2.0333,
          "red_per_match_combined": 0.0131,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021442",
          "event_name": "Mexico vs. Korea Republic",
          "kickoff": "18 June 2026, 22:00",
          "referee": "Gustavo Tejera",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Guadalajara",
          "location": "Guadalajara Stadium",
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
      "fixture_id": "54",
      "event_name": "África do Sul x República da Coreia",
      "home_team": "South Africa",
      "away_team": "South Korea",
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
        "hx": 1.2,
        "ax": 1.81,
        "1x2_pct": {
          "home": 22.4,
          "draw": 28.8,
          "away": 48.8
        },
        "over_2_5_pct": 57.9,
        "btts_yes_pct": 61.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.2,
        "ax_baseline": 1.81,
        "hx_v3": 1.1995,
        "ax_v3": 1.8242,
        "delta_total_lambda_pct": 0.45,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": -0.04,
          "away_discipline": 0.78
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 22.2,
          "draw": 28.7,
          "away": 49.1
        },
        "over_2_5_pct": 58.2,
        "btts_yes_pct": 61.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 22.4,
          "v3_pct": 22.2,
          "delta_pts": -0.21
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.8,
          "v3_pct": 28.7,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 48.8,
          "v3_pct": 49.1,
          "delta_pts": 0.36
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 61.3,
          "v3_pct": 61.5,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 38.7,
          "v3_pct": 38.5,
          "delta_pts": -0.13
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 83.1,
          "v3_pct": 83.3,
          "delta_pts": 0.18
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 16.9,
          "v3_pct": 16.7,
          "delta_pts": -0.18
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 57.9,
          "v3_pct": 58.2,
          "delta_pts": 0.3
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 42.1,
          "v3_pct": 41.8,
          "delta_pts": -0.3
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 35.5,
          "v3_pct": 35.8,
          "delta_pts": 0.31
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 64.5,
          "v3_pct": 64.2,
          "delta_pts": -0.31
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.78,
        "lambda_red_card": 0.2897,
        "prob_red_card_in_match_pct": 25.1,
        "lambda_penalty": 0.1745,
        "prob_penalty_in_match_pct": 16.0,
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
        "fixture_id": "54",
        "event_name": "África do Sul x República da Coreia",
        "home_team": "South Africa",
        "away_team": "South Korea",
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
          "discipline_score": 0.5139,
          "fouls_received_score": null,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.3333,
          "red_per_match_combined": 0.1667,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.2392,
          "fouls_received_score": 0.075,
          "penalty_team_score": 0.0693,
          "yellow_per_match_combined": 1.6312,
          "red_per_match_combined": 0.0062,
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
      "fixture_id": "55",
      "event_name": "Curaçao x Costa do Marfim",
      "home_team": "Curaçao",
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
        "hx": 0.54,
        "ax": 2.4,
        "1x2_pct": {
          "home": 4.7,
          "draw": 18.4,
          "away": 76.9
        },
        "over_2_5_pct": 56.3,
        "btts_yes_pct": 39.8
      },
      "v3_adjustment": {
        "hx_baseline": 0.54,
        "ax_baseline": 2.4,
        "hx_v3": 0.54,
        "ax_v3": 2.414,
        "delta_total_lambda_pct": 0.48,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.0,
          "away_discipline": 0.58
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 4.6,
          "draw": 18.2,
          "away": 77.1
        },
        "over_2_5_pct": 56.6,
        "btts_yes_pct": 39.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 4.7,
          "v3_pct": 4.6,
          "delta_pts": -0.06
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 18.4,
          "v3_pct": 18.2,
          "delta_pts": -0.16
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 76.9,
          "v3_pct": 77.1,
          "delta_pts": 0.22
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.0,
          "v3_pct": 81.2,
          "delta_pts": 0.2
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 19.0,
          "v3_pct": 18.8,
          "delta_pts": -0.2
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 56.3,
          "v3_pct": 56.6,
          "delta_pts": 0.32
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 43.7,
          "v3_pct": 43.4,
          "delta_pts": -0.32
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 33.9,
          "v3_pct": 34.2,
          "delta_pts": 0.31
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 66.1,
          "v3_pct": 65.8,
          "delta_pts": -0.31
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.87,
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
        "fixture_id": "55",
        "event_name": "Curaçao x Costa do Marfim",
        "home_team": "Curaçao",
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
          "discipline_score": null,
          "fouls_received_score": null,
          "penalty_team_score": null,
          "yellow_per_match_combined": null,
          "red_per_match_combined": null,
          "data_quality": "no_public_foul_card_history_found_in_loaded_sources",
          "confidence": "low"
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
      "fixture_id": "56",
      "event_name": "Equador x Alemanha",
      "home_team": "Ecuador",
      "away_team": "Germany",
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
        "hx": 1.18,
        "ax": 2.06,
        "1x2_pct": {
          "home": 18.7,
          "draw": 26.2,
          "away": 55.1
        },
        "over_2_5_pct": 62.8,
        "btts_yes_pct": 63.0
      },
      "v3_adjustment": {
        "hx_baseline": 1.18,
        "ax_baseline": 2.06,
        "hx_v3": 1.1832,
        "ax_v3": 2.0854,
        "delta_total_lambda_pct": 0.88,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.27,
          "away_discipline": 1.23
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 18.5,
          "draw": 25.9,
          "away": 55.6
        },
        "over_2_5_pct": 63.4,
        "btts_yes_pct": 63.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 18.7,
          "v3_pct": 18.5,
          "delta_pts": -0.23
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.2,
          "v3_pct": 25.9,
          "delta_pts": -0.27
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 55.1,
          "v3_pct": 55.6,
          "delta_pts": 0.49
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 63.0,
          "v3_pct": 63.3,
          "delta_pts": 0.27
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 37.0,
          "v3_pct": 36.7,
          "delta_pts": -0.27
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 86.0,
          "v3_pct": 86.3,
          "delta_pts": 0.32
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 14.0,
          "v3_pct": 13.7,
          "delta_pts": -0.32
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 62.8,
          "v3_pct": 63.4,
          "delta_pts": 0.58
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 37.2,
          "v3_pct": 36.6,
          "delta_pts": -0.58
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 40.6,
          "v3_pct": 41.3,
          "delta_pts": 0.63
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 59.4,
          "v3_pct": 58.7,
          "delta_pts": -0.63
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.99,
        "lambda_red_card": 0.2327,
        "prob_red_card_in_match_pct": 20.8,
        "lambda_penalty": 0.186,
        "prob_penalty_in_match_pct": 17.0,
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
        "fixture_id": "56",
        "event_name": "Equador x Alemanha",
        "home_team": "Ecuador",
        "away_team": "Germany",
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
          "discipline_score": 0.0893,
          "fouls_received_score": 0.2,
          "penalty_team_score": 0.5673,
          "yellow_per_match_combined": 1.0798,
          "red_per_match_combined": 0.0032,
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
      "fixture_id": "57",
      "event_name": "Tunísia x Holanda",
      "home_team": "Tunisia",
      "away_team": "Netherlands",
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
        "hx": 1.08,
        "ax": 2.38,
        "1x2_pct": {
          "home": 13.5,
          "draw": 22.5,
          "away": 64.0
        },
        "over_2_5_pct": 67.2,
        "btts_yes_pct": 62.1
      },
      "v3_adjustment": {
        "hx_baseline": 1.08,
        "ax_baseline": 2.38,
        "hx_v3": 1.0858,
        "ax_v3": 2.3707,
        "delta_total_lambda_pct": -0.1,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.53,
          "away_discipline": -0.39
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 13.7,
          "draw": 22.6,
          "away": 63.7
        },
        "over_2_5_pct": 67.1,
        "btts_yes_pct": 62.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 13.5,
          "v3_pct": 13.7,
          "delta_pts": 0.19
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 22.5,
          "v3_pct": 22.6,
          "delta_pts": 0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 64.0,
          "v3_pct": 63.7,
          "delta_pts": -0.31
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 62.1,
          "v3_pct": 62.2,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 37.9,
          "v3_pct": 37.8,
          "delta_pts": -0.13
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 67.2,
          "v3_pct": 67.1,
          "delta_pts": -0.07
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 32.8,
          "v3_pct": 32.9,
          "delta_pts": 0.07
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 45.5,
          "v3_pct": 45.4,
          "delta_pts": -0.08
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 54.5,
          "v3_pct": 54.6,
          "delta_pts": 0.08
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.8,
        "lambda_red_card": 0.2821,
        "prob_red_card_in_match_pct": 24.6,
        "lambda_penalty": 0.1724,
        "prob_penalty_in_match_pct": 15.8,
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
        "fixture_id": "57",
        "event_name": "Tunísia x Holanda",
        "home_team": "Tunisia",
        "away_team": "Netherlands",
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
          "discipline_score": 0.6301,
          "fouls_received_score": 0.34,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.1982,
          "red_per_match_combined": 0.1536,
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
      "fixture_id": "58",
      "event_name": "Japão x Suécia",
      "home_team": "Japan",
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
        "hx": 2.12,
        "ax": 1.32,
        "1x2_pct": {
          "home": 53.3,
          "draw": 25.6,
          "away": 21.0
        },
        "over_2_5_pct": 66.8,
        "btts_yes_pct": 66.9
      },
      "v3_adjustment": {
        "hx_baseline": 2.12,
        "ax_baseline": 1.32,
        "hx_v3": 2.1318,
        "ax_v3": 1.3361,
        "delta_total_lambda_pct": 0.81,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.56,
          "away_discipline": 1.22
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 53.3,
          "draw": 25.5,
          "away": 21.2
        },
        "over_2_5_pct": 67.3,
        "btts_yes_pct": 67.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 53.3,
          "v3_pct": 53.3,
          "delta_pts": -0.08
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.6,
          "v3_pct": 25.5,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 21.0,
          "v3_pct": 21.2,
          "delta_pts": 0.2
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 66.9,
          "v3_pct": 67.4,
          "delta_pts": 0.45
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 33.1,
          "v3_pct": 32.6,
          "delta_pts": -0.45
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 88.2,
          "v3_pct": 88.5,
          "delta_pts": 0.28
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 11.8,
          "v3_pct": 11.5,
          "delta_pts": -0.28
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 66.8,
          "v3_pct": 67.3,
          "delta_pts": 0.53
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 33.2,
          "v3_pct": 32.7,
          "delta_pts": -0.53
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 45.0,
          "v3_pct": 45.6,
          "delta_pts": 0.61
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 55.0,
          "v3_pct": 54.4,
          "delta_pts": -0.61
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.93,
        "lambda_red_card": 0.2235,
        "prob_red_card_in_match_pct": 20.0,
        "lambda_penalty": 0.1775,
        "prob_penalty_in_match_pct": 16.3,
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
        "fixture_id": "58",
        "event_name": "Japão x Suécia",
        "home_team": "Japan",
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
          "discipline_score": 0.314,
          "fouls_received_score": 0.125,
          "penalty_team_score": 0.23,
          "yellow_per_match_combined": 1.3759,
          "red_per_match_combined": 0.0,
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
      "fixture_id": "59",
      "event_name": "Turquia x EUA",
      "home_team": "Turkey",
      "away_team": "United States",
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
        "match_id_fifa": "400021463",
        "event_name": "Australia vs. Türkiye",
        "kickoff": "",
        "referee": "",
        "home_score": 2.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.41,
        "ax": 1.6,
        "1x2_pct": {
          "home": 30.8,
          "draw": 30.1,
          "away": 39.1
        },
        "over_2_5_pct": 57.9,
        "btts_yes_pct": 63.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.41,
        "ax_baseline": 1.6,
        "hx_v3": 1.4167,
        "ax_v3": 1.6146,
        "delta_total_lambda_pct": 0.71,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.47,
          "away_discipline": 0.91
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 30.7,
          "draw": 30.0,
          "away": 39.3
        },
        "over_2_5_pct": 58.4,
        "btts_yes_pct": 63.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 30.8,
          "v3_pct": 30.7,
          "delta_pts": -0.08
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 30.1,
          "v3_pct": 30.0,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 39.1,
          "v3_pct": 39.3,
          "delta_pts": 0.23
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 63.3,
          "v3_pct": 63.7,
          "delta_pts": 0.33
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 36.7,
          "v3_pct": 36.3,
          "delta_pts": -0.33
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 83.2,
          "v3_pct": 83.5,
          "delta_pts": 0.29
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 16.8,
          "v3_pct": 16.5,
          "delta_pts": -0.29
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 57.9,
          "v3_pct": 58.4,
          "delta_pts": 0.47
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 42.1,
          "v3_pct": 41.6,
          "delta_pts": -0.47
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 35.5,
          "v3_pct": 36.0,
          "delta_pts": 0.48
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 64.5,
          "v3_pct": 64.0,
          "delta_pts": -0.48
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.29,
        "lambda_red_card": 0.2657,
        "prob_red_card_in_match_pct": 23.3,
        "lambda_penalty": 0.185,
        "prob_penalty_in_match_pct": 16.9,
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
        "fixture_id": "59",
        "event_name": "Turquia x EUA",
        "home_team": "Turkey",
        "away_team": "United States",
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
          "discipline_score": 0.1964,
          "fouls_received_score": 0.25,
          "penalty_team_score": 0.5363,
          "yellow_per_match_combined": 1.1888,
          "red_per_match_combined": 0.0138,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021463",
          "event_name": "Australia vs. Türkiye",
          "kickoff": "",
          "referee": "",
          "home_score": 2.0,
          "away_score": 0.0,
          "status": "full_time",
          "city": "",
          "location": "",
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
      "fixture_id": "60",
      "event_name": "Paraguai x Austrália",
      "home_team": "Paraguay",
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
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.68,
        "ax": 1.34,
        "1x2_pct": {
          "home": 42.5,
          "draw": 29.8,
          "away": 27.7
        },
        "over_2_5_pct": 58.1,
        "btts_yes_pct": 63.0
      },
      "v3_adjustment": {
        "hx_baseline": 1.68,
        "ax_baseline": 1.34,
        "hx_v3": 1.6946,
        "ax_v3": 1.3472,
        "delta_total_lambda_pct": 0.72,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.87,
          "away_discipline": 0.54
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 42.8,
          "draw": 29.6,
          "away": 27.6
        },
        "over_2_5_pct": 58.6,
        "btts_yes_pct": 63.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 42.5,
          "v3_pct": 42.8,
          "delta_pts": 0.22
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.8,
          "v3_pct": 29.6,
          "delta_pts": -0.16
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 27.7,
          "v3_pct": 27.6,
          "delta_pts": -0.06
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 63.0,
          "v3_pct": 63.4,
          "delta_pts": 0.33
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 37.0,
          "v3_pct": 36.6,
          "delta_pts": -0.33
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 83.3,
          "v3_pct": 83.6,
          "delta_pts": 0.3
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 16.7,
          "v3_pct": 16.4,
          "delta_pts": -0.3
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 58.1,
          "v3_pct": 58.6,
          "delta_pts": 0.48
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 41.9,
          "v3_pct": 41.4,
          "delta_pts": -0.48
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 35.7,
          "v3_pct": 36.2,
          "delta_pts": 0.49
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 64.3,
          "v3_pct": 63.8,
          "delta_pts": -0.49
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.36,
        "lambda_red_card": 0.2463,
        "prob_red_card_in_match_pct": 21.8,
        "lambda_penalty": 0.1805,
        "prob_penalty_in_match_pct": 16.5,
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
        "fixture_id": "60",
        "event_name": "Paraguai x Austrália",
        "home_team": "Paraguay",
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
          "discipline_score": 0.2098,
          "fouls_received_score": null,
          "penalty_team_score": 0.1233,
          "yellow_per_match_combined": 1.4815,
          "red_per_match_combined": 0.037,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
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
      "fixture_id": "61",
      "event_name": "Senegal x Iraque",
      "home_team": "Senegal",
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
        "hx": 2.37,
        "ax": 0.93,
        "1x2_pct": {
          "home": 67.2,
          "draw": 21.9,
          "away": 10.9
        },
        "over_2_5_pct": 64.1,
        "btts_yes_pct": 57.1
      },
      "v3_adjustment": {
        "hx_baseline": 2.37,
        "ax_baseline": 0.93,
        "hx_v3": 2.3835,
        "ax_v3": 0.9207,
        "delta_total_lambda_pct": 0.13,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.57,
          "away_discipline": -1.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 67.6,
          "draw": 21.7,
          "away": 10.6
        },
        "over_2_5_pct": 64.1,
        "btts_yes_pct": 56.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 67.2,
          "v3_pct": 67.6,
          "delta_pts": 0.46
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 21.9,
          "v3_pct": 21.7,
          "delta_pts": -0.2
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 10.9,
          "v3_pct": 10.6,
          "delta_pts": -0.26
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 57.1,
          "v3_pct": 56.8,
          "delta_pts": -0.28
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 42.9,
          "v3_pct": 43.2,
          "delta_pts": 0.28
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 64.1,
          "v3_pct": 64.1,
          "delta_pts": 0.08
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 35.9,
          "v3_pct": 35.9,
          "delta_pts": -0.08
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 42.0,
          "v3_pct": 42.1,
          "delta_pts": 0.09
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 58.0,
          "v3_pct": 57.9,
          "delta_pts": -0.09
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 4.25,
        "lambda_red_card": 0.3544,
        "prob_red_card_in_match_pct": 29.8,
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
        "fixture_id": "61",
        "event_name": "Senegal x Iraque",
        "home_team": "Senegal",
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
          "discipline_score": 0.3097,
          "fouls_received_score": 0.675,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 1.9,
          "red_per_match_combined": 0.025,
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
      "fixture_id": "62",
      "event_name": "Noruega x França",
      "home_team": "Norway",
      "away_team": "France",
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
        "hx": 1.3,
        "ax": 2.09,
        "1x2_pct": {
          "home": 21.0,
          "draw": 25.9,
          "away": 53.1
        },
        "over_2_5_pct": 65.8,
        "btts_yes_pct": 66.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.3,
        "ax_baseline": 2.09,
        "hx_v3": 1.3168,
        "ax_v3": 2.1122,
        "delta_total_lambda_pct": 1.15,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.29,
          "away_discipline": 1.06
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 21.0,
          "draw": 25.7,
          "away": 53.2
        },
        "over_2_5_pct": 66.6,
        "btts_yes_pct": 66.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 21.0,
          "v3_pct": 21.0,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.9,
          "v3_pct": 25.7,
          "delta_pts": -0.22
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 53.1,
          "v3_pct": 53.2,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 66.2,
          "v3_pct": 66.8,
          "delta_pts": 0.56
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 33.8,
          "v3_pct": 33.2,
          "delta_pts": -0.56
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 87.7,
          "v3_pct": 88.1,
          "delta_pts": 0.4
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 12.3,
          "v3_pct": 11.9,
          "delta_pts": -0.4
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 65.8,
          "v3_pct": 66.6,
          "delta_pts": 0.75
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 34.2,
          "v3_pct": 33.4,
          "delta_pts": -0.75
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 43.9,
          "v3_pct": 44.8,
          "delta_pts": 0.85
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 56.1,
          "v3_pct": 55.2,
          "delta_pts": -0.85
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.81,
        "lambda_red_card": 0.2223,
        "prob_red_card_in_match_pct": 19.9,
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
        "fixture_id": "62",
        "event_name": "Noruega x França",
        "home_team": "Norway",
        "away_team": "France",
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
          "discipline_score": 0.1452,
          "fouls_received_score": 0.4714,
          "penalty_team_score": 0.616,
          "yellow_per_match_combined": 1.1033,
          "red_per_match_combined": 0.0196,
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
      "fixture_id": "63",
      "event_name": "Cabo Verde x Arábia Saudita",
      "home_team": "Cape Verde",
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
        "hx": 1.57,
        "ax": 1.52,
        "1x2_pct": {
          "home": 36.2,
          "draw": 29.8,
          "away": 34.0
        },
        "over_2_5_pct": 59.7,
        "btts_yes_pct": 64.8
      },
      "v3_adjustment": {
        "hx_baseline": 1.57,
        "ax_baseline": 1.52,
        "hx_v3": 1.57,
        "ax_v3": 1.5118,
        "delta_total_lambda_pct": -0.27,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.0,
          "away_discipline": -0.54
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 36.4,
          "draw": 29.8,
          "away": 33.8
        },
        "over_2_5_pct": 59.5,
        "btts_yes_pct": 64.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 36.2,
          "v3_pct": 36.4,
          "delta_pts": 0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 34.0,
          "v3_pct": 33.8,
          "delta_pts": -0.2
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 64.8,
          "v3_pct": 64.7,
          "delta_pts": -0.13
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 35.2,
          "v3_pct": 35.3,
          "delta_pts": 0.13
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 84.3,
          "v3_pct": 84.2,
          "delta_pts": -0.11
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 15.7,
          "v3_pct": 15.8,
          "delta_pts": 0.11
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 59.7,
          "v3_pct": 59.5,
          "delta_pts": -0.18
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 40.3,
          "v3_pct": 40.5,
          "delta_pts": 0.18
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 37.3,
          "v3_pct": 37.1,
          "delta_pts": -0.18
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 62.7,
          "v3_pct": 62.9,
          "delta_pts": 0.18
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 4.63,
        "lambda_red_card": 0.2666,
        "prob_red_card_in_match_pct": 23.4,
        "lambda_penalty": 0.208,
        "prob_penalty_in_match_pct": 18.8,
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
        "fixture_id": "63",
        "event_name": "Cabo Verde x Arábia Saudita",
        "home_team": "Cape Verde",
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
          "discipline_score": null,
          "fouls_received_score": null,
          "penalty_team_score": null,
          "yellow_per_match_combined": null,
          "red_per_match_combined": null,
          "data_quality": "no_public_foul_card_history_found_in_loaded_sources",
          "confidence": "low"
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
      "fixture_id": "64",
      "event_name": "Uruguai x Espanha",
      "home_team": "Uruguay",
      "away_team": "Spain",
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
        "ax": 2.23,
        "1x2_pct": {
          "home": 15.9,
          "draw": 24.3,
          "away": 59.9
        },
        "over_2_5_pct": 65.2,
        "btts_yes_pct": 62.8
      },
      "v3_adjustment": {
        "hx_baseline": 1.13,
        "ax_baseline": 2.23,
        "hx_v3": 1.1361,
        "ax_v3": 2.2572,
        "delta_total_lambda_pct": 0.99,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.54,
          "away_discipline": 1.22
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 15.7,
          "draw": 24.0,
          "away": 60.3
        },
        "over_2_5_pct": 65.9,
        "btts_yes_pct": 63.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 15.9,
          "v3_pct": 15.7,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.3,
          "v3_pct": 24.0,
          "delta_pts": -0.28
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 59.9,
          "v3_pct": 60.3,
          "delta_pts": 0.43
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 62.8,
          "v3_pct": 63.1,
          "delta_pts": 0.33
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 37.2,
          "v3_pct": 36.9,
          "delta_pts": -0.33
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 87.2,
          "v3_pct": 87.6,
          "delta_pts": 0.35
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 12.8,
          "v3_pct": 12.4,
          "delta_pts": -0.35
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 65.2,
          "v3_pct": 65.9,
          "delta_pts": 0.65
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 34.8,
          "v3_pct": 34.1,
          "delta_pts": -0.65
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 43.3,
          "v3_pct": 44.0,
          "delta_pts": 0.73
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 56.7,
          "v3_pct": 56.0,
          "delta_pts": -0.73
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.23,
        "lambda_red_card": 0.2247,
        "prob_red_card_in_match_pct": 20.1,
        "lambda_penalty": 0.1905,
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
        "fixture_id": "64",
        "event_name": "Uruguai x Espanha",
        "home_team": "Uruguay",
        "away_team": "Spain",
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
          "discipline_score": 0.0941,
          "fouls_received_score": 0.375,
          "penalty_team_score": 0.8107,
          "yellow_per_match_combined": 0.6419,
          "red_per_match_combined": 0.0041,
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
      "fixture_id": "65",
      "event_name": "Nova Zelândia x Bélgica",
      "home_team": "New Zealand",
      "away_team": "Belgium",
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
        "hx": 0.76,
        "ax": 2.42,
        "1x2_pct": {
          "home": 7.7,
          "draw": 20.3,
          "away": 72.0
        },
        "over_2_5_pct": 61.6,
        "btts_yes_pct": 50.6
      },
      "v3_adjustment": {
        "hx_baseline": 0.76,
        "ax_baseline": 2.42,
        "hx_v3": 0.7695,
        "ax_v3": 2.4428,
        "delta_total_lambda_pct": 1.02,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.25,
          "away_discipline": 0.94
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 7.8,
          "draw": 20.1,
          "away": 72.2
        },
        "over_2_5_pct": 62.3,
        "btts_yes_pct": 51.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 20.3,
          "v3_pct": 20.1,
          "delta_pts": -0.19
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 72.0,
          "v3_pct": 72.2,
          "delta_pts": 0.17
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 50.6,
          "v3_pct": 51.1,
          "delta_pts": 0.49
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 49.4,
          "v3_pct": 48.9,
          "delta_pts": -0.49
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 84.7,
          "v3_pct": 85.1,
          "delta_pts": 0.4
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 15.3,
          "v3_pct": 14.9,
          "delta_pts": -0.4
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 61.6,
          "v3_pct": 62.3,
          "delta_pts": 0.67
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 38.4,
          "v3_pct": 37.7,
          "delta_pts": -0.68
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 39.3,
          "v3_pct": 40.0,
          "delta_pts": 0.72
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 60.7,
          "v3_pct": 60.0,
          "delta_pts": -0.72
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.04,
        "lambda_red_card": 0.2183,
        "prob_red_card_in_match_pct": 19.6,
        "lambda_penalty": 0.192,
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
        "fixture_id": "65",
        "event_name": "Nova Zelândia x Bélgica",
        "home_team": "New Zealand",
        "away_team": "Belgium",
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
          "discipline_score": 0.1858,
          "fouls_received_score": 0.3667,
          "penalty_team_score": 0.196,
          "yellow_per_match_combined": 1.4843,
          "red_per_match_combined": 0.0118,
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
      "fixture_id": "66",
      "event_name": "Egito x Irã",
      "home_team": "Egypt",
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
        "hx": 1.51,
        "ax": 1.12,
        "1x2_pct": {
          "home": 42.9,
          "draw": 32.2,
          "away": 24.9
        },
        "over_2_5_pct": 48.9,
        "btts_yes_pct": 55.8
      },
      "v3_adjustment": {
        "hx_baseline": 1.51,
        "ax_baseline": 1.12,
        "hx_v3": 1.5267,
        "ax_v3": 1.1259,
        "delta_total_lambda_pct": 0.86,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.11,
          "away_discipline": 0.53
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 43.2,
          "draw": 32.0,
          "away": 24.7
        },
        "over_2_5_pct": 49.5,
        "btts_yes_pct": 56.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 42.9,
          "v3_pct": 43.2,
          "delta_pts": 0.31
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 32.2,
          "v3_pct": 32.0,
          "delta_pts": -0.2
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 24.9,
          "v3_pct": 24.7,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 55.8,
          "v3_pct": 56.2,
          "delta_pts": 0.38
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 44.2,
          "v3_pct": 43.8,
          "delta_pts": -0.38
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.1,
          "v3_pct": 77.5,
          "delta_pts": 0.4
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.9,
          "v3_pct": 22.5,
          "delta_pts": -0.4
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 48.9,
          "v3_pct": 49.5,
          "delta_pts": 0.56
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 51.1,
          "v3_pct": 50.5,
          "delta_pts": -0.56
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 27.1,
          "v3_pct": 27.5,
          "delta_pts": 0.5
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 72.9,
          "v3_pct": 72.5,
          "delta_pts": -0.5
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.5,
        "lambda_red_card": 0.2121,
        "prob_red_card_in_match_pct": 19.1,
        "lambda_penalty": 0.178,
        "prob_penalty_in_match_pct": 16.3,
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
        "fixture_id": "66",
        "event_name": "Egito x Irã",
        "home_team": "Egypt",
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
          "discipline_score": 0.131,
          "fouls_received_score": null,
          "penalty_team_score": 0.9523,
          "yellow_per_match_combined": 1.2857,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
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
    "scope_start": "2026-06-24T04:08:28",
    "scope_end": "2026-06-27T04:08:28",
    "original_fixtures_before_filter": 72
  }
};
