##init file
from os import urandom
from flask import Flask,redirect
from flask_debugtoolbar import DebugToolbarExtension

from manage import module
from ..core import db

from ..conf import DEBUG

def create_app():
	app = Flask(__name__,static_folder='statics', static_url_path='')

	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
	app.config['SECRET_KEY'] = urandom(40)

	app.debug = DEBUG

	db.init_app(app)
	
	@app.route('/')
	def hello():
		return redirect("/manage/", code=302)

	toolbar = DebugToolbarExtension(app)

	#sign main blueprint 
	app.register_blueprint(module)

	with app.app_context():
		print 'Created all'
		db.create_all()

	return app
