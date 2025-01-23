from . import dbs

product_feature_table = dbs.Table(
  'product_feature',
  dbs.Column('product_id', dbs.Integer, dbs.ForeignKey('product.id'), primary_key=True),
  dbs.Column('feature_id', dbs.Integer, dbs.ForeignKey('feature.id'), primary_key=True)
)

class Category (dbs.Model):
  __tablename__ = 'category'
  id = dbs.Column(dbs.Integer, primary_key=True)
  name = dbs.Column(dbs.String(100), nullable=False, unique=True)

  category_product = dbs.relationship(
    'Product',
    back_populates='product_category'
  )

class Feature (dbs.Model):
  __tablename__ = 'feature'
  id = dbs.Column(dbs.Integer, primary_key=True)
  name = dbs.Column(dbs.String(100), nullable=False, unique = True)

  feature_values = dbs.relationship(
    'FeatureValue',
    back_populates='feature',
    cascade='all, delete-orphan',
    order_by='FeatureValue.id'
  )
  products = dbs.relationship(
    'Product',
    secondary=product_feature_table,
    back_populates='features'
  )


class Product (dbs.Model):
  __tablename__ = 'product'
  id = dbs.Column(dbs.Integer, primary_key=True)
  name = dbs.Column(dbs.String(100), nullable=False, unique=True)
  description = dbs.Column(dbs.String(250), nullable=True)
  img_src = dbs.Column(dbs.String(250), nullable=True)
  price = dbs.Column(dbs.Float, nullable=False)
  on_sale = dbs.Column(dbs.Boolean, default=True)
  category_id = dbs.Column(dbs.Integer, dbs.ForeignKey('category.id', ondelete='SET NULL'), nullable=True)

  features = dbs.relationship(
    'Feature',
    secondary=product_feature_table,
    back_populates='products'
  )
  product_category = dbs.relationship('Category', back_populates='category_product')

class FeatureValue (dbs.Model):
  __tablename__ = 'feature_value'
  id = dbs.Column(dbs.Integer, primary_key=True)
  name = dbs.Column(dbs.String(100), nullable=False)
  stock = dbs.Column(dbs.Integer, nullable=False)
  price = dbs.Column(dbs.Float, nullable=False)
  feature_id = dbs.Column(dbs.Integer, dbs.ForeignKey('feature.id'), nullable=False)

  feature = dbs.relationship('Feature', back_populates='feature_values')

  feature_value_restriction = dbs.relationship(
    'FeatureRestriction',
    back_populates='restriction_feature_value',
    foreign_keys='FeatureRestriction.restriction_feature_value_id',
    cascade='all, delete-orphan'
  )
  feature_value_dependent_restriction = dbs.relationship(
    'FeatureRestriction',
    back_populates='dependent_restriction_feature_value',
    foreign_keys='FeatureRestriction.dependent_restriction_feature_value_id',
    cascade='all, delete-orphan'
  )

class FeatureRestriction (dbs.Model):
  __tablename__ = 'feature_restriction'
  id = dbs.Column(dbs.Integer, primary_key=True)
  restriction_feature_value_id = dbs.Column(
    dbs.Integer,
    dbs.ForeignKey('feature_value.id'),
    nullable=False
  )
  dependent_restriction_feature_value_id = dbs.Column(
    dbs.Integer,
    dbs.ForeignKey('feature_value.id'),
    nullable=False
  )

  restriction_feature_value = dbs.relationship(
    'FeatureValue',
    back_populates='feature_value_restriction',
    foreign_keys=[restriction_feature_value_id]
  )
  dependent_restriction_feature_value = dbs.relationship(
    'FeatureValue',
    back_populates='feature_value_dependent_restriction',
    foreign_keys=[dependent_restriction_feature_value_id]
  )

class InitializationLog(dbs.Model):
  __tablename__ = 'initialization_log'
  id = dbs.Column(dbs.Integer, primary_key=True)
  initialized = dbs.Column(dbs.Boolean, nullable=False, default=False)
  timestamp = dbs.Column(dbs.DateTime, nullable=False, default=dbs.func.now())
