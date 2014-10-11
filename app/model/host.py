#host model
from datetime import datetime

from ..core import db

class Host(db.Model):

	id = db.Column(db.Integer,primary_key = True)
	target = db.Column(db.String(50))
	port = db.Column(db.Integer())
	user = db.Column(db.String(50))
	password = db.Column(db.String(50))
	created = created = db.Column(db.DateTime)

	def __init__(self,target,port,user,password):
		self.target = target
		self.port = port
		self.user = user
		self.password = password
		self.created = datetime.utcnow()


	def __repr__(self):

		if self.target == None:
			self.target = 'NULL'

		return '<Host {} {}>'.format(self.user,self.target)