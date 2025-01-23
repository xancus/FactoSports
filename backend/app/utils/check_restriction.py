def allowed_restrictions(feature_values, restrictions):
  restricted_ids = {
      restriction.restriction_feature_value_id
      for restriction in restrictions
  }.union({
      restriction.dependent_restriction_feature_value_id
      for restriction in restrictions
  })

  allowed_values = [feature for feature in feature_values if feature.id not in restricted_ids]
  return allowed_values