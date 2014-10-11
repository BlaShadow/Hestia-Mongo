##database controller

from flask import Blueprint, request, Response
from flask import jsonify
from flask import request,abort

from ..core import db
from ..model import user as user_module
from ..model import host as host_module

from app.components.component_container import ComponentContainer

import datetime
import json
import conf
import logging

from bson.objectid import ObjectId

hosts = {
	
}

class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        elif isinstance(obj,datetime.datetime):
        	return str(obj)
        else:
            return obj

module = Blueprint('database', __name__, url_prefix='/database')

@module.route('/')
def indexCool():
	return 'nice'

def getHost(host_id):
	if host_id not in hosts:
		item = host_module.Host.query.get(host_id)

		if item == None:
			abort(404,'Host not found')

		result = { 'target': item.target,'port':item.port,'user':item.user,'password':item.password }

		hosts[host_id] =  { 'host': result }

	host = hosts[host_id]['host']

	return host

@module.route('/connections/flush',methods=['GET'])
def flush_connections():

	ComponentContainer.flush_conections()

	return 'success'

@module.route('/connections/',methods=['GET'])
def connections():

	logging.info('return all connections!!')

	keys = ComponentContainer.instances.keys()

	print 'From all connections'

	data = []

	for key in keys:
		currentItem = ComponentContainer.instances[key]

		item = {'host':currentItem['connection'].client.host,'port':currentItem['connection'].client.port,'created':currentItem['created']}

		data.append( item )

	return json.dumps( data,cls=Encoder)

@module.route('/host/info/<int:host_id>')
def info(host_id):

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	data = mongoComponent.get_server_info()

	return json.dumps(data);

@module.route('/host/<int:host_id>/database/',methods=['POST'])
def create_database(host_id):
	values = request.get_json()

	if 'name' not in values:
		return Response( json.dumps({'message':'DB Name param requried','error':True},status=400,mimetype='application/json') )

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	name = values['name']

	result = mongoComponent.create_database(name)

	return str(result)


@module.route('/host/<int:host_id>/databases/')
def databses(host_id):

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	data = mongoComponent.get_databses()

	return json.dumps(data)

@module.route('/<host>/uno')
def index(host):

	mongoComponent = ComponentContainer.get_mongo_component(conf)

	databases = mongoComponent.get_databses()

	return json.dumps(databases)

@module.route('/host/<host_id>/database/<db>/info/')
def get_db_info(host_id,db):

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	result = mongoComponent.get_database_info(db)

	return json.dumps( result )

@module.route('/host/<host_id>/database/<db>/collections/')
def get_collections(host_id,db):

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	result = mongoComponent.get_collections(db)

	return json.dumps(result)

@module.route('/host/<host_id>/database/<db>/collection/<collection>/',methods=['DELETE'])
def delete_collection(host_id,db,collection):

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	result = mongoComponent.delete_collection(db,collection)	

	return str(result)

@module.route('/host/<host_id>/database/<db>/collection/<collection>/',methods=['GET','POST'])
def get_collection_info(host_id,db,collection):

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	result = mongoComponent.get_collection_info(db,collection)

	return json.dumps(result)

@module.route('/host/<host_id>/database/<db>/collection/<collection>/query/',methods=['GET','POST'])
def query_collection(host_id,db,collection):

	values = request.get_json()

	quantity = 10
	skip = 0
	criteria = ""

	if values is not None:
		if 'quantity' in values:
			quantity = values['quantity'] + 0

		if 'page' in values:
			skip = values['page'] + 0

		if 'criteria' in values:
			criteria = values['criteria']

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	result = mongoComponent.query_collection(db,collection,criteria,quantity,skip)

	return Response(json.dumps(result,cls=Encoder), mimetype='application/json')


@module.route('/host/<host_id>/database/<db>/collection/<collection>/indexes/',methods=["GET"])
def get_collection_index(host_id,db,collection):

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	result = mongoComponent.get_indexes(db,collection)

	return json.dumps(result)


@module.route('/host/<host_id>/database/<db>/collection/<collection>/indexes/',methods=["POST"])
def create_index(host_id,db,collection):

	values = request.get_json()

	try:
		host = getHost(host_id)

		mongoComponent = ComponentContainer.get_mongo_component(host)

		nameIndex = mongoComponent.create_index(db,collection,values)

		return json.dumps( {"message":nameIndex,"error":False} )
	except Exception, e:

		response = Response(json.dumps( {"message":e.message,"error":True} ),status=406,mimetype='application/json')

		return response

@module.route('/host/<host_id>/database/<db>/collection/<collection>/indexes/',methods=['DELETE'])
def delete_index(host_id,db,collection):

	values = request.get_json()

	if 'index_name' not in values:
		return Response('Index name param required',status=400)

	index_name = values['index_name']

	host = getHost(host_id)

	try:
		mongoComponent = ComponentContainer.get_mongo_component(host)

		result =  mongoComponent.drop_index(db,collection,index_name)

		return str(result)
	except Exception, e:
		return Response(json.dumps({'error':True,'message':e.message}),status=500)
	

@module.route('/host/<host_id>/database/<db>/collection/<collection>/document/',methods=['DELETE'])
def delete_document(host_id,db,collection):

	try:
		values = request.get_json()

		if 'document' not in values:
			return Response( json.dumps({"error":True,"message": 'missing document param'}),status=400,mimetype='application/json')

		document = values['document']

		if '_id' not in document:
			return Response( json.dumps({"error":True,"message": 'missing _id param'}),status=400,mimetype='application/json')

		host = getHost(host_id)

		mongoComponent = ComponentContainer.get_mongo_component(host)

		document = json.loads(document)

		result =  mongoComponent.delete_document(db,collection,document)

		return Response( json.dumps(result),mimetype='application/json',status = 200 ) 
	except Exception, e:
		return Response( json.dumps({'message':e.message,'error':True}),status=500,mimetype='application/json')

@module.route('/host/<host_id>/database/<db>/collection/<collection>/document/',methods=['PUT'])
def update_document(host_id,db,collection):
	try:
		values = request.get_json()

		host = getHost(host_id)

		mongoComponent = ComponentContainer.get_mongo_component(host)

	except Exception, e:
		return Response({'message hola ':e.message,'error':True},status=400,mimetype='application/json')

	try:
		raw = values['raw']

		raw = json.loads(raw)

		result = mongoComponent.update_document(db,collection,raw)

		return str(result)

	except Exception, e:
		
		return Response( json.dumps({'message':e.message,'error':True}) ,status=400,mimetype='application/json') 

	return 'nice'

@module.route('/host/<host_id>/database/<db>/collection/<collection>/document/',methods=['POST'])
def create_document(host_id,db,collection):
	try:
		values = request.get_json()

	except Exception, e:
		return Response( json.dumps({'message hola ':e.message,'error':True}),mimetype='application/json',status=400)

	if 'raw' not in values:
		return Response( json.dumps({'message hola ':'raw key not found','error':True}),status=400,mimetype='application/json')


	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	try:
		raw = values['raw']

		raw = json.loads(raw)

		result = mongoComponent.create_document(db,collection,raw)

		return str(result)

	except Exception,e:
		
		return Response({'message':e.message,'error':True},status=500) 

@module.route('/host/<host_id>/database/<db>/',methods=['POST'])
def create_collection(host_id,db):

	values = request.get_json()

	if 'collection_name' not in values:
		return Response("Collection name required",status=406)

	collection_name = values['collection_name']

	host = getHost(host_id)

	mongoComponent = ComponentContainer.get_mongo_component(host)

	try:
		result = mongoComponent.create_collection(db,collection_name)

		return str(result)
	except Exception, e:
		return Response( json.dumps( {"error":True,"message":e.message} ) ,status=500,mimetype="application/json")
	

	


