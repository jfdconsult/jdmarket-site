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
        "assigned_name": "Wilton SAMPAIO",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.3333,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.5,
        "matches_refereed": 4,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 3.5,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.25
        }
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
        "hx": 1.88,
        "ax": 0.63,
        "1x2_pct": {
          "home": 66.5,
          "draw": 22.5,
          "away": 10.9
        },
        "over_2_5_pct": 45.9,
        "btts_yes_pct": 40.4
      },
      "v3_adjustment": {
        "hx_baseline": 1.88,
        "ax_baseline": 0.63,
        "hx_v3": 1.8967,
        "ax_v3": 0.635,
        "delta_total_lambda_pct": 0.87,
        "components_pct": {
          "referee_strictness": 0.83,
          "penalty_risk": 0.0,
          "home_discipline": 0.06,
          "away_discipline": -0.04
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 66.8,
          "draw": 22.4,
          "away": 10.9
        },
        "over_2_5_pct": 46.4,
        "btts_yes_pct": 40.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 66.5,
          "v3_pct": 66.8,
          "delta_pts": 0.22
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 22.5,
          "v3_pct": 22.4,
          "delta_pts": -0.18
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 40.4,
          "v3_pct": 40.7,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 59.6,
          "v3_pct": 59.3,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.2,
          "v3_pct": 72.7,
          "delta_pts": 0.44
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.8,
          "v3_pct": 27.3,
          "delta_pts": -0.44
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 45.9,
          "v3_pct": 46.4,
          "delta_pts": 0.55
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 54.1,
          "v3_pct": 53.6,
          "delta_pts": -0.55
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.5,
          "v3_pct": 24.9,
          "delta_pts": 0.47
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 75.5,
          "v3_pct": 75.1,
          "delta_pts": -0.47
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.98,
        "lambda_red_card": 0.2387,
        "prob_red_card_in_match_pct": 21.2,
        "lambda_penalty": 0.2427,
        "prob_penalty_in_match_pct": 21.5,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.2,
          "ref_pen_shrunk": 0.2167,
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
          "assigned_name": "Wilton SAMPAIO",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.3333,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.5,
          "matches_refereed": 4,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 3.5,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.25
          }
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
          "match_card_risk": 0.1658,
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
        "assigned_name": "Amin MOHAMED",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
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
        "hx": 1.55,
        "ax": 1.13,
        "1x2_pct": {
          "home": 46.0,
          "draw": 27.2,
          "away": 26.8
        },
        "over_2_5_pct": 50.1,
        "btts_yes_pct": 54.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.55,
        "ax_baseline": 1.13,
        "hx_v3": 1.5621,
        "ax_v3": 1.1244,
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
          "home": 46.5,
          "draw": 27.1,
          "away": 26.4
        },
        "over_2_5_pct": 50.3,
        "btts_yes_pct": 54.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 46.0,
          "v3_pct": 46.5,
          "delta_pts": 0.44
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.2,
          "v3_pct": 27.1,
          "delta_pts": -0.1
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 26.8,
          "v3_pct": 26.4,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.7,
          "v3_pct": 75.8,
          "delta_pts": 0.12
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 24.3,
          "v3_pct": 24.2,
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
          "assigned_name": "Amin MOHAMED",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Facundo TELLO",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.375,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 3,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 2.6667,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.3333,
          "penalty_per_match": 0.0
        }
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
        "hx": 1.65,
        "ax": 0.69,
        "1x2_pct": {
          "home": 59.6,
          "draw": 25.9,
          "away": 14.5
        },
        "over_2_5_pct": 41.5,
        "btts_yes_pct": 41.1
      },
      "v3_adjustment": {
        "hx_baseline": 1.65,
        "ax_baseline": 0.69,
        "hx_v3": 1.6706,
        "ax_v3": 0.7029,
        "delta_total_lambda_pct": 1.43,
        "components_pct": {
          "referee_strictness": 0.62,
          "penalty_risk": 0.0,
          "home_discipline": 0.62,
          "away_discipline": 1.25
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 59.8,
          "draw": 25.7,
          "away": 14.5
        },
        "over_2_5_pct": 42.3,
        "btts_yes_pct": 41.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 59.6,
          "v3_pct": 59.8,
          "delta_pts": 0.15
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.9,
          "v3_pct": 25.7,
          "delta_pts": -0.23
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 14.5,
          "v3_pct": 14.5,
          "delta_pts": 0.08
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 41.1,
          "v3_pct": 41.9,
          "delta_pts": 0.71
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 58.9,
          "v3_pct": 58.1,
          "delta_pts": -0.71
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 68.7,
          "v3_pct": 69.5,
          "delta_pts": 0.75
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 31.3,
          "v3_pct": 30.6,
          "delta_pts": -0.75
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 41.5,
          "v3_pct": 42.3,
          "delta_pts": 0.88
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 58.5,
          "v3_pct": 57.7,
          "delta_pts": -0.88
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 20.9,
          "v3_pct": 21.6,
          "delta_pts": 0.69
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 79.1,
          "v3_pct": 78.4,
          "delta_pts": -0.69
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.19,
        "lambda_red_card": 0.1809,
        "prob_red_card_in_match_pct": 16.5,
        "lambda_penalty": 0.144,
        "prob_penalty_in_match_pct": 13.4,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.2182,
          "ref_pen_shrunk": 0.1455,
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
          "assigned_name": "Facundo TELLO",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.375,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 3,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 2.6667,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.3333,
            "penalty_per_match": 0.0
          }
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
          "match_card_risk": 0.0704,
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
        "assigned_name": "Danny MAKKELIE",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.125,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 2,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 3.0,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.0
        }
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
        "hx": 1.5,
        "ax": 1.0,
        "1x2_pct": {
          "home": 47.8,
          "draw": 28.0,
          "away": 24.2
        },
        "over_2_5_pct": 45.6,
        "btts_yes_pct": 50.1
      },
      "v3_adjustment": {
        "hx_baseline": 1.5,
        "ax_baseline": 1.0,
        "hx_v3": 1.5418,
        "ax_v3": 1.0275,
        "delta_total_lambda_pct": 2.77,
        "components_pct": {
          "referee_strictness": 1.88,
          "penalty_risk": 0.0,
          "home_discipline": 0.91,
          "away_discipline": 0.87
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 48.2,
          "draw": 27.5,
          "away": 24.3
        },
        "over_2_5_pct": 47.4,
        "btts_yes_pct": 51.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 47.8,
          "v3_pct": 48.2,
          "delta_pts": 0.43
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.0,
          "v3_pct": 27.5,
          "delta_pts": -0.48
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 24.2,
          "v3_pct": 24.3,
          "delta_pts": 0.05
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 50.1,
          "v3_pct": 51.4,
          "delta_pts": 1.35
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 49.9,
          "v3_pct": 48.6,
          "delta_pts": -1.35
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.3,
          "v3_pct": 73.6,
          "delta_pts": 1.38
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.7,
          "v3_pct": 26.4,
          "delta_pts": -1.38
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 45.6,
          "v3_pct": 47.4,
          "delta_pts": 1.76
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 54.4,
          "v3_pct": 52.6,
          "delta_pts": -1.77
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.2,
          "v3_pct": 25.7,
          "delta_pts": 1.49
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 75.8,
          "v3_pct": 74.3,
          "delta_pts": -1.49
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.05,
        "lambda_red_card": 0.2125,
        "prob_red_card_in_match_pct": 19.1,
        "lambda_penalty": 0.148,
        "prob_penalty_in_match_pct": 13.8,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.24,
          "ref_pen_shrunk": 0.16,
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
          "assigned_name": "Danny MAKKELIE",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.125,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 2,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 3.0,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.0
          }
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
          "match_card_risk": 0.0254,
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
        "assigned_name": "Said MARTINEZ",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_match",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021447",
        "event_name": "Qatar vs. Switzerland",
        "kickoff": "",
        "referee": "Said MARTINEZ",
        "home_score": 1.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.6,
        "ax": 2.52,
        "1x2_pct": {
          "home": 6.2,
          "draw": 15.2,
          "away": 78.6
        },
        "over_2_5_pct": 60.3,
        "btts_yes_pct": 42.0
      },
      "v3_adjustment": {
        "hx_baseline": 0.6,
        "ax_baseline": 2.52,
        "hx_v3": 0.6039,
        "ax_v3": 2.5323,
        "delta_total_lambda_pct": 0.52,
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
          "home": 6.2,
          "draw": 15.1,
          "away": 78.7
        },
        "over_2_5_pct": 60.7,
        "btts_yes_pct": 42.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 15.2,
          "v3_pct": 15.1,
          "delta_pts": -0.08
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 78.6,
          "v3_pct": 78.7,
          "delta_pts": 0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 42.0,
          "v3_pct": 42.3,
          "delta_pts": 0.24
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 58.0,
          "v3_pct": 57.7,
          "delta_pts": -0.24
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 82.3,
          "v3_pct": 82.6,
          "delta_pts": 0.22
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 17.7,
          "v3_pct": 17.4,
          "delta_pts": -0.22
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 60.3,
          "v3_pct": 60.7,
          "delta_pts": 0.35
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 39.7,
          "v3_pct": 39.3,
          "delta_pts": -0.35
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 38.0,
          "v3_pct": 38.3,
          "delta_pts": 0.36
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 62.0,
          "v3_pct": 61.7,
          "delta_pts": -0.36
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
          "assigned_name": "Said MARTINEZ",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_match",
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
          "kickoff": "",
          "referee": "Said MARTINEZ",
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
      "fixture_id": "6",
      "event_name": "Brasil x Marrocos",
      "home_team": "Brazil",
      "away_team": "Morocco",
      "referee": {
        "assigned_name": "Slavko VINCIC",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.5417,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 1.0,
        "matches_refereed": 2,
        "match_method": "via_roster_2026",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 4.0,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.5
        }
      },
      "fifa_result": {
        "match_id_fifa": "400021456",
        "event_name": "Brazil vs. Morocco",
        "kickoff": "",
        "referee": "Slavko VINCIC",
        "home_score": 1.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.66,
        "ax": 0.89,
        "1x2_pct": {
          "home": 54.6,
          "draw": 26.2,
          "away": 19.2
        },
        "over_2_5_pct": 46.9,
        "btts_yes_pct": 48.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.66,
        "ax_baseline": 0.89,
        "hx_v3": 1.7262,
        "ax_v3": 0.9217,
        "delta_total_lambda_pct": 3.84,
        "components_pct": {
          "referee_strictness": -0.21,
          "penalty_risk": 3.39,
          "home_discipline": 0.8,
          "away_discipline": 0.38
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 55.4,
          "draw": 25.5,
          "away": 19.1
        },
        "over_2_5_pct": 49.4,
        "btts_yes_pct": 50.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 54.6,
          "v3_pct": 55.4,
          "delta_pts": 0.82
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.2,
          "v3_pct": 25.5,
          "delta_pts": -0.71
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 19.2,
          "v3_pct": 19.1,
          "delta_pts": -0.1
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 48.7,
          "v3_pct": 50.4,
          "delta_pts": 1.75
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 51.3,
          "v3_pct": 49.6,
          "delta_pts": -1.75
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 73.2,
          "v3_pct": 75.1,
          "delta_pts": 1.87
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 26.8,
          "v3_pct": 24.9,
          "delta_pts": -1.87
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 46.9,
          "v3_pct": 49.4,
          "delta_pts": 2.46
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 53.1,
          "v3_pct": 50.6,
          "delta_pts": -2.46
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 25.3,
          "v3_pct": 27.4,
          "delta_pts": 2.13
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 74.7,
          "v3_pct": 72.6,
          "delta_pts": -2.13
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.13,
        "lambda_red_card": 0.2363,
        "prob_red_card_in_match_pct": 21.0,
        "lambda_penalty": 0.2702,
        "prob_penalty_in_match_pct": 23.7,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.24,
          "ref_pen_shrunk": 0.26,
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
          "assigned_name": "Slavko VINCIC",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.5417,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 1.0,
          "matches_refereed": 2,
          "match_method": "via_roster_2026",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 4.0,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.5
          }
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
          "match_card_risk": 0.1643,
          "penalty_risk": 0.5657
        },
        "fifa_result": {
          "match_id_fifa": "400021456",
          "event_name": "Brazil vs. Morocco",
          "kickoff": "",
          "referee": "Slavko VINCIC",
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
      "fixture_id": "7",
      "event_name": "Haiti x Escócia",
      "home_team": "Haiti",
      "away_team": "Scotland",
      "referee": {
        "assigned_name": "Mustapha GHORBAL",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.0417,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 2,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 2.0,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.0
        }
      },
      "fifa_result": {
        "match_id_fifa": "400021453",
        "event_name": "Haiti vs. Scotland",
        "kickoff": "",
        "referee": "Mustapha Ghorbal",
        "home_score": 0.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.99,
        "ax": 2.04,
        "1x2_pct": {
          "home": 16.8,
          "draw": 22.3,
          "away": 60.9
        },
        "over_2_5_pct": 58.3,
        "btts_yes_pct": 55.5
      },
      "v3_adjustment": {
        "hx_baseline": 0.99,
        "ax_baseline": 2.04,
        "hx_v3": 1.0251,
        "ax_v3": 2.1105,
        "delta_total_lambda_pct": 3.48,
        "components_pct": {
          "referee_strictness": 2.29,
          "penalty_risk": 0.0,
          "home_discipline": 1.25,
          "away_discipline": 1.16
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 16.7,
          "draw": 21.7,
          "away": 61.5
        },
        "over_2_5_pct": 60.6,
        "btts_yes_pct": 57.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 16.8,
          "v3_pct": 16.7,
          "delta_pts": -0.06
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 22.3,
          "v3_pct": 21.7,
          "delta_pts": -0.59
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 60.9,
          "v3_pct": 61.5,
          "delta_pts": 0.65
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 55.5,
          "v3_pct": 57.1,
          "delta_pts": 1.65
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 44.5,
          "v3_pct": 42.9,
          "delta_pts": -1.65
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.3,
          "v3_pct": 82.8,
          "delta_pts": 1.46
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 18.7,
          "v3_pct": 17.2,
          "delta_pts": -1.46
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 58.3,
          "v3_pct": 60.6,
          "delta_pts": 2.3
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 41.7,
          "v3_pct": 39.4,
          "delta_pts": -2.3
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 35.9,
          "v3_pct": 38.3,
          "delta_pts": 2.36
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 64.1,
          "v3_pct": 61.7,
          "delta_pts": -2.36
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.51,
        "lambda_red_card": 0.2072,
        "prob_red_card_in_match_pct": 18.7,
        "lambda_penalty": 0.16,
        "prob_penalty_in_match_pct": 14.8,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.24,
          "ref_pen_shrunk": 0.16,
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
          "assigned_name": "Mustapha GHORBAL",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.0417,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 2,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 2.0,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.0
          }
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
          "match_card_risk": 0.0041,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021453",
          "event_name": "Haiti vs. Scotland",
          "kickoff": "",
          "referee": "Mustapha Ghorbal",
          "home_score": 0.0,
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
      "fixture_id": "8",
      "event_name": "Austrália x Turquia",
      "home_team": "Australia",
      "away_team": "Turkey",
      "referee": {
        "assigned_name": "Jesus VALENZUELA",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.3333,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 1.0,
        "matches_refereed": 2,
        "match_method": "family_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 1.5,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.5
        }
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
        "hx": 1.0,
        "ax": 1.67,
        "1x2_pct": {
          "home": 21.7,
          "draw": 26.2,
          "away": 52.1
        },
        "over_2_5_pct": 49.9,
        "btts_yes_pct": 52.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.0,
        "ax_baseline": 1.67,
        "hx_v3": 1.0137,
        "ax_v3": 1.6919,
        "delta_total_lambda_pct": 1.33,
        "components_pct": {
          "referee_strictness": 0.83,
          "penalty_risk": 0.0,
          "home_discipline": 0.54,
          "away_discipline": 0.47
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 21.7,
          "draw": 25.9,
          "away": 52.3
        },
        "over_2_5_pct": 50.8,
        "btts_yes_pct": 52.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.2,
          "v3_pct": 25.9,
          "delta_pts": -0.23
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 52.1,
          "v3_pct": 52.3,
          "delta_pts": 0.21
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 52.2,
          "v3_pct": 52.9,
          "delta_pts": 0.66
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 47.8,
          "v3_pct": 47.1,
          "delta_pts": -0.66
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.5,
          "v3_pct": 76.2,
          "delta_pts": 0.64
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 24.5,
          "v3_pct": 23.8,
          "delta_pts": -0.64
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 49.9,
          "v3_pct": 50.8,
          "delta_pts": 0.88
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 50.1,
          "v3_pct": 49.2,
          "delta_pts": -0.87
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 27.9,
          "v3_pct": 28.7,
          "delta_pts": 0.78
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 72.1,
          "v3_pct": 71.3,
          "delta_pts": -0.78
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.12,
        "lambda_red_card": 0.2447,
        "prob_red_card_in_match_pct": 21.7,
        "lambda_penalty": 0.2346,
        "prob_penalty_in_match_pct": 20.9,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.24,
          "ref_pen_shrunk": 0.26,
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
          "assigned_name": "Jesus VALENZUELA",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.3333,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 1.0,
          "matches_refereed": 2,
          "match_method": "family_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 1.5,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.5
          }
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
          "match_card_risk": 0.1103,
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
      "fixture_id": "9",
      "event_name": "Alemanha x Curaçao",
      "home_team": "Germany",
      "away_team": "Curaçao",
      "referee": {
        "assigned_name": "Jalal JAYED",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021464",
        "event_name": "Germany vs. Curaçao",
        "kickoff": "",
        "referee": "Jalal Jayed",
        "home_score": 7.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 2.24,
        "ax": 0.97,
        "1x2_pct": {
          "home": 65.4,
          "draw": 20.3,
          "away": 14.3
        },
        "over_2_5_pct": 62.2,
        "btts_yes_pct": 56.2
      },
      "v3_adjustment": {
        "hx_baseline": 2.24,
        "ax_baseline": 0.97,
        "hx_v3": 2.2676,
        "ax_v3": 0.97,
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
          "home": 65.9,
          "draw": 20.0,
          "away": 14.1
        },
        "over_2_5_pct": 62.8,
        "btts_yes_pct": 56.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 65.4,
          "v3_pct": 65.9,
          "delta_pts": 0.53
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 20.3,
          "v3_pct": 20.0,
          "delta_pts": -0.27
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 14.3,
          "v3_pct": 14.1,
          "delta_pts": -0.26
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 56.2,
          "v3_pct": 56.4,
          "delta_pts": 0.17
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 43.8,
          "v3_pct": 43.6,
          "delta_pts": -0.17
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 83.7,
          "v3_pct": 84.1,
          "delta_pts": 0.34
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 16.3,
          "v3_pct": 15.9,
          "delta_pts": -0.34
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 62.2,
          "v3_pct": 62.8,
          "delta_pts": 0.57
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 37.8,
          "v3_pct": 37.2,
          "delta_pts": -0.57
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 40.0,
          "v3_pct": 40.6,
          "delta_pts": 0.61
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 60.0,
          "v3_pct": 59.4,
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
          "assigned_name": "Jalal JAYED",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "kickoff": "",
          "referee": "Jalal Jayed",
          "home_score": 7.0,
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
      "fixture_id": "10",
      "event_name": "Holanda x Japão",
      "home_team": "Netherlands",
      "away_team": "Japan",
      "referee": {
        "assigned_name": "Ismail ELFATH",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.7638,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.6666,
        "matches_refereed": 3,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 4.6667,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.3333,
          "penalty_per_match": 0.3333
        }
      },
      "fifa_result": {
        "match_id_fifa": "400021470",
        "event_name": "Netherlands vs. Japan",
        "kickoff": "",
        "referee": "Ismail Elfath",
        "home_score": 2.0,
        "away_score": 2.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.7,
        "ax": 1.26,
        "1x2_pct": {
          "home": 46.8,
          "draw": 25.6,
          "away": 27.5
        },
        "over_2_5_pct": 56.8,
        "btts_yes_pct": 59.4
      },
      "v3_adjustment": {
        "hx_baseline": 1.7,
        "ax_baseline": 1.26,
        "hx_v3": 1.6868,
        "ax_v3": 1.2621,
        "delta_total_lambda_pct": -0.38,
        "components_pct": {
          "referee_strictness": -1.32,
          "penalty_risk": 0.93,
          "home_discipline": -0.39,
          "away_discipline": 0.56
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 46.5,
          "draw": 25.7,
          "away": 27.8
        },
        "over_2_5_pct": 56.5,
        "btts_yes_pct": 59.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 46.8,
          "v3_pct": 46.5,
          "delta_pts": -0.37
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.6,
          "v3_pct": 25.7,
          "delta_pts": 0.1
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 27.5,
          "v3_pct": 27.8,
          "delta_pts": 0.26
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 59.4,
          "v3_pct": 59.3,
          "delta_pts": -0.12
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 40.6,
          "v3_pct": 40.7,
          "delta_pts": 0.12
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 80.4,
          "v3_pct": 80.2,
          "delta_pts": -0.17
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 19.6,
          "v3_pct": 19.8,
          "delta_pts": 0.17
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 56.8,
          "v3_pct": 56.5,
          "delta_pts": -0.25
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 43.2,
          "v3_pct": 43.5,
          "delta_pts": 0.25
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 34.4,
          "v3_pct": 34.1,
          "delta_pts": -0.25
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 65.6,
          "v3_pct": 65.9,
          "delta_pts": 0.25
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.91,
        "lambda_red_card": 0.2405,
        "prob_red_card_in_match_pct": 21.4,
        "lambda_penalty": 0.1984,
        "prob_penalty_in_match_pct": 18.0,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.2182,
          "ref_pen_shrunk": 0.2364,
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
          "assigned_name": "Ismail ELFATH",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.7638,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.6666,
          "matches_refereed": 3,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 4.6667,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.3333,
            "penalty_per_match": 0.3333
          }
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
          "match_card_risk": 0.3606,
          "penalty_risk": 0.155
        },
        "fifa_result": {
          "match_id_fifa": "400021470",
          "event_name": "Netherlands vs. Japan",
          "kickoff": "",
          "referee": "Ismail Elfath",
          "home_score": 2.0,
          "away_score": 2.0,
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
      "fixture_id": "11",
      "event_name": "Costa do Marfim x Equador",
      "home_team": "Ivory Coast",
      "away_team": "Ecuador",
      "referee": {
        "assigned_name": "Francois LETEXIER",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021467",
        "event_name": "Côte d'Ivoire vs. Ecuador",
        "kickoff": "",
        "referee": "",
        "home_score": 1.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.73,
        "ax": 1.08,
        "1x2_pct": {
          "home": 23.5,
          "draw": 34.1,
          "away": 42.4
        },
        "over_2_5_pct": 27.2,
        "btts_yes_pct": 35.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.73,
        "ax_baseline": 1.08,
        "hx_v3": 0.7343,
        "ax_v3": 1.0829,
        "delta_total_lambda_pct": 0.4,
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
          "home": 23.5,
          "draw": 34.0,
          "away": 42.4
        },
        "over_2_5_pct": 27.4,
        "btts_yes_pct": 35.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 23.5,
          "v3_pct": 23.5,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 34.1,
          "v3_pct": 34.0,
          "delta_pts": -0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 35.2,
          "v3_pct": 35.4,
          "delta_pts": 0.19
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 64.8,
          "v3_pct": 64.6,
          "delta_pts": -0.19
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 55.0,
          "v3_pct": 55.3,
          "delta_pts": 0.21
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 45.0,
          "v3_pct": 44.7,
          "delta_pts": -0.21
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 27.2,
          "v3_pct": 27.4,
          "delta_pts": 0.19
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 72.8,
          "v3_pct": 72.6,
          "delta_pts": -0.19
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 11.0,
          "v3_pct": 11.1,
          "delta_pts": 0.12
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 89.0,
          "v3_pct": 88.9,
          "delta_pts": -0.12
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
          "assigned_name": "Francois LETEXIER",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "kickoff": "",
          "referee": "",
          "home_score": 1.0,
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
      "fixture_id": "12",
      "event_name": "Suécia x Tunísia",
      "home_team": "Sweden",
      "away_team": "Tunisia",
      "referee": {
        "assigned_name": "Yael FALCON PEREZ",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021474",
        "event_name": "Sweden vs. Tunisia",
        "kickoff": "",
        "referee": "Yael Falcón Pérez",
        "home_score": 5.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.51,
        "ax": 0.98,
        "1x2_pct": {
          "home": 48.6,
          "draw": 27.9,
          "away": 23.6
        },
        "over_2_5_pct": 45.4,
        "btts_yes_pct": 49.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.51,
        "ax_baseline": 0.98,
        "hx_v3": 1.5285,
        "ax_v3": 0.9852,
        "delta_total_lambda_pct": 0.95,
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
          "home": 48.9,
          "draw": 27.7,
          "away": 23.4
        },
        "over_2_5_pct": 46.0,
        "btts_yes_pct": 50.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 48.6,
          "v3_pct": 48.9,
          "delta_pts": 0.36
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.9,
          "v3_pct": 27.7,
          "delta_pts": -0.21
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 23.6,
          "v3_pct": 23.4,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 49.6,
          "v3_pct": 50.0,
          "delta_pts": 0.4
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 50.3,
          "v3_pct": 50.0,
          "delta_pts": -0.4
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.0,
          "v3_pct": 72.5,
          "delta_pts": 0.48
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 28.0,
          "v3_pct": 27.5,
          "delta_pts": -0.48
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 45.4,
          "v3_pct": 46.0,
          "delta_pts": 0.61
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 54.6,
          "v3_pct": 54.0,
          "delta_pts": -0.61
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.0,
          "v3_pct": 24.5,
          "delta_pts": 0.51
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 76.0,
          "v3_pct": 75.5,
          "delta_pts": -0.51
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
          "assigned_name": "Yael FALCON PEREZ",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "kickoff": "",
          "referee": "Yael Falcón Pérez",
          "home_score": 5.0,
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
      "fixture_id": "13",
      "event_name": "Espanha x Cabo Verde",
      "home_team": "Spain",
      "away_team": "Cape Verde",
      "referee": {
        "assigned_name": "Adham MAKHADMEH",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021482",
        "event_name": "Spain vs. Cabo Verde",
        "kickoff": "",
        "referee": "",
        "home_score": 0.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 2.53,
        "ax": 0.29,
        "1x2_pct": {
          "home": 85.7,
          "draw": 11.9,
          "away": 2.4
        },
        "over_2_5_pct": 53.5,
        "btts_yes_pct": 23.5
      },
      "v3_adjustment": {
        "hx_baseline": 2.53,
        "ax_baseline": 0.29,
        "hx_v3": 2.5608,
        "ax_v3": 0.29,
        "delta_total_lambda_pct": 1.09,
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
          "home": 86.0,
          "draw": 11.6,
          "away": 2.4
        },
        "over_2_5_pct": 54.3,
        "btts_yes_pct": 23.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 85.7,
          "v3_pct": 86.0,
          "delta_pts": 0.35
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 11.9,
          "v3_pct": 11.6,
          "delta_pts": -0.28
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 2.4,
          "v3_pct": 2.4,
          "delta_pts": -0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 23.5,
          "v3_pct": 23.6,
          "delta_pts": 0.05
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 76.5,
          "v3_pct": 76.4,
          "delta_pts": -0.05
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.6,
          "v3_pct": 78.1,
          "delta_pts": 0.51
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.4,
          "v3_pct": 21.9,
          "delta_pts": -0.51
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 53.5,
          "v3_pct": 54.3,
          "delta_pts": 0.73
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 46.5,
          "v3_pct": 45.7,
          "delta_pts": -0.73
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 31.2,
          "v3_pct": 31.9,
          "delta_pts": 0.69
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 68.8,
          "v3_pct": 68.1,
          "delta_pts": -0.69
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
          "assigned_name": "Adham MAKHADMEH",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "kickoff": "",
          "referee": "",
          "home_score": 0.0,
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
      "fixture_id": "14",
      "event_name": "Bélgica x Egito",
      "home_team": "Belgium",
      "away_team": "Egypt",
      "referee": {
        "assigned_name": "Ramon ABATTI",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021478",
        "event_name": "Belgium vs. Egypt",
        "kickoff": "",
        "referee": "Ramon ABATTI",
        "home_score": 1.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.77,
        "ax": 0.88,
        "1x2_pct": {
          "home": 57.5,
          "draw": 24.9,
          "away": 17.5
        },
        "over_2_5_pct": 49.4,
        "btts_yes_pct": 49.4
      },
      "v3_adjustment": {
        "hx_baseline": 1.77,
        "ax_baseline": 0.88,
        "hx_v3": 1.7867,
        "ax_v3": 0.8897,
        "delta_total_lambda_pct": 1.0,
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
          "home": 57.7,
          "draw": 24.8,
          "away": 17.5
        },
        "over_2_5_pct": 50.1,
        "btts_yes_pct": 49.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 57.5,
          "v3_pct": 57.7,
          "delta_pts": 0.15
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.9,
          "v3_pct": 24.8,
          "delta_pts": -0.17
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 49.4,
          "v3_pct": 49.9,
          "delta_pts": 0.49
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 50.6,
          "v3_pct": 50.1,
          "delta_pts": -0.49
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.1,
          "v3_pct": 75.6,
          "delta_pts": 0.49
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 24.9,
          "v3_pct": 24.4,
          "delta_pts": -0.49
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 49.4,
          "v3_pct": 50.1,
          "delta_pts": 0.65
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 50.6,
          "v3_pct": 49.9,
          "delta_pts": -0.65
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 27.5,
          "v3_pct": 28.1,
          "delta_pts": 0.58
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 72.5,
          "v3_pct": 71.9,
          "delta_pts": -0.58
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
          "assigned_name": "Ramon ABATTI",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "kickoff": "",
          "referee": "Ramon ABATTI",
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
      "fixture_id": "15",
      "event_name": "Arábia Saudita x Uruguai",
      "home_team": "Saudi Arabia",
      "away_team": "Uruguay",
      "referee": {
        "assigned_name": "Maurizio MARIANI",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021486",
        "event_name": "Saudi Arabia vs. Uruguay",
        "kickoff": "",
        "referee": "Maurizio Mariani",
        "home_score": 1.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 0.66,
        "ax": 1.95,
        "1x2_pct": {
          "home": 10.9,
          "draw": 21.8,
          "away": 67.2
        },
        "over_2_5_pct": 48.4,
        "btts_yes_pct": 42.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.66,
        "ax_baseline": 1.95,
        "hx_v3": 0.6564,
        "ax_v3": 1.9605,
        "delta_total_lambda_pct": 0.27,
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
          "home": 10.8,
          "draw": 21.7,
          "away": 67.5
        },
        "over_2_5_pct": 48.6,
        "btts_yes_pct": 42.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 10.9,
          "v3_pct": 10.8,
          "delta_pts": -0.16
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 21.8,
          "v3_pct": 21.7,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 67.2,
          "v3_pct": 67.5,
          "delta_pts": 0.31
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 42.2,
          "v3_pct": 42.1,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 57.8,
          "v3_pct": 57.9,
          "delta_pts": 0.09
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 74.2,
          "v3_pct": 74.3,
          "delta_pts": 0.13
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 25.8,
          "v3_pct": 25.7,
          "delta_pts": -0.13
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 48.4,
          "v3_pct": 48.6,
          "delta_pts": 0.17
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 51.6,
          "v3_pct": 51.4,
          "delta_pts": -0.17
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 26.6,
          "v3_pct": 26.8,
          "delta_pts": 0.15
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 73.4,
          "v3_pct": 73.2,
          "delta_pts": -0.15
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
          "assigned_name": "Maurizio MARIANI",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "kickoff": "",
          "referee": "Maurizio Mariani",
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
      "fixture_id": "16",
      "event_name": "Irã x Nova Zelândia",
      "home_team": "Iran",
      "away_team": "New Zealand",
      "referee": {
        "assigned_name": "Cesar RAMOS",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.0536,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 7,
        "match_method": "family_name",
        "confidence": "high",
        "raw": {
          "yellow_per_match": 2.1429,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.0
        }
      },
      "fifa_result": {
        "match_id_fifa": "400021476",
        "event_name": "IR Iran vs. New Zealand",
        "kickoff": "",
        "referee": "",
        "home_score": 2.0,
        "away_score": 2.0,
        "status": "full_time",
        "city": "",
        "location": "",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.57,
        "ax": 0.95,
        "1x2_pct": {
          "home": 50.9,
          "draw": 27.3,
          "away": 21.9
        },
        "over_2_5_pct": 46.1,
        "btts_yes_pct": 49.5
      },
      "v3_adjustment": {
        "hx_baseline": 1.57,
        "ax_baseline": 0.95,
        "hx_v3": 1.6133,
        "ax_v3": 0.9831,
        "delta_total_lambda_pct": 3.03,
        "components_pct": {
          "referee_strictness": 2.23,
          "penalty_risk": 0.0,
          "home_discipline": 0.53,
          "away_discipline": 1.25
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 51.1,
          "draw": 26.8,
          "away": 22.1
        },
        "over_2_5_pct": 48.1,
        "btts_yes_pct": 51.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 50.9,
          "v3_pct": 51.1,
          "delta_pts": 0.29
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.3,
          "v3_pct": 26.8,
          "delta_pts": -0.49
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 21.9,
          "v3_pct": 22.1,
          "delta_pts": 0.2
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 49.5,
          "v3_pct": 51.1,
          "delta_pts": 1.53
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 50.5,
          "v3_pct": 48.9,
          "delta_pts": -1.54
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.6,
          "v3_pct": 74.1,
          "delta_pts": 1.5
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.4,
          "v3_pct": 25.9,
          "delta_pts": -1.5
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 46.1,
          "v3_pct": 48.1,
          "delta_pts": 1.94
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 53.9,
          "v3_pct": 51.9,
          "delta_pts": -1.94
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.7,
          "v3_pct": 26.3,
          "delta_pts": 1.65
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 75.3,
          "v3_pct": 73.7,
          "delta_pts": -1.65
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.75,
        "lambda_red_card": 0.1549,
        "prob_red_card_in_match_pct": 14.4,
        "lambda_penalty": 0.0949,
        "prob_penalty_in_match_pct": 9.1,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.16,
          "ref_pen_shrunk": 0.1067,
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
          "assigned_name": "Cesar RAMOS",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.0536,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 7,
          "match_method": "family_name",
          "confidence": "high",
          "raw": {
            "yellow_per_match": 2.1429,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.0
          }
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
          "match_card_risk": 0.0109,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021476",
          "event_name": "IR Iran vs. New Zealand",
          "kickoff": "",
          "referee": "",
          "home_score": 2.0,
          "away_score": 2.0,
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
      "fixture_id": "17",
      "event_name": "França x Senegal",
      "home_team": "France",
      "away_team": "Senegal",
      "referee": {
        "assigned_name": "Alireza FAGHANI",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.4583,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.6666,
        "matches_refereed": 6,
        "match_method": "exact_name",
        "confidence": "high",
        "raw": {
          "yellow_per_match": 4.3333,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.3333
        }
      },
      "fifa_result": {
        "match_id_fifa": "400021490",
        "event_name": "France vs. Senegal",
        "kickoff": "Today, 16:00",
        "referee": "Alireza FAGHANI",
        "home_score": 3.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "New Jersey",
        "location": "New York/New Jersey Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 2.01,
        "ax": 0.83,
        "1x2_pct": {
          "home": 64.1,
          "draw": 22.1,
          "away": 13.8
        },
        "over_2_5_pct": 54.0,
        "btts_yes_pct": 49.6
      },
      "v3_adjustment": {
        "hx_baseline": 2.01,
        "ax_baseline": 0.83,
        "hx_v3": 2.0817,
        "ax_v3": 0.8555,
        "delta_total_lambda_pct": 3.42,
        "components_pct": {
          "referee_strictness": 0.21,
          "penalty_risk": 2.29,
          "home_discipline": 1.06,
          "away_discipline": 0.57
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 65.0,
          "draw": 21.4,
          "away": 13.6
        },
        "over_2_5_pct": 56.3,
        "btts_yes_pct": 51.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 64.1,
          "v3_pct": 65.0,
          "delta_pts": 0.85
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 22.1,
          "v3_pct": 21.4,
          "delta_pts": -0.66
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 13.8,
          "v3_pct": 13.6,
          "delta_pts": -0.18
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 49.6,
          "v3_pct": 51.1,
          "delta_pts": 1.46
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 50.4,
          "v3_pct": 48.9,
          "delta_pts": -1.46
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 78.3,
          "v3_pct": 79.9,
          "delta_pts": 1.54
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 21.7,
          "v3_pct": 20.1,
          "delta_pts": -1.54
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 54.0,
          "v3_pct": 56.3,
          "delta_pts": 2.26
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 46.0,
          "v3_pct": 43.7,
          "delta_pts": -2.26
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 31.7,
          "v3_pct": 33.9,
          "delta_pts": 2.17
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 68.3,
          "v3_pct": 66.1,
          "delta_pts": -2.17
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.64,
        "lambda_red_card": 0.1773,
        "prob_red_card_in_match_pct": 16.3,
        "lambda_penalty": 0.2684,
        "prob_penalty_in_match_pct": 23.5,
        "confidence": "high",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.1714,
          "ref_pen_shrunk": 0.2571,
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
          "assigned_name": "Alireza FAGHANI",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.4583,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.6666,
          "matches_refereed": 6,
          "match_method": "exact_name",
          "confidence": "high",
          "raw": {
            "yellow_per_match": 4.3333,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.3333
          }
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
          "match_card_risk": 0.1042,
          "penalty_risk": 0.3821
        },
        "fifa_result": {
          "match_id_fifa": "400021490",
          "event_name": "France vs. Senegal",
          "kickoff": "Today, 16:00",
          "referee": "Alireza FAGHANI",
          "home_score": 3.0,
          "away_score": 1.0,
          "status": "full_time",
          "city": "New Jersey",
          "location": "New York/New Jersey Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
        "assigned_name": "Pierre ATCHO",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021488",
        "event_name": "Iraq vs. Norway",
        "kickoff": "Today, 19:00",
        "referee": "Pierre Ghislain Atcho",
        "home_score": 1.0,
        "away_score": 4.0,
        "status": "full_time",
        "city": "Boston",
        "location": "Boston Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 0.54,
        "ax": 2.42,
        "1x2_pct": {
          "home": 5.9,
          "draw": 15.6,
          "away": 78.5
        },
        "over_2_5_pct": 56.8,
        "btts_yes_pct": 38.6
      },
      "v3_adjustment": {
        "hx_baseline": 0.54,
        "ax_baseline": 2.42,
        "hx_v3": 0.5346,
        "ax_v3": 2.4513,
        "delta_total_lambda_pct": 0.87,
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
          "home": 5.7,
          "draw": 15.2,
          "away": 79.1
        },
        "over_2_5_pct": 57.4,
        "btts_yes_pct": 38.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 5.9,
          "v3_pct": 5.7,
          "delta_pts": -0.22
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 15.6,
          "v3_pct": 15.2,
          "delta_pts": -0.36
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 78.5,
          "v3_pct": 79.1,
          "delta_pts": 0.58
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 38.6,
          "v3_pct": 38.4,
          "delta_pts": -0.19
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 61.4,
          "v3_pct": 61.6,
          "delta_pts": 0.19
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 80.0,
          "v3_pct": 80.4,
          "delta_pts": 0.38
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 20.0,
          "v3_pct": 19.6,
          "delta_pts": -0.38
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 56.8,
          "v3_pct": 57.4,
          "delta_pts": 0.59
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 43.2,
          "v3_pct": 42.6,
          "delta_pts": -0.59
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 34.4,
          "v3_pct": 35.0,
          "delta_pts": 0.58
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 65.6,
          "v3_pct": 65.0,
          "delta_pts": -0.58
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
          "assigned_name": "Pierre ATCHO",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "kickoff": "Today, 19:00",
          "referee": "Pierre Ghislain Atcho",
          "home_score": 1.0,
          "away_score": 4.0,
          "status": "full_time",
          "city": "Boston",
          "location": "Boston Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
        "assigned_name": "Szymon MARCINIAK",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.6417,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 1.0,
        "matches_refereed": 5,
        "match_method": "exact_name",
        "confidence": "high",
        "raw": {
          "yellow_per_match": 3.2,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.2,
          "penalty_per_match": 0.6
        }
      },
      "fifa_result": {
        "match_id_fifa": "400021496",
        "event_name": "Argentina vs. Algeria",
        "kickoff": "Today, 22:00",
        "referee": "Szymon MARCINIAK",
        "home_score": 3.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "Kansas City",
        "location": "Kansas City Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 2.07,
        "ax": 0.69,
        "1x2_pct": {
          "home": 68.8,
          "draw": 20.6,
          "away": 10.5
        },
        "over_2_5_pct": 52.1,
        "btts_yes_pct": 44.3
      },
      "v3_adjustment": {
        "hx_baseline": 2.07,
        "ax_baseline": 0.69,
        "hx_v3": 2.0614,
        "ax_v3": 0.6929,
        "delta_total_lambda_pct": -0.21,
        "components_pct": {
          "referee_strictness": -0.71,
          "penalty_risk": 0.0,
          "home_discipline": 0.29,
          "away_discipline": 1.13
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 68.6,
          "draw": 20.7,
          "away": 10.7
        },
        "over_2_5_pct": 52.0,
        "btts_yes_pct": 44.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 68.8,
          "v3_pct": 68.6,
          "delta_pts": -0.24
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 20.6,
          "v3_pct": 20.7,
          "delta_pts": 0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 10.5,
          "v3_pct": 10.7,
          "delta_pts": 0.12
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.3,
          "v3_pct": 44.4,
          "delta_pts": 0.08
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.7,
          "v3_pct": 55.6,
          "delta_pts": -0.08
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.9,
          "v3_pct": 76.8,
          "delta_pts": -0.1
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.1,
          "v3_pct": 23.2,
          "delta_pts": 0.09
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 52.1,
          "v3_pct": 52.0,
          "delta_pts": -0.14
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 47.9,
          "v3_pct": 48.0,
          "delta_pts": 0.14
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 29.9,
          "v3_pct": 29.8,
          "delta_pts": -0.13
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 70.1,
          "v3_pct": 70.2,
          "delta_pts": 0.13
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.33,
        "lambda_red_card": 0.1764,
        "prob_red_card_in_match_pct": 16.2,
        "lambda_penalty": 0.3948,
        "prob_penalty_in_match_pct": 32.6,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.1846,
          "ref_pen_shrunk": 0.3538,
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
          "assigned_name": "Szymon MARCINIAK",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.6417,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 1.0,
          "matches_refereed": 5,
          "match_method": "exact_name",
          "confidence": "high",
          "raw": {
            "yellow_per_match": 3.2,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.2,
            "penalty_per_match": 0.6
          }
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
          "match_card_risk": 0.1683,
          "penalty_risk": null
        },
        "fifa_result": {
          "match_id_fifa": "400021496",
          "event_name": "Argentina vs. Algeria",
          "kickoff": "Today, 22:00",
          "referee": "Szymon MARCINIAK",
          "home_score": 3.0,
          "away_score": 0.0,
          "status": "full_time",
          "city": "Kansas City",
          "location": "Kansas City Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
        "assigned_name": "Dahane BEIDA",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021498",
        "event_name": "Austria vs. Jordan",
        "kickoff": "17 June 2026, 01:00",
        "referee": "Dahane BEIDA",
        "home_score": 3.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "San Francisco Bay Area",
        "location": "San Francisco Bay Area Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 2.42,
        "ax": 0.81,
        "1x2_pct": {
          "home": 72.3,
          "draw": 17.7,
          "away": 10.0
        },
        "over_2_5_pct": 62.6,
        "btts_yes_pct": 51.2
      },
      "v3_adjustment": {
        "hx_baseline": 2.42,
        "ax_baseline": 0.81,
        "hx_v3": 2.4496,
        "ax_v3": 0.81,
        "delta_total_lambda_pct": 0.92,
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
          "home": 72.8,
          "draw": 17.4,
          "away": 9.8
        },
        "over_2_5_pct": 63.2,
        "btts_yes_pct": 51.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 72.3,
          "v3_pct": 72.8,
          "delta_pts": 0.49
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 17.7,
          "v3_pct": 17.4,
          "delta_pts": -0.28
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 10.0,
          "v3_pct": 9.8,
          "delta_pts": -0.21
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 51.2,
          "v3_pct": 51.3,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 48.8,
          "v3_pct": 48.7,
          "delta_pts": -0.13
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 83.9,
          "v3_pct": 84.2,
          "delta_pts": 0.36
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 16.1,
          "v3_pct": 15.8,
          "delta_pts": -0.36
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 62.6,
          "v3_pct": 63.2,
          "delta_pts": 0.61
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 37.4,
          "v3_pct": 36.8,
          "delta_pts": -0.61
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 40.4,
          "v3_pct": 41.1,
          "delta_pts": 0.66
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 59.6,
          "v3_pct": 58.9,
          "delta_pts": -0.66
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
          "assigned_name": "Dahane BEIDA",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "fifa_result": {
          "match_id_fifa": "400021498",
          "event_name": "Austria vs. Jordan",
          "kickoff": "17 June 2026, 01:00",
          "referee": "Dahane BEIDA",
          "home_score": 3.0,
          "away_score": 1.0,
          "status": "full_time",
          "city": "San Francisco Bay Area",
          "location": "San Francisco Bay Area Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
      "fixture_id": "21",
      "event_name": "Portugal x RD Congo",
      "home_team": "Portugal",
      "away_team": "DR Congo",
      "referee": {
        "assigned_name": "Abdulrahman ALJASSIM",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_match",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021502",
        "event_name": "Portugal vs. Congo DR",
        "kickoff": "17 June 2026, 14:00",
        "referee": "Abdulrahman AL JASSIM",
        "home_score": 1.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "Houston",
        "location": "Houston Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 2.32,
        "ax": 0.67,
        "1x2_pct": {
          "home": 73.9,
          "draw": 17.7,
          "away": 8.4
        },
        "over_2_5_pct": 57.5,
        "btts_yes_pct": 44.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.32,
        "ax_baseline": 0.67,
        "hx_v3": 2.3397,
        "ax_v3": 0.67,
        "delta_total_lambda_pct": 0.66,
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
          "home": 74.2,
          "draw": 17.5,
          "away": 8.3
        },
        "over_2_5_pct": 57.9,
        "btts_yes_pct": 44.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 73.9,
          "v3_pct": 74.2,
          "delta_pts": 0.33
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 17.7,
          "v3_pct": 17.5,
          "delta_pts": -0.2
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 8.4,
          "v3_pct": 8.3,
          "delta_pts": -0.13
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.7,
          "v3_pct": 44.7,
          "delta_pts": 0.09
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.3,
          "v3_pct": 55.3,
          "delta_pts": -0.09
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 80.6,
          "v3_pct": 80.8,
          "delta_pts": 0.29
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 19.4,
          "v3_pct": 19.2,
          "delta_pts": -0.29
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 57.5,
          "v3_pct": 57.9,
          "delta_pts": 0.44
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 42.5,
          "v3_pct": 42.1,
          "delta_pts": -0.44
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 35.1,
          "v3_pct": 35.5,
          "delta_pts": 0.44
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 64.9,
          "v3_pct": 64.5,
          "delta_pts": -0.44
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
          "assigned_name": "Abdulrahman ALJASSIM",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_match",
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
        "fifa_result": {
          "match_id_fifa": "400021502",
          "event_name": "Portugal vs. Congo DR",
          "kickoff": "17 June 2026, 14:00",
          "referee": "Abdulrahman AL JASSIM",
          "home_score": 1.0,
          "away_score": 1.0,
          "status": "full_time",
          "city": "Houston",
          "location": "Houston Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
      "fixture_id": "22",
      "event_name": "Inglaterra x Croácia",
      "home_team": "England",
      "away_team": "Croatia",
      "referee": {
        "assigned_name": "Clement TURPIN",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.3083,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.8,
        "matches_refereed": 5,
        "match_method": "family_name",
        "confidence": "high",
        "raw": {
          "yellow_per_match": 2.0,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.4
        }
      },
      "fifa_result": {
        "match_id_fifa": "400021507",
        "event_name": "England vs. Croatia",
        "kickoff": "17 June 2026, 17:00",
        "referee": "Clément Turpin",
        "home_score": 4.0,
        "away_score": 2.0,
        "status": "full_time",
        "city": "Dallas",
        "location": "Dallas Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 1.69,
        "ax": 0.88,
        "1x2_pct": {
          "home": 55.6,
          "draw": 25.9,
          "away": 18.5
        },
        "over_2_5_pct": 47.4,
        "btts_yes_pct": 48.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.69,
        "ax_baseline": 0.88,
        "hx_v3": 1.7739,
        "ax_v3": 0.9189,
        "delta_total_lambda_pct": 4.78,
        "components_pct": {
          "referee_strictness": 0.96,
          "penalty_risk": 2.79,
          "home_discipline": 1.22,
          "away_discipline": 0.67
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 56.7,
          "draw": 25.0,
          "away": 18.4
        },
        "over_2_5_pct": 50.5,
        "btts_yes_pct": 50.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 55.6,
          "v3_pct": 56.7,
          "delta_pts": 1.03
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.9,
          "v3_pct": 25.0,
          "delta_pts": -0.89
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 18.5,
          "v3_pct": 18.4,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 48.6,
          "v3_pct": 50.8,
          "delta_pts": 2.15
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 51.4,
          "v3_pct": 49.2,
          "delta_pts": -2.16
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 73.6,
          "v3_pct": 75.9,
          "delta_pts": 2.3
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 26.4,
          "v3_pct": 24.1,
          "delta_pts": -2.3
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 47.4,
          "v3_pct": 50.5,
          "delta_pts": 3.06
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 52.6,
          "v3_pct": 49.5,
          "delta_pts": -3.06
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 25.7,
          "v3_pct": 28.4,
          "delta_pts": 2.68
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 74.3,
          "v3_pct": 71.6,
          "delta_pts": -2.68
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.24,
        "lambda_red_card": 0.1781,
        "prob_red_card_in_match_pct": 16.3,
        "lambda_penalty": 0.2905,
        "prob_penalty_in_match_pct": 25.2,
        "confidence": "high",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.1846,
          "ref_pen_shrunk": 0.2769,
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
          "assigned_name": "Clement TURPIN",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.3083,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.8,
          "matches_refereed": 5,
          "match_method": "family_name",
          "confidence": "high",
          "raw": {
            "yellow_per_match": 2.0,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.4
          }
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
          "match_card_risk": 0.0571,
          "penalty_risk": 0.4652
        },
        "fifa_result": {
          "match_id_fifa": "400021507",
          "event_name": "England vs. Croatia",
          "kickoff": "17 June 2026, 17:00",
          "referee": "Clément Turpin",
          "home_score": 4.0,
          "away_score": 2.0,
          "status": "full_time",
          "city": "Dallas",
          "location": "Dallas Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
      "fixture_id": "23",
      "event_name": "Gana x Panamá",
      "home_team": "Ghana",
      "away_team": "Panama",
      "referee": {
        "assigned_name": "Glenn NYBERG",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021510",
        "event_name": "Ghana vs. Panama",
        "kickoff": "17 June 2026, 20:00",
        "referee": "Glenn Nyberg",
        "home_score": 1.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "Toronto",
        "location": "Toronto Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 1.56,
        "ax": 1.13,
        "1x2_pct": {
          "home": 46.3,
          "draw": 27.1,
          "away": 26.6
        },
        "over_2_5_pct": 50.4,
        "btts_yes_pct": 54.4
      },
      "v3_adjustment": {
        "hx_baseline": 1.56,
        "ax_baseline": 1.13,
        "hx_v3": 1.5617,
        "ax_v3": 1.13,
        "delta_total_lambda_pct": 0.06,
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
          "home": 46.3,
          "draw": 27.1,
          "away": 26.6
        },
        "over_2_5_pct": 50.4,
        "btts_yes_pct": 54.5
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
          "assigned_name": "Glenn NYBERG",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "fifa_result": {
          "match_id_fifa": "400021510",
          "event_name": "Ghana vs. Panama",
          "kickoff": "17 June 2026, 20:00",
          "referee": "Glenn Nyberg",
          "home_score": 1.0,
          "away_score": 0.0,
          "status": "full_time",
          "city": "Toronto",
          "location": "Toronto Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
      "fixture_id": "24",
      "event_name": "Uzbequistão x Colômbia",
      "home_team": "Uzbekistan",
      "away_team": "Colombia",
      "referee": {
        "assigned_name": "Anthony TAYLOR",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.0833,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 2,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 2.5,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.0
        }
      },
      "fifa_result": {
        "match_id_fifa": "400021504",
        "event_name": "Uzbekistan vs. Colombia",
        "kickoff": "17 June 2026, 23:00",
        "referee": "Anthony Taylor",
        "home_score": 1.0,
        "away_score": 3.0,
        "status": "full_time",
        "city": "Mexico City",
        "location": "Mexico City Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 0.7,
        "ax": 2.01,
        "1x2_pct": {
          "home": 11.2,
          "draw": 21.4,
          "away": 67.4
        },
        "over_2_5_pct": 50.9,
        "btts_yes_pct": 44.3
      },
      "v3_adjustment": {
        "hx_baseline": 0.7,
        "ax_baseline": 2.01,
        "hx_v3": 0.7146,
        "ax_v3": 2.068,
        "delta_total_lambda_pct": 2.68,
        "components_pct": {
          "referee_strictness": 2.08,
          "penalty_risk": 0.0,
          "home_discipline": 0.0,
          "away_discipline": 0.8
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 11.0,
          "draw": 20.8,
          "away": 68.2
        },
        "over_2_5_pct": 52.6,
        "btts_yes_pct": 45.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 11.2,
          "v3_pct": 11.0,
          "delta_pts": -0.2
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 21.4,
          "v3_pct": 20.8,
          "delta_pts": -0.59
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 67.4,
          "v3_pct": 68.2,
          "delta_pts": 0.79
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.3,
          "v3_pct": 45.3,
          "delta_pts": 0.99
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.7,
          "v3_pct": 54.7,
          "delta_pts": -0.99
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.1,
          "v3_pct": 77.3,
          "delta_pts": 1.26
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.9,
          "v3_pct": 22.7,
          "delta_pts": -1.26
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 50.9,
          "v3_pct": 52.6,
          "delta_pts": 1.76
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 49.1,
          "v3_pct": 47.4,
          "delta_pts": -1.76
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 28.8,
          "v3_pct": 30.4,
          "delta_pts": 1.61
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 71.2,
          "v3_pct": 69.6,
          "delta_pts": -1.61
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.2,
        "lambda_red_card": 0.2577,
        "prob_red_card_in_match_pct": 22.7,
        "lambda_penalty": 0.16,
        "prob_penalty_in_match_pct": 14.8,
        "confidence": "low",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.24,
          "ref_pen_shrunk": 0.16,
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
          "assigned_name": "Anthony TAYLOR",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.0833,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 2,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 2.5,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.0
          }
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
        "fifa_result": {
          "match_id_fifa": "400021504",
          "event_name": "Uzbekistan vs. Colombia",
          "kickoff": "17 June 2026, 23:00",
          "referee": "Anthony Taylor",
          "home_score": 1.0,
          "away_score": 3.0,
          "status": "full_time",
          "city": "Mexico City",
          "location": "Mexico City Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
      "fixture_id": "25",
      "event_name": "República Tcheca x África do Sul",
      "home_team": "Czech Republic",
      "away_team": "South Africa",
      "referee": {
        "assigned_name": "Tori PENSO",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021440",
        "event_name": "Czechia vs. South Africa",
        "kickoff": "18 June 2026, 13:00",
        "referee": "Tori Penso",
        "home_score": 1.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "Atlanta",
        "location": "Atlanta Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 1.47,
        "ax": 0.93,
        "1x2_pct": {
          "home": 48.7,
          "draw": 28.4,
          "away": 22.9
        },
        "over_2_5_pct": 43.0,
        "btts_yes_pct": 47.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.47,
        "ax_baseline": 0.93,
        "hx_v3": 1.4627,
        "ax_v3": 0.9296,
        "delta_total_lambda_pct": -0.32,
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
          "home": 48.5,
          "draw": 28.5,
          "away": 23.0
        },
        "over_2_5_pct": 42.8,
        "btts_yes_pct": 47.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 48.7,
          "v3_pct": 48.5,
          "delta_pts": -0.19
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.4,
          "v3_pct": 28.5,
          "delta_pts": 0.08
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 22.9,
          "v3_pct": 23.0,
          "delta_pts": 0.1
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 47.6,
          "v3_pct": 47.5,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 52.4,
          "v3_pct": 52.5,
          "delta_pts": 0.11
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 70.1,
          "v3_pct": 70.0,
          "delta_pts": -0.17
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 29.9,
          "v3_pct": 30.0,
          "delta_pts": 0.17
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 43.0,
          "v3_pct": 42.8,
          "delta_pts": -0.2
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 57.0,
          "v3_pct": 57.2,
          "delta_pts": 0.2
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 22.1,
          "v3_pct": 22.0,
          "delta_pts": -0.16
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 77.9,
          "v3_pct": 78.0,
          "delta_pts": 0.16
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
          "assigned_name": "Tori PENSO",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "fifa_result": {
          "match_id_fifa": "400021440",
          "event_name": "Czechia vs. South Africa",
          "kickoff": "18 June 2026, 13:00",
          "referee": "Tori Penso",
          "home_score": 1.0,
          "away_score": 1.0,
          "status": "full_time",
          "city": "Atlanta",
          "location": "Atlanta Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
      "fixture_id": "26",
      "event_name": "Suíça x Bósnia & Herzegovina",
      "home_team": "Switzerland",
      "away_team": "Bosnia and Herzegovina",
      "referee": {
        "assigned_name": "Joao PINHEIRO",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_match",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021446",
        "event_name": "Switzerland vs. Bosnia and Herzegovina",
        "kickoff": "18 June 2026, 16:00",
        "referee": "João Pedro Silva Pinheiro",
        "home_score": 4.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "Los Angeles",
        "location": "Los Angeles Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 2.0,
        "ax": 0.8,
        "1x2_pct": {
          "home": 64.7,
          "draw": 22.0,
          "away": 13.3
        },
        "over_2_5_pct": 53.1,
        "btts_yes_pct": 48.4
      },
      "v3_adjustment": {
        "hx_baseline": 2.0,
        "ax_baseline": 0.8,
        "hx_v3": 2.0098,
        "ax_v3": 0.81,
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
          "home": 64.6,
          "draw": 22.0,
          "away": 13.4
        },
        "over_2_5_pct": 53.5,
        "btts_yes_pct": 48.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 22.0,
          "v3_pct": 22.0,
          "delta_pts": -0.06
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 13.3,
          "v3_pct": 13.4,
          "delta_pts": 0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 48.4,
          "v3_pct": 48.9,
          "delta_pts": 0.46
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 51.6,
          "v3_pct": 51.1,
          "delta_pts": -0.46
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.7,
          "v3_pct": 78.0,
          "delta_pts": 0.33
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.3,
          "v3_pct": 22.0,
          "delta_pts": -0.33
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
          "v3_pct": 31.2,
          "delta_pts": 0.44
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 69.2,
          "v3_pct": 68.8,
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
          "assigned_name": "Joao PINHEIRO",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_match",
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
        "fifa_result": {
          "match_id_fifa": "400021446",
          "event_name": "Switzerland vs. Bosnia and Herzegovina",
          "kickoff": "18 June 2026, 16:00",
          "referee": "João Pedro Silva Pinheiro",
          "home_score": 4.0,
          "away_score": 1.0,
          "status": "full_time",
          "city": "Los Angeles",
          "location": "Los Angeles Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
      "fixture_id": "27",
      "event_name": "Canadá x Qatar",
      "home_team": "Canada",
      "away_team": "Qatar",
      "referee": {
        "assigned_name": "Cristian GARAY",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021450",
        "event_name": "Canada vs. Qatar",
        "kickoff": "18 June 2026, 19:00",
        "referee": "Cristián Marcelo Garay Reyes",
        "home_score": 6.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "Vancouver",
        "location": "BC Place Vancouver",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 2.26,
        "ax": 0.62,
        "1x2_pct": {
          "home": 74.1,
          "draw": 18.0,
          "away": 8.0
        },
        "over_2_5_pct": 54.9,
        "btts_yes_pct": 42.0
      },
      "v3_adjustment": {
        "hx_baseline": 2.26,
        "ax_baseline": 0.62,
        "hx_v3": 2.2741,
        "ax_v3": 0.6241,
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
          "home": 74.2,
          "draw": 17.8,
          "away": 8.0
        },
        "over_2_5_pct": 55.4,
        "btts_yes_pct": 42.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 74.1,
          "v3_pct": 74.2,
          "delta_pts": 0.14
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 18.0,
          "v3_pct": 17.8,
          "delta_pts": -0.12
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 42.0,
          "v3_pct": 42.3,
          "delta_pts": 0.26
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 58.0,
          "v3_pct": 57.7,
          "delta_pts": -0.26
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 78.8,
          "v3_pct": 79.1,
          "delta_pts": 0.29
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 21.2,
          "v3_pct": 20.9,
          "delta_pts": -0.29
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 54.9,
          "v3_pct": 55.4,
          "delta_pts": 0.42
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 45.1,
          "v3_pct": 44.6,
          "delta_pts": -0.42
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 32.6,
          "v3_pct": 33.0,
          "delta_pts": 0.41
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 67.4,
          "v3_pct": 67.0,
          "delta_pts": -0.41
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
          "assigned_name": "Cristian GARAY",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "fifa_result": {
          "match_id_fifa": "400021450",
          "event_name": "Canada vs. Qatar",
          "kickoff": "18 June 2026, 19:00",
          "referee": "Cristián Marcelo Garay Reyes",
          "home_score": 6.0,
          "away_score": 0.0,
          "status": "full_time",
          "city": "Vancouver",
          "location": "BC Place Vancouver",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
      "fixture_id": "28",
      "event_name": "México x República da Coreia",
      "home_team": "Mexico",
      "away_team": "South Korea",
      "referee": {
        "assigned_name": "Gustavo TEJERA",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021442",
        "event_name": "Mexico vs. Korea Republic",
        "kickoff": "18 June 2026, 22:00",
        "referee": "Gustavo Tejera",
        "home_score": 1.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "Guadalajara",
        "location": "Guadalajara Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 1.56,
        "ax": 0.87,
        "1x2_pct": {
          "home": 52.6,
          "draw": 27.4,
          "away": 20.0
        },
        "over_2_5_pct": 43.8,
        "btts_yes_pct": 46.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.56,
        "ax_baseline": 0.87,
        "hx_v3": 1.5609,
        "ax_v3": 0.8768,
        "delta_total_lambda_pct": 0.32,
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
          "home": 52.5,
          "draw": 27.4,
          "away": 20.2
        },
        "over_2_5_pct": 44.0,
        "btts_yes_pct": 47.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 52.6,
          "v3_pct": 52.5,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 20.0,
          "v3_pct": 20.2,
          "delta_pts": 0.16
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 46.9,
          "v3_pct": 47.1,
          "delta_pts": 0.24
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 53.1,
          "v3_pct": 52.9,
          "delta_pts": -0.24
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 70.8,
          "v3_pct": 70.9,
          "delta_pts": 0.16
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 29.2,
          "v3_pct": 29.1,
          "delta_pts": -0.16
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 43.8,
          "v3_pct": 44.0,
          "delta_pts": 0.2
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 56.2,
          "v3_pct": 56.0,
          "delta_pts": -0.2
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 22.8,
          "v3_pct": 22.9,
          "delta_pts": 0.16
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 77.2,
          "v3_pct": 77.1,
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
          "assigned_name": "Gustavo TEJERA",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "fifa_result": {
          "match_id_fifa": "400021442",
          "event_name": "Mexico vs. Korea Republic",
          "kickoff": "18 June 2026, 22:00",
          "referee": "Gustavo Tejera",
          "home_score": 1.0,
          "away_score": 0.0,
          "status": "full_time",
          "city": "Guadalajara",
          "location": "Guadalajara Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
      "fixture_id": "29",
      "event_name": "EUA x Austrália",
      "home_team": "United States",
      "away_team": "Australia",
      "referee": {
        "assigned_name": "Felix ZWAYER",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021462",
        "event_name": "USA vs. Australia",
        "kickoff": "19 June 2026, 16:00",
        "referee": "",
        "home_score": 2.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "Seattle",
        "location": "Seattle Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 1.8,
        "ax": 1.09,
        "1x2_pct": {
          "home": 53.1,
          "draw": 24.9,
          "away": 22.0
        },
        "over_2_5_pct": 55.2,
        "btts_yes_pct": 56.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.8,
        "ax_baseline": 1.09,
        "hx_v3": 1.8164,
        "ax_v3": 1.0959,
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
          "home": 53.4,
          "draw": 24.7,
          "away": 21.9
        },
        "over_2_5_pct": 55.7,
        "btts_yes_pct": 56.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 53.1,
          "v3_pct": 53.4,
          "delta_pts": 0.25
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.9,
          "v3_pct": 24.7,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 22.0,
          "v3_pct": 21.9,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 56.3,
          "v3_pct": 56.6,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 43.7,
          "v3_pct": 43.4,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 79.3,
          "v3_pct": 79.6,
          "delta_pts": 0.35
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 20.7,
          "v3_pct": 20.4,
          "delta_pts": -0.35
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 55.2,
          "v3_pct": 55.7,
          "delta_pts": 0.52
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 44.8,
          "v3_pct": 44.3,
          "delta_pts": -0.52
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 32.8,
          "v3_pct": 33.3,
          "delta_pts": 0.5
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 67.2,
          "v3_pct": 66.7,
          "delta_pts": -0.5
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
          "assigned_name": "Felix ZWAYER",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "home_score": 2.0,
          "away_score": 0.0,
          "status": "full_time",
          "city": "Seattle",
          "location": "Seattle Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
        "assigned_name": "Ilgiz TANTASHEV",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021454",
        "event_name": "Scotland vs. Morocco",
        "kickoff": "19 June 2026, 19:00",
        "referee": "",
        "home_score": 0.0,
        "away_score": 1.0,
        "status": "full_time",
        "city": "Boston",
        "location": "Boston Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 0.53,
        "ax": 1.58,
        "1x2_pct": {
          "home": 11.4,
          "draw": 26.2,
          "away": 62.4
        },
        "over_2_5_pct": 35.3,
        "btts_yes_pct": 33.5
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
          "home": 11.5,
          "draw": 26.2,
          "away": 62.4
        },
        "over_2_5_pct": 35.6,
        "btts_yes_pct": 33.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 11.4,
          "v3_pct": 11.5,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.2,
          "v3_pct": 26.2,
          "delta_pts": -0.06
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 33.5,
          "v3_pct": 33.8,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 66.5,
          "v3_pct": 66.2,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 63.1,
          "v3_pct": 63.4,
          "delta_pts": 0.31
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 36.9,
          "v3_pct": 36.6,
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
          "assigned_name": "Ilgiz TANTASHEV",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "home_score": 0.0,
          "away_score": 1.0,
          "status": "full_time",
          "city": "Boston",
          "location": "Boston Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
        "assigned_name": "Alejandro HERNANDEZ",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021457",
        "event_name": "Brazil vs. Haiti",
        "kickoff": "19 June 2026, 21:30",
        "referee": "",
        "home_score": 3.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "Philadelphia",
        "location": "Philadelphia Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 2.53,
        "ax": 0.44,
        "1x2_pct": {
          "home": 82.3,
          "draw": 13.6,
          "away": 4.1
        },
        "over_2_5_pct": 57.0,
        "btts_yes_pct": 33.2
      },
      "v3_adjustment": {
        "hx_baseline": 2.53,
        "ax_baseline": 0.44,
        "hx_v3": 2.5503,
        "ax_v3": 0.4455,
        "delta_total_lambda_pct": 0.87,
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
          "home": 82.5,
          "draw": 13.4,
          "away": 4.1
        },
        "over_2_5_pct": 57.6,
        "btts_yes_pct": 33.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 82.3,
          "v3_pct": 82.5,
          "delta_pts": 0.14
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 13.6,
          "v3_pct": 13.4,
          "delta_pts": -0.13
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 33.2,
          "v3_pct": 33.6,
          "delta_pts": 0.38
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 66.8,
          "v3_pct": 66.4,
          "delta_pts": -0.38
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 80.1,
          "v3_pct": 80.5,
          "delta_pts": 0.39
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 19.9,
          "v3_pct": 19.5,
          "delta_pts": -0.39
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 57.0,
          "v3_pct": 57.6,
          "delta_pts": 0.58
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 43.0,
          "v3_pct": 42.4,
          "delta_pts": -0.58
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 34.6,
          "v3_pct": 35.2,
          "delta_pts": 0.58
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 65.4,
          "v3_pct": 64.8,
          "delta_pts": -0.58
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
          "assigned_name": "Alejandro HERNANDEZ",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "home_score": 3.0,
          "away_score": 0.0,
          "status": "full_time",
          "city": "Philadelphia",
          "location": "Philadelphia Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
        "assigned_name": "Ivan BARTON",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.2222,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.6666,
        "matches_refereed": 3,
        "match_method": "family_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 1.0,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.3333
        }
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.43,
        "ax": 1.06,
        "1x2_pct": {
          "home": 44.5,
          "draw": 28.5,
          "away": 27.0
        },
        "over_2_5_pct": 45.4,
        "btts_yes_pct": 50.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.43,
        "ax_baseline": 1.06,
        "hx_v3": 1.4567,
        "ax_v3": 1.084,
        "delta_total_lambda_pct": 2.03,
        "components_pct": {
          "referee_strictness": 1.39,
          "penalty_risk": 0.0,
          "home_discipline": 0.47,
          "away_discipline": 0.87
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 44.7,
          "draw": 28.2,
          "away": 27.1
        },
        "over_2_5_pct": 46.7,
        "btts_yes_pct": 51.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 44.5,
          "v3_pct": 44.7,
          "delta_pts": 0.15
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.5,
          "v3_pct": 28.2,
          "delta_pts": -0.33
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 27.0,
          "v3_pct": 27.1,
          "delta_pts": 0.18
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 50.7,
          "v3_pct": 51.8,
          "delta_pts": 1.03
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 49.3,
          "v3_pct": 48.2,
          "delta_pts": -1.03
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.1,
          "v3_pct": 73.1,
          "delta_pts": 1.02
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.9,
          "v3_pct": 26.9,
          "delta_pts": -1.02
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 45.4,
          "v3_pct": 46.7,
          "delta_pts": 1.3
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 54.6,
          "v3_pct": 53.3,
          "delta_pts": -1.3
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.0,
          "v3_pct": 25.1,
          "delta_pts": 1.09
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 76.0,
          "v3_pct": 74.9,
          "delta_pts": -1.09
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.77,
        "lambda_red_card": 0.2348,
        "prob_red_card_in_match_pct": 20.9,
        "lambda_penalty": 0.2364,
        "prob_penalty_in_match_pct": 21.0,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.2182,
          "ref_pen_shrunk": 0.2364,
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
          "assigned_name": "Ivan BARTON",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.2222,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.6666,
          "matches_refereed": 3,
          "match_method": "family_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 1.0,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.3333
          }
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
          "match_card_risk": 0.0613,
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
        "assigned_name": "Michael OLIVER",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.3333,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 3,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 6.0,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.0
        }
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.28,
        "ax": 1.08,
        "1x2_pct": {
          "home": 63.6,
          "draw": 20.3,
          "away": 16.0
        },
        "over_2_5_pct": 65.2,
        "btts_yes_pct": 60.0
      },
      "v3_adjustment": {
        "hx_baseline": 2.28,
        "ax_baseline": 1.08,
        "hx_v3": 2.2901,
        "ax_v3": 1.1022,
        "delta_total_lambda_pct": 0.96,
        "components_pct": {
          "referee_strictness": 0.83,
          "penalty_risk": 0.0,
          "home_discipline": -0.39,
          "away_discipline": 1.22
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 63.3,
          "draw": 20.3,
          "away": 16.3
        },
        "over_2_5_pct": 65.9,
        "btts_yes_pct": 60.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 63.6,
          "v3_pct": 63.3,
          "delta_pts": -0.3
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 16.0,
          "v3_pct": 16.3,
          "delta_pts": 0.32
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 60.0,
          "v3_pct": 60.7,
          "delta_pts": 0.73
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 40.0,
          "v3_pct": 39.3,
          "delta_pts": -0.73
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 85.5,
          "v3_pct": 85.9,
          "delta_pts": 0.37
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 14.5,
          "v3_pct": 14.1,
          "delta_pts": -0.37
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 65.2,
          "v3_pct": 65.9,
          "delta_pts": 0.63
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 34.8,
          "v3_pct": 34.1,
          "delta_pts": -0.63
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 43.3,
          "v3_pct": 44.0,
          "delta_pts": 0.71
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 56.7,
          "v3_pct": 56.0,
          "delta_pts": -0.71
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 4.0,
        "lambda_red_card": 0.2479,
        "prob_red_card_in_match_pct": 22.0,
        "lambda_penalty": 0.1385,
        "prob_penalty_in_match_pct": 12.9,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.2182,
          "ref_pen_shrunk": 0.1455,
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
          "assigned_name": "Michael OLIVER",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.3333,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 3,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 6.0,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.0
          }
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
          "match_card_risk": 0.1204,
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
        "assigned_name": "Juan Gabriel BENITEZ",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.08,
        "ax": 1.03,
        "1x2_pct": {
          "home": 60.8,
          "draw": 22.1,
          "away": 17.2
        },
        "over_2_5_pct": 60.1,
        "btts_yes_pct": 57.0
      },
      "v3_adjustment": {
        "hx_baseline": 2.08,
        "ax_baseline": 1.03,
        "hx_v3": 2.1056,
        "ax_v3": 1.036,
        "delta_total_lambda_pct": 1.02,
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
          "home": 61.2,
          "draw": 21.8,
          "away": 17.0
        },
        "over_2_5_pct": 60.8,
        "btts_yes_pct": 57.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 60.8,
          "v3_pct": 61.2,
          "delta_pts": 0.39
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 22.1,
          "v3_pct": 21.8,
          "delta_pts": -0.23
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 17.2,
          "v3_pct": 17.0,
          "delta_pts": -0.16
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 57.0,
          "v3_pct": 57.4,
          "delta_pts": 0.38
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 43.0,
          "v3_pct": 42.6,
          "delta_pts": -0.38
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 82.4,
          "v3_pct": 82.9,
          "delta_pts": 0.42
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 17.6,
          "v3_pct": 17.1,
          "delta_pts": -0.42
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 60.1,
          "v3_pct": 60.8,
          "delta_pts": 0.68
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 39.9,
          "v3_pct": 39.2,
          "delta_pts": -0.68
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 37.7,
          "v3_pct": 38.4,
          "delta_pts": 0.71
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 62.3,
          "v3_pct": 61.6,
          "delta_pts": -0.71
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
          "assigned_name": "Juan Gabriel BENITEZ",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "MA Ning",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.35,
        "ax": 0.42,
        "1x2_pct": {
          "home": 80.3,
          "draw": 15.1,
          "away": 4.5
        },
        "over_2_5_pct": 52.3,
        "btts_yes_pct": 31.5
      },
      "v3_adjustment": {
        "hx_baseline": 2.35,
        "ax_baseline": 0.42,
        "hx_v3": 2.3564,
        "ax_v3": 0.42,
        "delta_total_lambda_pct": 0.23,
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
          "home": 80.4,
          "draw": 15.1,
          "away": 4.5
        },
        "over_2_5_pct": 52.5,
        "btts_yes_pct": 31.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 80.3,
          "v3_pct": 80.4,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 15.1,
          "v3_pct": 15.1,
          "delta_pts": -0.07
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.9,
          "v3_pct": 77.0,
          "delta_pts": 0.11
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.1,
          "v3_pct": 23.0,
          "delta_pts": -0.11
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 52.3,
          "v3_pct": 52.5,
          "delta_pts": 0.15
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 47.7,
          "v3_pct": 47.5,
          "delta_pts": -0.15
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 30.1,
          "v3_pct": 30.3,
          "delta_pts": 0.14
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 69.9,
          "v3_pct": 69.7,
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
          "assigned_name": "MA Ning",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Istvan KOVACS",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.64,
        "ax": 1.46,
        "1x2_pct": {
          "home": 15.4,
          "draw": 28.5,
          "away": 56.1
        },
        "over_2_5_pct": 35.0,
        "btts_yes_pct": 37.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.64,
        "ax_baseline": 1.46,
        "hx_v3": 0.6434,
        "ax_v3": 1.4681,
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
          "home": 15.4,
          "draw": 28.4,
          "away": 56.3
        },
        "over_2_5_pct": 35.3,
        "btts_yes_pct": 37.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 28.5,
          "v3_pct": 28.4,
          "delta_pts": -0.11
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 56.1,
          "v3_pct": 56.3,
          "delta_pts": 0.12
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 37.2,
          "v3_pct": 37.4,
          "delta_pts": 0.23
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 62.8,
          "v3_pct": 62.6,
          "delta_pts": -0.23
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 63.0,
          "v3_pct": 63.2,
          "delta_pts": 0.29
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 37.0,
          "v3_pct": 36.8,
          "delta_pts": -0.29
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 35.0,
          "v3_pct": 35.3,
          "delta_pts": 0.31
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 65.0,
          "v3_pct": 64.7,
          "delta_pts": -0.31
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 16.1,
          "v3_pct": 16.4,
          "delta_pts": 0.22
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 83.9,
          "v3_pct": 83.6,
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
          "assigned_name": "Istvan KOVACS",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Raphael CLAUS",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.4583,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 1.0,
        "matches_refereed": 2,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 3.0,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.5
        }
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.46,
        "ax": 0.36,
        "1x2_pct": {
          "home": 83.2,
          "draw": 13.4,
          "away": 3.4
        },
        "over_2_5_pct": 53.5,
        "btts_yes_pct": 28.1
      },
      "v3_adjustment": {
        "hx_baseline": 2.46,
        "ax_baseline": 0.36,
        "hx_v3": 2.5695,
        "ax_v3": 0.3697,
        "delta_total_lambda_pct": 4.23,
        "components_pct": {
          "referee_strictness": 0.21,
          "penalty_risk": 3.02,
          "home_discipline": 1.22,
          "away_discipline": -0.54
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 84.4,
          "draw": 12.4,
          "away": 3.2
        },
        "over_2_5_pct": 56.3,
        "btts_yes_pct": 28.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 83.2,
          "v3_pct": 84.4,
          "delta_pts": 1.13
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 13.4,
          "v3_pct": 12.4,
          "delta_pts": -0.93
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 3.4,
          "v3_pct": 3.2,
          "delta_pts": -0.21
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 28.1,
          "v3_pct": 28.9,
          "delta_pts": 0.87
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 71.9,
          "v3_pct": 71.1,
          "delta_pts": -0.87
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.7,
          "v3_pct": 79.6,
          "delta_pts": 1.91
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.3,
          "v3_pct": 20.4,
          "delta_pts": -1.91
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 53.5,
          "v3_pct": 56.3,
          "delta_pts": 2.77
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 46.5,
          "v3_pct": 43.7,
          "delta_pts": -2.77
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 31.2,
          "v3_pct": 33.9,
          "delta_pts": 2.66
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 68.8,
          "v3_pct": 66.1,
          "delta_pts": -2.66
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.93,
        "lambda_red_card": 0.199,
        "prob_red_card_in_match_pct": 18.0,
        "lambda_penalty": 0.2606,
        "prob_penalty_in_match_pct": 22.9,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.24,
          "ref_pen_shrunk": 0.26,
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
          "assigned_name": "Raphael CLAUS",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.4583,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 1.0,
          "matches_refereed": 2,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 3.0,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.5
          }
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
          "match_card_risk": 0.1773,
          "penalty_risk": 0.5041
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
        "assigned_name": "Dario HERRERA",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.95,
        "ax": 0.9,
        "1x2_pct": {
          "home": 61.1,
          "draw": 23.0,
          "away": 15.9
        },
        "over_2_5_pct": 54.2,
        "btts_yes_pct": 51.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.95,
        "ax_baseline": 0.9,
        "hx_v3": 1.9684,
        "ax_v3": 0.9047,
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
          "home": 61.4,
          "draw": 22.8,
          "away": 15.8
        },
        "over_2_5_pct": 54.8,
        "btts_yes_pct": 52.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 61.1,
          "v3_pct": 61.4,
          "delta_pts": 0.28
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.0,
          "v3_pct": 22.8,
          "delta_pts": -0.18
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 15.9,
          "v3_pct": 15.8,
          "delta_pts": -0.1
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 51.7,
          "v3_pct": 52.0,
          "delta_pts": 0.31
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 48.3,
          "v3_pct": 48.0,
          "delta_pts": -0.31
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 78.5,
          "v3_pct": 78.9,
          "delta_pts": 0.37
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 21.5,
          "v3_pct": 21.1,
          "delta_pts": -0.37
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 54.2,
          "v3_pct": 54.8,
          "delta_pts": 0.54
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 45.8,
          "v3_pct": 45.2,
          "delta_pts": -0.54
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 31.9,
          "v3_pct": 32.4,
          "delta_pts": 0.52
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 68.1,
          "v3_pct": 67.6,
          "delta_pts": -0.52
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
          "assigned_name": "Dario HERRERA",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Espen ESKAS",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.67,
        "ax": 0.6,
        "1x2_pct": {
          "home": 62.6,
          "draw": 25.2,
          "away": 12.2
        },
        "over_2_5_pct": 39.6,
        "btts_yes_pct": 37.5
      },
      "v3_adjustment": {
        "hx_baseline": 1.67,
        "ax_baseline": 0.6,
        "hx_v3": 1.679,
        "ax_v3": 0.6,
        "delta_total_lambda_pct": 0.4,
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
          "home": 62.8,
          "draw": 25.1,
          "away": 12.1
        },
        "over_2_5_pct": 39.8,
        "btts_yes_pct": 37.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 62.6,
          "v3_pct": 62.8,
          "delta_pts": 0.21
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.2,
          "v3_pct": 25.1,
          "delta_pts": -0.13
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 12.2,
          "v3_pct": 12.1,
          "delta_pts": -0.09
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 37.5,
          "v3_pct": 37.5,
          "delta_pts": 0.07
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 62.5,
          "v3_pct": 62.5,
          "delta_pts": -0.07
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 67.0,
          "v3_pct": 67.3,
          "delta_pts": 0.21
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 33.0,
          "v3_pct": 32.7,
          "delta_pts": -0.21
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 39.6,
          "v3_pct": 39.8,
          "delta_pts": 0.24
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 60.4,
          "v3_pct": 60.2,
          "delta_pts": -0.24
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 19.5,
          "v3_pct": 19.6,
          "delta_pts": 0.18
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 80.5,
          "v3_pct": 80.4,
          "delta_pts": -0.18
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
          "assigned_name": "Espen ESKAS",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Omar ALALI",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_match",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.87,
        "ax": 1.68,
        "1x2_pct": {
          "home": 18.4,
          "draw": 26.0,
          "away": 55.6
        },
        "over_2_5_pct": 46.9,
        "btts_yes_pct": 48.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.87,
        "ax_baseline": 1.68,
        "hx_v3": 0.8809,
        "ax_v3": 1.6986,
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
          "home": 18.4,
          "draw": 25.8,
          "away": 55.8
        },
        "over_2_5_pct": 47.6,
        "btts_yes_pct": 48.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.0,
          "v3_pct": 25.8,
          "delta_pts": -0.2
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 55.6,
          "v3_pct": 55.8,
          "delta_pts": 0.18
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 48.2,
          "v3_pct": 48.8,
          "delta_pts": 0.56
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 51.8,
          "v3_pct": 51.2,
          "delta_pts": -0.56
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 73.2,
          "v3_pct": 73.8,
          "delta_pts": 0.58
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 26.8,
          "v3_pct": 26.2,
          "delta_pts": -0.58
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 46.9,
          "v3_pct": 47.6,
          "delta_pts": 0.75
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 53.1,
          "v3_pct": 52.4,
          "delta_pts": -0.75
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 25.3,
          "v3_pct": 26.0,
          "delta_pts": 0.64
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 74.7,
          "v3_pct": 74.0,
          "delta_pts": -0.64
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
          "assigned_name": "Omar ALALI",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_match",
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
        "assigned_name": "Amin MOHAMED",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.46,
        "ax": 0.64,
        "1x2_pct": {
          "home": 56.1,
          "draw": 28.5,
          "away": 15.4
        },
        "over_2_5_pct": 35.0,
        "btts_yes_pct": 37.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.46,
        "ax_baseline": 0.64,
        "hx_v3": 1.4643,
        "ax_v3": 0.6478,
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
          "home": 56.0,
          "draw": 28.4,
          "away": 15.5
        },
        "over_2_5_pct": 35.4,
        "btts_yes_pct": 37.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 56.1,
          "v3_pct": 56.0,
          "delta_pts": -0.1
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 15.4,
          "v3_pct": 15.5,
          "delta_pts": 0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 37.2,
          "v3_pct": 37.6,
          "delta_pts": 0.36
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 62.8,
          "v3_pct": 62.4,
          "delta_pts": -0.37
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 63.0,
          "v3_pct": 63.3,
          "delta_pts": 0.31
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 37.0,
          "v3_pct": 36.7,
          "delta_pts": -0.31
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 35.0,
          "v3_pct": 35.4,
          "delta_pts": 0.33
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 65.0,
          "v3_pct": 64.6,
          "delta_pts": -0.33
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 16.1,
          "v3_pct": 16.4,
          "delta_pts": 0.23
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 83.9,
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
          "assigned_name": "Amin MOHAMED",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Drew FISCHER",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.41,
        "ax": 0.34,
        "1x2_pct": {
          "home": 83.0,
          "draw": 13.6,
          "away": 3.3
        },
        "over_2_5_pct": 51.9,
        "btts_yes_pct": 26.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.41,
        "ax_baseline": 0.34,
        "hx_v3": 2.4357,
        "ax_v3": 0.3366,
        "delta_total_lambda_pct": 0.81,
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
          "home": 83.5,
          "draw": 13.3,
          "away": 3.2
        },
        "over_2_5_pct": 52.4,
        "btts_yes_pct": 26.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 83.0,
          "v3_pct": 83.5,
          "delta_pts": 0.41
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 13.6,
          "v3_pct": 13.3,
          "delta_pts": -0.3
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 3.3,
          "v3_pct": 3.2,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 26.7,
          "v3_pct": 26.5,
          "delta_pts": -0.16
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 73.3,
          "v3_pct": 73.5,
          "delta_pts": 0.16
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.4,
          "v3_pct": 76.8,
          "delta_pts": 0.38
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.6,
          "v3_pct": 23.2,
          "delta_pts": -0.38
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 51.9,
          "v3_pct": 52.4,
          "delta_pts": 0.54
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 48.1,
          "v3_pct": 47.6,
          "delta_pts": -0.54
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 29.7,
          "v3_pct": 30.2,
          "delta_pts": 0.49
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 70.3,
          "v3_pct": 69.8,
          "delta_pts": -0.49
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
          "assigned_name": "Drew FISCHER",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Wilton SAMPAIO",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.3333,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.5,
        "matches_refereed": 4,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 3.5,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.25
        }
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.52,
        "ax": 1.32,
        "1x2_pct": {
          "home": 41.1,
          "draw": 26.8,
          "away": 32.1
        },
        "over_2_5_pct": 54.0,
        "btts_yes_pct": 58.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.52,
        "ax_baseline": 1.32,
        "hx_v3": 1.5523,
        "ax_v3": 1.3385,
        "delta_total_lambda_pct": 1.79,
        "components_pct": {
          "referee_strictness": 0.83,
          "penalty_risk": 0.0,
          "home_discipline": 1.29,
          "away_discipline": 0.57
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 41.5,
          "draw": 26.5,
          "away": 32.0
        },
        "over_2_5_pct": 55.2,
        "btts_yes_pct": 59.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 41.1,
          "v3_pct": 41.5,
          "delta_pts": 0.42
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.8,
          "v3_pct": 26.5,
          "delta_pts": -0.3
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 32.1,
          "v3_pct": 32.0,
          "delta_pts": -0.12
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 58.2,
          "v3_pct": 59.1,
          "delta_pts": 0.88
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 41.8,
          "v3_pct": 40.9,
          "delta_pts": -0.88
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 78.5,
          "v3_pct": 79.3,
          "delta_pts": 0.81
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 21.5,
          "v3_pct": 20.7,
          "delta_pts": -0.81
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 54.0,
          "v3_pct": 55.2,
          "delta_pts": 1.19
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 46.0,
          "v3_pct": 44.8,
          "delta_pts": -1.19
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 31.7,
          "v3_pct": 32.8,
          "delta_pts": 1.14
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 68.3,
          "v3_pct": 67.2,
          "delta_pts": -1.13
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.21,
        "lambda_red_card": 0.1837,
        "prob_red_card_in_match_pct": 16.8,
        "lambda_penalty": 0.228,
        "prob_penalty_in_match_pct": 20.4,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.2,
          "ref_pen_shrunk": 0.2167,
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
          "assigned_name": "Wilton SAMPAIO",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.3333,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.5,
          "matches_refereed": 4,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 3.5,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.25
          }
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
          "match_card_risk": 0.0632,
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
        "assigned_name": "Slavko VINCIC",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.5417,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 1.0,
        "matches_refereed": 2,
        "match_method": "via_roster_2026",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 4.0,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.5
        }
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.96,
        "ax": 1.71,
        "1x2_pct": {
          "home": 20.2,
          "draw": 25.7,
          "away": 54.1
        },
        "over_2_5_pct": 49.9,
        "btts_yes_pct": 51.5
      },
      "v3_adjustment": {
        "hx_baseline": 0.96,
        "ax_baseline": 1.71,
        "hx_v3": 0.958,
        "ax_v3": 1.7258,
        "delta_total_lambda_pct": 0.52,
        "components_pct": {
          "referee_strictness": -0.21,
          "penalty_risk": 0.0,
          "home_discipline": 0.0,
          "away_discipline": 1.13
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 19.9,
          "draw": 25.6,
          "away": 54.5
        },
        "over_2_5_pct": 50.2,
        "btts_yes_pct": 51.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 20.2,
          "v3_pct": 19.9,
          "delta_pts": -0.26
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.7,
          "v3_pct": 25.6,
          "delta_pts": -0.17
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 54.1,
          "v3_pct": 54.5,
          "delta_pts": 0.43
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 51.5,
          "v3_pct": 51.6,
          "delta_pts": 0.11
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 48.5,
          "v3_pct": 48.4,
          "delta_pts": -0.11
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.5,
          "v3_pct": 75.7,
          "delta_pts": 0.25
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 24.5,
          "v3_pct": 24.3,
          "delta_pts": -0.25
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 49.9,
          "v3_pct": 50.2,
          "delta_pts": 0.34
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 50.1,
          "v3_pct": 49.8,
          "delta_pts": -0.34
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 27.9,
          "v3_pct": 28.2,
          "delta_pts": 0.3
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 72.1,
          "v3_pct": 71.8,
          "delta_pts": -0.3
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.41,
        "lambda_red_card": 0.2324,
        "prob_red_card_in_match_pct": 20.7,
        "lambda_penalty": 0.26,
        "prob_penalty_in_match_pct": 22.9,
        "confidence": "low",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.24,
          "ref_pen_shrunk": 0.26,
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
          "assigned_name": "Slavko VINCIC",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.5417,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 1.0,
          "matches_refereed": 2,
          "match_method": "via_roster_2026",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 4.0,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.5
          }
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
        "assigned_name": "Jalal JAYED",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.36,
        "ax": 0.44,
        "1x2_pct": {
          "home": 80.0,
          "draw": 15.2,
          "away": 4.8
        },
        "over_2_5_pct": 53.1,
        "btts_yes_pct": 32.7
      },
      "v3_adjustment": {
        "hx_baseline": 2.36,
        "ax_baseline": 0.44,
        "hx_v3": 2.38,
        "ax_v3": 0.44,
        "delta_total_lambda_pct": 0.71,
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
          "home": 80.3,
          "draw": 15.0,
          "away": 4.7
        },
        "over_2_5_pct": 53.5,
        "btts_yes_pct": 32.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 80.0,
          "v3_pct": 80.3,
          "delta_pts": 0.29
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 15.2,
          "v3_pct": 15.0,
          "delta_pts": -0.21
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 4.8,
          "v3_pct": 4.7,
          "delta_pts": -0.08
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 32.7,
          "v3_pct": 32.8,
          "delta_pts": 0.06
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 67.3,
          "v3_pct": 67.2,
          "delta_pts": -0.06
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.4,
          "v3_pct": 77.7,
          "delta_pts": 0.33
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.6,
          "v3_pct": 22.3,
          "delta_pts": -0.33
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 53.1,
          "v3_pct": 53.5,
          "delta_pts": 0.48
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
          "v3_pct": 31.2,
          "delta_pts": 0.45
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 69.2,
          "v3_pct": 68.8,
          "delta_pts": -0.45
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
          "assigned_name": "Jalal JAYED",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Said MARTINEZ",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_match",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.45,
        "ax": 0.46,
        "1x2_pct": {
          "home": 80.8,
          "draw": 14.5,
          "away": 4.7
        },
        "over_2_5_pct": 55.6,
        "btts_yes_pct": 34.2
      },
      "v3_adjustment": {
        "hx_baseline": 2.45,
        "ax_baseline": 0.46,
        "hx_v3": 2.4798,
        "ax_v3": 0.4605,
        "delta_total_lambda_pct": 1.04,
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
          "home": 81.2,
          "draw": 14.2,
          "away": 4.6
        },
        "over_2_5_pct": 56.3,
        "btts_yes_pct": 34.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 80.8,
          "v3_pct": 81.2,
          "delta_pts": 0.4
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 14.5,
          "v3_pct": 14.2,
          "delta_pts": -0.29
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 4.7,
          "v3_pct": 4.6,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 34.2,
          "v3_pct": 34.3,
          "delta_pts": 0.11
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 65.8,
          "v3_pct": 65.7,
          "delta_pts": -0.11
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 79.2,
          "v3_pct": 79.7,
          "delta_pts": 0.47
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 20.8,
          "v3_pct": 20.3,
          "delta_pts": -0.47
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 55.6,
          "v3_pct": 56.3,
          "delta_pts": 0.7
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 44.4,
          "v3_pct": 43.7,
          "delta_pts": -0.7
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 33.3,
          "v3_pct": 33.9,
          "delta_pts": 0.68
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 66.7,
          "v3_pct": 66.1,
          "delta_pts": -0.68
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
          "assigned_name": "Said MARTINEZ",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_match",
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
        "assigned_name": "Pierre ATCHO",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.8,
        "ax": 1.91,
        "1x2_pct": {
          "home": 14.2,
          "draw": 23.1,
          "away": 62.7
        },
        "over_2_5_pct": 50.9,
        "btts_yes_pct": 47.7
      },
      "v3_adjustment": {
        "hx_baseline": 0.8,
        "ax_baseline": 1.91,
        "hx_v3": 0.8,
        "ax_v3": 1.9228,
        "delta_total_lambda_pct": 0.47,
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
          "home": 14.1,
          "draw": 22.9,
          "away": 63.0
        },
        "over_2_5_pct": 51.2,
        "btts_yes_pct": 47.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 14.2,
          "v3_pct": 14.1,
          "delta_pts": -0.13
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.1,
          "v3_pct": 22.9,
          "delta_pts": -0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 62.7,
          "v3_pct": 63.0,
          "delta_pts": 0.28
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 47.7,
          "v3_pct": 47.8,
          "delta_pts": 0.1
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 52.3,
          "v3_pct": 52.2,
          "delta_pts": -0.1
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.1,
          "v3_pct": 76.4,
          "delta_pts": 0.23
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.9,
          "v3_pct": 23.6,
          "delta_pts": -0.22
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 50.9,
          "v3_pct": 51.2,
          "delta_pts": 0.31
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 49.1,
          "v3_pct": 48.8,
          "delta_pts": -0.31
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 28.8,
          "v3_pct": 29.1,
          "delta_pts": 0.28
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 71.2,
          "v3_pct": 70.9,
          "delta_pts": -0.28
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
          "assigned_name": "Pierre ATCHO",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Maurizio MARIANI",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.75,
        "ax": 0.76,
        "1x2_pct": {
          "home": 60.2,
          "draw": 24.8,
          "away": 15.0
        },
        "over_2_5_pct": 45.9,
        "btts_yes_pct": 44.8
      },
      "v3_adjustment": {
        "hx_baseline": 1.75,
        "ax_baseline": 0.76,
        "hx_v3": 1.764,
        "ax_v3": 0.76,
        "delta_total_lambda_pct": 0.56,
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
          "home": 60.5,
          "draw": 24.7,
          "away": 14.9
        },
        "over_2_5_pct": 46.2,
        "btts_yes_pct": 45.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 60.2,
          "v3_pct": 60.5,
          "delta_pts": 0.33
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.8,
          "v3_pct": 24.7,
          "delta_pts": -0.18
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 15.0,
          "v3_pct": 14.9,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.8,
          "v3_pct": 45.0,
          "delta_pts": 0.12
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.2,
          "v3_pct": 55.0,
          "delta_pts": -0.12
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 72.3,
          "v3_pct": 72.6,
          "delta_pts": 0.28
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 27.7,
          "v3_pct": 27.4,
          "delta_pts": -0.28
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 45.9,
          "v3_pct": 46.2,
          "delta_pts": 0.36
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 54.1,
          "v3_pct": 53.8,
          "delta_pts": -0.36
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 24.5,
          "v3_pct": 24.8,
          "delta_pts": 0.3
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 75.5,
          "v3_pct": 75.2,
          "delta_pts": -0.3
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
          "assigned_name": "Maurizio MARIANI",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Jesus VALENZUELA",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.3333,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 1.0,
        "matches_refereed": 2,
        "match_method": "family_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 1.5,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.5
        }
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.21,
        "ax": 1.03,
        "1x2_pct": {
          "home": 63.4,
          "draw": 20.8,
          "away": 15.8
        },
        "over_2_5_pct": 62.8,
        "btts_yes_pct": 58.0
      },
      "v3_adjustment": {
        "hx_baseline": 2.21,
        "ax_baseline": 1.03,
        "hx_v3": 2.256,
        "ax_v3": 1.0453,
        "delta_total_lambda_pct": 1.89,
        "components_pct": {
          "referee_strictness": 0.83,
          "penalty_risk": 0.0,
          "home_discipline": 1.25,
          "away_discipline": 0.66
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 64.0,
          "draw": 20.4,
          "away": 15.6
        },
        "over_2_5_pct": 64.1,
        "btts_yes_pct": 58.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 63.4,
          "v3_pct": 64.0,
          "delta_pts": 0.55
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 20.8,
          "v3_pct": 20.4,
          "delta_pts": -0.37
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 15.8,
          "v3_pct": 15.6,
          "delta_pts": -0.18
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 58.0,
          "v3_pct": 58.7,
          "delta_pts": 0.78
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 42.0,
          "v3_pct": 41.3,
          "delta_pts": -0.78
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 84.1,
          "v3_pct": 84.9,
          "delta_pts": 0.74
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 15.9,
          "v3_pct": 15.1,
          "delta_pts": -0.74
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 62.8,
          "v3_pct": 64.1,
          "delta_pts": 1.25
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 37.2,
          "v3_pct": 35.9,
          "delta_pts": -1.25
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 40.6,
          "v3_pct": 42.0,
          "delta_pts": 1.36
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 59.4,
          "v3_pct": 58.0,
          "delta_pts": -1.36
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.07,
        "lambda_red_card": 0.1897,
        "prob_red_card_in_match_pct": 17.3,
        "lambda_penalty": 0.2782,
        "prob_penalty_in_match_pct": 24.3,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.24,
          "ref_pen_shrunk": 0.26,
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
          "assigned_name": "Jesus VALENZUELA",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.3333,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 1.0,
          "matches_refereed": 2,
          "match_method": "family_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 1.5,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.5
          }
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
          "match_card_risk": 0.0608,
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
        "assigned_name": "Ramon ABATTI",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 1.19,
        "ax": 1.13,
        "1x2_pct": {
          "home": 36.3,
          "draw": 30.3,
          "away": 33.4
        },
        "over_2_5_pct": 40.9,
        "btts_yes_pct": 48.2
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
          "home": 36.3,
          "draw": 30.2,
          "away": 33.4
        },
        "over_2_5_pct": 41.3,
        "btts_yes_pct": 48.4
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 30.3,
          "v3_pct": 30.2,
          "delta_pts": -0.1
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 33.4,
          "v3_pct": 33.4,
          "delta_pts": 0.08
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 48.2,
          "v3_pct": 48.4,
          "delta_pts": 0.27
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 51.8,
          "v3_pct": 51.6,
          "delta_pts": -0.28
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 68.4,
          "v3_pct": 68.7,
          "delta_pts": 0.29
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 31.6,
          "v3_pct": 31.3,
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
          "assigned_name": "Ramon ABATTI",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
        "assigned_name": "Cesar RAMOS",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.0536,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 7,
        "match_method": "family_name",
        "confidence": "high",
        "raw": {
          "yellow_per_match": 2.1429,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.0
        }
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.78,
        "ax": 2.26,
        "1x2_pct": {
          "home": 10.7,
          "draw": 19.1,
          "away": 70.2
        },
        "over_2_5_pct": 58.6,
        "btts_yes_pct": 49.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.78,
        "ax_baseline": 2.26,
        "hx_v3": 0.8065,
        "ax_v3": 2.3286,
        "delta_total_lambda_pct": 3.13,
        "components_pct": {
          "referee_strictness": 2.23,
          "penalty_risk": 0.0,
          "home_discipline": 1.16,
          "away_discipline": 0.8
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 10.6,
          "draw": 18.6,
          "away": 70.8
        },
        "over_2_5_pct": 60.6,
        "btts_yes_pct": 50.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 10.7,
          "v3_pct": 10.6,
          "delta_pts": -0.07
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 19.1,
          "v3_pct": 18.6,
          "delta_pts": -0.53
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 70.2,
          "v3_pct": 70.8,
          "delta_pts": 0.6
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 49.2,
          "v3_pct": 50.6,
          "delta_pts": 1.44
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 50.8,
          "v3_pct": 49.4,
          "delta_pts": -1.44
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.3,
          "v3_pct": 82.7,
          "delta_pts": 1.32
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 18.7,
          "v3_pct": 17.3,
          "delta_pts": -1.32
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 58.6,
          "v3_pct": 60.6,
          "delta_pts": 2.07
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 41.4,
          "v3_pct": 39.4,
          "delta_pts": -2.07
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 36.2,
          "v3_pct": 38.3,
          "delta_pts": 2.13
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 63.8,
          "v3_pct": 61.7,
          "delta_pts": -2.13
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.3,
        "lambda_red_card": 0.1727,
        "prob_red_card_in_match_pct": 15.9,
        "lambda_penalty": 0.115,
        "prob_penalty_in_match_pct": 10.9,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.16,
          "ref_pen_shrunk": 0.1067,
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
          "assigned_name": "Cesar RAMOS",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.0536,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 7,
          "match_method": "family_name",
          "confidence": "high",
          "raw": {
            "yellow_per_match": 2.1429,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.0
          }
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
          "match_card_risk": 0.0092,
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
        "assigned_name": "Danny MAKKELIE",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.125,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 2,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 3.0,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.0,
          "penalty_per_match": 0.0
        }
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 2.39,
        "ax": 0.41,
        "1x2_pct": {
          "home": 81.1,
          "draw": 14.6,
          "away": 4.3
        },
        "over_2_5_pct": 53.1,
        "btts_yes_pct": 31.0
      },
      "v3_adjustment": {
        "hx_baseline": 2.39,
        "ax_baseline": 0.41,
        "hx_v3": 2.4439,
        "ax_v3": 0.4228,
        "delta_total_lambda_pct": 2.38,
        "components_pct": {
          "referee_strictness": 1.88,
          "penalty_risk": 0.0,
          "home_discipline": 0.38,
          "away_discipline": 1.25
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 81.6,
          "draw": 14.2,
          "away": 4.2
        },
        "over_2_5_pct": 54.6,
        "btts_yes_pct": 32.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 81.1,
          "v3_pct": 81.6,
          "delta_pts": 0.44
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 14.6,
          "v3_pct": 14.2,
          "delta_pts": -0.41
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 31.0,
          "v3_pct": 32.0,
          "delta_pts": 0.93
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 69.0,
          "v3_pct": 68.0,
          "delta_pts": -0.93
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.4,
          "v3_pct": 78.5,
          "delta_pts": 1.11
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.6,
          "v3_pct": 21.5,
          "delta_pts": -1.11
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 53.1,
          "v3_pct": 54.6,
          "delta_pts": 1.57
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 46.9,
          "v3_pct": 45.4,
          "delta_pts": -1.57
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 30.8,
          "v3_pct": 32.3,
          "delta_pts": 1.49
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 69.2,
          "v3_pct": 67.7,
          "delta_pts": -1.49
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 2.89,
        "lambda_red_card": 0.2324,
        "prob_red_card_in_match_pct": 20.7,
        "lambda_penalty": 0.1538,
        "prob_penalty_in_match_pct": 14.3,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.24,
          "ref_pen_shrunk": 0.16,
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
          "assigned_name": "Danny MAKKELIE",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.125,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 2,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 3.0,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.0,
            "penalty_per_match": 0.0
          }
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
          "match_card_risk": 0.0286,
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
        "assigned_name": "Yael FALCON PEREZ",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "roster_no_history",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021442",
        "event_name": "Mexico vs. Korea Republic",
        "kickoff": "18 June 2026, 22:00",
        "referee": "Gustavo Tejera",
        "home_score": 1.0,
        "away_score": 0.0,
        "status": "full_time",
        "city": "Guadalajara",
        "location": "Guadalajara Stadium",
        "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
      },
      "baseline_v2": {
        "hx": 0.88,
        "ax": 1.38,
        "1x2_pct": {
          "home": 22.9,
          "draw": 29.5,
          "away": 47.5
        },
        "over_2_5_pct": 39.3,
        "btts_yes_pct": 44.8
      },
      "v3_adjustment": {
        "hx_baseline": 0.88,
        "ax_baseline": 1.38,
        "hx_v3": 0.8756,
        "ax_v3": 1.3808,
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
          "home": 22.8,
          "draw": 29.5,
          "away": 47.7
        },
        "over_2_5_pct": 39.2,
        "btts_yes_pct": 44.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 22.9,
          "v3_pct": 22.8,
          "delta_pts": -0.13
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 47.5,
          "v3_pct": 47.7,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.8,
          "v3_pct": 44.7,
          "delta_pts": -0.13
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.2,
          "v3_pct": 55.3,
          "delta_pts": 0.13
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 67.0,
          "v3_pct": 66.9,
          "delta_pts": -0.09
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 33.0,
          "v3_pct": 33.1,
          "delta_pts": 0.09
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 39.3,
          "v3_pct": 39.2,
          "delta_pts": -0.1
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 60.7,
          "v3_pct": 60.8,
          "delta_pts": 0.1
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 19.3,
          "v3_pct": 19.2,
          "delta_pts": -0.07
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 80.7,
          "v3_pct": 80.8,
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
          "assigned_name": "Yael FALCON PEREZ",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "roster_no_history",
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
          "home_score": 1.0,
          "away_score": 0.0,
          "status": "full_time",
          "city": "Guadalajara",
          "location": "Guadalajara Stadium",
          "data_quality": "Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass."
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
        "assigned_name": "Facundo TELLO",
        "assignment_status": "confirmed_fifa_api",
        "referee_strictness_score": 0.375,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 3,
        "match_method": "exact_name",
        "confidence": "medium",
        "raw": {
          "yellow_per_match": 2.6667,
          "red_per_match": 0.0,
          "sending_offs_per_match": 0.3333,
          "penalty_per_match": 0.0
        }
      },
      "fifa_result": null,
      "baseline_v2": {
        "hx": 0.88,
        "ax": 1.81,
        "1x2_pct": {
          "home": 17.1,
          "draw": 24.5,
          "away": 58.5
        },
        "over_2_5_pct": 50.4,
        "btts_yes_pct": 49.8
      },
      "v3_adjustment": {
        "hx_baseline": 0.88,
        "ax_baseline": 1.81,
        "hx_v3": 0.8851,
        "ax_v3": 1.8355,
        "delta_total_lambda_pct": 1.14,
        "components_pct": {
          "referee_strictness": 0.62,
          "penalty_risk": 0.0,
          "home_discipline": -0.04,
          "away_discipline": 0.78
        },
        "note": "ajuste relativo capado em ±5%. Sem disciplina v3 só usa motor v2."
      },
      "v3_markets": {
        "1x2_pct": {
          "home": 16.9,
          "draw": 24.2,
          "away": 58.9
        },
        "over_2_5_pct": 51.1,
        "btts_yes_pct": 50.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 17.1,
          "v3_pct": 16.9,
          "delta_pts": -0.18
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.5,
          "v3_pct": 24.2,
          "delta_pts": -0.27
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 58.5,
          "v3_pct": 58.9,
          "delta_pts": 0.46
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 49.8,
          "v3_pct": 50.2,
          "delta_pts": 0.41
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 50.2,
          "v3_pct": 49.8,
          "delta_pts": -0.41
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.8,
          "v3_pct": 76.4,
          "delta_pts": 0.54
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 24.2,
          "v3_pct": 23.6,
          "delta_pts": -0.54
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 50.4,
          "v3_pct": 51.1,
          "delta_pts": 0.75
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 49.6,
          "v3_pct": 48.9,
          "delta_pts": -0.75
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 28.4,
          "v3_pct": 29.0,
          "delta_pts": 0.67
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 71.6,
          "v3_pct": 71.0,
          "delta_pts": -0.68
        }
      ],
      "new_discipline_markets": {
        "expected_total_yellow_cards": 3.54,
        "lambda_red_card": 0.247,
        "prob_red_card_in_match_pct": 21.9,
        "lambda_penalty": 0.1269,
        "prob_penalty_in_match_pct": 11.9,
        "confidence": "medium",
        "shrinkage_used": {
          "n_prior_referee": 8,
          "n_prior_team": 6,
          "wc_baseline_red": 0.3,
          "wc_baseline_pen": 0.2,
          "p_floor_pct": 1.0,
          "ref_red_shrunk": 0.2182,
          "ref_pen_shrunk": 0.1455,
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
          "assigned_name": "Facundo TELLO",
          "assignment_status": "confirmed_fifa_api",
          "referee_strictness_score": 0.375,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 3,
          "match_method": "exact_name",
          "confidence": "medium",
          "raw": {
            "yellow_per_match": 2.6667,
            "red_per_match": 0.0,
            "sending_offs_per_match": 0.3333,
            "penalty_per_match": 0.0
          }
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
          "match_card_risk": 0.1412,
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
        "hx": 0.45,
        "ax": 2.4,
        "1x2_pct": {
          "home": 4.7,
          "draw": 14.9,
          "away": 80.3
        },
        "over_2_5_pct": 54.2,
        "btts_yes_pct": 33.4
      },
      "v3_adjustment": {
        "hx_baseline": 0.45,
        "ax_baseline": 2.4,
        "hx_v3": 0.45,
        "ax_v3": 2.414,
        "delta_total_lambda_pct": 0.49,
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
          "home": 4.7,
          "draw": 14.8,
          "away": 80.5
        },
        "over_2_5_pct": 54.6,
        "btts_yes_pct": 33.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 4.7,
          "v3_pct": 4.7,
          "delta_pts": -0.06
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 14.9,
          "v3_pct": 14.8,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 80.3,
          "v3_pct": 80.5,
          "delta_pts": 0.2
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 78.2,
          "v3_pct": 78.5,
          "delta_pts": 0.22
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 21.8,
          "v3_pct": 21.5,
          "delta_pts": -0.22
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 54.2,
          "v3_pct": 54.6,
          "delta_pts": 0.33
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 45.8,
          "v3_pct": 45.4,
          "delta_pts": -0.33
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 31.9,
          "v3_pct": 32.2,
          "delta_pts": 0.31
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 68.1,
          "v3_pct": 67.8,
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
        "hx": 1.27,
        "ax": 1.83,
        "1x2_pct": {
          "home": 25.7,
          "draw": 24.6,
          "away": 49.7
        },
        "over_2_5_pct": 59.9,
        "btts_yes_pct": 61.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.27,
        "ax_baseline": 1.83,
        "hx_v3": 1.2735,
        "ax_v3": 1.8525,
        "delta_total_lambda_pct": 0.84,
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
          "home": 25.5,
          "draw": 24.4,
          "away": 50.2
        },
        "over_2_5_pct": 60.4,
        "btts_yes_pct": 61.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 25.7,
          "v3_pct": 25.5,
          "delta_pts": -0.26
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.6,
          "v3_pct": 24.4,
          "delta_pts": -0.19
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 49.7,
          "v3_pct": 50.2,
          "delta_pts": 0.44
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 61.2,
          "v3_pct": 61.5,
          "delta_pts": 0.33
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 38.8,
          "v3_pct": 38.5,
          "delta_pts": -0.33
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 82.4,
          "v3_pct": 82.7,
          "delta_pts": 0.35
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 17.6,
          "v3_pct": 17.3,
          "delta_pts": -0.35
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 59.9,
          "v3_pct": 60.4,
          "delta_pts": 0.56
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 40.1,
          "v3_pct": 39.6,
          "delta_pts": -0.56
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 37.5,
          "v3_pct": 38.1,
          "delta_pts": 0.58
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 62.5,
          "v3_pct": 61.9,
          "delta_pts": -0.58
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
        "hx": 0.38,
        "ax": 2.38,
        "1x2_pct": {
          "home": 3.9,
          "draw": 14.4,
          "away": 81.7
        },
        "over_2_5_pct": 52.1,
        "btts_yes_pct": 29.1
      },
      "v3_adjustment": {
        "hx_baseline": 0.38,
        "ax_baseline": 2.38,
        "hx_v3": 0.382,
        "ax_v3": 2.3707,
        "delta_total_lambda_pct": -0.26,
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
          "home": 4.0,
          "draw": 14.5,
          "away": 81.5
        },
        "over_2_5_pct": 51.9,
        "btts_yes_pct": 29.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 3.9,
          "v3_pct": 4.0,
          "delta_pts": 0.06
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 14.4,
          "v3_pct": 14.5,
          "delta_pts": 0.12
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 81.7,
          "v3_pct": 81.5,
          "delta_pts": -0.18
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 29.1,
          "v3_pct": 29.2,
          "delta_pts": 0.1
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 70.9,
          "v3_pct": 70.8,
          "delta_pts": -0.1
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 76.7,
          "v3_pct": 76.5,
          "delta_pts": -0.12
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 23.3,
          "v3_pct": 23.5,
          "delta_pts": 0.12
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 52.1,
          "v3_pct": 51.9,
          "delta_pts": -0.18
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 47.9,
          "v3_pct": 48.1,
          "delta_pts": 0.18
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 29.9,
          "v3_pct": 29.8,
          "delta_pts": -0.16
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 70.1,
          "v3_pct": 70.2,
          "delta_pts": 0.16
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
        "hx": 1.69,
        "ax": 0.87,
        "1x2_pct": {
          "home": 55.9,
          "draw": 25.8,
          "away": 18.3
        },
        "over_2_5_pct": 47.1,
        "btts_yes_pct": 48.3
      },
      "v3_adjustment": {
        "hx_baseline": 1.69,
        "ax_baseline": 0.87,
        "hx_v3": 1.6994,
        "ax_v3": 0.8806,
        "delta_total_lambda_pct": 0.78,
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
          "home": 55.8,
          "draw": 25.7,
          "away": 18.4
        },
        "over_2_5_pct": 47.7,
        "btts_yes_pct": 48.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 25.8,
          "v3_pct": 25.7,
          "delta_pts": -0.09
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 18.3,
          "v3_pct": 18.4,
          "delta_pts": 0.13
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 48.3,
          "v3_pct": 48.8,
          "delta_pts": 0.46
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 51.7,
          "v3_pct": 51.2,
          "delta_pts": -0.46
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 73.4,
          "v3_pct": 73.8,
          "delta_pts": 0.39
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 26.6,
          "v3_pct": 26.2,
          "delta_pts": -0.39
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 47.1,
          "v3_pct": 47.7,
          "delta_pts": 0.51
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 52.9,
          "v3_pct": 52.3,
          "delta_pts": -0.51
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 25.5,
          "v3_pct": 26.0,
          "delta_pts": 0.43
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 74.5,
          "v3_pct": 74.0,
          "delta_pts": -0.43
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
        "hx": 1.5,
        "ax": 1.98,
        "1x2_pct": {
          "home": 28.6,
          "draw": 23.2,
          "away": 48.2
        },
        "over_2_5_pct": 67.5,
        "btts_yes_pct": 67.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.5,
        "ax_baseline": 1.98,
        "hx_v3": 1.5071,
        "ax_v3": 1.998,
        "delta_total_lambda_pct": 0.72,
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
          "home": 28.5,
          "draw": 23.1,
          "away": 48.4
        },
        "over_2_5_pct": 68.0,
        "btts_yes_pct": 68.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 28.6,
          "v3_pct": 28.5,
          "delta_pts": -0.12
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.2,
          "v3_pct": 23.1,
          "delta_pts": -0.13
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 48.2,
          "v3_pct": 48.4,
          "delta_pts": 0.25
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 67.7,
          "v3_pct": 68.0,
          "delta_pts": 0.32
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 32.3,
          "v3_pct": 32.0,
          "delta_pts": -0.32
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 86.9,
          "v3_pct": 87.2,
          "delta_pts": 0.26
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 13.1,
          "v3_pct": 12.8,
          "delta_pts": -0.26
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 67.5,
          "v3_pct": 68.0,
          "delta_pts": 0.46
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 32.5,
          "v3_pct": 32.0,
          "delta_pts": -0.46
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 45.9,
          "v3_pct": 46.4,
          "delta_pts": 0.54
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 54.1,
          "v3_pct": 53.6,
          "delta_pts": -0.54
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
        "hx": 0.72,
        "ax": 0.64,
        "1x2_pct": {
          "home": 32.0,
          "draw": 40.8,
          "away": 27.2
        },
        "over_2_5_pct": 15.7,
        "btts_yes_pct": 25.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.72,
        "ax_baseline": 0.64,
        "hx_v3": 0.7263,
        "ax_v3": 0.6435,
        "delta_total_lambda_pct": 0.71,
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
          "home": 32.2,
          "draw": 40.7,
          "away": 27.2
        },
        "over_2_5_pct": 15.9,
        "btts_yes_pct": 25.5
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 32.0,
          "v3_pct": 32.2,
          "delta_pts": 0.16
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 40.8,
          "v3_pct": 40.7,
          "delta_pts": -0.16
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 25.2,
          "v3_pct": 25.5,
          "delta_pts": 0.24
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 74.8,
          "v3_pct": 74.5,
          "delta_pts": -0.24
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 40.4,
          "v3_pct": 40.7,
          "delta_pts": 0.35
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 59.6,
          "v3_pct": 59.3,
          "delta_pts": -0.35
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 15.7,
          "v3_pct": 15.9,
          "delta_pts": 0.23
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 84.3,
          "v3_pct": 84.1,
          "delta_pts": -0.23
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 4.9,
          "v3_pct": 5.0,
          "delta_pts": 0.11
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 95.1,
          "v3_pct": 95.0,
          "delta_pts": -0.11
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
        "hx": 2.34,
        "ax": 0.73,
        "1x2_pct": {
          "home": 72.8,
          "draw": 17.9,
          "away": 9.3
        },
        "over_2_5_pct": 59.2,
        "btts_yes_pct": 47.5
      },
      "v3_adjustment": {
        "hx_baseline": 2.34,
        "ax_baseline": 0.73,
        "hx_v3": 2.3534,
        "ax_v3": 0.7227,
        "delta_total_lambda_pct": 0.2,
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
          "home": 73.2,
          "draw": 17.8,
          "away": 9.0
        },
        "over_2_5_pct": 59.4,
        "btts_yes_pct": 47.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 72.8,
          "v3_pct": 73.2,
          "delta_pts": 0.4
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 17.9,
          "v3_pct": 17.8,
          "delta_pts": -0.19
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 9.3,
          "v3_pct": 9.0,
          "delta_pts": -0.21
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 47.5,
          "v3_pct": 47.2,
          "delta_pts": -0.26
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 52.5,
          "v3_pct": 52.8,
          "delta_pts": 0.26
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.7,
          "v3_pct": 81.8,
          "delta_pts": 0.08
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 18.3,
          "v3_pct": 18.2,
          "delta_pts": -0.08
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 59.2,
          "v3_pct": 59.4,
          "delta_pts": 0.13
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 40.8,
          "v3_pct": 40.6,
          "delta_pts": -0.13
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 36.8,
          "v3_pct": 37.0,
          "delta_pts": 0.14
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 63.2,
          "v3_pct": 63.0,
          "delta_pts": -0.14
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
        "hx": 1.14,
        "ax": 1.9,
        "1x2_pct": {
          "home": 21.8,
          "draw": 24.0,
          "away": 54.3
        },
        "over_2_5_pct": 58.6,
        "btts_yes_pct": 58.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.14,
        "ax_baseline": 1.9,
        "hx_v3": 1.1547,
        "ax_v3": 1.9202,
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
          "home": 21.8,
          "draw": 23.8,
          "away": 54.4
        },
        "over_2_5_pct": 59.3,
        "btts_yes_pct": 59.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 21.8,
          "v3_pct": 21.8,
          "delta_pts": 0.05
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 24.0,
          "v3_pct": 23.8,
          "delta_pts": -0.17
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 54.3,
          "v3_pct": 54.4,
          "delta_pts": 0.12
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 58.7,
          "v3_pct": 59.3,
          "delta_pts": 0.59
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 41.3,
          "v3_pct": 40.7,
          "delta_pts": -0.59
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.5,
          "v3_pct": 82.0,
          "delta_pts": 0.49
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 18.5,
          "v3_pct": 18.0,
          "delta_pts": -0.49
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 58.6,
          "v3_pct": 59.3,
          "delta_pts": 0.77
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 41.4,
          "v3_pct": 40.7,
          "delta_pts": -0.77
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 36.2,
          "v3_pct": 37.0,
          "delta_pts": 0.78
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 63.8,
          "v3_pct": 63.0,
          "delta_pts": -0.78
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
        "hx": 1.45,
        "ax": 1.31,
        "1x2_pct": {
          "home": 39.5,
          "draw": 27.3,
          "away": 33.1
        },
        "over_2_5_pct": 52.1,
        "btts_yes_pct": 56.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.45,
        "ax_baseline": 1.31,
        "hx_v3": 1.45,
        "ax_v3": 1.3029,
        "delta_total_lambda_pct": -0.26,
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
          "home": 39.7,
          "draw": 27.4,
          "away": 33.0
        },
        "over_2_5_pct": 51.9,
        "btts_yes_pct": 56.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 39.5,
          "v3_pct": 39.7,
          "delta_pts": 0.15
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 33.1,
          "v3_pct": 33.0,
          "delta_pts": -0.18
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 56.9,
          "v3_pct": 56.7,
          "delta_pts": -0.15
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 43.1,
          "v3_pct": 43.3,
          "delta_pts": 0.15
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 77.2,
          "v3_pct": 77.0,
          "delta_pts": -0.12
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 22.8,
          "v3_pct": 23.0,
          "delta_pts": 0.12
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 52.1,
          "v3_pct": 51.9,
          "delta_pts": -0.17
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 47.9,
          "v3_pct": 48.1,
          "delta_pts": 0.17
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 29.9,
          "v3_pct": 29.8,
          "delta_pts": -0.16
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 70.1,
          "v3_pct": 70.2,
          "delta_pts": 0.16
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
        "hx": 0.79,
        "ax": 1.86,
        "1x2_pct": {
          "home": 14.5,
          "draw": 23.6,
          "away": 61.9
        },
        "over_2_5_pct": 49.4,
        "btts_yes_pct": 46.9
      },
      "v3_adjustment": {
        "hx_baseline": 0.79,
        "ax_baseline": 1.86,
        "hx_v3": 0.7943,
        "ax_v3": 1.8826,
        "delta_total_lambda_pct": 1.02,
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
          "home": 14.4,
          "draw": 23.4,
          "away": 62.3
        },
        "over_2_5_pct": 50.1,
        "btts_yes_pct": 47.3
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 14.5,
          "v3_pct": 14.4,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 23.6,
          "v3_pct": 23.4,
          "delta_pts": -0.25
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 61.9,
          "v3_pct": 62.3,
          "delta_pts": 0.39
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 46.9,
          "v3_pct": 47.3,
          "delta_pts": 0.35
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 53.1,
          "v3_pct": 52.7,
          "delta_pts": -0.35
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.0,
          "v3_pct": 75.5,
          "delta_pts": 0.49
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 25.0,
          "v3_pct": 24.5,
          "delta_pts": -0.49
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 49.4,
          "v3_pct": 50.1,
          "delta_pts": 0.67
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 50.6,
          "v3_pct": 49.9,
          "delta_pts": -0.66
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 27.5,
          "v3_pct": 28.1,
          "delta_pts": 0.59
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 72.5,
          "v3_pct": 71.9,
          "delta_pts": -0.59
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
        "hx": 0.65,
        "ax": 2.42,
        "1x2_pct": {
          "home": 7.5,
          "draw": 16.5,
          "away": 76.0
        },
        "over_2_5_pct": 59.2,
        "btts_yes_pct": 44.1
      },
      "v3_adjustment": {
        "hx_baseline": 0.65,
        "ax_baseline": 2.42,
        "hx_v3": 0.6581,
        "ax_v3": 2.4428,
        "delta_total_lambda_pct": 1.01,
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
          "home": 7.5,
          "draw": 16.4,
          "away": 76.1
        },
        "over_2_5_pct": 59.9,
        "btts_yes_pct": 44.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 16.5,
          "v3_pct": 16.4,
          "delta_pts": -0.16
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 76.0,
          "v3_pct": 76.1,
          "delta_pts": 0.17
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.1,
          "v3_pct": 44.6,
          "delta_pts": 0.47
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.9,
          "v3_pct": 55.4,
          "delta_pts": -0.48
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.7,
          "v3_pct": 82.1,
          "delta_pts": 0.43
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 18.3,
          "v3_pct": 17.9,
          "delta_pts": -0.43
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 59.2,
          "v3_pct": 59.9,
          "delta_pts": 0.67
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 40.8,
          "v3_pct": 40.1,
          "delta_pts": -0.67
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 36.8,
          "v3_pct": 37.5,
          "delta_pts": 0.69
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 63.2,
          "v3_pct": 62.5,
          "delta_pts": -0.69
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
        "hx": 0.96,
        "ax": 0.78,
        "1x2_pct": {
          "home": 37.2,
          "draw": 35.5,
          "away": 27.3
        },
        "over_2_5_pct": 25.3,
        "btts_yes_pct": 34.5
      },
      "v3_adjustment": {
        "hx_baseline": 0.96,
        "ax_baseline": 0.78,
        "hx_v3": 0.9706,
        "ax_v3": 0.7841,
        "delta_total_lambda_pct": 0.85,
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
          "home": 37.5,
          "draw": 35.3,
          "away": 27.2
        },
        "over_2_5_pct": 25.7,
        "btts_yes_pct": 34.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 37.2,
          "v3_pct": 37.5,
          "delta_pts": 0.25
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 35.5,
          "v3_pct": 35.3,
          "delta_pts": -0.18
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 27.3,
          "v3_pct": 27.2,
          "delta_pts": -0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 34.5,
          "v3_pct": 34.8,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 65.5,
          "v3_pct": 65.2,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 53.0,
          "v3_pct": 53.4,
          "delta_pts": 0.45
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 47.0,
          "v3_pct": 46.6,
          "delta_pts": -0.45
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 25.3,
          "v3_pct": 25.7,
          "delta_pts": 0.39
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 74.7,
          "v3_pct": 74.3,
          "delta_pts": -0.39
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 9.9,
          "v3_pct": 10.2,
          "delta_pts": 0.23
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 90.1,
          "v3_pct": 89.8,
          "delta_pts": -0.23
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
        "hx": 1.59,
        "ax": 0.77,
        "1x2_pct": {
          "home": 56.0,
          "draw": 26.9,
          "away": 17.1
        },
        "over_2_5_pct": 42.0,
        "btts_yes_pct": 43.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.59,
        "ax_baseline": 0.77,
        "hx_v3": 1.6007,
        "ax_v3": 0.7708,
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
          "home": 56.2,
          "draw": 26.8,
          "away": 17.0
        },
        "over_2_5_pct": 42.3,
        "btts_yes_pct": 43.8
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 56.0,
          "v3_pct": 56.2,
          "delta_pts": 0.25
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.9,
          "v3_pct": 26.8,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 17.1,
          "v3_pct": 17.0,
          "delta_pts": -0.11
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 43.7,
          "v3_pct": 43.8,
          "delta_pts": 0.14
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 56.3,
          "v3_pct": 56.2,
          "delta_pts": -0.14
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 69.2,
          "v3_pct": 69.5,
          "delta_pts": 0.25
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 30.8,
          "v3_pct": 30.5,
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
          "delta_pts": -0.24
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
        "hx": 0.65,
        "ax": 2.42,
        "1x2_pct": {
          "home": 7.5,
          "draw": 16.5,
          "away": 76.0
        },
        "over_2_5_pct": 59.2,
        "btts_yes_pct": 44.1
      },
      "v3_adjustment": {
        "hx_baseline": 0.65,
        "ax_baseline": 2.42,
        "hx_v3": 0.65,
        "ax_v3": 2.4495,
        "delta_total_lambda_pct": 0.96,
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
          "home": 7.3,
          "draw": 16.2,
          "away": 76.4
        },
        "over_2_5_pct": 59.9,
        "btts_yes_pct": 44.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 7.5,
          "v3_pct": 7.3,
          "delta_pts": -0.17
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 16.5,
          "v3_pct": 16.2,
          "delta_pts": -0.29
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 76.0,
          "v3_pct": 76.4,
          "delta_pts": 0.46
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 44.1,
          "v3_pct": 44.2,
          "delta_pts": 0.11
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 55.9,
          "v3_pct": 55.8,
          "delta_pts": -0.11
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.7,
          "v3_pct": 82.1,
          "delta_pts": 0.41
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 18.3,
          "v3_pct": 17.9,
          "delta_pts": -0.41
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 59.2,
          "v3_pct": 59.9,
          "delta_pts": 0.64
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 40.8,
          "v3_pct": 40.1,
          "delta_pts": -0.64
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 36.8,
          "v3_pct": 37.5,
          "delta_pts": 0.66
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 63.2,
          "v3_pct": 62.5,
          "delta_pts": -0.66
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
        "hx": 1.13,
        "ax": 1.5,
        "1x2_pct": {
          "home": 27.6,
          "draw": 27.6,
          "away": 44.8
        },
        "over_2_5_pct": 48.9,
        "btts_yes_pct": 53.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.13,
        "ax_baseline": 1.5,
        "hx_v3": 1.1391,
        "ax_v3": 1.5127,
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
          "home": 27.6,
          "draw": 27.5,
          "away": 44.9
        },
        "over_2_5_pct": 49.5,
        "btts_yes_pct": 54.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 27.6,
          "v3_pct": 27.5,
          "delta_pts": -0.14
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 44.8,
          "v3_pct": 44.9,
          "delta_pts": 0.12
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 53.6,
          "v3_pct": 54.0,
          "delta_pts": 0.41
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 46.4,
          "v3_pct": 46.0,
          "delta_pts": -0.41
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 74.8,
          "v3_pct": 75.2,
          "delta_pts": 0.4
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 25.2,
          "v3_pct": 24.8,
          "delta_pts": -0.4
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 48.9,
          "v3_pct": 49.5,
          "delta_pts": 0.54
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 51.1,
          "v3_pct": 50.5,
          "delta_pts": -0.54
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 27.1,
          "v3_pct": 27.5,
          "delta_pts": 0.48
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 72.9,
          "v3_pct": 72.5,
          "delta_pts": -0.48
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
        "hx": 1.58,
        "ax": 1.19,
        "1x2_pct": {
          "home": 45.4,
          "draw": 26.8,
          "away": 27.8
        },
        "over_2_5_pct": 52.3,
        "btts_yes_pct": 56.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.58,
        "ax_baseline": 1.19,
        "hx_v3": 1.58,
        "ax_v3": 1.19,
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
          "home": 45.4,
          "draw": 26.8,
          "away": 27.8
        },
        "over_2_5_pct": 52.3,
        "btts_yes_pct": 56.2
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
        "hx": 0.87,
        "ax": 0.9,
        "1x2_pct": {
          "home": 31.5,
          "draw": 35.4,
          "away": 33.1
        },
        "over_2_5_pct": 26.1,
        "btts_yes_pct": 35.5
      },
      "v3_adjustment": {
        "hx_baseline": 0.87,
        "ax_baseline": 0.9,
        "hx_v3": 0.8799,
        "ax_v3": 0.911,
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
          "home": 31.6,
          "draw": 35.1,
          "away": 33.3
        },
        "over_2_5_pct": 26.7,
        "btts_yes_pct": 36.1
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 31.5,
          "v3_pct": 31.6,
          "delta_pts": 0.09
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 35.4,
          "v3_pct": 35.1,
          "delta_pts": -0.23
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 33.1,
          "v3_pct": 33.3,
          "delta_pts": 0.14
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 35.5,
          "v3_pct": 36.1,
          "delta_pts": 0.51
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 64.5,
          "v3_pct": 63.9,
          "delta_pts": -0.51
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 53.9,
          "v3_pct": 54.5,
          "delta_pts": 0.63
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 46.1,
          "v3_pct": 45.5,
          "delta_pts": -0.63
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 26.1,
          "v3_pct": 26.7,
          "delta_pts": 0.56
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 73.9,
          "v3_pct": 73.3,
          "delta_pts": -0.56
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 10.4,
          "v3_pct": 10.7,
          "delta_pts": 0.33
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 89.6,
          "v3_pct": 89.3,
          "delta_pts": -0.33
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
        "hx": 0.5,
        "ax": 2.37,
        "1x2_pct": {
          "home": 5.6,
          "draw": 15.7,
          "away": 78.7
        },
        "over_2_5_pct": 54.7,
        "btts_yes_pct": 36.2
      },
      "v3_adjustment": {
        "hx_baseline": 0.5,
        "ax_baseline": 2.37,
        "hx_v3": 0.5,
        "ax_v3": 2.3769,
        "delta_total_lambda_pct": 0.24,
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
          "home": 5.5,
          "draw": 15.7,
          "away": 78.8
        },
        "over_2_5_pct": 54.9,
        "btts_yes_pct": 36.2
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 15.7,
          "v3_pct": 15.7,
          "delta_pts": -0.07
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 78.7,
          "v3_pct": 78.8,
          "delta_pts": 0.1
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 78.6,
          "v3_pct": 78.7,
          "delta_pts": 0.11
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 21.4,
          "v3_pct": 21.3,
          "delta_pts": -0.11
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 54.7,
          "v3_pct": 54.9,
          "delta_pts": 0.16
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 45.3,
          "v3_pct": 45.1,
          "delta_pts": -0.16
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 32.4,
          "v3_pct": 32.5,
          "delta_pts": 0.15
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 67.6,
          "v3_pct": 67.5,
          "delta_pts": -0.15
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
