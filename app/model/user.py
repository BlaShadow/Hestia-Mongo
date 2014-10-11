#user
from datetime import datetime

from ..core import db

class User(db.Model):

	id = db.Column(db.Integer,primary_key = True)
	user = db.Column(db.String(50),unique=True)
	password = db.Column(db.String(50))

	created = db.Column(db.DateTime)
	last_login = db.Column(db.DateTime)

	def __init__(self,user,password):
		self.user = user;
		self.password = password
		self.created = datetime.utcnow()

	def __repr__(self):
		return '<User %r>' % self.user


		