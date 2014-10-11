#component
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from manage import module

db = SQLAlchemy()

def create_app():
	app = Flask(__name__,static_folder='statics', static_url_path='')

	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'

	app.debug = True

	db.init_app(app)

	return app
