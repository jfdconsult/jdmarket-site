window.WC_DATA_V3 = {
  "v3_discipline": true,
  "n": 7,
  "fixtures": [
    {
      "fixture_id": "1",
      "event_name": "México x África do Sul",
      "home_team": "Mexico",
      "away_team": "South Africa",
      "referee": {
        "assigned_name": "Wilton SAMPAIO",
        "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
        "event_name": "Mexico vs South Africa",
        "kickoff": "",
        "referee": "Wilton SAMPAIO",
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
          "home": 44.6,
          "draw": 33.0,
          "away": 22.4
        },
        "over_2_5_pct": 29.2,
        "btts_yes_pct": 36.6
      },
      "v3_adjustment": {
        "hx_baseline": 1.1504,
        "ax_baseline": 0.734,
        "hx_v3": 1.1606,
        "ax_v3": 0.7398,
        "delta_total_lambda_pct": 0.85,
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
          "home": 44.7,
          "draw": 32.9,
          "away": 22.4
        },
        "over_2_5_pct": 29.6,
        "btts_yes_pct": 36.9
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 44.6,
          "v3_pct": 44.7,
          "delta_pts": 0.16
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 33.0,
          "v3_pct": 32.9,
          "delta_pts": -0.17
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 36.6,
          "v3_pct": 36.9,
          "delta_pts": 0.36
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 63.4,
          "v3_pct": 63.1,
          "delta_pts": -0.36
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 57.2,
          "v3_pct": 57.7,
          "delta_pts": 0.46
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 42.8,
          "v3_pct": 42.3,
          "delta_pts": -0.46
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 29.2,
          "v3_pct": 29.6,
          "delta_pts": 0.43
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 70.8,
          "v3_pct": 70.4,
          "delta_pts": -0.43
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 12.3,
          "v3_pct": 12.5,
          "delta_pts": 0.27
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 87.7,
          "v3_pct": 87.5,
          "delta_pts": -0.27
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
          "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
          "event_name": "Mexico vs South Africa",
          "kickoff": "",
          "referee": "Wilton SAMPAIO",
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
        "assigned_name": "Amin Mohamed Omar",
        "assignment_status": "confirmed_from_fifa_match_centre_rendered",
        "referee_strictness_score": null,
        "referee_red_card_score": null,
        "referee_penalty_score": null,
        "matches_refereed": 0,
        "match_method": "no_match",
        "confidence": "low",
        "notes": "Sem histórico de Copa para o árbitro escalado."
      },
      "fifa_result": {
        "match_id_fifa": "400021441",
        "event_name": "Korea Republic vs Czechia",
        "kickoff": "",
        "referee": "Amin Mohamed Omar",
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
          "home": 46.1,
          "draw": 27.2,
          "away": 26.7
        },
        "over_2_5_pct": 50.1,
        "btts_yes_pct": 54.3
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
          "baseline_pct": 46.1,
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
          "baseline_pct": 26.7,
          "v3_pct": 26.4,
          "delta_pts": -0.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 75.7,
          "v3_pct": 75.8,
          "delta_pts": 0.11
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
          "assigned_name": "Amin Mohamed Omar",
          "assignment_status": "confirmed_from_fifa_match_centre_rendered",
          "referee_strictness_score": null,
          "referee_red_card_score": null,
          "referee_penalty_score": null,
          "matches_refereed": 0,
          "match_method": "no_match",
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
          "event_name": "Korea Republic vs Czechia",
          "kickoff": "",
          "referee": "Amin Mohamed Omar",
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
        "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
        "event_name": "Canada vs Bosnia and Herzegovina",
        "kickoff": "Today, 16:00",
        "referee": "Facundo TELLO",
        "home_score": 1,
        "away_score": 1,
        "status": "full_time",
        "city": "Toronto",
        "location": "Toronto Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.6515,
        "ax": 0.6918,
        "1x2_pct": {
          "home": 59.6,
          "draw": 25.9,
          "away": 14.5
        },
        "over_2_5_pct": 41.5,
        "btts_yes_pct": 41.2
      },
      "v3_adjustment": {
        "hx_baseline": 1.6515,
        "ax_baseline": 0.6918,
        "hx_v3": 1.6721,
        "ax_v3": 0.7048,
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
          "away": 14.6
        },
        "over_2_5_pct": 42.4,
        "btts_yes_pct": 42.0
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
          "v3_pct": 14.6,
          "delta_pts": 0.08
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 41.2,
          "v3_pct": 42.0,
          "delta_pts": 0.72
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 58.8,
          "v3_pct": 58.0,
          "delta_pts": -0.72
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 68.8,
          "v3_pct": 69.5,
          "delta_pts": 0.75
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 31.2,
          "v3_pct": 30.5,
          "delta_pts": -0.75
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 41.5,
          "v3_pct": 42.4,
          "delta_pts": 0.88
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 58.5,
          "v3_pct": 57.6,
          "delta_pts": -0.88
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 21.0,
          "v3_pct": 21.6,
          "delta_pts": 0.7
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 79.0,
          "v3_pct": 78.4,
          "delta_pts": -0.7
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
          "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
          "event_name": "Canada vs Bosnia and Herzegovina",
          "kickoff": "Today, 16:00",
          "referee": "Facundo TELLO",
          "home_score": 1,
          "away_score": 1,
          "status": "full_time",
          "city": "Toronto",
          "location": "Toronto Stadium",
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
        "assigned_name": "Danny Desmond Makkelie",
        "assignment_status": "confirmed_from_fifa_match_centre_rendered",
        "referee_strictness_score": 0.125,
        "referee_red_card_score": 0.0,
        "referee_penalty_score": 0.0,
        "matches_refereed": 2,
        "match_method": "given_family_separate",
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
        "event_name": "USA vs Paraguay",
        "kickoff": "Today, 22:00",
        "referee": "Danny Desmond Makkelie",
        "home_score": null,
        "away_score": null,
        "status": "scheduled_or_live",
        "city": "Los Angeles",
        "location": "Los Angeles Stadium",
        "data_quality": "Rendered FIFA Match Centre overview. Referee/score parsed when present. Cards/goals detail not visible in overview unless FIFA exposes it; raw text preserved for parser upgrades."
      },
      "baseline_v2": {
        "hx": 1.234,
        "ax": 1.0319,
        "1x2_pct": {
          "home": 39.7,
          "draw": 30.5,
          "away": 29.7
        },
        "over_2_5_pct": 39.5,
        "btts_yes_pct": 46.7
      },
      "v3_adjustment": {
        "hx_baseline": 1.234,
        "ax_baseline": 1.0319,
        "hx_v3": 1.2684,
        "ax_v3": 1.0602,
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
          "home": 40.1,
          "draw": 30.1,
          "away": 29.9
        },
        "over_2_5_pct": 41.2,
        "btts_yes_pct": 48.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 39.7,
          "v3_pct": 40.1,
          "delta_pts": 0.33
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 30.5,
          "v3_pct": 30.1,
          "delta_pts": -0.48
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 29.7,
          "v3_pct": 29.9,
          "delta_pts": 0.15
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 46.7,
          "v3_pct": 48.0,
          "delta_pts": 1.34
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 53.3,
          "v3_pct": 52.0,
          "delta_pts": -1.34
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 67.2,
          "v3_pct": 68.6,
          "delta_pts": 1.44
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 32.8,
          "v3_pct": 31.4,
          "delta_pts": -1.44
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 39.5,
          "v3_pct": 41.2,
          "delta_pts": 1.66
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 60.5,
          "v3_pct": 58.8,
          "delta_pts": -1.66
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 19.4,
          "v3_pct": 20.6,
          "delta_pts": 1.27
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 80.6,
          "v3_pct": 79.4,
          "delta_pts": -1.27
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
          "assigned_name": "Danny Desmond Makkelie",
          "assignment_status": "confirmed_from_fifa_match_centre_rendered",
          "referee_strictness_score": 0.125,
          "referee_red_card_score": 0.0,
          "referee_penalty_score": 0.0,
          "matches_refereed": 2,
          "match_method": "given_family_separate",
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
          "event_name": "USA vs Paraguay",
          "kickoff": "Today, 22:00",
          "referee": "Danny Desmond Makkelie",
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
      "fixture_id": "5",
      "event_name": "Qatar x Suíça",
      "home_team": "Qatar",
      "away_team": "Switzerland",
      "referee": {
        "assigned_name": "Said MARTINEZ",
        "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
        "event_name": "Qatar vs Switzerland",
        "kickoff": "13 June 2026, 16:00",
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
          "home": 14.5,
          "draw": 21.4,
          "away": 64.1
        },
        "over_2_5_pct": 58.1,
        "btts_yes_pct": 53.3
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
          "home": 14.5,
          "draw": 21.3,
          "away": 64.2
        },
        "over_2_5_pct": 58.5,
        "btts_yes_pct": 53.6
      },
      "v3_diffs": [
        {
          "market": "main.1x2.draw",
          "baseline_pct": 21.4,
          "v3_pct": 21.3,
          "delta_pts": -0.08
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 64.1,
          "v3_pct": 64.2,
          "delta_pts": 0.07
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 53.3,
          "v3_pct": 53.6,
          "delta_pts": 0.28
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 46.7,
          "v3_pct": 46.4,
          "delta_pts": -0.28
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 81.1,
          "v3_pct": 81.3,
          "delta_pts": 0.24
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 18.9,
          "v3_pct": 18.7,
          "delta_pts": -0.23
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
          "assigned_name": "Said MARTINEZ",
          "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
          "event_name": "Qatar vs Switzerland",
          "kickoff": "13 June 2026, 16:00",
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
        "assigned_name": "Slavko VINCIC",
        "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
        "event_name": "Brazil vs Morocco",
        "kickoff": "13 June 2026, 19:00",
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
          "home": 22.7,
          "draw": 32.8,
          "away": 44.5
        },
        "over_2_5_pct": 30.0,
        "btts_yes_pct": 37.3
      },
      "v3_adjustment": {
        "hx_baseline": 0.7511,
        "ax_baseline": 1.1626,
        "hx_v3": 0.7811,
        "ax_v3": 1.204,
        "delta_total_lambda_pct": 3.73,
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
          "home": 22.9,
          "draw": 32.1,
          "away": 45.0
        },
        "over_2_5_pct": 31.9,
        "btts_yes_pct": 39.0
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 22.7,
          "v3_pct": 22.9,
          "delta_pts": 0.22
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 32.8,
          "v3_pct": 32.1,
          "delta_pts": -0.7
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 44.5,
          "v3_pct": 45.0,
          "delta_pts": 0.48
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 37.3,
          "v3_pct": 39.0,
          "delta_pts": 1.65
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 62.7,
          "v3_pct": 61.0,
          "delta_pts": -1.65
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 58.0,
          "v3_pct": 60.0,
          "delta_pts": 1.99
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 42.0,
          "v3_pct": 40.0,
          "delta_pts": -1.98
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 30.0,
          "v3_pct": 31.9,
          "delta_pts": 1.93
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 70.0,
          "v3_pct": 68.1,
          "delta_pts": -1.93
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 12.8,
          "v3_pct": 14.0,
          "delta_pts": 1.26
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 87.2,
          "v3_pct": 86.0,
          "delta_pts": -1.26
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
          "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
          "event_name": "Brazil vs Morocco",
          "kickoff": "13 June 2026, 19:00",
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
        "assigned_name": "Mustapha Ghorbal",
        "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
        "event_name": "Haiti vs Scotland",
        "kickoff": "13 June 2026, 22:00",
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
          "home": 31.9,
          "draw": 26.5,
          "away": 41.6
        },
        "over_2_5_pct": 55.0,
        "btts_yes_pct": 58.9
      },
      "v3_adjustment": {
        "hx_baseline": 1.333,
        "ax_baseline": 1.551,
        "hx_v3": 1.3802,
        "ax_v3": 1.6046,
        "delta_total_lambda_pct": 3.49,
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
          "home": 32.1,
          "draw": 26.0,
          "away": 41.9
        },
        "over_2_5_pct": 57.3,
        "btts_yes_pct": 60.7
      },
      "v3_diffs": [
        {
          "market": "main.1x2.home",
          "baseline_pct": 31.9,
          "v3_pct": 32.1,
          "delta_pts": 0.21
        },
        {
          "market": "main.1x2.draw",
          "baseline_pct": 26.5,
          "v3_pct": 26.0,
          "delta_pts": -0.54
        },
        {
          "market": "main.1x2.away",
          "baseline_pct": 41.6,
          "v3_pct": 41.9,
          "delta_pts": 0.34
        },
        {
          "market": "main.btts.yes",
          "baseline_pct": 58.9,
          "v3_pct": 60.7,
          "delta_pts": 1.76
        },
        {
          "market": "main.btts.no",
          "baseline_pct": 41.1,
          "v3_pct": 39.3,
          "delta_pts": -1.76
        },
        {
          "market": "OU.1.5.over",
          "baseline_pct": 79.2,
          "v3_pct": 80.8,
          "delta_pts": 1.54
        },
        {
          "market": "OU.1.5.under",
          "baseline_pct": 20.8,
          "v3_pct": 19.2,
          "delta_pts": -1.54
        },
        {
          "market": "OU.2.5.over",
          "baseline_pct": 55.0,
          "v3_pct": 57.3,
          "delta_pts": 2.31
        },
        {
          "market": "OU.2.5.under",
          "baseline_pct": 45.0,
          "v3_pct": 42.7,
          "delta_pts": -2.31
        },
        {
          "market": "OU.3.5.over",
          "baseline_pct": 32.7,
          "v3_pct": 34.9,
          "delta_pts": 2.26
        },
        {
          "market": "OU.3.5.under",
          "baseline_pct": 67.3,
          "v3_pct": 65.1,
          "delta_pts": -2.25
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
          "assigned_name": "Mustapha Ghorbal",
          "assignment_status": "confirmed_from_fifa_match_centre_rendered",
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
          "event_name": "Haiti vs Scotland",
          "kickoff": "13 June 2026, 22:00",
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
