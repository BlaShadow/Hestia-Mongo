##initfile
from flask import Flask
from ..core import db

def create_app():
	app = Flask(__name__)

	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'

	app.debug = True

	db.init_app(app)

	with app.app_context():
		db.create_all()

	return app

