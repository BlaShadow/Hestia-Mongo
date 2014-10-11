#mongo components
import pymongo
from bson.objectid import ObjectId
from pymongo import MongoClient


class MongoComponent:
	""" Mongo Component """

	def __init__(self,config):

		host,port = config['target'],int(config['port'])

		self.client = MongoClient(host,port)

	def close(self):
		self.client.close()

	def get_connection(self):
		return self.client

	def get_database_info(self,databaseName):

		data = self.client[databaseName].command("dbstats")

		return { "name":databaseName,"stats":data }

	def create_database(self,name):

		collection_name = 'test-collection'

		collection = self.client[name][collection_name]

		return self.create_document(name,collection_name,{'test':'hola mundo'})

	def get_databses(self):

		dbs = self.client.database_names()

		result = []

		for item in dbs:
			itemStats = self.client[item].command("dbstats")

			result.append({
				"name":item,
				"stats":itemStats
			})

		return result

	def query_collection(self,database,collection,criteria,count=10,skip=0):

		rawResult = None
		collection = self.client[database][collection]

		if skip > 0:
			skip = skip - 1

		if criteria == "" or criteria == None:
			rawResult = collection.find().limit(count).skip(skip * count)
		else:

			criteriaResult = criteria.split(':')

			if len( criteriaResult) == 1:
				rawResult = collection.find({"_id":ObjectId( criteriaResult[0]) }).limit(count).skip(skip * count)
			else:

				query = {}

				key = criteriaResult[0]
				value = criteriaResult[1]

				query['$or'] = [{key:value}]

				if value.isdigit():
					query['$or'].append({key:int(value)})

				rawResult = collection.find(query).limit(count).skip(skip * count)

		data = list(rawResult)

		return {"result":data,"collection_count":collection.count()}

	def get_collection_info(self,database,collection):

		dataItem = self.client[database].command("collstats",collection)

		index = self.client[database][collection].index_information()

		print index

		index = [{'index':index[item],'name':item} for item in index]

		return { "name":collection,"stats":dataItem,'indexes':index }

	def get_collections(self,database):

		db = self.client[database]

		data = db.collection_names()

		result = []

		for collName in data:
			dataItem = self.client[database].command("collstats",collName)

			result.append({ 'stats':dataItem,'name':collName })

		return result

	def get_indexes(self,database,collection):

		result = self.client[database][collection].index_information()

		return result

	def create_index(self,database,collection,values):

		fields = []

		for item in values['elements']:
			order = pymongo.ASCENDING if int(item['type']) == 1 else pymongo.DESCENDING
			field = item['field']

			fields.append((field,order))
			
		return self.client[database][collection].create_index(fields,unique=values['unique'])

	def drop_index(self,database,collection,index_name):

		return self.client[database][collection].drop_index(index_name)

	def create_document(self,database,collection,document):

		collection = self.client[database][collection]

		return collection.save(document)

	def update_document(self,database,collection,document):
		""" 
			facade method to create document
		"""

		document['_id'] = ObjectId( document['_id'] )

		return self.create_document(database,collection,document)

	def get_server_info(self):

		result = {}

		result['host'] = self.client.host,self.client.port
		result['preferences'] = self.client.read_preference
		result['info'] = self.client.server_info()
		result['is_primary'] = self.client.is_primary
		result['is_mongos'] = self.client.is_mongos
		result['max_pool_sixe'] = 100##self.client.max_pool_sixe
		result['nodes'] = list(self.client.nodes)

		return result

	def create_collection(self,db,collection):

		db = self.client[db]

		return db.create_collection(collection)

	def delete_document(self,database,collection,document):
		collection = self.client[database][collection]

		print document
		print type(document)
		print 'Dete document with id ',document['_id']

		document['_id'] = ObjectId( document['_id'] )

		return collection.remove(document)

	def delete_collection(self,database,collection):

		db = self.client[database]

		return db.drop_collection(collection)













