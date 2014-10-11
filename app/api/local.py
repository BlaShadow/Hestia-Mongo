#loca api
import json
import bcrypt

from flask import Blueprint, request, Response
from flask import jsonify
from flask import request

from ..model import user as user_module
from ..model import host as host_module

module = Blueprint('local', __name__, url_prefix='/local')

mimetypeJson = 'application/json'


@module.route('/')
def index():

	data = [{'nombre': 'nombre {}'.format(i) } for i in range(10)]

	return json.dumps(data)

@module.route('/users/')
def users():

	data = user_module.User.query.all()

	clean_result = [{'user':item.user,'password':item.password,'id':item.id,'created':item.created} for item in data]

	return jsonify(result=clean_result)

@module.route('/users/add/',methods=['POST'])
def user_add():

	values = request.get_json()

	if 'login' not in values or 'password' not in values:
		payload = json.dumps({'error':True,'message':'User and Password are required'})

		res = Response(payload,status=406,mimetype=mimetypeJson)

		return res

	passwordHashed = bcrypt.hashpw(values['password'], bcrypt.gensalt(10))

	user = user_module.User(values['login'],passwordHashed)

	user_module.db.session.add(user)

	try:
		
		user_module.db.session.commit()	

		return json.dumps({'error':False,'message':'success'})
	except Exception, e:
		payload =  json.dumps({'error':True,'message':e.message})

		res = Response(payload,status=501,mimetype=mimetypeJson)

		return res


@module.route('/users/delete/<int:id>/')
def user_delete(id):

	user = user_module.User.query.get(id)

	if user == None:
		payload = json.dumps({'error':True,'message':'User not found {}'.format(id)})
		res = Response(payload,status=404,mimetype='application/json')

		return res

	user_module.db.session.delete(user)

	user_module.db.session.commit()

	return json.dumps({'error':False,'message':'success'})

@module.route('/hosts/')
def hosts():

	data = host_module.Host.query.all()

	clean_result = [{'target':item.target,'port': item.port,'user':item.user,'id':item.id,'created':item.created} for item in data]

	# data = [{'usuario': 'nombre {}'.format(i) } for i in range(10)]

	return jsonify(result=clean_result)

@module.route('/hosts/add/',methods=['POST'])
def host_add():

	values = request.get_json()

	print values

	if 'target' not in values or 'user' not in values or 'password' not in values or 'port' not in values:
		payload = json.dumps({'error':True,'message':'User and target and Host Password are required'})

		res = Response(payload,status=501,mimetype=mimetypeJson)

		return res


	host = host_module.Host(values['target'],values['port'],values['user'],values['password'])

	host_module.db.session.add(host)
	host_module.db.session.commit()

	payload = json.dumps({'error':False,'message':'sucess'})

	return Response(payload,status=200,mimetype=mimetypeJson)

@module.route('/hosts/delete/<int:id>/')
def host_delete(id):

	host = host_module.Host.query.get(id)

	if host == None:
		payload = json.dumps({'error':True,'message':'Host not found {}'.format(id)})
		res = Response(payload,status=404,mimetype=mimetypeJson)

		return res

	host_module.db.session.delete(host)
	host_module.db.session.commit()

	return json.dumps({'error':False,'message':'success'})


@module.route('/stast')
def stats():

	hosts = host_module.Host.query.count()
	users = user_module.User.query.count()

	result = {
		'servers':hosts,
		'users':users
	}

	return json.dumps(result)



