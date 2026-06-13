window.WC_DATA_V3 = {
  "v3_discipline": true,
  "n": 72,
  "fixtures": [
    {
      "fixture_id": "1",
      "event_name": "México x África do Sul",
      "home_team": "Mexico",
      "away_team": "South Africa",
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
        "match_id_fifa": "400021443",
        "event_name": "Mexico vs. South Africa",
        "kickoff": "",
        "referee": "",
        "home_score": 2.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades.",
        "goals": [
          {
            "team": "Mexico",
            "scorer": "Raul JIMENEZ",
            "minute": "67'"
          },
          {
            "team": "Mexico",
            "scorer": "Cesar MONTES",
            "minute": "90'+2'"
          }
        ],
        "cards": [],
        "attendance": 80824,
        "events_source": "manual_after_visual_check_of_fifa_raw_2026_06_11"
      },
      "baseline_v2": {
        "hx": 1.1504,
        "ax": 0.734,
        "1x2_pct": {
          "home": 45.2,
          "draw": 31.8,
          "away": 23.0
        },
        "over_2_5_pct": 29.2,
        "btts_yes_pct": 35.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.1504,
        "ax_baseline": 0.734,
        "hx_v3": 1.151,
        "ax_v3": 0.7337,
        "delta_total_lambda_pct": 0.02,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.06,
          "away_discipline": -0.04
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 45.2,
          "draw": 31.8,
          "away": 23.0
        },
        "over_2_5_pct": 29.2,
        "btts_yes_pct": 35.9
      },
      "v3_diffs": [],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.98,
        "lambda_red_card": 0.2923,
        "prob_red_card_in_match_pct": 25.3,
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
        "fixture_id": "1",
        "event_name": "México x África do Sul",
        "home_team": "Mexico",
        "away_team": "South Africa",
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
          "discipline_score": 0.4812,
          "fouls_received_score": 0.9,
          "penalty_team_score": 0.483,
          "yellow_per_match_combined": 2.0333,
          "red_per_match_combined": 0.0131,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.5139,
          "fouls_received_score": null,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.3333,
          "red_per_match_combined": 0.1667,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021443",
          "event_name": "Mexico vs. South Africa",
          "kickoff": "",
          "referee": "",
          "home_score": 2.0,
          "away_score": 0.0,
          "status": "full_time",
          "city": "",
          "location": "",
          "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades.",
          "goals": [
            {
              "team": "Mexico",
              "scorer": "Raul JIMENEZ",
              "minute": "67'"
            },
            {
              "team": "Mexico",
              "scorer": "Cesar MONTES",
              "minute": "90'+2'"
            }
          ],
          "cards": [],
          "attendance": 80824,
          "events_source": "manual_after_visual_check_of_fifa_raw_2026_06_11"
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
      "fixture_id": "2",
      "event_name": "Coreia do Sul x República Tcheca",
      "home_team": "South Korea",
      "away_team": "Czech Republic",
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
        "match_id_fifa": "400021441",
        "event_name": "Korea Republic vs. Czechia",
        "kickoff": "",
        "referee": "",
        "home_score": 2.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades.",
        "goals": [
          {
            "team": "Czech Republic",
            "scorer": "Ladislav KREJCI",
            "minute": "59'"
          },
          {
            "team": "South Korea",
            "scorer": "HWANG Inbeom",
            "minute": "67'"
          },
          {
            "team": "South Korea",
            "scorer": "OH Hyeongyu",
            "minute": "80'"
          }
        ],
        "cards": [
          {
            "team": "South Korea",
            "player": "—",
            "type": "yellow",
            "minute": "?"
          }
        ],
        "attendance": null,
        "events_source": "manual_after_visual_check_of_fifa_raw_2026_06_12"
      },
      "baseline_v2": {
        "hx": 1.5502,
        "ax": 1.129,
        "1x2_pct": {
          "home": 46.7,
          "draw": 26.0,
          "away": 27.3
        },
        "over_2_5_pct": 50.1,
        "btts_yes_pct": 53.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.5502,
        "ax_baseline": 1.129,
        "hx_v3": 1.5623,
        "ax_v3": 1.1234,
        "delta_total_lambda_pct": 0.24,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.78,
          "away_discipline": -0.5
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 47.1,
          "draw": 25.9,
          "away": 27.0
        },
        "over_2_5_pct": 50.3,
        "btts_yes_pct": 53.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 46.7,
          "v3_pct": 47.1,
          "delta_pts": 0.44
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.0,
          "v3_pct": 25.9,
          "delta_pts": -0.09
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 27.3,
          "v3_pct": 27.0,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.1,
          "v3_pct": 75.2,
          "delta_pts": 0.12
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 24.9,
          "v3_pct": 24.8,
          "delta_pts": -0.12
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 50.1,
          "v3_pct": 50.3,
          "delta_pts": 0.16
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 49.9,
          "v3_pct": 49.7,
          "delta_pts": -0.16
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 28.1,
          "v3_pct": 28.3,
          "delta_pts": 0.14
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 71.9,
          "v3_pct": 71.7,
          "delta_pts": -0.14
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.62,
        "lambda_red_card": 0.3484,
        "prob_red_card_in_match_pct": 29.4,
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
        "fixture_id": "2",
        "event_name": "Coreia do Sul x República Tcheca",
        "home_team": "South Korea",
        "away_team": "Czech Republic",
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
          "discipline_score": 0.2392,
          "fouls_received_score": 0.075,
          "penalty_team_score": 0.0693,
          "yellow_per_match_combined": 1.6312,
          "red_per_match_combined": 0.0062,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.6666,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 2.0,
          "red_per_match_combined": 0.3333,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021441",
          "event_name": "Korea Republic vs. Czechia",
          "kickoff": "",
          "referee": "",
          "home_score": 2.0,
          "away_score": 1.0,
          "status": "full_time",
          "city": "",
          "location": "",
          "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades.",
          "goals": [
            {
              "team": "Czech Republic",
              "scorer": "Ladislav KREJCI",
              "minute": "59'"
            },
            {
              "team": "South Korea",
              "scorer": "HWANG Inbeom",
              "minute": "67'"
            },
            {
              "team": "South Korea",
              "scorer": "OH Hyeongyu",
              "minute": "80'"
            }
          ],
          "cards": [
            {
              "team": "South Korea",
              "player": "—",
              "type": "yellow",
              "minute": "?"
            }
          ],
          "attendance": null,
          "events_source": "manual_after_visual_check_of_fifa_raw_2026_06_12"
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
      "fixture_id": "3",
      "event_name": "Canadá x Bósnia & Herzegovina",
      "home_team": "Canada",
      "away_team": "Bosnia and Herzegovina",
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
        "match_id_fifa": "400021449",
        "event_name": "Canada vs. Bosnia and Herzegovina",
        "kickoff": "",
        "referee": "",
        "home_score": 1.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.6515,
        "ax": 0.6918,
        "1x2_pct": {
          "home": 60.2,
          "draw": 24.8,
          "away": 15.0
        },
        "over_2_5_pct": 41.5,
        "btts_yes_pct": 40.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.6515,
        "ax_baseline": 0.6918,
        "hx_v3": 1.6618,
        "ax_v3": 0.7004,
        "delta_total_lambda_pct": 0.81,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.62,
          "away_discipline": 1.25
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 60.2,
          "draw": 24.7,
          "away": 15.1
        },
        "over_2_5_pct": 42.0,
        "btts_yes_pct": 41.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.8,
          "v3_pct": 24.7,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 15.0,
          "v3_pct": 15.1,
          "delta_pts": 0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 40.7,
          "v3_pct": 41.1,
          "delta_pts": 0.45
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 59.3,
          "v3_pct": 58.9,
          "delta_pts": -0.45
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 68.2,
          "v3_pct": 68.7,
          "delta_pts": 0.42
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 31.8,
          "v3_pct": 31.3,
          "delta_pts": -0.42
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 41.5,
          "v3_pct": 42.0,
          "delta_pts": 0.5
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 58.5,
          "v3_pct": 58.0,
          "delta_pts": -0.5
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 21.0,
          "v3_pct": 21.3,
          "delta_pts": 0.39
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 79.0,
          "v3_pct": 78.7,
          "delta_pts": -0.39
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.42,
        "lambda_red_card": 0.2121,
        "prob_red_card_in_match_pct": 19.1,
        "lambda_penalty": 0.198,
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
        "fixture_id": "3",
        "event_name": "Canadá x Bósnia & Herzegovina",
        "home_team": "Canada",
        "away_team": "Bosnia and Herzegovina",
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
          "discipline_score": 0.2923,
          "fouls_received_score": 0.4667,
          "penalty_team_score": 0.202,
          "yellow_per_match_combined": 2.2303,
          "red_per_match_combined": 0.0,
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
          "match_id_fifa": "400021449",
          "event_name": "Canada vs. Bosnia and Herzegovina",
          "kickoff": "",
          "referee": "",
          "home_score": 1.0,
          "away_score": 1.0,
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
      "fixture_id": "4",
      "event_name": "EUA x Paraguai",
      "home_team": "United States",
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
      "fifa_result": {
        "match_id_fifa": "400021458",
        "event_name": "USA vs. Paraguay",
        "kickoff": "",
        "referee": "",
        "home_score": 4.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.234,
        "ax": 1.0319,
        "1x2_pct": {
          "home": 40.4,
          "draw": 29.2,
          "away": 30.4
        },
        "over_2_5_pct": 39.5,
        "btts_yes_pct": 46.0
      },
      "v3_adjustment": {
        "hx_baseline": 1.234,
        "ax_baseline": 1.0319,
        "hx_v3": 1.2452,
        "ax_v3": 1.0409,
        "delta_total_lambda_pct": 0.89,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.91,
          "away_discipline": 0.87
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 40.5,
          "draw": 29.1,
          "away": 30.4
        },
        "over_2_5_pct": 40.0,
        "btts_yes_pct": 46.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 40.4,
          "v3_pct": 40.5,
          "delta_pts": 0.11
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.2,
          "v3_pct": 29.1,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 46.0,
          "v3_pct": 46.5,
          "delta_pts": 0.44
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 54.0,
          "v3_pct": 53.5,
          "delta_pts": -0.44
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 66.5,
          "v3_pct": 67.0,
          "delta_pts": 0.47
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 33.5,
          "v3_pct": 33.0,
          "delta_pts": -0.47
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 39.5,
          "v3_pct": 40.0,
          "delta_pts": 0.54
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 60.5,
          "v3_pct": 60.0,
          "delta_pts": -0.54
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 19.4,
          "v3_pct": 19.8,
          "delta_pts": 0.41
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 80.6,
          "v3_pct": 80.2,
          "delta_pts": -0.41
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.14,
        "lambda_red_card": 0.2375,
        "prob_red_card_in_match_pct": 21.1,
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
        "fixture_id": "4",
        "event_name": "EUA x Paraguai",
        "home_team": "United States",
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
          "discipline_score": 0.1964,
          "fouls_received_score": 0.25,
          "penalty_team_score": 0.5363,
          "yellow_per_match_combined": 1.1888,
          "red_per_match_combined": 0.0138,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
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
        "fifa_result": {
          "match_id_fifa": "400021458",
          "event_name": "USA vs. Paraguay",
          "kickoff": "",
          "referee": "",
          "home_score": 4.0,
          "away_score": 1.0,
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
      "fixture_id": "5",
      "event_name": "Qatar x Suíça",
      "home_team": "Qatar",
      "away_team": "Switzerland",
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
        "match_id_fifa": "400021447",
        "event_name": "Qatar vs. Switzerland",
        "kickoff": "Today, 16:00",
        "referee": "Said MARTINEZ",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "San Francisco Bay Area",
        "location": "San Francisco Bay Area Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.9115,
        "ax": 2.1071,
        "1x2_pct": {
          "home": 15.0,
          "draw": 20.4,
          "away": 64.6
        },
        "over_2_5_pct": 58.1,
        "btts_yes_pct": 52.8
      },
      "v3_adjustment": {
        "hx_baseline": 0.9115,
        "ax_baseline": 2.1071,
        "hx_v3": 0.9175,
        "ax_v3": 2.1174,
        "delta_total_lambda_pct": 0.54,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.66,
          "away_discipline": 0.49
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 15.0,
          "draw": 20.4,
          "away": 64.7
        },
        "over_2_5_pct": 58.5,
        "btts_yes_pct": 53.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 20.4,
          "v3_pct": 20.4,
          "delta_pts": -0.08
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 64.6,
          "v3_pct": 64.7,
          "delta_pts": 0.06
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 52.8,
          "v3_pct": 53.1,
          "delta_pts": 0.28
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 47.2,
          "v3_pct": 46.9,
          "delta_pts": -0.28
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 80.6,
          "v3_pct": 80.9,
          "delta_pts": 0.24
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 19.4,
          "v3_pct": 19.1,
          "delta_pts": -0.24
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 58.1,
          "v3_pct": 58.5,
          "delta_pts": 0.36
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 41.9,
          "v3_pct": 41.5,
          "delta_pts": -0.36
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 35.7,
          "v3_pct": 36.1,
          "delta_pts": 0.37
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 64.3,
          "v3_pct": 63.9,
          "delta_pts": -0.37
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.93,
        "lambda_red_card": 0.2191,
        "prob_red_card_in_match_pct": 19.7,
        "lambda_penalty": 0.211,
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
        "fixture_id": "5",
        "event_name": "Qatar x Suíça",
        "home_team": "Qatar",
        "away_team": "Switzerland",
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
          "discipline_score": 0.2815,
          "fouls_received_score": 0.7333,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 2.3333,
          "red_per_match_combined": 0.0,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.3372,
          "fouls_received_score": 0.45,
          "penalty_team_score": 0.074,
          "yellow_per_match_combined": 1.935,
          "red_per_match_combined": 0.0133,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021447",
          "event_name": "Qatar vs. Switzerland",
          "kickoff": "Today, 16:00",
          "referee": "Said MARTINEZ",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "San Francisco Bay Area",
          "location": "San Francisco Bay Area Stadium",
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
      "fixture_id": "6",
      "event_name": "Brasil x Marrocos",
      "home_team": "Brazil",
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
        "match_id_fifa": "400021456",
        "event_name": "Brazil vs. Morocco",
        "kickoff": "Today, 19:00",
        "referee": "Slavko VINCIC",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "New Jersey",
        "location": "New York/New Jersey Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.7511,
        "ax": 1.1626,
        "1x2_pct": {
          "home": 23.4,
          "draw": 31.5,
          "away": 45.1
        },
        "over_2_5_pct": 30.0,
        "btts_yes_pct": 36.7
      },
      "v3_adjustment": {
        "hx_baseline": 0.7511,
        "ax_baseline": 1.1626,
        "hx_v3": 0.7571,
        "ax_v3": 1.167,
        "delta_total_lambda_pct": 0.54,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.8,
          "away_discipline": 0.38
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 23.5,
          "draw": 31.4,
          "away": 45.1
        },
        "over_2_5_pct": 30.3,
        "btts_yes_pct": 37.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 23.4,
          "v3_pct": 23.5,
          "delta_pts": 0.11
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 31.5,
          "v3_pct": 31.4,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 36.7,
          "v3_pct": 37.0,
          "delta_pts": 0.27
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 63.3,
          "v3_pct": 63.0,
          "delta_pts": -0.27
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 57.4,
          "v3_pct": 57.7,
          "delta_pts": 0.29
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 42.6,
          "v3_pct": 42.3,
          "delta_pts": -0.29
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 30.0,
          "v3_pct": 30.3,
          "delta_pts": 0.28
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 70.0,
          "v3_pct": 69.7,
          "delta_pts": -0.28
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 12.8,
          "v3_pct": 12.9,
          "delta_pts": 0.18
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 87.2,
          "v3_pct": 87.1,
          "delta_pts": -0.18
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.05,
        "lambda_red_card": 0.2641,
        "prob_red_card_in_match_pct": 23.2,
        "lambda_penalty": 0.2079,
        "prob_penalty_in_match_pct": 18.8,
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
        "fixture_id": "6",
        "event_name": "Brasil x Marrocos",
        "home_team": "Brazil",
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
          "discipline_score": 0.2327,
          "fouls_received_score": 0.76,
          "penalty_team_score": 0.428,
          "yellow_per_match_combined": 1.138,
          "red_per_match_combined": 0.0101,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
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
          "match_id_fifa": "400021456",
          "event_name": "Brazil vs. Morocco",
          "kickoff": "Today, 19:00",
          "referee": "Slavko VINCIC",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "New Jersey",
          "location": "New York/New Jersey Stadium",
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
      "fixture_id": "7",
      "event_name": "Haiti x Escócia",
      "home_team": "Haiti",
      "away_team": "Scotland",
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
        "match_id_fifa": "400021453",
        "event_name": "Haiti vs. Scotland",
        "kickoff": "Today, 22:00",
        "referee": "Mustapha Ghorbal",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Boston",
        "location": "Boston Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.333,
        "ax": 1.551,
        "1x2_pct": {
          "home": 32.4,
          "draw": 25.4,
          "away": 42.2
        },
        "over_2_5_pct": 55.0,
        "btts_yes_pct": 58.4
      },
      "v3_adjustment": {
        "hx_baseline": 1.333,
        "ax_baseline": 1.551,
        "hx_v3": 1.3497,
        "ax_v3": 1.569,
        "delta_total_lambda_pct": 1.2,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.25,
          "away_discipline": 1.16
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 32.5,
          "draw": 25.2,
          "away": 42.3
        },
        "over_2_5_pct": 55.8,
        "btts_yes_pct": 59.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 32.4,
          "v3_pct": 32.5,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.4,
          "v3_pct": 25.2,
          "delta_pts": -0.18
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 42.2,
          "v3_pct": 42.3,
          "delta_pts": 0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 58.4,
          "v3_pct": 59.0,
          "delta_pts": 0.62
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 41.6,
          "v3_pct": 41.0,
          "delta_pts": -0.62
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 78.6,
          "v3_pct": 79.2,
          "delta_pts": 0.55
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 21.4,
          "v3_pct": 20.8,
          "delta_pts": -0.55
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 55.0,
          "v3_pct": 55.8,
          "delta_pts": 0.8
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 45.0,
          "v3_pct": 44.2,
          "delta_pts": -0.8
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 32.7,
          "v3_pct": 33.5,
          "delta_pts": 0.78
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 67.3,
          "v3_pct": 66.5,
          "delta_pts": -0.77
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.74,
        "lambda_red_card": 0.2317,
        "prob_red_card_in_match_pct": 20.7,
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
        "fixture_id": "7",
        "event_name": "Haiti x Escócia",
        "home_team": "Haiti",
        "away_team": "Scotland",
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
          "discipline_score": 0.1122,
          "fouls_received_score": null,
          "penalty_team_score": 0.3847,
          "yellow_per_match_combined": 0.8846,
          "red_per_match_combined": 0.0385,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021453",
          "event_name": "Haiti vs. Scotland",
          "kickoff": "Today, 22:00",
          "referee": "Mustapha Ghorbal",
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
      "fixture_id": "8",
      "event_name": "Austrália x Turquia",
      "home_team": "Australia",
      "away_team": "Turkey",
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
        "kickoff": "14 June 2026, 01:00",
        "referee": "Jesús Valenzuela Sáez",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Vancouver",
        "location": "BC Place Vancouver",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.4764,
        "ax": 0.9482,
        "1x2_pct": {
          "home": 49.1,
          "draw": 27.1,
          "away": 23.9
        },
        "over_2_5_pct": 43.7,
        "btts_yes_pct": 47.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.4764,
        "ax_baseline": 0.9482,
        "hx_v3": 1.4844,
        "ax_v3": 0.9527,
        "delta_total_lambda_pct": 0.51,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.54,
          "away_discipline": 0.47
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 49.2,
          "draw": 27.0,
          "away": 23.9
        },
        "over_2_5_pct": 44.0,
        "btts_yes_pct": 47.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 49.1,
          "v3_pct": 49.2,
          "delta_pts": 0.1
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.1,
          "v3_pct": 27.0,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 47.6,
          "v3_pct": 47.9,
          "delta_pts": 0.25
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 52.4,
          "v3_pct": 52.1,
          "delta_pts": -0.25
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 70.1,
          "v3_pct": 70.3,
          "delta_pts": 0.27
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 29.9,
          "v3_pct": 29.7,
          "delta_pts": -0.27
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 43.7,
          "v3_pct": 44.0,
          "delta_pts": 0.33
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 56.3,
          "v3_pct": 56.0,
          "delta_pts": -0.32
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 22.6,
          "v3_pct": 22.9,
          "delta_pts": 0.26
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 77.4,
          "v3_pct": 77.1,
          "delta_pts": -0.26
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.52,
        "lambda_red_card": 0.2736,
        "prob_red_card_in_match_pct": 23.9,
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
        "fixture_id": "8",
        "event_name": "Austrália x Turquia",
        "home_team": "Australia",
        "away_team": "Turkey",
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
          "discipline_score": 0.3201,
          "fouls_received_score": 0.175,
          "penalty_team_score": 0.29,
          "yellow_per_match_combined": 1.6359,
          "red_per_match_combined": 0.0326,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.3417,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 1.8,
          "red_per_match_combined": 0.1,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021463",
          "event_name": "Australia vs. Türkiye",
          "kickoff": "14 June 2026, 01:00",
          "referee": "Jesús Valenzuela Sáez",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Vancouver",
          "location": "BC Place Vancouver",
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
      "fixture_id": "9",
      "event_name": "Alemanha x Curaçao",
      "home_team": "Germany",
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
      "fifa_result": {
        "match_id_fifa": "400021464",
        "event_name": "Germany vs. Curaçao",
        "kickoff": "14 June 2026, 14:00",
        "referee": "Jalal Jayed",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Houston",
        "location": "Houston Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 2.2396,
        "ax": 0.9682,
        "1x2_pct": {
          "home": 65.9,
          "draw": 19.4,
          "away": 14.7
        },
        "over_2_5_pct": 62.2,
        "btts_yes_pct": 55.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.2396,
        "ax_baseline": 0.9682,
        "hx_v3": 2.2672,
        "ax_v3": 0.9682,
        "delta_total_lambda_pct": 0.86,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.23,
          "away_discipline": 0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 66.4,
          "draw": 19.2,
          "away": 14.5
        },
        "over_2_5_pct": 62.7,
        "btts_yes_pct": 55.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 65.9,
          "v3_pct": 66.4,
          "delta_pts": 0.52
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 19.4,
          "v3_pct": 19.2,
          "delta_pts": -0.25
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 14.7,
          "v3_pct": 14.5,
          "delta_pts": -0.27
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 55.7,
          "v3_pct": 55.9,
          "delta_pts": 0.18
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 44.3,
          "v3_pct": 44.1,
          "delta_pts": -0.18
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 83.2,
          "v3_pct": 83.6,
          "delta_pts": 0.35
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 16.8,
          "v3_pct": 16.4,
          "delta_pts": -0.35
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 62.2,
          "v3_pct": 62.7,
          "delta_pts": 0.57
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 37.8,
          "v3_pct": 37.3,
          "delta_pts": -0.57
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 39.9,
          "v3_pct": 40.5,
          "delta_pts": 0.61
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 60.1,
          "v3_pct": 59.5,
          "delta_pts": -0.61
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.24,
        "lambda_red_card": 0.2612,
        "prob_red_card_in_match_pct": 23.0,
        "lambda_penalty": 0.182,
        "prob_penalty_in_match_pct": 16.6,
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
        "fixture_id": "9",
        "event_name": "Alemanha x Curaçao",
        "home_team": "Germany",
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
          "discipline_score": 0.0893,
          "fouls_received_score": 0.2,
          "penalty_team_score": 0.5673,
          "yellow_per_match_combined": 1.0798,
          "red_per_match_combined": 0.0032,
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
        "fifa_result": {
          "match_id_fifa": "400021464",
          "event_name": "Germany vs. Curaçao",
          "kickoff": "14 June 2026, 14:00",
          "referee": "Jalal Jayed",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Houston",
          "location": "Houston Stadium",
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
      "fixture_id": "10",
      "event_name": "Holanda x Japão",
      "home_team": "Netherlands",
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
      "fifa_result": {
        "match_id_fifa": "400021470",
        "event_name": "Netherlands vs. Japan",
        "kickoff": "14 June 2026, 17:00",
        "referee": "Ismail Elfath",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Dallas",
        "location": "Dallas Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.0553,
        "ax": 1.4403,
        "1x2_pct": {
          "home": 27.3,
          "draw": 27.2,
          "away": 45.5
        },
        "over_2_5_pct": 45.5,
        "btts_yes_pct": 50.1
      },
      "v3_adjustment": {
        "hx_baseline": 1.0553,
        "ax_baseline": 1.4403,
        "hx_v3": 1.0512,
        "ax_v3": 1.4483,
        "delta_total_lambda_pct": 0.16,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": -0.39,
          "away_discipline": 0.56
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 27.0,
          "draw": 27.1,
          "away": 45.8
        },
        "over_2_5_pct": 45.6,
        "btts_yes_pct": 50.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 27.3,
          "v3_pct": 27.0,
          "delta_pts": -0.24
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.2,
          "v3_pct": 27.1,
          "delta_pts": -0.06
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 45.5,
          "v3_pct": 45.8,
          "delta_pts": 0.31
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 71.6,
          "v3_pct": 71.6,
          "delta_pts": 0.08
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 28.4,
          "v3_pct": 28.4,
          "delta_pts": -0.08
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 45.5,
          "v3_pct": 45.6,
          "delta_pts": 0.1
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 54.5,
          "v3_pct": 54.4,
          "delta_pts": -0.1
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.1,
          "v3_pct": 24.2,
          "delta_pts": 0.09
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 75.9,
          "v3_pct": 75.8,
          "delta_pts": -0.09
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.59,
        "lambda_red_card": 0.2821,
        "prob_red_card_in_match_pct": 24.6,
        "lambda_penalty": 0.1679,
        "prob_penalty_in_match_pct": 15.5,
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
        "fixture_id": "10",
        "event_name": "Holanda x Japão",
        "home_team": "Netherlands",
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
          "discipline_score": 0.6301,
          "fouls_received_score": 0.34,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.1982,
          "red_per_match_combined": 0.1536,
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
        "fifa_result": {
          "match_id_fifa": "400021470",
          "event_name": "Netherlands vs. Japan",
          "kickoff": "14 June 2026, 17:00",
          "referee": "Ismail Elfath",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Dallas",
          "location": "Dallas Stadium",
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
      "fixture_id": "11",
      "event_name": "Costa do Marfim x Equador",
      "home_team": "Ivory Coast",
      "away_team": "Ecuador",
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
        "match_id_fifa": "400021467",
        "event_name": "Côte d'Ivoire vs. Ecuador",
        "kickoff": "14 June 2026, 20:00",
        "referee": "François Letexier",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Philadelphia",
        "location": "Philadelphia Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.615,
        "ax": 0.7164,
        "1x2_pct": {
          "home": 26.9,
          "draw": 40.1,
          "away": 33.1
        },
        "over_2_5_pct": 15.0,
        "btts_yes_pct": 23.8
      },
      "v3_adjustment": {
        "hx_baseline": 0.615,
        "ax_baseline": 0.7164,
        "hx_v3": 0.6186,
        "ax_v3": 0.7184,
        "delta_total_lambda_pct": 0.42,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.58,
          "away_discipline": 0.27
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 27.0,
          "draw": 40.0,
          "away": 33.1
        },
        "over_2_5_pct": 15.1,
        "btts_yes_pct": 24.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 26.9,
          "v3_pct": 27.0,
          "delta_pts": 0.1
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 40.1,
          "v3_pct": 40.0,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 23.8,
          "v3_pct": 24.0,
          "delta_pts": 0.15
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 76.2,
          "v3_pct": 76.0,
          "delta_pts": -0.15
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 38.8,
          "v3_pct": 39.0,
          "delta_pts": 0.2
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 61.2,
          "v3_pct": 61.0,
          "delta_pts": -0.2
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 15.0,
          "v3_pct": 15.1,
          "delta_pts": 0.13
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 85.0,
          "v3_pct": 84.9,
          "delta_pts": -0.13
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 4.6,
          "v3_pct": 4.7,
          "delta_pts": 0.06
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 95.4,
          "v3_pct": 95.3,
          "delta_pts": -0.06
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.62,
        "lambda_red_card": 0.2312,
        "prob_red_card_in_match_pct": 20.6,
        "lambda_penalty": 0.204,
        "prob_penalty_in_match_pct": 18.5,
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
        "fixture_id": "11",
        "event_name": "Costa do Marfim x Equador",
        "home_team": "Ivory Coast",
        "away_team": "Ecuador",
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
          "discipline_score": 0.3055,
          "fouls_received_score": null,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.3333,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.409,
          "fouls_received_score": 0.5667,
          "penalty_team_score": 0.4167,
          "yellow_per_match_combined": 1.3,
          "red_per_match_combined": 0.0375,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021467",
          "event_name": "Côte d'Ivoire vs. Ecuador",
          "kickoff": "14 June 2026, 20:00",
          "referee": "François Letexier",
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
      "fixture_id": "12",
      "event_name": "Suécia x Tunísia",
      "home_team": "Sweden",
      "away_team": "Tunisia",
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
        "match_id_fifa": "400021474",
        "event_name": "Sweden vs. Tunisia",
        "kickoff": "14 June 2026, 23:00",
        "referee": "Yael Falcón Pérez",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Monterrey",
        "location": "Monterrey Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.0918,
        "ax": 1.3736,
        "1x2_pct": {
          "home": 29.4,
          "draw": 27.7,
          "away": 42.9
        },
        "over_2_5_pct": 44.7,
        "btts_yes_pct": 50.0
      },
      "v3_adjustment": {
        "hx_baseline": 1.0918,
        "ax_baseline": 1.3736,
        "hx_v3": 1.1051,
        "ax_v3": 1.3809,
        "delta_total_lambda_pct": 0.84,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.22,
          "away_discipline": 0.53
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 29.7,
          "draw": 27.5,
          "away": 42.8
        },
        "over_2_5_pct": 45.3,
        "btts_yes_pct": 50.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 29.4,
          "v3_pct": 29.7,
          "delta_pts": 0.23
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.7,
          "v3_pct": 27.5,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 42.9,
          "v3_pct": 42.8,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 50.0,
          "v3_pct": 50.5,
          "delta_pts": 0.45
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 50.0,
          "v3_pct": 49.5,
          "delta_pts": -0.45
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 70.9,
          "v3_pct": 71.4,
          "delta_pts": 0.43
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 29.1,
          "v3_pct": 28.6,
          "delta_pts": -0.43
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 44.7,
          "v3_pct": 45.3,
          "delta_pts": 0.53
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 55.3,
          "v3_pct": 54.7,
          "delta_pts": -0.53
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 23.5,
          "v3_pct": 23.9,
          "delta_pts": 0.44
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 76.5,
          "v3_pct": 76.1,
          "delta_pts": -0.44
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.15,
        "lambda_red_card": 0.2235,
        "prob_red_card_in_match_pct": 20.0,
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
        "fixture_id": "12",
        "event_name": "Suécia x Tunísia",
        "home_team": "Sweden",
        "away_team": "Tunisia",
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
          "discipline_score": 0.0925,
          "fouls_received_score": null,
          "penalty_team_score": 0.3663,
          "yellow_per_match_combined": 0.8901,
          "red_per_match_combined": 0.022,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.3222,
          "fouls_received_score": 0.2,
          "penalty_team_score": 0.3703,
          "yellow_per_match_combined": 1.8,
          "red_per_match_combined": 0.0,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021474",
          "event_name": "Sweden vs. Tunisia",
          "kickoff": "14 June 2026, 23:00",
          "referee": "Yael Falcón Pérez",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Monterrey",
          "location": "Monterrey Stadium",
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
      "fixture_id": "13",
      "event_name": "Espanha x Cabo Verde",
      "home_team": "Spain",
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
      "fifa_result": {
        "match_id_fifa": "400021482",
        "event_name": "Spain vs. Cabo Verde",
        "kickoff": "15 June 2026, 13:00",
        "referee": "Adham Mohammad Tumah Makhadmeh",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Atlanta",
        "location": "Atlanta Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 2.1875,
        "ax": 0.6289,
        "1x2_pct": {
          "home": 73.0,
          "draw": 18.0,
          "away": 9.0
        },
        "over_2_5_pct": 53.4,
        "btts_yes_pct": 41.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.1875,
        "ax_baseline": 0.6289,
        "hx_v3": 2.2141,
        "ax_v3": 0.6289,
        "delta_total_lambda_pct": 0.95,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.22,
          "away_discipline": 0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 73.5,
          "draw": 17.7,
          "away": 8.8
        },
        "over_2_5_pct": 54.1,
        "btts_yes_pct": 41.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 73.0,
          "v3_pct": 73.5,
          "delta_pts": 0.47
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 18.0,
          "v3_pct": 17.7,
          "delta_pts": -0.28
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 9.0,
          "v3_pct": 8.8,
          "delta_pts": -0.18
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 41.7,
          "v3_pct": 41.8,
          "delta_pts": 0.14
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 58.3,
          "v3_pct": 58.2,
          "delta_pts": -0.13
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.4,
          "v3_pct": 77.9,
          "delta_pts": 0.44
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.6,
          "v3_pct": 22.1,
          "delta_pts": -0.44
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 53.4,
          "v3_pct": 54.1,
          "delta_pts": 0.63
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 46.6,
          "v3_pct": 45.9,
          "delta_pts": -0.63
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 31.2,
          "v3_pct": 31.8,
          "delta_pts": 0.59
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 68.8,
          "v3_pct": 68.2,
          "delta_pts": -0.59
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.02,
        "lambda_red_card": 0.2616,
        "prob_red_card_in_match_pct": 23.0,
        "lambda_penalty": 0.1925,
        "prob_penalty_in_match_pct": 17.5,
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
        "fixture_id": "13",
        "event_name": "Espanha x Cabo Verde",
        "home_team": "Spain",
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
          "discipline_score": 0.0941,
          "fouls_received_score": 0.375,
          "penalty_team_score": 0.8107,
          "yellow_per_match_combined": 0.6419,
          "red_per_match_combined": 0.0041,
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
        "fifa_result": {
          "match_id_fifa": "400021482",
          "event_name": "Spain vs. Cabo Verde",
          "kickoff": "15 June 2026, 13:00",
          "referee": "Adham Mohammad Tumah Makhadmeh",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Atlanta",
          "location": "Atlanta Stadium",
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
      "fixture_id": "14",
      "event_name": "Bélgica x Egito",
      "home_team": "Belgium",
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
      "fifa_result": {
        "match_id_fifa": "400021478",
        "event_name": "Belgium vs. Egypt",
        "kickoff": "15 June 2026, 16:00",
        "referee": "Ramon ABATTI",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Seattle",
        "location": "Seattle Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.1668,
        "ax": 0.9665,
        "1x2_pct": {
          "home": 40.0,
          "draw": 30.3,
          "away": 29.8
        },
        "over_2_5_pct": 35.9,
        "btts_yes_pct": 43.1
      },
      "v3_adjustment": {
        "hx_baseline": 1.1668,
        "ax_baseline": 0.9665,
        "hx_v3": 1.1778,
        "ax_v3": 0.9772,
        "delta_total_lambda_pct": 1.02,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.94,
          "away_discipline": 1.11
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 40.0,
          "draw": 30.1,
          "away": 29.9
        },
        "over_2_5_pct": 36.5,
        "btts_yes_pct": 43.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 40.0,
          "v3_pct": 40.0,
          "delta_pts": 0.07
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 30.3,
          "v3_pct": 30.1,
          "delta_pts": -0.18
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 29.8,
          "v3_pct": 29.9,
          "delta_pts": 0.1
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 43.1,
          "v3_pct": 43.6,
          "delta_pts": 0.49
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 56.9,
          "v3_pct": 56.4,
          "delta_pts": -0.49
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 63.3,
          "v3_pct": 63.8,
          "delta_pts": 0.54
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 36.7,
          "v3_pct": 36.2,
          "delta_pts": -0.54
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 35.9,
          "v3_pct": 36.5,
          "delta_pts": 0.58
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 64.1,
          "v3_pct": 63.5,
          "delta_pts": -0.58
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 16.8,
          "v3_pct": 17.2,
          "delta_pts": 0.42
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 83.2,
          "v3_pct": 82.8,
          "delta_pts": -0.42
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.19,
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
        "fixture_id": "14",
        "event_name": "Bélgica x Egito",
        "home_team": "Belgium",
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
          "discipline_score": 0.1858,
          "fouls_received_score": 0.3667,
          "penalty_team_score": 0.196,
          "yellow_per_match_combined": 1.4843,
          "red_per_match_combined": 0.0118,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
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
        "fifa_result": {
          "match_id_fifa": "400021478",
          "event_name": "Belgium vs. Egypt",
          "kickoff": "15 June 2026, 16:00",
          "referee": "Ramon ABATTI",
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
      "fixture_id": "15",
      "event_name": "Arábia Saudita x Uruguai",
      "home_team": "Saudi Arabia",
      "away_team": "Uruguay",
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
        "match_id_fifa": "400021486",
        "event_name": "Saudi Arabia vs. Uruguay",
        "kickoff": "15 June 2026, 19:00",
        "referee": "Maurizio Mariani",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Miami",
        "location": "Miami Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.5629,
        "ax": 1.0294,
        "1x2_pct": {
          "home": 19.4,
          "draw": 34.7,
          "away": 45.9
        },
        "over_2_5_pct": 21.5,
        "btts_yes_pct": 28.0
      },
      "v3_adjustment": {
        "hx_baseline": 0.5629,
        "ax_baseline": 1.0294,
        "hx_v3": 0.5599,
        "ax_v3": 1.035,
        "delta_total_lambda_pct": 0.16,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": -0.54,
          "away_discipline": 0.54
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 19.3,
          "draw": 34.6,
          "away": 46.2
        },
        "over_2_5_pct": 21.5,
        "btts_yes_pct": 28.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 19.4,
          "v3_pct": 19.3,
          "delta_pts": -0.18
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 34.7,
          "v3_pct": 34.6,
          "delta_pts": -0.09
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 45.9,
          "v3_pct": 46.2,
          "delta_pts": 0.27
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 47.6,
          "v3_pct": 47.7,
          "delta_pts": 0.08
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 52.4,
          "v3_pct": 52.3,
          "delta_pts": -0.08
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 21.5,
          "v3_pct": 21.5,
          "delta_pts": 0.07
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 78.5,
          "v3_pct": 78.5,
          "delta_pts": -0.07
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 4.84,
        "lambda_red_card": 0.2305,
        "prob_red_card_in_match_pct": 20.6,
        "lambda_penalty": 0.206,
        "prob_penalty_in_match_pct": 18.6,
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
        "fixture_id": "15",
        "event_name": "Arábia Saudita x Uruguai",
        "home_team": "Saudi Arabia",
        "away_team": "Uruguay",
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
          "discipline_score": 0.6798,
          "fouls_received_score": 0.6333,
          "penalty_team_score": 0.7017,
          "yellow_per_match_combined": 3.8509,
          "red_per_match_combined": 0.0158,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.32,
          "fouls_received_score": 0.4667,
          "penalty_team_score": 0.226,
          "yellow_per_match_combined": 2.2277,
          "red_per_match_combined": 0.0203,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021486",
          "event_name": "Saudi Arabia vs. Uruguay",
          "kickoff": "15 June 2026, 19:00",
          "referee": "Maurizio Mariani",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Miami",
          "location": "Miami Stadium",
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
      "fixture_id": "16",
      "event_name": "Irã x Nova Zelândia",
      "home_team": "Iran",
      "away_team": "New Zealand",
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
        "match_id_fifa": "400021476",
        "event_name": "IR Iran vs. New Zealand",
        "kickoff": "15 June 2026, 22:00",
        "referee": "César Arturo Ramos Palazuelos",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Los Angeles",
        "location": "Los Angeles Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.434,
        "ax": 1.0971,
        "1x2_pct": {
          "home": 44.4,
          "draw": 27.1,
          "away": 28.5
        },
        "over_2_5_pct": 46.4,
        "btts_yes_pct": 51.1
      },
      "v3_adjustment": {
        "hx_baseline": 1.434,
        "ax_baseline": 1.0971,
        "hx_v3": 1.4416,
        "ax_v3": 1.1108,
        "delta_total_lambda_pct": 0.84,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.53,
          "away_discipline": 1.25
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 44.3,
          "draw": 27.0,
          "away": 28.7
        },
        "over_2_5_pct": 47.0,
        "btts_yes_pct": 51.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 44.4,
          "v3_pct": 44.3,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.1,
          "v3_pct": 27.0,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 28.5,
          "v3_pct": 28.7,
          "delta_pts": 0.23
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 51.1,
          "v3_pct": 51.6,
          "delta_pts": 0.47
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 48.9,
          "v3_pct": 48.4,
          "delta_pts": -0.47
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.3,
          "v3_pct": 72.7,
          "delta_pts": 0.42
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.7,
          "v3_pct": 27.3,
          "delta_pts": -0.43
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 46.4,
          "v3_pct": 47.0,
          "delta_pts": 0.54
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 53.6,
          "v3_pct": 53.0,
          "delta_pts": -0.54
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.9,
          "v3_pct": 25.4,
          "delta_pts": 0.46
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 75.1,
          "v3_pct": 74.6,
          "delta_pts": -0.46
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.36,
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
        "fixture_id": "16",
        "event_name": "Irã x Nova Zelândia",
        "home_team": "Iran",
        "away_team": "New Zealand",
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
          "discipline_score": 0.3241,
          "fouls_received_score": 0.1333,
          "penalty_team_score": 0.3703,
          "yellow_per_match_combined": 2.1166,
          "red_per_match_combined": 0.0,
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
          "match_id_fifa": "400021476",
          "event_name": "IR Iran vs. New Zealand",
          "kickoff": "15 June 2026, 22:00",
          "referee": "César Arturo Ramos Palazuelos",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Los Angeles",
          "location": "Los Angeles Stadium",
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
      "fixture_id": "17",
      "event_name": "França x Senegal",
      "home_team": "France",
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
      "fifa_result": {
        "match_id_fifa": "400021490",
        "event_name": "France vs. Senegal",
        "kickoff": "16 June 2026, 16:00",
        "referee": "",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "New Jersey",
        "location": "New York/New Jersey Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.2299,
        "ax": 1.0878,
        "1x2_pct": {
          "home": 39.0,
          "draw": 28.9,
          "away": 32.0
        },
        "over_2_5_pct": 40.9,
        "btts_yes_pct": 47.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.2299,
        "ax_baseline": 1.0878,
        "hx_v3": 1.243,
        "ax_v3": 1.094,
        "delta_total_lambda_pct": 0.83,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.06,
          "away_discipline": 0.57
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 39.3,
          "draw": 28.8,
          "away": 32.0
        },
        "over_2_5_pct": 41.4,
        "btts_yes_pct": 47.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 39.0,
          "v3_pct": 39.3,
          "delta_pts": 0.23
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.9,
          "v3_pct": 28.8,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 32.0,
          "v3_pct": 32.0,
          "delta_pts": -0.08
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 47.3,
          "v3_pct": 47.7,
          "delta_pts": 0.4
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 52.7,
          "v3_pct": 52.3,
          "delta_pts": -0.4
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 67.7,
          "v3_pct": 68.2,
          "delta_pts": 0.44
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 32.3,
          "v3_pct": 31.8,
          "delta_pts": -0.44
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 40.9,
          "v3_pct": 41.4,
          "delta_pts": 0.51
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 59.1,
          "v3_pct": 58.6,
          "delta_pts": -0.51
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 20.4,
          "v3_pct": 20.8,
          "delta_pts": 0.4
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 79.6,
          "v3_pct": 79.2,
          "delta_pts": -0.4
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.3,
        "lambda_red_card": 0.2346,
        "prob_red_card_in_match_pct": 20.9,
        "lambda_penalty": 0.2088,
        "prob_penalty_in_match_pct": 18.8,
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
        "fixture_id": "17",
        "event_name": "França x Senegal",
        "home_team": "France",
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
          "discipline_score": 0.1452,
          "fouls_received_score": 0.4714,
          "penalty_team_score": 0.616,
          "yellow_per_match_combined": 1.1033,
          "red_per_match_combined": 0.0196,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
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
        "fifa_result": {
          "match_id_fifa": "400021490",
          "event_name": "France vs. Senegal",
          "kickoff": "16 June 2026, 16:00",
          "referee": "",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "New Jersey",
          "location": "New York/New Jersey Stadium",
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
      "fixture_id": "18",
      "event_name": "Iraque x Noruega",
      "home_team": "Iraq",
      "away_team": "Norway",
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
        "match_id_fifa": "400021488",
        "event_name": "Iraq vs. Norway",
        "kickoff": "16 June 2026, 19:00",
        "referee": "",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Boston",
        "location": "Boston Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.7901,
        "ax": 1.5954,
        "1x2_pct": {
          "home": 18.1,
          "draw": 25.7,
          "away": 56.2
        },
        "over_2_5_pct": 42.6,
        "btts_yes_pct": 43.9
      },
      "v3_adjustment": {
        "hx_baseline": 0.7901,
        "ax_baseline": 1.5954,
        "hx_v3": 0.7822,
        "ax_v3": 1.616,
        "delta_total_lambda_pct": 0.53,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": -1.0,
          "away_discipline": 1.29
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 17.7,
          "draw": 25.4,
          "away": 56.9
        },
        "over_2_5_pct": 43.0,
        "btts_yes_pct": 43.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 18.1,
          "v3_pct": 17.7,
          "delta_pts": -0.46
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.7,
          "v3_pct": 25.4,
          "delta_pts": -0.27
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 56.2,
          "v3_pct": 56.9,
          "delta_pts": 0.72
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 43.9,
          "v3_pct": 43.8,
          "delta_pts": -0.07
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 56.1,
          "v3_pct": 56.2,
          "delta_pts": 0.07
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 69.2,
          "v3_pct": 69.5,
          "delta_pts": 0.27
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 30.8,
          "v3_pct": 30.5,
          "delta_pts": -0.27
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 42.6,
          "v3_pct": 43.0,
          "delta_pts": 0.33
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 57.4,
          "v3_pct": 57.0,
          "delta_pts": -0.33
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 21.8,
          "v3_pct": 22.1,
          "delta_pts": 0.26
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 78.2,
          "v3_pct": 77.9,
          "delta_pts": -0.26
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.76,
        "lambda_red_card": 0.3464,
        "prob_red_card_in_match_pct": 29.3,
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
        "fixture_id": "18",
        "event_name": "Iraque x Noruega",
        "home_team": "Iraq",
        "away_team": "Norway",
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
          "discipline_score": 0.8333,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 3.0,
          "red_per_match_combined": 0.3333,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.0694,
          "fouls_received_score": null,
          "penalty_team_score": 0.6943,
          "yellow_per_match_combined": 0.9167,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "interaction": {
          "match_card_risk": null,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021488",
          "event_name": "Iraq vs. Norway",
          "kickoff": "16 June 2026, 19:00",
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
      "fixture_id": "19",
      "event_name": "Argentina x Argélia",
      "home_team": "Argentina",
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
      "fifa_result": {
        "match_id_fifa": "400021496",
        "event_name": "Argentina vs. Algeria",
        "kickoff": "16 June 2026, 22:00",
        "referee": "",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Kansas City",
        "location": "Kansas City Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.3349,
        "ax": 0.6898,
        "1x2_pct": {
          "home": 51.9,
          "draw": 29.2,
          "away": 18.9
        },
        "over_2_5_pct": 33.0,
        "btts_yes_pct": 37.1
      },
      "v3_adjustment": {
        "hx_baseline": 1.3349,
        "ax_baseline": 0.6898,
        "hx_v3": 1.3388,
        "ax_v3": 0.6976,
        "delta_total_lambda_pct": 0.58,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.29,
          "away_discipline": 1.13
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 51.8,
          "draw": 29.1,
          "away": 19.1
        },
        "over_2_5_pct": 33.3,
        "btts_yes_pct": 37.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 51.9,
          "v3_pct": 51.8,
          "delta_pts": -0.1
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.2,
          "v3_pct": 29.1,
          "delta_pts": -0.07
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 18.9,
          "v3_pct": 19.1,
          "delta_pts": 0.17
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 37.1,
          "v3_pct": 37.4,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 62.9,
          "v3_pct": 62.6,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 60.4,
          "v3_pct": 60.7,
          "delta_pts": 0.31
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 39.6,
          "v3_pct": 39.3,
          "delta_pts": -0.31
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 33.0,
          "v3_pct": 33.3,
          "delta_pts": 0.32
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 67.0,
          "v3_pct": 66.7,
          "delta_pts": -0.32
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 14.7,
          "v3_pct": 14.9,
          "delta_pts": 0.21
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 85.3,
          "v3_pct": 85.0,
          "delta_pts": -0.21
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.44,
        "lambda_red_card": 0.2249,
        "prob_red_card_in_match_pct": 20.1,
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
        "fixture_id": "19",
        "event_name": "Argentina x Argélia",
        "home_team": "Argentina",
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
          "discipline_score": 0.4029,
          "fouls_received_score": 0.8857,
          "penalty_team_score": 0.4467,
          "yellow_per_match_combined": 2.0546,
          "red_per_match_combined": 0.0248,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
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
        "fifa_result": {
          "match_id_fifa": "400021496",
          "event_name": "Argentina vs. Algeria",
          "kickoff": "16 June 2026, 22:00",
          "referee": "",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Kansas City",
          "location": "Kansas City Stadium",
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
      "fixture_id": "20",
      "event_name": "Áustria x Jordânia",
      "home_team": "Austria",
      "away_team": "Jordan",
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
        "hx": 1.5962,
        "ax": 1.0507,
        "1x2_pct": {
          "home": 49.7,
          "draw": 25.7,
          "away": 24.6
        },
        "over_2_5_pct": 49.3,
        "btts_yes_pct": 52.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.5962,
        "ax_baseline": 1.0507,
        "hx_v3": 1.6157,
        "ax_v3": 1.0507,
        "delta_total_lambda_pct": 0.74,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.22,
          "away_discipline": 0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 50.2,
          "draw": 25.5,
          "away": 24.3
        },
        "over_2_5_pct": 49.8,
        "btts_yes_pct": 52.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 49.7,
          "v3_pct": 50.2,
          "delta_pts": 0.49
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.7,
          "v3_pct": 25.5,
          "delta_pts": -0.19
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 24.6,
          "v3_pct": 24.3,
          "delta_pts": -0.3
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 52.2,
          "v3_pct": 52.5,
          "delta_pts": 0.25
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 47.8,
          "v3_pct": 47.5,
          "delta_pts": -0.25
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 74.5,
          "v3_pct": 74.9,
          "delta_pts": 0.36
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 25.5,
          "v3_pct": 25.1,
          "delta_pts": -0.36
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 49.3,
          "v3_pct": 49.8,
          "delta_pts": 0.48
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 50.7,
          "v3_pct": 50.2,
          "delta_pts": -0.48
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 27.4,
          "v3_pct": 27.9,
          "delta_pts": 0.43
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 72.6,
          "v3_pct": 72.1,
          "delta_pts": -0.43
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.1,
        "lambda_red_card": 0.2743,
        "prob_red_card_in_match_pct": 24.0,
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
        "fixture_id": "20",
        "event_name": "Áustria x Jordânia",
        "home_team": "Austria",
        "away_team": "Jordan",
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
          "discipline_score": 0.092,
          "fouls_received_score": null,
          "penalty_team_score": 0.3447,
          "yellow_per_match_combined": 0.7931,
          "red_per_match_combined": 0.0345,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
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
      "fixture_id": "21",
      "event_name": "Portugal x RD Congo",
      "home_team": "Portugal",
      "away_team": "DR Congo",
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
        "hx": 1.2164,
        "ax": 0.705,
        "1x2_pct": {
          "home": 48.0,
          "draw": 30.9,
          "away": 21.1
        },
        "over_2_5_pct": 30.2,
        "btts_yes_pct": 36.0
      },
      "v3_adjustment": {
        "hx_baseline": 1.2164,
        "ax_baseline": 0.705,
        "hx_v3": 1.2267,
        "ax_v3": 0.705,
        "delta_total_lambda_pct": 0.54,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.85,
          "away_discipline": 0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 48.3,
          "draw": 30.8,
          "away": 20.9
        },
        "over_2_5_pct": 30.5,
        "btts_yes_pct": 36.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 48.0,
          "v3_pct": 48.3,
          "delta_pts": 0.31
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 30.9,
          "v3_pct": 30.8,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 21.1,
          "v3_pct": 20.9,
          "delta_pts": -0.16
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 36.0,
          "v3_pct": 36.1,
          "delta_pts": 0.15
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 64.0,
          "v3_pct": 63.9,
          "delta_pts": -0.15
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 57.6,
          "v3_pct": 57.9,
          "delta_pts": 0.29
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 42.4,
          "v3_pct": 42.1,
          "delta_pts": -0.29
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 30.2,
          "v3_pct": 30.5,
          "delta_pts": 0.28
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 69.8,
          "v3_pct": 69.5,
          "delta_pts": -0.28
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 12.9,
          "v3_pct": 13.1,
          "delta_pts": 0.18
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 87.1,
          "v3_pct": 86.9,
          "delta_pts": -0.18
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.35,
        "lambda_red_card": 0.2707,
        "prob_red_card_in_match_pct": 23.7,
        "lambda_penalty": 0.2048,
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
        "fixture_id": "21",
        "event_name": "Portugal x RD Congo",
        "home_team": "Portugal",
        "away_team": "DR Congo",
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
          "discipline_score": 0.2173,
          "fouls_received_score": 0.58,
          "penalty_team_score": 0.857,
          "yellow_per_match_combined": 1.3029,
          "red_per_match_combined": 0.0257,
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
      "fixture_id": "22",
      "event_name": "Inglaterra x Croácia",
      "home_team": "England",
      "away_team": "Croatia",
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
        "hx": 1.2728,
        "ax": 0.7827,
        "1x2_pct": {
          "home": 47.6,
          "draw": 29.9,
          "away": 22.5
        },
        "over_2_5_pct": 33.8,
        "btts_yes_pct": 39.5
      },
      "v3_adjustment": {
        "hx_baseline": 1.2728,
        "ax_baseline": 0.7827,
        "hx_v3": 1.2883,
        "ax_v3": 0.788,
        "delta_total_lambda_pct": 1.01,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.22,
          "away_discipline": 0.67
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 47.9,
          "draw": 29.7,
          "away": 22.4
        },
        "over_2_5_pct": 34.4,
        "btts_yes_pct": 39.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 47.6,
          "v3_pct": 47.9,
          "delta_pts": 0.31
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.9,
          "v3_pct": 29.7,
          "delta_pts": -0.22
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 22.5,
          "v3_pct": 22.4,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 39.5,
          "v3_pct": 39.9,
          "delta_pts": 0.41
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 60.5,
          "v3_pct": 60.1,
          "delta_pts": -0.41
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 61.3,
          "v3_pct": 61.8,
          "delta_pts": 0.54
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 38.7,
          "v3_pct": 38.2,
          "delta_pts": -0.54
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 33.8,
          "v3_pct": 34.4,
          "delta_pts": 0.56
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 66.2,
          "v3_pct": 65.6,
          "delta_pts": -0.56
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 15.3,
          "v3_pct": 15.7,
          "delta_pts": 0.39
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 84.7,
          "v3_pct": 84.3,
          "delta_pts": -0.39
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.69,
        "lambda_red_card": 0.227,
        "prob_red_card_in_match_pct": 20.3,
        "lambda_penalty": 0.2098,
        "prob_penalty_in_match_pct": 18.9,
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
        "fixture_id": "22",
        "event_name": "Inglaterra x Croácia",
        "home_team": "England",
        "away_team": "Croatia",
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
          "discipline_score": 0.0942,
          "fouls_received_score": 0.62,
          "penalty_team_score": 0.6667,
          "yellow_per_match_combined": 0.395,
          "red_per_match_combined": 0.009,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.2764,
          "fouls_received_score": 0.5429,
          "penalty_team_score": 0.2223,
          "yellow_per_match_combined": 1.38,
          "red_per_match_combined": 0.02,
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
      "fixture_id": "23",
      "event_name": "Gana x Panamá",
      "home_team": "Ghana",
      "away_team": "Panama",
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
        "hx": 1.1781,
        "ax": 1.3436,
        "1x2_pct": {
          "home": 32.3,
          "draw": 27.5,
          "away": 40.2
        },
        "over_2_5_pct": 46.2,
        "btts_yes_pct": 51.5
      },
      "v3_adjustment": {
        "hx_baseline": 1.1781,
        "ax_baseline": 1.3436,
        "hx_v3": 1.1794,
        "ax_v3": 1.3436,
        "delta_total_lambda_pct": 0.05,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.11,
          "away_discipline": -0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 32.4,
          "draw": 27.5,
          "away": 40.1
        },
        "over_2_5_pct": 46.2,
        "btts_yes_pct": 51.6
      },
      "v3_diffs": [],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 4.87,
        "lambda_red_card": 0.2121,
        "prob_red_card_in_match_pct": 19.1,
        "lambda_penalty": 0.198,
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
        "fixture_id": "23",
        "event_name": "Gana x Panamá",
        "home_team": "Ghana",
        "away_team": "Panama",
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
          "discipline_score": 0.4644,
          "fouls_received_score": 0.4667,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.4792,
          "red_per_match_combined": 0.0,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.5,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 3.6667,
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
      "fixture_id": "24",
      "event_name": "Uzbequistão x Colômbia",
      "home_team": "Uzbekistan",
      "away_team": "Colombia",
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
        "hx": 0.8124,
        "ax": 1.2422,
        "1x2_pct": {
          "home": 23.9,
          "draw": 30.2,
          "away": 45.9
        },
        "over_2_5_pct": 33.8,
        "btts_yes_pct": 39.9
      },
      "v3_adjustment": {
        "hx_baseline": 0.8124,
        "ax_baseline": 1.2422,
        "hx_v3": 0.8124,
        "ax_v3": 1.2522,
        "delta_total_lambda_pct": 0.48,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.0,
          "away_discipline": 0.8
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 23.7,
          "draw": 30.0,
          "away": 46.2
        },
        "over_2_5_pct": 34.1,
        "btts_yes_pct": 40.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 23.9,
          "v3_pct": 23.7,
          "delta_pts": -0.16
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 30.2,
          "v3_pct": 30.0,
          "delta_pts": -0.13
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 45.9,
          "v3_pct": 46.2,
          "delta_pts": 0.29
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 39.9,
          "v3_pct": 40.1,
          "delta_pts": 0.16
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 60.1,
          "v3_pct": 59.9,
          "delta_pts": -0.16
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 61.2,
          "v3_pct": 61.5,
          "delta_pts": 0.26
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 38.8,
          "v3_pct": 38.5,
          "delta_pts": -0.26
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 33.8,
          "v3_pct": 34.1,
          "delta_pts": 0.27
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 66.2,
          "v3_pct": 65.9,
          "delta_pts": -0.27
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 15.3,
          "v3_pct": 15.5,
          "delta_pts": 0.19
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 84.7,
          "v3_pct": 84.5,
          "delta_pts": -0.19
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.39,
        "lambda_red_card": 0.2881,
        "prob_red_card_in_match_pct": 25.0,
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
        "fixture_id": "24",
        "event_name": "Uzbequistão x Colômbia",
        "home_team": "Uzbekistan",
        "away_team": "Colombia",
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
          "discipline_score": 0.2328,
          "fouls_received_score": null,
          "penalty_team_score": 0.3447,
          "yellow_per_match_combined": 1.3793,
          "red_per_match_combined": 0.069,
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
      "fixture_id": "25",
      "event_name": "República Tcheca x África do Sul",
      "home_team": "Czech Republic",
      "away_team": "South Africa",
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
        "hx": 1.1305,
        "ax": 1.1347,
        "1x2_pct": {
          "home": 35.2,
          "draw": 29.4,
          "away": 35.4
        },
        "over_2_5_pct": 39.5,
        "btts_yes_pct": 46.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.1305,
        "ax_baseline": 1.1347,
        "hx_v3": 1.1248,
        "ax_v3": 1.1342,
        "delta_total_lambda_pct": -0.27,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": -0.5,
          "away_discipline": -0.04
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 35.0,
          "draw": 29.5,
          "away": 35.5
        },
        "over_2_5_pct": 39.3,
        "btts_yes_pct": 46.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 35.2,
          "v3_pct": 35.0,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 35.4,
          "v3_pct": 35.5,
          "delta_pts": 0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 46.3,
          "v3_pct": 46.2,
          "delta_pts": -0.13
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 53.7,
          "v3_pct": 53.8,
          "delta_pts": 0.13
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 66.5,
          "v3_pct": 66.4,
          "delta_pts": -0.15
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 33.5,
          "v3_pct": 33.6,
          "delta_pts": 0.15
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 39.5,
          "v3_pct": 39.3,
          "delta_pts": -0.16
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 60.5,
          "v3_pct": 60.7,
          "delta_pts": 0.17
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 19.4,
          "v3_pct": 19.2,
          "delta_pts": -0.12
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 80.6,
          "v3_pct": 80.8,
          "delta_pts": 0.12
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.97,
        "lambda_red_card": 0.3969,
        "prob_red_card_in_match_pct": 32.8,
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
        "fixture_id": "25",
        "event_name": "República Tcheca x África do Sul",
        "home_team": "Czech Republic",
        "away_team": "South Africa",
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
          "discipline_score": 0.5139,
          "fouls_received_score": null,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.3333,
          "red_per_match_combined": 0.1667,
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
      "fixture_id": "26",
      "event_name": "Suíça x Bósnia & Herzegovina",
      "home_team": "Switzerland",
      "away_team": "Bosnia and Herzegovina",
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
        "hx": 1.9996,
        "ax": 0.8012,
        "1x2_pct": {
          "home": 65.1,
          "draw": 21.1,
          "away": 13.8
        },
        "over_2_5_pct": 53.1,
        "btts_yes_pct": 47.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.9996,
        "ax_baseline": 0.8012,
        "hx_v3": 2.0094,
        "ax_v3": 0.8112,
        "delta_total_lambda_pct": 0.71,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.49,
          "away_discipline": 1.25
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 65.1,
          "draw": 21.0,
          "away": 13.9
        },
        "over_2_5_pct": 53.5,
        "btts_yes_pct": 48.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 21.1,
          "v3_pct": 21.0,
          "delta_pts": -0.06
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 13.8,
          "v3_pct": 13.9,
          "delta_pts": 0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 47.9,
          "v3_pct": 48.4,
          "delta_pts": 0.46
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 52.0,
          "v3_pct": 51.6,
          "delta_pts": -0.46
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.2,
          "v3_pct": 77.5,
          "delta_pts": 0.33
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.8,
          "v3_pct": 22.5,
          "delta_pts": -0.34
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 53.1,
          "v3_pct": 53.5,
          "delta_pts": 0.47
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 46.9,
          "v3_pct": 46.5,
          "delta_pts": -0.47
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 30.8,
          "v3_pct": 31.3,
          "delta_pts": 0.44
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 69.2,
          "v3_pct": 68.7,
          "delta_pts": -0.44
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.27,
        "lambda_red_card": 0.2191,
        "prob_red_card_in_match_pct": 19.7,
        "lambda_penalty": 0.197,
        "prob_penalty_in_match_pct": 17.9,
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
        "fixture_id": "26",
        "event_name": "Suíça x Bósnia & Herzegovina",
        "home_team": "Switzerland",
        "away_team": "Bosnia and Herzegovina",
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
      "fixture_id": "27",
      "event_name": "Canadá x Qatar",
      "home_team": "Canada",
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
        "hx": 1.7403,
        "ax": 0.787,
        "1x2_pct": {
          "home": 59.8,
          "draw": 24.0,
          "away": 16.3
        },
        "over_2_5_pct": 46.3,
        "btts_yes_pct": 45.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.7403,
        "ax_baseline": 0.787,
        "hx_v3": 1.7511,
        "ax_v3": 0.7922,
        "delta_total_lambda_pct": 0.63,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.62,
          "away_discipline": 0.66
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 59.9,
          "draw": 23.8,
          "away": 16.3
        },
        "over_2_5_pct": 46.7,
        "btts_yes_pct": 45.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 59.8,
          "v3_pct": 59.9,
          "delta_pts": 0.12
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.0,
          "v3_pct": 23.8,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 45.2,
          "v3_pct": 45.5,
          "delta_pts": 0.3
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 54.8,
          "v3_pct": 54.5,
          "delta_pts": -0.3
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.2,
          "v3_pct": 72.5,
          "delta_pts": 0.32
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.8,
          "v3_pct": 27.5,
          "delta_pts": -0.32
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 46.3,
          "v3_pct": 46.7,
          "delta_pts": 0.41
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 53.7,
          "v3_pct": 53.3,
          "delta_pts": -0.41
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.8,
          "v3_pct": 25.2,
          "delta_pts": 0.35
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 75.2,
          "v3_pct": 74.8,
          "delta_pts": -0.35
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 4.08,
        "lambda_red_card": 0.2121,
        "prob_red_card_in_match_pct": 19.1,
        "lambda_penalty": 0.212,
        "prob_penalty_in_match_pct": 19.1,
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
        "fixture_id": "27",
        "event_name": "Canadá x Qatar",
        "home_team": "Canada",
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
          "discipline_score": 0.2923,
          "fouls_received_score": 0.4667,
          "penalty_team_score": 0.202,
          "yellow_per_match_combined": 2.2303,
          "red_per_match_combined": 0.0,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
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
      "fixture_id": "28",
      "event_name": "México x República da Coreia",
      "home_team": "Mexico",
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
        "hx": 1.1489,
        "ax": 1.0028,
        "1x2_pct": {
          "home": 38.6,
          "draw": 30.2,
          "away": 31.2
        },
        "over_2_5_pct": 36.4,
        "btts_yes_pct": 43.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.1489,
        "ax_baseline": 1.0028,
        "hx_v3": 1.1495,
        "ax_v3": 1.0106,
        "delta_total_lambda_pct": 0.39,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.06,
          "away_discipline": 0.78
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 38.4,
          "draw": 30.2,
          "away": 31.4
        },
        "over_2_5_pct": 36.7,
        "btts_yes_pct": 43.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 38.6,
          "v3_pct": 38.4,
          "delta_pts": -0.16
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 30.2,
          "v3_pct": 30.2,
          "delta_pts": -0.06
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 31.2,
          "v3_pct": 31.4,
          "delta_pts": 0.22
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 43.6,
          "v3_pct": 43.9,
          "delta_pts": 0.21
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 56.4,
          "v3_pct": 56.1,
          "delta_pts": -0.21
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 63.8,
          "v3_pct": 64.0,
          "delta_pts": 0.21
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 36.2,
          "v3_pct": 36.0,
          "delta_pts": -0.21
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 36.4,
          "v3_pct": 36.7,
          "delta_pts": 0.23
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 63.6,
          "v3_pct": 63.3,
          "delta_pts": -0.23
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 17.1,
          "v3_pct": 17.3,
          "delta_pts": 0.16
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 82.9,
          "v3_pct": 82.7,
          "delta_pts": -0.16
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.63,
        "lambda_red_card": 0.2221,
        "prob_red_card_in_match_pct": 19.9,
        "lambda_penalty": 0.1985,
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
        "fixture_id": "28",
        "event_name": "México x República da Coreia",
        "home_team": "Mexico",
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
          "discipline_score": 0.4812,
          "fouls_received_score": 0.9,
          "penalty_team_score": 0.483,
          "yellow_per_match_combined": 2.0333,
          "red_per_match_combined": 0.0131,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
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
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.995,
        "ax": 1.3667,
        "1x2_pct": {
          "home": 26.9,
          "draw": 28.1,
          "away": 45.0
        },
        "over_2_5_pct": 42.0,
        "btts_yes_pct": 47.3
      },
      "v3_adjustment": {
        "hx_baseline": 0.995,
        "ax_baseline": 1.3667,
        "hx_v3": 1.0041,
        "ax_v3": 1.3741,
        "delta_total_lambda_pct": 0.7,
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
          "home": 27.1,
          "draw": 28.0,
          "away": 45.0
        },
        "over_2_5_pct": 42.5,
        "btts_yes_pct": 47.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 26.9,
          "v3_pct": 27.1,
          "delta_pts": 0.12
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.1,
          "v3_pct": 28.0,
          "delta_pts": -0.1
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 47.3,
          "v3_pct": 47.7,
          "delta_pts": 0.37
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 52.7,
          "v3_pct": 52.3,
          "delta_pts": -0.37
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 68.7,
          "v3_pct": 69.1,
          "delta_pts": 0.37
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 31.3,
          "v3_pct": 30.9,
          "delta_pts": -0.36
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 42.0,
          "v3_pct": 42.5,
          "delta_pts": 0.43
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 58.0,
          "v3_pct": 57.5,
          "delta_pts": -0.43
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 21.3,
          "v3_pct": 21.7,
          "delta_pts": 0.34
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 78.7,
          "v3_pct": 78.3,
          "delta_pts": -0.34
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
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.5318,
        "ax": 1.5768,
        "1x2_pct": {
          "home": 11.9,
          "draw": 25.3,
          "away": 62.8
        },
        "over_2_5_pct": 35.3,
        "btts_yes_pct": 33.0
      },
      "v3_adjustment": {
        "hx_baseline": 0.5318,
        "ax_baseline": 1.5768,
        "hx_v3": 0.538,
        "ax_v3": 1.5828,
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
          "home": 12.0,
          "draw": 25.2,
          "away": 62.8
        },
        "over_2_5_pct": 35.6,
        "btts_yes_pct": 33.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 11.9,
          "v3_pct": 12.0,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.3,
          "v3_pct": 25.2,
          "delta_pts": -0.06
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 33.0,
          "v3_pct": 33.4,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 67.0,
          "v3_pct": 66.6,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 62.6,
          "v3_pct": 62.9,
          "delta_pts": 0.31
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 37.4,
          "v3_pct": 37.1,
          "delta_pts": -0.31
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
          "v3_pct": 16.5,
          "delta_pts": 0.23
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 83.7,
          "v3_pct": 83.5,
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
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.1906,
        "ax": 0.9828,
        "1x2_pct": {
          "home": 64.6,
          "draw": 19.9,
          "away": 15.5
        },
        "over_2_5_pct": 61.5,
        "btts_yes_pct": 55.8
      },
      "v3_adjustment": {
        "hx_baseline": 2.1906,
        "ax_baseline": 0.9828,
        "hx_v3": 2.2082,
        "ax_v3": 0.9951,
        "delta_total_lambda_pct": 0.94,
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
          "home": 64.6,
          "draw": 19.8,
          "away": 15.6
        },
        "over_2_5_pct": 62.1,
        "btts_yes_pct": 56.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 64.6,
          "v3_pct": 64.6,
          "delta_pts": 0.06
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 19.9,
          "v3_pct": 19.8,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 15.5,
          "v3_pct": 15.6,
          "delta_pts": 0.05
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 55.8,
          "v3_pct": 56.4,
          "delta_pts": 0.52
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 44.2,
          "v3_pct": 43.6,
          "delta_pts": -0.52
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 82.8,
          "v3_pct": 83.2,
          "delta_pts": 0.39
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 17.2,
          "v3_pct": 16.8,
          "delta_pts": -0.39
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 61.5,
          "v3_pct": 62.1,
          "delta_pts": 0.62
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 38.5,
          "v3_pct": 37.9,
          "delta_pts": -0.62
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 39.2,
          "v3_pct": 39.8,
          "delta_pts": 0.66
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 60.8,
          "v3_pct": 60.2,
          "delta_pts": -0.66
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
        "hx": 1.176,
        "ax": 1.1147,
        "1x2_pct": {
          "home": 36.9,
          "draw": 29.2,
          "away": 33.9
        },
        "over_2_5_pct": 40.1,
        "btts_yes_pct": 46.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.176,
        "ax_baseline": 1.1147,
        "hx_v3": 1.1816,
        "ax_v3": 1.1244,
        "delta_total_lambda_pct": 0.67,
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
          "home": 36.9,
          "draw": 29.1,
          "away": 34.0
        },
        "over_2_5_pct": 40.6,
        "btts_yes_pct": 47.2
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
          "baseline_pct": 33.9,
          "v3_pct": 34.0,
          "delta_pts": 0.16
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 46.9,
          "v3_pct": 47.2,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 53.1,
          "v3_pct": 52.8,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 67.1,
          "v3_pct": 67.5,
          "delta_pts": 0.35
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 32.9,
          "v3_pct": 32.6,
          "delta_pts": -0.35
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 40.1,
          "v3_pct": 40.6,
          "delta_pts": 0.41
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 59.9,
          "v3_pct": 59.4,
          "delta_pts": -0.41
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 19.9,
          "v3_pct": 20.2,
          "delta_pts": 0.31
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 80.1,
          "v3_pct": 79.8,
          "delta_pts": -0.31
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
        "hx": 2.2771,
        "ax": 1.0779,
        "1x2_pct": {
          "home": 64.1,
          "draw": 19.5,
          "away": 16.4
        },
        "over_2_5_pct": 65.1,
        "btts_yes_pct": 59.5
      },
      "v3_adjustment": {
        "hx_baseline": 2.2771,
        "ax_baseline": 1.0779,
        "hx_v3": 2.2682,
        "ax_v3": 1.0911,
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
          "home": 63.6,
          "draw": 19.6,
          "away": 16.8
        },
        "over_2_5_pct": 65.2,
        "btts_yes_pct": 59.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 64.1,
          "v3_pct": 63.6,
          "delta_pts": -0.47
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 19.5,
          "v3_pct": 19.6,
          "delta_pts": 0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 16.4,
          "v3_pct": 16.8,
          "delta_pts": 0.35
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 59.5,
          "v3_pct": 59.8,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 40.5,
          "v3_pct": 40.2,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 85.1,
          "v3_pct": 85.1,
          "delta_pts": 0.05
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 14.9,
          "v3_pct": 14.9,
          "delta_pts": -0.05
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 65.1,
          "v3_pct": 65.2,
          "delta_pts": 0.09
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 34.9,
          "v3_pct": 34.8,
          "delta_pts": -0.09
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 43.2,
          "v3_pct": 43.3,
          "delta_pts": 0.1
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 56.8,
          "v3_pct": 56.7,
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
        "hx": 1.2642,
        "ax": 1.0518,
        "1x2_pct": {
          "home": 40.8,
          "draw": 28.8,
          "away": 30.4
        },
        "over_2_5_pct": 40.8,
        "btts_yes_pct": 47.1
      },
      "v3_adjustment": {
        "hx_baseline": 1.2642,
        "ax_baseline": 1.0518,
        "hx_v3": 1.2798,
        "ax_v3": 1.0579,
        "delta_total_lambda_pct": 0.94,
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
          "home": 41.1,
          "draw": 28.7,
          "away": 30.2
        },
        "over_2_5_pct": 41.4,
        "btts_yes_pct": 47.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 40.8,
          "v3_pct": 41.1,
          "delta_pts": 0.3
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.8,
          "v3_pct": 28.7,
          "delta_pts": -0.18
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 30.4,
          "v3_pct": 30.2,
          "delta_pts": -0.12
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 47.1,
          "v3_pct": 47.5,
          "delta_pts": 0.44
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 52.9,
          "v3_pct": 52.5,
          "delta_pts": -0.44
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 67.7,
          "v3_pct": 68.2,
          "delta_pts": 0.49
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 32.3,
          "v3_pct": 31.8,
          "delta_pts": -0.49
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 40.8,
          "v3_pct": 41.4,
          "delta_pts": 0.57
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 59.2,
          "v3_pct": 58.6,
          "delta_pts": -0.57
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 20.4,
          "v3_pct": 20.8,
          "delta_pts": 0.44
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 79.6,
          "v3_pct": 79.2,
          "delta_pts": -0.44
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
        "hx": 1.2691,
        "ax": 0.5661,
        "1x2_pct": {
          "home": 53.4,
          "draw": 30.3,
          "away": 16.2
        },
        "over_2_5_pct": 27.9,
        "btts_yes_pct": 31.4
      },
      "v3_adjustment": {
        "hx_baseline": 1.2691,
        "ax_baseline": 0.5661,
        "hx_v3": 1.2726,
        "ax_v3": 0.5661,
        "delta_total_lambda_pct": 0.19,
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
          "home": 53.5,
          "draw": 30.3,
          "away": 16.2
        },
        "over_2_5_pct": 28.0,
        "btts_yes_pct": 31.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 53.4,
          "v3_pct": 53.5,
          "delta_pts": 0.1
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 30.3,
          "v3_pct": 30.3,
          "delta_pts": -0.06
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 55.1,
          "v3_pct": 55.2,
          "delta_pts": 0.1
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 44.9,
          "v3_pct": 44.8,
          "delta_pts": -0.1
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 27.9,
          "v3_pct": 28.0,
          "delta_pts": 0.09
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 72.1,
          "v3_pct": 72.0,
          "delta_pts": -0.09
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 11.4,
          "v3_pct": 11.5,
          "delta_pts": 0.06
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 88.6,
          "v3_pct": 88.5,
          "delta_pts": -0.06
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
        "hx": 0.6366,
        "ax": 1.4589,
        "1x2_pct": {
          "home": 15.9,
          "draw": 27.4,
          "away": 56.8
        },
        "over_2_5_pct": 34.9,
        "btts_yes_pct": 36.5
      },
      "v3_adjustment": {
        "hx_baseline": 0.6366,
        "ax_baseline": 1.4589,
        "hx_v3": 0.64,
        "ax_v3": 1.467,
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
          "home": 15.9,
          "draw": 27.2,
          "away": 56.9
        },
        "over_2_5_pct": 35.2,
        "btts_yes_pct": 36.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.4,
          "v3_pct": 27.2,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 56.8,
          "v3_pct": 56.9,
          "delta_pts": 0.12
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 36.5,
          "v3_pct": 36.7,
          "delta_pts": 0.23
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 63.5,
          "v3_pct": 63.3,
          "delta_pts": -0.23
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 62.3,
          "v3_pct": 62.6,
          "delta_pts": 0.3
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 37.7,
          "v3_pct": 37.4,
          "delta_pts": -0.3
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 34.9,
          "v3_pct": 35.2,
          "delta_pts": 0.31
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 65.1,
          "v3_pct": 64.8,
          "delta_pts": -0.31
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 16.1,
          "v3_pct": 16.3,
          "delta_pts": 0.22
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 84.0,
          "v3_pct": 83.7,
          "delta_pts": -0.22
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
        "hx": 1.833,
        "ax": 0.5945,
        "1x2_pct": {
          "home": 67.0,
          "draw": 22.0,
          "away": 11.1
        },
        "over_2_5_pct": 43.7,
        "btts_yes_pct": 37.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.833,
        "ax_baseline": 0.5945,
        "hx_v3": 1.8553,
        "ax_v3": 0.5913,
        "delta_total_lambda_pct": 0.79,
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
          "home": 67.5,
          "draw": 21.7,
          "away": 10.8
        },
        "over_2_5_pct": 44.2,
        "btts_yes_pct": 37.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 67.0,
          "v3_pct": 67.5,
          "delta_pts": 0.56
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 22.0,
          "v3_pct": 21.7,
          "delta_pts": -0.31
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 11.1,
          "v3_pct": 10.8,
          "delta_pts": -0.26
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 70.0,
          "v3_pct": 70.4,
          "delta_pts": 0.4
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 30.0,
          "v3_pct": 29.6,
          "delta_pts": -0.4
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 43.7,
          "v3_pct": 44.2,
          "delta_pts": 0.49
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 56.3,
          "v3_pct": 55.8,
          "delta_pts": -0.49
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 22.7,
          "v3_pct": 23.1,
          "delta_pts": 0.4
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 77.3,
          "v3_pct": 76.9,
          "delta_pts": -0.4
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
        "hx": 1.288,
        "ax": 1.2407,
        "1x2_pct": {
          "home": 37.3,
          "draw": 27.6,
          "away": 35.1
        },
        "over_2_5_pct": 46.4,
        "btts_yes_pct": 51.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.288,
        "ax_baseline": 1.2407,
        "hx_v3": 1.3001,
        "ax_v3": 1.2472,
        "delta_total_lambda_pct": 0.74,
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
          "home": 37.5,
          "draw": 27.5,
          "away": 35.0
        },
        "over_2_5_pct": 46.8,
        "btts_yes_pct": 52.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 37.3,
          "v3_pct": 37.5,
          "delta_pts": 0.19
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.6,
          "v3_pct": 27.5,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 35.1,
          "v3_pct": 35.0,
          "delta_pts": -0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 51.9,
          "v3_pct": 52.2,
          "delta_pts": 0.37
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 48.1,
          "v3_pct": 47.8,
          "delta_pts": -0.37
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.2,
          "v3_pct": 72.6,
          "delta_pts": 0.37
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.8,
          "v3_pct": 27.4,
          "delta_pts": -0.37
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 46.4,
          "v3_pct": 46.8,
          "delta_pts": 0.48
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 53.6,
          "v3_pct": 53.2,
          "delta_pts": -0.48
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.9,
          "v3_pct": 25.3,
          "delta_pts": 0.4
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 75.1,
          "v3_pct": 74.7,
          "delta_pts": -0.4
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
        "hx": 1.2285,
        "ax": 0.5954,
        "1x2_pct": {
          "home": 51.4,
          "draw": 31.0,
          "away": 17.6
        },
        "over_2_5_pct": 27.6,
        "btts_yes_pct": 32.1
      },
      "v3_adjustment": {
        "hx_baseline": 1.2285,
        "ax_baseline": 0.5954,
        "hx_v3": 1.2351,
        "ax_v3": 0.5954,
        "delta_total_lambda_pct": 0.36,
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
          "home": 51.6,
          "draw": 30.9,
          "away": 17.6
        },
        "over_2_5_pct": 27.8,
        "btts_yes_pct": 32.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 51.4,
          "v3_pct": 51.6,
          "delta_pts": 0.2
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 31.0,
          "v3_pct": 30.9,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 17.6,
          "v3_pct": 17.6,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 32.1,
          "v3_pct": 32.2,
          "delta_pts": 0.09
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 67.9,
          "v3_pct": 67.8,
          "delta_pts": -0.09
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 54.8,
          "v3_pct": 55.0,
          "delta_pts": 0.19
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 45.2,
          "v3_pct": 45.0,
          "delta_pts": -0.19
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 27.6,
          "v3_pct": 27.8,
          "delta_pts": 0.18
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 72.4,
          "v3_pct": 72.2,
          "delta_pts": -0.18
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 11.3,
          "v3_pct": 11.4,
          "delta_pts": 0.11
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 88.7,
          "v3_pct": 88.6,
          "delta_pts": -0.11
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
        "hx": 0.9939,
        "ax": 1.1171,
        "1x2_pct": {
          "home": 31.5,
          "draw": 30.6,
          "away": 37.9
        },
        "over_2_5_pct": 35.3,
        "btts_yes_pct": 42.8
      },
      "v3_adjustment": {
        "hx_baseline": 0.9939,
        "ax_baseline": 1.1171,
        "hx_v3": 1.0063,
        "ax_v3": 1.1295,
        "delta_total_lambda_pct": 1.17,
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
          "home": 31.7,
          "draw": 30.4,
          "away": 37.9
        },
        "over_2_5_pct": 36.0,
        "btts_yes_pct": 43.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 31.5,
          "v3_pct": 31.7,
          "delta_pts": 0.12
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 30.6,
          "v3_pct": 30.4,
          "delta_pts": -0.21
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 37.9,
          "v3_pct": 37.9,
          "delta_pts": 0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 42.8,
          "v3_pct": 43.3,
          "delta_pts": 0.56
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 57.2,
          "v3_pct": 56.7,
          "delta_pts": -0.56
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 62.7,
          "v3_pct": 63.4,
          "delta_pts": 0.63
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 37.3,
          "v3_pct": 36.6,
          "delta_pts": -0.63
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 35.3,
          "v3_pct": 36.0,
          "delta_pts": 0.67
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 64.7,
          "v3_pct": 64.0,
          "delta_pts": -0.67
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 16.3,
          "v3_pct": 16.8,
          "delta_pts": 0.47
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 83.7,
          "v3_pct": 83.2,
          "delta_pts": -0.47
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
        "hx": 1.4591,
        "ax": 0.6425,
        "1x2_pct": {
          "home": 56.6,
          "draw": 27.4,
          "away": 16.0
        },
        "over_2_5_pct": 35.1,
        "btts_yes_pct": 36.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.4591,
        "ax_baseline": 0.6425,
        "hx_v3": 1.4634,
        "ax_v3": 0.6504,
        "delta_total_lambda_pct": 0.58,
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
          "home": 56.5,
          "draw": 27.3,
          "away": 16.2
        },
        "over_2_5_pct": 35.4,
        "btts_yes_pct": 37.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 56.6,
          "v3_pct": 56.5,
          "delta_pts": -0.1
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.4,
          "v3_pct": 27.3,
          "delta_pts": -0.05
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 16.0,
          "v3_pct": 16.2,
          "delta_pts": 0.16
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 36.7,
          "v3_pct": 37.1,
          "delta_pts": 0.36
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 63.3,
          "v3_pct": 62.9,
          "delta_pts": -0.36
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 62.4,
          "v3_pct": 62.7,
          "delta_pts": 0.31
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 37.6,
          "v3_pct": 37.3,
          "delta_pts": -0.31
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 35.1,
          "v3_pct": 35.4,
          "delta_pts": 0.33
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 64.9,
          "v3_pct": 64.6,
          "delta_pts": -0.33
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 16.2,
          "v3_pct": 16.4,
          "delta_pts": 0.23
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 83.8,
          "v3_pct": 83.6,
          "delta_pts": -0.23
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
        "hx": 1.5607,
        "ax": 0.6554,
        "1x2_pct": {
          "home": 58.9,
          "draw": 25.9,
          "away": 15.2
        },
        "over_2_5_pct": 38.2,
        "btts_yes_pct": 38.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.5607,
        "ax_baseline": 0.6554,
        "hx_v3": 1.5773,
        "ax_v3": 0.6488,
        "delta_total_lambda_pct": 0.45,
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
          "home": 59.5,
          "draw": 25.7,
          "away": 14.8
        },
        "over_2_5_pct": 38.4,
        "btts_yes_pct": 38.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 58.9,
          "v3_pct": 59.5,
          "delta_pts": 0.6
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.9,
          "v3_pct": 25.7,
          "delta_pts": -0.25
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 15.2,
          "v3_pct": 14.8,
          "delta_pts": -0.35
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 38.3,
          "v3_pct": 38.2,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 61.7,
          "v3_pct": 61.8,
          "delta_pts": 0.11
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 65.3,
          "v3_pct": 65.5,
          "delta_pts": 0.24
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 34.7,
          "v3_pct": 34.5,
          "delta_pts": -0.24
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 38.2,
          "v3_pct": 38.4,
          "delta_pts": 0.27
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 61.8,
          "v3_pct": 61.6,
          "delta_pts": -0.27
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 18.4,
          "v3_pct": 18.6,
          "delta_pts": 0.2
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 81.6,
          "v3_pct": 81.4,
          "delta_pts": -0.2
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
        "hx": 1.2572,
        "ax": 1.3114,
        "1x2_pct": {
          "home": 35.1,
          "draw": 27.3,
          "away": 37.6
        },
        "over_2_5_pct": 47.4,
        "btts_yes_pct": 52.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.2572,
        "ax_baseline": 1.3114,
        "hx_v3": 1.2734,
        "ax_v3": 1.3189,
        "delta_total_lambda_pct": 0.92,
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
          "home": 35.3,
          "draw": 27.2,
          "away": 37.5
        },
        "over_2_5_pct": 48.0,
        "btts_yes_pct": 53.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 35.1,
          "v3_pct": 35.3,
          "delta_pts": 0.28
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.3,
          "v3_pct": 27.2,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 37.6,
          "v3_pct": 37.5,
          "delta_pts": -0.14
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 52.7,
          "v3_pct": 53.1,
          "delta_pts": 0.48
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 47.3,
          "v3_pct": 46.9,
          "delta_pts": -0.48
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 73.0,
          "v3_pct": 73.5,
          "delta_pts": 0.46
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.0,
          "v3_pct": 26.5,
          "delta_pts": -0.46
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 47.4,
          "v3_pct": 48.0,
          "delta_pts": 0.6
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 52.6,
          "v3_pct": 52.0,
          "delta_pts": -0.6
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 25.7,
          "v3_pct": 26.2,
          "delta_pts": 0.51
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 74.3,
          "v3_pct": 73.8,
          "delta_pts": -0.51
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
        "hx": 0.9612,
        "ax": 1.7135,
        "1x2_pct": {
          "home": 20.7,
          "draw": 24.6,
          "away": 54.7
        },
        "over_2_5_pct": 50.0,
        "btts_yes_pct": 51.0
      },
      "v3_adjustment": {
        "hx_baseline": 0.9612,
        "ax_baseline": 1.7135,
        "hx_v3": 0.9612,
        "ax_v3": 1.7329,
        "delta_total_lambda_pct": 0.73,
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
          "home": 20.5,
          "draw": 24.3,
          "away": 55.2
        },
        "over_2_5_pct": 50.5,
        "btts_yes_pct": 51.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 20.7,
          "v3_pct": 20.5,
          "delta_pts": -0.26
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.6,
          "v3_pct": 24.3,
          "delta_pts": -0.2
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 54.7,
          "v3_pct": 55.2,
          "delta_pts": 0.46
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 51.0,
          "v3_pct": 51.2,
          "delta_pts": 0.21
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 49.0,
          "v3_pct": 48.8,
          "delta_pts": -0.21
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.0,
          "v3_pct": 75.4,
          "delta_pts": 0.35
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 25.0,
          "v3_pct": 24.6,
          "delta_pts": -0.35
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 50.0,
          "v3_pct": 50.5,
          "delta_pts": 0.48
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 50.0,
          "v3_pct": 49.5,
          "delta_pts": -0.48
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 28.0,
          "v3_pct": 28.5,
          "delta_pts": 0.43
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 72.0,
          "v3_pct": 71.5,
          "delta_pts": -0.43
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
    },
    {
      "fixture_id": "45",
      "event_name": "Portugal x Uzbequistão",
      "home_team": "Portugal",
      "away_team": "Uzbekistan",
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
        "hx": 1.3328,
        "ax": 0.819,
        "1x2_pct": {
          "home": 48.4,
          "draw": 29.0,
          "away": 22.6
        },
        "over_2_5_pct": 36.4,
        "btts_yes_pct": 41.5
      },
      "v3_adjustment": {
        "hx_baseline": 1.3328,
        "ax_baseline": 0.819,
        "hx_v3": 1.3441,
        "ax_v3": 0.819,
        "delta_total_lambda_pct": 0.53,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.85,
          "away_discipline": 0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 48.7,
          "draw": 28.9,
          "away": 22.4
        },
        "over_2_5_pct": 36.7,
        "btts_yes_pct": 41.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 48.4,
          "v3_pct": 48.7,
          "delta_pts": 0.32
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.0,
          "v3_pct": 28.9,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 22.6,
          "v3_pct": 22.4,
          "delta_pts": -0.18
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 41.5,
          "v3_pct": 41.7,
          "delta_pts": 0.17
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 58.5,
          "v3_pct": 58.3,
          "delta_pts": -0.17
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 63.7,
          "v3_pct": 64.0,
          "delta_pts": 0.28
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 36.3,
          "v3_pct": 36.0,
          "delta_pts": -0.28
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 36.4,
          "v3_pct": 36.7,
          "delta_pts": 0.31
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 63.6,
          "v3_pct": 63.3,
          "delta_pts": -0.31
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 17.1,
          "v3_pct": 17.3,
          "delta_pts": 0.22
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 82.9,
          "v3_pct": 82.7,
          "delta_pts": -0.22
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.35,
        "lambda_red_card": 0.2707,
        "prob_red_card_in_match_pct": 23.7,
        "lambda_penalty": 0.2048,
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
        "fixture_id": "45",
        "event_name": "Portugal x Uzbequistão",
        "home_team": "Portugal",
        "away_team": "Uzbekistan",
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
          "discipline_score": 0.2173,
          "fouls_received_score": 0.58,
          "penalty_team_score": 0.857,
          "yellow_per_match_combined": 1.3029,
          "red_per_match_combined": 0.0257,
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
      "fixture_id": "46",
      "event_name": "Inglaterra x Gana",
      "home_team": "England",
      "away_team": "Ghana",
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
        "hx": 1.8191,
        "ax": 0.5457,
        "1x2_pct": {
          "home": 68.0,
          "draw": 21.9,
          "away": 10.1
        },
        "over_2_5_pct": 42.1,
        "btts_yes_pct": 35.5
      },
      "v3_adjustment": {
        "hx_baseline": 1.8191,
        "ax_baseline": 0.5457,
        "hx_v3": 1.8412,
        "ax_v3": 0.5463,
        "delta_total_lambda_pct": 0.96,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.22,
          "away_discipline": 0.11
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 68.4,
          "draw": 21.6,
          "away": 10.0
        },
        "over_2_5_pct": 42.7,
        "btts_yes_pct": 35.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 68.0,
          "v3_pct": 68.4,
          "delta_pts": 0.45
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 21.9,
          "v3_pct": 21.6,
          "delta_pts": -0.29
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 10.1,
          "v3_pct": 10.0,
          "delta_pts": -0.16
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 35.5,
          "v3_pct": 35.7,
          "delta_pts": 0.18
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 64.5,
          "v3_pct": 64.3,
          "delta_pts": -0.18
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 68.7,
          "v3_pct": 69.2,
          "delta_pts": 0.5
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 31.3,
          "v3_pct": 30.8,
          "delta_pts": -0.5
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 42.1,
          "v3_pct": 42.7,
          "delta_pts": 0.59
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 57.9,
          "v3_pct": 57.3,
          "delta_pts": -0.59
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 21.4,
          "v3_pct": 21.9,
          "delta_pts": 0.47
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 78.6,
          "v3_pct": 78.1,
          "delta_pts": -0.47
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.24,
        "lambda_red_card": 0.2169,
        "prob_red_card_in_match_pct": 19.5,
        "lambda_penalty": 0.2052,
        "prob_penalty_in_match_pct": 18.6,
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
        "fixture_id": "46",
        "event_name": "Inglaterra x Gana",
        "home_team": "England",
        "away_team": "Ghana",
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
          "discipline_score": 0.0942,
          "fouls_received_score": 0.62,
          "penalty_team_score": 0.6667,
          "yellow_per_match_combined": 0.395,
          "red_per_match_combined": 0.009,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.4644,
          "fouls_received_score": 0.4667,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.4792,
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
      "fixture_id": "47",
      "event_name": "Panamá x Croácia",
      "home_team": "Panama",
      "away_team": "Croatia",
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
        "hx": 0.9401,
        "ax": 1.6896,
        "1x2_pct": {
          "home": 20.5,
          "draw": 24.8,
          "away": 54.7
        },
        "over_2_5_pct": 48.9,
        "btts_yes_pct": 50.0
      },
      "v3_adjustment": {
        "hx_baseline": 0.9401,
        "ax_baseline": 1.6896,
        "hx_v3": 0.9401,
        "ax_v3": 1.7009,
        "delta_total_lambda_pct": 0.43,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": -0.0,
          "away_discipline": 0.67
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 20.4,
          "draw": 24.7,
          "away": 54.9
        },
        "over_2_5_pct": 49.2,
        "btts_yes_pct": 50.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 20.5,
          "v3_pct": 20.4,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.8,
          "v3_pct": 24.7,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 54.7,
          "v3_pct": 54.9,
          "delta_pts": 0.27
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 50.0,
          "v3_pct": 50.2,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 50.0,
          "v3_pct": 49.8,
          "delta_pts": -0.12
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 74.2,
          "v3_pct": 74.4,
          "delta_pts": 0.21
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 25.8,
          "v3_pct": 25.6,
          "delta_pts": -0.21
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 48.9,
          "v3_pct": 49.2,
          "delta_pts": 0.28
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 51.1,
          "v3_pct": 50.8,
          "delta_pts": -0.28
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 27.0,
          "v3_pct": 27.3,
          "delta_pts": 0.25
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 73.0,
          "v3_pct": 72.7,
          "delta_pts": -0.25
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 4.32,
        "lambda_red_card": 0.2225,
        "prob_red_card_in_match_pct": 19.9,
        "lambda_penalty": 0.2026,
        "prob_penalty_in_match_pct": 18.3,
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
        "fixture_id": "47",
        "event_name": "Panamá x Croácia",
        "home_team": "Panama",
        "away_team": "Croatia",
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
          "discipline_score": 0.5,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 3.6667,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.2764,
          "fouls_received_score": 0.5429,
          "penalty_team_score": 0.2223,
          "yellow_per_match_combined": 1.38,
          "red_per_match_combined": 0.02,
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
      "fixture_id": "48",
      "event_name": "Colômbia x República Democrática do Congo",
      "home_team": "Colombia",
      "away_team": "DR Congo",
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
        "hx": 1.1337,
        "ax": 0.6993,
        "1x2_pct": {
          "home": 45.6,
          "draw": 32.2,
          "away": 22.2
        },
        "over_2_5_pct": 27.8,
        "btts_yes_pct": 34.5
      },
      "v3_adjustment": {
        "hx_baseline": 1.1337,
        "ax_baseline": 0.6993,
        "hx_v3": 1.1428,
        "ax_v3": 0.6993,
        "delta_total_lambda_pct": 0.5,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.8,
          "away_discipline": 0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 45.9,
          "draw": 32.0,
          "away": 22.1
        },
        "over_2_5_pct": 28.1,
        "btts_yes_pct": 34.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 45.6,
          "v3_pct": 45.9,
          "delta_pts": 0.29
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 32.2,
          "v3_pct": 32.0,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 22.2,
          "v3_pct": 22.1,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 34.5,
          "v3_pct": 34.6,
          "delta_pts": 0.15
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 65.5,
          "v3_pct": 65.4,
          "delta_pts": -0.15
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 55.1,
          "v3_pct": 55.3,
          "delta_pts": 0.26
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 44.9,
          "v3_pct": 44.7,
          "delta_pts": -0.26
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 27.8,
          "v3_pct": 28.1,
          "delta_pts": 0.24
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 72.2,
          "v3_pct": 71.9,
          "delta_pts": -0.24
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 11.4,
          "v3_pct": 11.6,
          "delta_pts": 0.15
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 88.6,
          "v3_pct": 88.4,
          "delta_pts": -0.15
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.39,
        "lambda_red_card": 0.2881,
        "prob_red_card_in_match_pct": 25.0,
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
        "fixture_id": "48",
        "event_name": "Colômbia x República Democrática do Congo",
        "home_team": "Colombia",
        "away_team": "DR Congo",
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
          "discipline_score": 0.2328,
          "fouls_received_score": null,
          "penalty_team_score": 0.3447,
          "yellow_per_match_combined": 1.3793,
          "red_per_match_combined": 0.069,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
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
        "hx": 1.2295,
        "ax": 1.3274,
        "1x2_pct": {
          "home": 34.0,
          "draw": 27.4,
          "away": 38.6
        },
        "over_2_5_pct": 47.1,
        "btts_yes_pct": 52.4
      },
      "v3_adjustment": {
        "hx_baseline": 1.2295,
        "ax_baseline": 1.3274,
        "hx_v3": 1.2449,
        "ax_v3": 1.3361,
        "delta_total_lambda_pct": 0.94,
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
          "home": 34.2,
          "draw": 27.2,
          "away": 38.5
        },
        "over_2_5_pct": 47.7,
        "btts_yes_pct": 52.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 34.0,
          "v3_pct": 34.2,
          "delta_pts": 0.24
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.4,
          "v3_pct": 27.2,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 38.6,
          "v3_pct": 38.5,
          "delta_pts": -0.1
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 52.4,
          "v3_pct": 52.9,
          "delta_pts": 0.49
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 47.6,
          "v3_pct": 47.1,
          "delta_pts": -0.49
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.8,
          "v3_pct": 73.3,
          "delta_pts": 0.47
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.2,
          "v3_pct": 26.7,
          "delta_pts": -0.47
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 47.1,
          "v3_pct": 47.7,
          "delta_pts": 0.61
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 52.9,
          "v3_pct": 52.3,
          "delta_pts": -0.61
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 25.5,
          "v3_pct": 26.0,
          "delta_pts": 0.52
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 74.5,
          "v3_pct": 74.0,
          "delta_pts": -0.52
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
        "hx": 1.1855,
        "ax": 1.134,
        "1x2_pct": {
          "home": 36.8,
          "draw": 29.0,
          "away": 34.2
        },
        "over_2_5_pct": 40.9,
        "btts_yes_pct": 47.5
      },
      "v3_adjustment": {
        "hx_baseline": 1.1855,
        "ax_baseline": 1.134,
        "hx_v3": 1.1913,
        "ax_v3": 1.1411,
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
          "home": 36.8,
          "draw": 28.9,
          "away": 34.3
        },
        "over_2_5_pct": 41.3,
        "btts_yes_pct": 47.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.0,
          "v3_pct": 28.9,
          "delta_pts": -0.09
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 34.2,
          "v3_pct": 34.3,
          "delta_pts": 0.08
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 47.5,
          "v3_pct": 47.8,
          "delta_pts": 0.28
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 52.5,
          "v3_pct": 52.2,
          "delta_pts": -0.28
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 67.8,
          "v3_pct": 68.1,
          "delta_pts": 0.29
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 32.2,
          "v3_pct": 31.9,
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
        "hx": 0.9346,
        "ax": 1.7904,
        "1x2_pct": {
          "home": 19.1,
          "draw": 23.7,
          "away": 57.2
        },
        "over_2_5_pct": 51.2,
        "btts_yes_pct": 50.9
      },
      "v3_adjustment": {
        "hx_baseline": 0.9346,
        "ax_baseline": 1.7904,
        "hx_v3": 0.9455,
        "ax_v3": 1.8048,
        "delta_total_lambda_pct": 0.93,
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
          "home": 19.2,
          "draw": 23.6,
          "away": 57.3
        },
        "over_2_5_pct": 51.9,
        "btts_yes_pct": 51.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 19.1,
          "v3_pct": 19.2,
          "delta_pts": 0.07
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.7,
          "v3_pct": 23.6,
          "delta_pts": -0.13
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 57.2,
          "v3_pct": 57.3,
          "delta_pts": 0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 50.9,
          "v3_pct": 51.4,
          "delta_pts": 0.5
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 49.1,
          "v3_pct": 48.6,
          "delta_pts": -0.5
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.9,
          "v3_pct": 76.4,
          "delta_pts": 0.45
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 24.1,
          "v3_pct": 23.6,
          "delta_pts": -0.45
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 51.2,
          "v3_pct": 51.9,
          "delta_pts": 0.61
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 48.8,
          "v3_pct": 48.1,
          "delta_pts": -0.61
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 29.1,
          "v3_pct": 29.7,
          "delta_pts": 0.56
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 70.9,
          "v3_pct": 70.3,
          "delta_pts": -0.56
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
        "hx": 1.9294,
        "ax": 0.5592,
        "1x2_pct": {
          "home": 69.9,
          "draw": 20.5,
          "away": 9.6
        },
        "over_2_5_pct": 45.3,
        "btts_yes_pct": 36.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.9294,
        "ax_baseline": 0.5592,
        "hx_v3": 1.9367,
        "ax_v3": 0.5662,
        "delta_total_lambda_pct": 0.57,
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
          "home": 69.9,
          "draw": 20.5,
          "away": 9.6
        },
        "over_2_5_pct": 45.7,
        "btts_yes_pct": 37.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.away",
          "baseline_pct": 9.6,
          "v3_pct": 9.6,
          "delta_pts": 0.08
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 36.9,
          "v3_pct": 37.3,
          "delta_pts": 0.39
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 63.1,
          "v3_pct": 62.7,
          "delta_pts": -0.39
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 71.3,
          "v3_pct": 71.6,
          "delta_pts": 0.3
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 28.7,
          "v3_pct": 28.4,
          "delta_pts": -0.3
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 45.3,
          "v3_pct": 45.7,
          "delta_pts": 0.37
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 54.7,
          "v3_pct": 54.3,
          "delta_pts": -0.37
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.0,
          "v3_pct": 24.3,
          "delta_pts": 0.31
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 76.0,
          "v3_pct": 75.7,
          "delta_pts": -0.31
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
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.8796,
        "ax": 1.3837,
        "1x2_pct": {
          "home": 23.5,
          "draw": 28.2,
          "away": 48.3
        },
        "over_2_5_pct": 39.4,
        "btts_yes_pct": 44.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.8796,
        "ax_baseline": 1.3837,
        "hx_v3": 0.8752,
        "ax_v3": 1.3845,
        "delta_total_lambda_pct": -0.16,
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
          "home": 23.4,
          "draw": 28.2,
          "away": 48.4
        },
        "over_2_5_pct": 39.3,
        "btts_yes_pct": 44.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 23.5,
          "v3_pct": 23.4,
          "delta_pts": -0.13
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 48.3,
          "v3_pct": 48.4,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.2,
          "v3_pct": 44.1,
          "delta_pts": -0.13
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.8,
          "v3_pct": 55.9,
          "delta_pts": 0.13
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 66.4,
          "v3_pct": 66.4,
          "delta_pts": -0.09
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 33.6,
          "v3_pct": 33.6,
          "delta_pts": 0.08
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 39.4,
          "v3_pct": 39.3,
          "delta_pts": -0.1
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 60.6,
          "v3_pct": 60.7,
          "delta_pts": 0.1
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 19.3,
          "v3_pct": 19.3,
          "delta_pts": -0.07
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 80.7,
          "v3_pct": 80.7,
          "delta_pts": 0.07
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
        "hx": 0.9421,
        "ax": 1.2888,
        "1x2_pct": {
          "home": 26.8,
          "draw": 29.1,
          "away": 44.1
        },
        "over_2_5_pct": 38.6,
        "btts_yes_pct": 44.6
      },
      "v3_adjustment": {
        "hx_baseline": 0.9421,
        "ax_baseline": 1.2888,
        "hx_v3": 0.9417,
        "ax_v3": 1.2989,
        "delta_total_lambda_pct": 0.43,
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
          "home": 26.6,
          "draw": 29.0,
          "away": 44.4
        },
        "over_2_5_pct": 38.8,
        "btts_yes_pct": 44.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 26.8,
          "v3_pct": 26.6,
          "delta_pts": -0.19
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.1,
          "v3_pct": 29.0,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 44.1,
          "v3_pct": 44.4,
          "delta_pts": 0.3
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.6,
          "v3_pct": 44.8,
          "delta_pts": 0.15
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.4,
          "v3_pct": 55.2,
          "delta_pts": -0.16
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 65.7,
          "v3_pct": 65.9,
          "delta_pts": 0.23
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 34.3,
          "v3_pct": 34.1,
          "delta_pts": -0.23
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 38.6,
          "v3_pct": 38.8,
          "delta_pts": 0.26
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 61.4,
          "v3_pct": 61.2,
          "delta_pts": -0.26
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 18.7,
          "v3_pct": 18.9,
          "delta_pts": 0.19
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 81.3,
          "v3_pct": 81.1,
          "delta_pts": -0.19
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
        "hx": 0.7957,
        "ax": 1.5315,
        "1x2_pct": {
          "home": 19.1,
          "draw": 26.5,
          "away": 54.4
        },
        "over_2_5_pct": 41.1,
        "btts_yes_pct": 43.4
      },
      "v3_adjustment": {
        "hx_baseline": 0.7957,
        "ax_baseline": 1.5315,
        "hx_v3": 0.7957,
        "ax_v3": 1.5404,
        "delta_total_lambda_pct": 0.38,
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
          "home": 19.0,
          "draw": 26.4,
          "away": 54.6
        },
        "over_2_5_pct": 41.4,
        "btts_yes_pct": 43.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 19.1,
          "v3_pct": 19.0,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.5,
          "v3_pct": 26.4,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 54.4,
          "v3_pct": 54.6,
          "delta_pts": 0.23
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 43.4,
          "v3_pct": 43.5,
          "delta_pts": 0.1
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 56.6,
          "v3_pct": 56.5,
          "delta_pts": -0.1
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 67.9,
          "v3_pct": 68.1,
          "delta_pts": 0.2
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 32.1,
          "v3_pct": 31.9,
          "delta_pts": -0.2
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 41.1,
          "v3_pct": 41.4,
          "delta_pts": 0.23
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 58.9,
          "v3_pct": 58.6,
          "delta_pts": -0.23
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 20.6,
          "v3_pct": 20.8,
          "delta_pts": 0.18
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 79.4,
          "v3_pct": 79.2,
          "delta_pts": -0.18
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
        "hx": 0.8716,
        "ax": 0.8993,
        "1x2_pct": {
          "home": 32.2,
          "draw": 34.0,
          "away": 33.8
        },
        "over_2_5_pct": 26.2,
        "btts_yes_pct": 34.9
      },
      "v3_adjustment": {
        "hx_baseline": 0.8716,
        "ax_baseline": 0.8993,
        "hx_v3": 0.874,
        "ax_v3": 0.9104,
        "delta_total_lambda_pct": 0.76,
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
          "home": 32.1,
          "draw": 33.9,
          "away": 34.1
        },
        "over_2_5_pct": 26.5,
        "btts_yes_pct": 35.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 32.2,
          "v3_pct": 32.1,
          "delta_pts": -0.16
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 34.0,
          "v3_pct": 33.9,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 33.8,
          "v3_pct": 34.1,
          "delta_pts": 0.31
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 34.9,
          "v3_pct": 35.2,
          "delta_pts": 0.32
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 65.1,
          "v3_pct": 64.8,
          "delta_pts": -0.32
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 53.2,
          "v3_pct": 53.7,
          "delta_pts": 0.41
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 46.8,
          "v3_pct": 46.3,
          "delta_pts": -0.41
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 26.2,
          "v3_pct": 26.5,
          "delta_pts": 0.36
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 73.8,
          "v3_pct": 73.5,
          "delta_pts": -0.36
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 10.4,
          "v3_pct": 10.6,
          "delta_pts": 0.21
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 89.6,
          "v3_pct": 89.4,
          "delta_pts": -0.21
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
        "hx": 0.8368,
        "ax": 1.4051,
        "1x2_pct": {
          "home": 22.0,
          "draw": 28.1,
          "away": 50.0
        },
        "over_2_5_pct": 38.8,
        "btts_yes_pct": 43.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.8368,
        "ax_baseline": 1.4051,
        "hx_v3": 0.8413,
        "ax_v3": 1.3996,
        "delta_total_lambda_pct": -0.05,
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
          "home": 22.2,
          "draw": 28.1,
          "away": 49.7
        },
        "over_2_5_pct": 38.8,
        "btts_yes_pct": 43.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 22.0,
          "v3_pct": 22.2,
          "delta_pts": 0.21
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.1,
          "v3_pct": 28.1,
          "delta_pts": 0.06
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 50.0,
          "v3_pct": 49.7,
          "delta_pts": -0.27
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 43.2,
          "v3_pct": 43.2,
          "delta_pts": 0.07
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 56.8,
          "v3_pct": 56.8,
          "delta_pts": -0.07
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
        "hx": 2.3642,
        "ax": 0.82,
        "1x2_pct": {
          "home": 71.5,
          "draw": 17.5,
          "away": 11.0
        },
        "over_2_5_pct": 61.7,
        "btts_yes_pct": 50.9
      },
      "v3_adjustment": {
        "hx_baseline": 2.3642,
        "ax_baseline": 0.82,
        "hx_v3": 2.3774,
        "ax_v3": 0.83,
        "delta_total_lambda_pct": 0.73,
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
          "home": 71.5,
          "draw": 17.4,
          "away": 11.0
        },
        "over_2_5_pct": 62.2,
        "btts_yes_pct": 51.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 17.5,
          "v3_pct": 17.4,
          "delta_pts": -0.06
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 11.0,
          "v3_pct": 11.0,
          "delta_pts": 0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 50.9,
          "v3_pct": 51.4,
          "delta_pts": 0.46
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 49.1,
          "v3_pct": 48.6,
          "delta_pts": -0.46
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 82.9,
          "v3_pct": 83.2,
          "delta_pts": 0.3
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 17.1,
          "v3_pct": 16.8,
          "delta_pts": -0.3
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 61.7,
          "v3_pct": 62.2,
          "delta_pts": 0.48
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 38.3,
          "v3_pct": 37.8,
          "delta_pts": -0.48
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 39.4,
          "v3_pct": 39.9,
          "delta_pts": 0.51
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 60.6,
          "v3_pct": 60.1,
          "delta_pts": -0.51
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
        "kickoff": "14 June 2026, 01:00",
        "referee": "Jesús Valenzuela Sáez",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Vancouver",
        "location": "BC Place Vancouver",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.413,
        "ax": 1.6017,
        "1x2_pct": {
          "home": 33.5,
          "draw": 24.8,
          "away": 41.7
        },
        "over_2_5_pct": 58.0,
        "btts_yes_pct": 60.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.413,
        "ax_baseline": 1.6017,
        "hx_v3": 1.4197,
        "ax_v3": 1.6163,
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
          "home": 33.4,
          "draw": 24.7,
          "away": 42.0
        },
        "over_2_5_pct": 58.5,
        "btts_yes_pct": 61.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 33.5,
          "v3_pct": 33.4,
          "delta_pts": -0.1
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.8,
          "v3_pct": 24.7,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 41.7,
          "v3_pct": 42.0,
          "delta_pts": 0.21
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 60.7,
          "v3_pct": 61.1,
          "delta_pts": 0.35
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 39.3,
          "v3_pct": 38.9,
          "delta_pts": -0.35
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 80.6,
          "v3_pct": 80.9,
          "delta_pts": 0.31
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 19.4,
          "v3_pct": 19.1,
          "delta_pts": -0.31
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 58.0,
          "v3_pct": 58.5,
          "delta_pts": 0.47
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 42.0,
          "v3_pct": 41.5,
          "delta_pts": -0.47
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 35.6,
          "v3_pct": 36.1,
          "delta_pts": 0.48
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 64.4,
          "v3_pct": 63.9,
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
          "kickoff": "14 June 2026, 01:00",
          "referee": "Jesús Valenzuela Sáez",
          "home_score": null,
          "away_score": null,
          "status": "scheduled_or_live",
          "city": "Vancouver",
          "location": "BC Place Vancouver",
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
        "hx": 0.6924,
        "ax": 1.1374,
        "1x2_pct": {
          "home": 22.0,
          "draw": 32.2,
          "away": 45.9
        },
        "over_2_5_pct": 27.7,
        "btts_yes_pct": 34.3
      },
      "v3_adjustment": {
        "hx_baseline": 0.6924,
        "ax_baseline": 1.1374,
        "hx_v3": 0.6984,
        "ax_v3": 1.1435,
        "delta_total_lambda_pct": 0.66,
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
          "home": 22.1,
          "draw": 32.0,
          "away": 45.9
        },
        "over_2_5_pct": 28.1,
        "btts_yes_pct": 34.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 22.0,
          "v3_pct": 22.1,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 32.2,
          "v3_pct": 32.0,
          "delta_pts": -0.12
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 34.3,
          "v3_pct": 34.6,
          "delta_pts": 0.3
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 65.7,
          "v3_pct": 65.4,
          "delta_pts": -0.3
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 55.0,
          "v3_pct": 55.3,
          "delta_pts": 0.35
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 45.0,
          "v3_pct": 44.7,
          "delta_pts": -0.35
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 27.7,
          "v3_pct": 28.1,
          "delta_pts": 0.32
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 72.3,
          "v3_pct": 71.9,
          "delta_pts": -0.32
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 11.4,
          "v3_pct": 11.6,
          "delta_pts": 0.2
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 88.6,
          "v3_pct": 88.4,
          "delta_pts": -0.2
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
        "hx": 1.3555,
        "ax": 0.6435,
        "1x2_pct": {
          "home": 53.7,
          "draw": 28.9,
          "away": 17.4
        },
        "over_2_5_pct": 32.3,
        "btts_yes_pct": 35.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.3555,
        "ax_baseline": 0.6435,
        "hx_v3": 1.3632,
        "ax_v3": 0.6371,
        "delta_total_lambda_pct": 0.07,
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
          "home": 54.1,
          "draw": 28.8,
          "away": 17.1
        },
        "over_2_5_pct": 32.3,
        "btts_yes_pct": 35.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 53.7,
          "v3_pct": 54.1,
          "delta_pts": 0.4
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.9,
          "v3_pct": 28.8,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 17.4,
          "v3_pct": 17.1,
          "delta_pts": -0.28
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 35.6,
          "v3_pct": 35.4,
          "delta_pts": -0.16
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 64.4,
          "v3_pct": 64.6,
          "delta_pts": 0.16
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
        "hx": 1.2804,
        "ax": 1.51,
        "1x2_pct": {
          "home": 31.9,
          "draw": 25.9,
          "away": 42.3
        },
        "over_2_5_pct": 52.8,
        "btts_yes_pct": 56.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.2804,
        "ax_baseline": 1.51,
        "hx_v3": 1.2969,
        "ax_v3": 1.5261,
        "delta_total_lambda_pct": 1.17,
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
          "home": 32.0,
          "draw": 25.7,
          "away": 42.3
        },
        "over_2_5_pct": 53.6,
        "btts_yes_pct": 57.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 31.9,
          "v3_pct": 32.0,
          "delta_pts": 0.12
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.9,
          "v3_pct": 25.7,
          "delta_pts": -0.17
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 42.3,
          "v3_pct": 42.3,
          "delta_pts": 0.05
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 56.6,
          "v3_pct": 57.2,
          "delta_pts": 0.61
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 43.4,
          "v3_pct": 42.8,
          "delta_pts": -0.61
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.1,
          "v3_pct": 77.6,
          "delta_pts": 0.55
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.9,
          "v3_pct": 22.4,
          "delta_pts": -0.55
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 52.8,
          "v3_pct": 53.6,
          "delta_pts": 0.78
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 47.2,
          "v3_pct": 46.4,
          "delta_pts": -0.77
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 30.6,
          "v3_pct": 31.3,
          "delta_pts": 0.73
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 69.4,
          "v3_pct": 68.7,
          "delta_pts": -0.72
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
        "hx": 0.8553,
        "ax": 0.9649,
        "1x2_pct": {
          "home": 30.3,
          "draw": 33.4,
          "away": 36.3
        },
        "over_2_5_pct": 27.5,
        "btts_yes_pct": 36.0
      },
      "v3_adjustment": {
        "hx_baseline": 0.8553,
        "ax_baseline": 0.9649,
        "hx_v3": 0.8553,
        "ax_v3": 0.9597,
        "delta_total_lambda_pct": -0.29,
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
          "home": 30.4,
          "draw": 33.5,
          "away": 36.1
        },
        "over_2_5_pct": 27.3,
        "btts_yes_pct": 35.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 30.3,
          "v3_pct": 30.4,
          "delta_pts": 0.11
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 33.4,
          "v3_pct": 33.5,
          "delta_pts": 0.06
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 36.3,
          "v3_pct": 36.1,
          "delta_pts": -0.17
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 36.0,
          "v3_pct": 35.9,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 64.0,
          "v3_pct": 64.1,
          "delta_pts": 0.11
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 54.7,
          "v3_pct": 54.6,
          "delta_pts": -0.15
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 45.3,
          "v3_pct": 45.4,
          "delta_pts": 0.15
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 27.5,
          "v3_pct": 27.3,
          "delta_pts": -0.14
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 72.5,
          "v3_pct": 72.7,
          "delta_pts": 0.14
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 11.2,
          "v3_pct": 11.1,
          "delta_pts": -0.08
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 88.8,
          "v3_pct": 88.9,
          "delta_pts": 0.09
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
        "hx": 0.7569,
        "ax": 1.276,
        "1x2_pct": {
          "home": 21.7,
          "draw": 29.9,
          "away": 48.4
        },
        "over_2_5_pct": 33.2,
        "btts_yes_pct": 38.6
      },
      "v3_adjustment": {
        "hx_baseline": 0.7569,
        "ax_baseline": 1.276,
        "hx_v3": 0.761,
        "ax_v3": 1.2915,
        "delta_total_lambda_pct": 0.97,
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
          "home": 21.6,
          "draw": 29.7,
          "away": 48.7
        },
        "over_2_5_pct": 33.8,
        "btts_yes_pct": 39.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 21.7,
          "v3_pct": 21.6,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.9,
          "v3_pct": 29.7,
          "delta_pts": -0.22
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 48.4,
          "v3_pct": 48.7,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 38.6,
          "v3_pct": 39.0,
          "delta_pts": 0.36
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 61.4,
          "v3_pct": 61.0,
          "delta_pts": -0.37
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 60.7,
          "v3_pct": 61.2,
          "delta_pts": 0.52
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 39.3,
          "v3_pct": 38.8,
          "delta_pts": -0.52
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 33.2,
          "v3_pct": 33.8,
          "delta_pts": 0.53
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 66.8,
          "v3_pct": 66.2,
          "delta_pts": -0.53
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 14.9,
          "v3_pct": 15.2,
          "delta_pts": 0.36
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 85.1,
          "v3_pct": 84.8,
          "delta_pts": -0.36
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
        "hx": 1.1794,
        "ax": 1.6004,
        "1x2_pct": {
          "home": 27.8,
          "draw": 25.5,
          "away": 46.8
        },
        "over_2_5_pct": 52.6,
        "btts_yes_pct": 55.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.1794,
        "ax_baseline": 1.6004,
        "hx_v3": 1.1941,
        "ax_v3": 1.6155,
        "delta_total_lambda_pct": 1.07,
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
          "home": 27.9,
          "draw": 25.3,
          "away": 46.8
        },
        "over_2_5_pct": 53.3,
        "btts_yes_pct": 56.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 27.8,
          "v3_pct": 27.9,
          "delta_pts": 0.11
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.5,
          "v3_pct": 25.3,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 55.6,
          "v3_pct": 56.2,
          "delta_pts": 0.57
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 44.4,
          "v3_pct": 43.8,
          "delta_pts": -0.57
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.9,
          "v3_pct": 77.4,
          "delta_pts": 0.51
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.1,
          "v3_pct": 22.6,
          "delta_pts": -0.51
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 52.6,
          "v3_pct": 53.3,
          "delta_pts": 0.71
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 47.4,
          "v3_pct": 46.7,
          "delta_pts": -0.71
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 30.4,
          "v3_pct": 31.0,
          "delta_pts": 0.66
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 69.6,
          "v3_pct": 69.0,
          "delta_pts": -0.66
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
        "hx": 0.8991,
        "ax": 1.0455,
        "1x2_pct": {
          "home": 30.1,
          "draw": 32.1,
          "away": 37.8
        },
        "over_2_5_pct": 30.8,
        "btts_yes_pct": 38.9
      },
      "v3_adjustment": {
        "hx_baseline": 0.8991,
        "ax_baseline": 1.0455,
        "hx_v3": 0.9091,
        "ax_v3": 1.051,
        "delta_total_lambda_pct": 0.8,
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
          "home": 30.3,
          "draw": 31.9,
          "away": 37.8
        },
        "over_2_5_pct": 31.3,
        "btts_yes_pct": 39.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 30.1,
          "v3_pct": 30.3,
          "delta_pts": 0.2
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 32.1,
          "v3_pct": 31.9,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 37.8,
          "v3_pct": 37.8,
          "delta_pts": -0.06
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 38.9,
          "v3_pct": 39.2,
          "delta_pts": 0.38
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 61.1,
          "v3_pct": 60.8,
          "delta_pts": -0.38
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 58.3,
          "v3_pct": 58.7,
          "delta_pts": 0.43
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 41.7,
          "v3_pct": 41.3,
          "delta_pts": -0.43
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 30.8,
          "v3_pct": 31.3,
          "delta_pts": 0.42
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 69.2,
          "v3_pct": 68.7,
          "delta_pts": -0.42
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 13.3,
          "v3_pct": 13.6,
          "delta_pts": 0.27
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 86.7,
          "v3_pct": 86.4,
          "delta_pts": -0.27
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
    },
    {
      "fixture_id": "67",
      "event_name": "Croácia x Gana",
      "home_team": "Croatia",
      "away_team": "Ghana",
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
        "hx": 1.586,
        "ax": 0.7737,
        "1x2_pct": {
          "home": 56.4,
          "draw": 25.8,
          "away": 17.8
        },
        "over_2_5_pct": 42.0,
        "btts_yes_pct": 43.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.586,
        "ax_baseline": 0.7737,
        "hx_v3": 1.5966,
        "ax_v3": 0.7745,
        "delta_total_lambda_pct": 0.49,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.67,
          "away_discipline": 0.11
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 56.6,
          "draw": 25.7,
          "away": 17.7
        },
        "over_2_5_pct": 42.3,
        "btts_yes_pct": 43.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 56.4,
          "v3_pct": 56.6,
          "delta_pts": 0.25
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.8,
          "v3_pct": 25.7,
          "delta_pts": -0.13
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 17.8,
          "v3_pct": 17.7,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 43.2,
          "v3_pct": 43.3,
          "delta_pts": 0.14
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 56.8,
          "v3_pct": 56.7,
          "delta_pts": -0.14
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 68.6,
          "v3_pct": 68.9,
          "delta_pts": 0.25
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 31.4,
          "v3_pct": 31.1,
          "delta_pts": -0.25
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 42.0,
          "v3_pct": 42.3,
          "delta_pts": 0.3
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 58.0,
          "v3_pct": 57.7,
          "delta_pts": -0.3
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 21.3,
          "v3_pct": 21.5,
          "delta_pts": 0.24
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 78.7,
          "v3_pct": 78.5,
          "delta_pts": -0.23
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.73,
        "lambda_red_card": 0.2225,
        "prob_red_card_in_match_pct": 19.9,
        "lambda_penalty": 0.2006,
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
        "fixture_id": "67",
        "event_name": "Croácia x Gana",
        "home_team": "Croatia",
        "away_team": "Ghana",
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
          "discipline_score": 0.2764,
          "fouls_received_score": 0.5429,
          "penalty_team_score": 0.2223,
          "yellow_per_match_combined": 1.38,
          "red_per_match_combined": 0.02,
          "data_quality": "high_for_wc2022_match_stats",
          "confidence": "high"
        },
        "away_discipline": {
          "discipline_score": 0.4644,
          "fouls_received_score": 0.4667,
          "penalty_team_score": 0.5557,
          "yellow_per_match_combined": 2.4792,
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
      "fixture_id": "68",
      "event_name": "Panamá x Inglaterra",
      "home_team": "Panama",
      "away_team": "England",
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
        "hx": 0.663,
        "ax": 1.9379,
        "1x2_pct": {
          "home": 11.6,
          "draw": 21.1,
          "away": 67.4
        },
        "over_2_5_pct": 48.2,
        "btts_yes_pct": 41.8
      },
      "v3_adjustment": {
        "hx_baseline": 0.663,
        "ax_baseline": 1.9379,
        "hx_v3": 0.663,
        "ax_v3": 1.9615,
        "delta_total_lambda_pct": 0.91,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": -0.0,
          "away_discipline": 1.22
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 11.4,
          "draw": 20.8,
          "away": 67.8
        },
        "over_2_5_pct": 48.8,
        "btts_yes_pct": 41.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 11.6,
          "v3_pct": 11.4,
          "delta_pts": -0.2
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 21.1,
          "v3_pct": 20.8,
          "delta_pts": -0.28
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 67.4,
          "v3_pct": 67.8,
          "delta_pts": 0.48
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 41.8,
          "v3_pct": 41.9,
          "delta_pts": 0.16
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 58.2,
          "v3_pct": 58.1,
          "delta_pts": -0.16
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 73.6,
          "v3_pct": 74.0,
          "delta_pts": 0.45
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 26.4,
          "v3_pct": 26.0,
          "delta_pts": -0.45
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 48.2,
          "v3_pct": 48.8,
          "delta_pts": 0.59
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 51.8,
          "v3_pct": 51.2,
          "delta_pts": -0.59
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 26.4,
          "v3_pct": 26.9,
          "delta_pts": 0.51
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 73.6,
          "v3_pct": 73.1,
          "delta_pts": -0.51
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.83,
        "lambda_red_card": 0.2169,
        "prob_red_card_in_match_pct": 19.5,
        "lambda_penalty": 0.2072,
        "prob_penalty_in_match_pct": 18.7,
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
        "fixture_id": "68",
        "event_name": "Panamá x Inglaterra",
        "home_team": "Panama",
        "away_team": "England",
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
          "discipline_score": 0.5,
          "fouls_received_score": null,
          "penalty_team_score": 0.0,
          "yellow_per_match_combined": 3.6667,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.0942,
          "fouls_received_score": 0.62,
          "penalty_team_score": 0.6667,
          "yellow_per_match_combined": 0.395,
          "red_per_match_combined": 0.009,
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
      "fixture_id": "69",
      "event_name": "Colômbia x Portugal",
      "home_team": "Colombia",
      "away_team": "Portugal",
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
        "hx": 1.2598,
        "ax": 1.3408,
        "1x2_pct": {
          "home": 34.5,
          "draw": 27.1,
          "away": 38.3
        },
        "over_2_5_pct": 48.2,
        "btts_yes_pct": 53.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.2598,
        "ax_baseline": 1.3408,
        "hx_v3": 1.2699,
        "ax_v3": 1.3522,
        "delta_total_lambda_pct": 0.83,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.8,
          "away_discipline": 0.85
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 34.6,
          "draw": 27.0,
          "away": 38.4
        },
        "over_2_5_pct": 48.7,
        "btts_yes_pct": 53.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.1,
          "v3_pct": 27.0,
          "delta_pts": -0.13
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 38.3,
          "v3_pct": 38.4,
          "delta_pts": 0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 53.3,
          "v3_pct": 53.7,
          "delta_pts": 0.42
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 46.7,
          "v3_pct": 46.3,
          "delta_pts": -0.42
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 73.6,
          "v3_pct": 74.1,
          "delta_pts": 0.41
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 26.4,
          "v3_pct": 25.9,
          "delta_pts": -0.41
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 48.2,
          "v3_pct": 48.7,
          "delta_pts": 0.54
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 51.8,
          "v3_pct": 51.3,
          "delta_pts": -0.54
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 26.4,
          "v3_pct": 26.9,
          "delta_pts": 0.47
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 73.6,
          "v3_pct": 73.1,
          "delta_pts": -0.47
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.14,
        "lambda_red_card": 0.2575,
        "prob_red_card_in_match_pct": 22.7,
        "lambda_penalty": 0.2048,
        "prob_penalty_in_match_pct": 18.5,
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
        "fixture_id": "69",
        "event_name": "Colômbia x Portugal",
        "home_team": "Colombia",
        "away_team": "Portugal",
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
          "discipline_score": 0.2328,
          "fouls_received_score": null,
          "penalty_team_score": 0.3447,
          "yellow_per_match_combined": 1.3793,
          "red_per_match_combined": 0.069,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
        },
        "away_discipline": {
          "discipline_score": 0.2173,
          "fouls_received_score": 0.58,
          "penalty_team_score": 0.857,
          "yellow_per_match_combined": 1.3029,
          "red_per_match_combined": 0.0257,
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
      "fixture_id": "70",
      "event_name": "RD Congo x Uzbequistão",
      "home_team": "DR Congo",
      "away_team": "Uzbekistan",
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
        "hx": 0.6952,
        "ax": 0.737,
        "1x2_pct": {
          "home": 29.5,
          "draw": 38.5,
          "away": 32.0
        },
        "over_2_5_pct": 17.4,
        "btts_yes_pct": 26.5
      },
      "v3_adjustment": {
        "hx_baseline": 0.6952,
        "ax_baseline": 0.737,
        "hx_v3": 0.6952,
        "ax_v3": 0.737,
        "delta_total_lambda_pct": 0.0,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.0,
          "away_discipline": 0.0
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 29.5,
          "draw": 38.5,
          "away": 32.0
        },
        "over_2_5_pct": 17.4,
        "btts_yes_pct": 26.5
      },
      "v3_diffs": [],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.6,
        "lambda_red_card": 0.3,
        "prob_red_card_in_match_pct": 25.9,
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
        "fixture_id": "70",
        "event_name": "RD Congo x Uzbequistão",
        "home_team": "DR Congo",
        "away_team": "Uzbekistan",
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
      "fixture_id": "71",
      "event_name": "Argélia x Áustria",
      "home_team": "Algeria",
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
        "hx": 1.2362,
        "ax": 1.0535,
        "1x2_pct": {
          "home": 40.0,
          "draw": 29.1,
          "away": 30.9
        },
        "over_2_5_pct": 40.1,
        "btts_yes_pct": 46.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.2362,
        "ax_baseline": 1.0535,
        "hx_v3": 1.2502,
        "ax_v3": 1.0664,
        "delta_total_lambda_pct": 1.18,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 1.13,
          "away_discipline": 1.22
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 40.1,
          "draw": 28.9,
          "away": 31.0
        },
        "over_2_5_pct": 40.8,
        "btts_yes_pct": 47.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 40.0,
          "v3_pct": 40.1,
          "delta_pts": 0.1
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 29.1,
          "v3_pct": 28.9,
          "delta_pts": -0.2
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 30.9,
          "v3_pct": 31.0,
          "delta_pts": 0.1
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 46.6,
          "v3_pct": 47.2,
          "delta_pts": 0.58
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 53.4,
          "v3_pct": 52.8,
          "delta_pts": -0.58
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 67.1,
          "v3_pct": 67.7,
          "delta_pts": 0.62
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 32.9,
          "v3_pct": 32.3,
          "delta_pts": -0.62
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 40.1,
          "v3_pct": 40.8,
          "delta_pts": 0.71
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 59.9,
          "v3_pct": 59.2,
          "delta_pts": -0.71
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 19.9,
          "v3_pct": 20.4,
          "delta_pts": 0.55
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 80.1,
          "v3_pct": 79.6,
          "delta_pts": -0.55
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.81,
        "lambda_red_card": 0.2297,
        "prob_red_card_in_match_pct": 20.5,
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
        "fixture_id": "71",
        "event_name": "Argélia x Áustria",
        "home_team": "Algeria",
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
          "discipline_score": 0.1218,
          "fouls_received_score": null,
          "penalty_team_score": 0.2563,
          "yellow_per_match_combined": 1.2308,
          "red_per_match_combined": 0.0,
          "data_quality": "fallback_worldcup_cards_no_fouls",
          "confidence": "medium"
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
      "fixture_id": "72",
      "event_name": "Jordânia x Argentina",
      "home_team": "Jordan",
      "away_team": "Argentina",
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
        "hx": 0.5863,
        "ax": 2.0225,
        "1x2_pct": {
          "home": 9.4,
          "draw": 19.6,
          "away": 71.0
        },
        "over_2_5_pct": 48.4,
        "btts_yes_pct": 38.8
      },
      "v3_adjustment": {
        "hx_baseline": 0.5863,
        "ax_baseline": 2.0225,
        "hx_v3": 0.5863,
        "ax_v3": 2.0284,
        "delta_total_lambda_pct": 0.23,
        "components_pct": {
          "referee_strictness": 0.0,
          "penalty_risk": 0.0,
          "home_discipline": 0.0,
          "away_discipline": 0.29
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 9.4,
          "draw": 19.5,
          "away": 71.1
        },
        "over_2_5_pct": 48.5,
        "btts_yes_pct": 38.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 19.6,
          "v3_pct": 19.5,
          "delta_pts": -0.07
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 71.0,
          "v3_pct": 71.1,
          "delta_pts": 0.11
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 73.7,
          "v3_pct": 73.8,
          "delta_pts": 0.11
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 26.3,
          "v3_pct": 26.2,
          "delta_pts": -0.11
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 48.4,
          "v3_pct": 48.5,
          "delta_pts": 0.15
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 51.6,
          "v3_pct": 51.5,
          "delta_pts": -0.15
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 26.6,
          "v3_pct": 26.7,
          "delta_pts": 0.13
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 73.4,
          "v3_pct": 73.3,
          "delta_pts": -0.13
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.73,
        "lambda_red_card": 0.2703,
        "prob_red_card_in_match_pct": 23.7,
        "lambda_penalty": 0.2231,
        "prob_penalty_in_match_pct": 20.0,
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
        "fixture_id": "72",
        "event_name": "Jordânia x Argentina",
        "home_team": "Jordan",
        "away_team": "Argentina",
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
          "discipline_score": 0.4029,
          "fouls_received_score": 0.8857,
          "penalty_team_score": 0.4467,
          "yellow_per_match_combined": 2.0546,
          "red_per_match_combined": 0.0248,
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
  }
};
