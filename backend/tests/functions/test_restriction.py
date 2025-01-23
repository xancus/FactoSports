
def test_check_restriction():
  restrictions = [
      {"restriction_feature_value_id": 7, "dependent_restriction_feature_value_id": 2},
      {"restriction_feature_value_id": 7, "dependent_restriction_feature_value_id": 3},{"restriction_feature_value_id": 6, "dependent_restriction_feature_value_id": 8}
  ]
  feature_values = [
      {"id": 1},
      {"id": 2},
      {"id": 3},
      {"id": 4},
      {"id": 5},
      {"id": 6},
      {"id": 7},
      {"id": 8}
  ]
  prev_keys = [{"id": 7},{"id":6}]

  restricted_ids = {
      restriction['restriction_feature_value_id']
      for restriction in restrictions
  }.union({
      restriction['dependent_restriction_feature_value_id']
      for restriction in restrictions
  })

  allowed_values = [feature for feature in feature_values if feature['id'] not in restricted_ids] + prev_keys
  
  expected_output = [{'id': 1}, {'id': 4}, {'id': 5}, {'id': 6}, {'id': 7}]
  
  assert set(tuple(f.items()) for f in allowed_values) == set(tuple(f.items()) for f in expected_output)

  
  # assert set(tuple(f.items()) for f in allowed_values) == set(tuple(f.items()) for f in expected_output_1)

