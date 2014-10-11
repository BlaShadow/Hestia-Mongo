import datetime

from mongo_component import MongoComponent

date = datetime.datetime(1,1,1,1,1)

class ComponentContainer(object):

	instances = {}

	@staticmethod
	def get_mongo_component(config):

		key = config['target'] + '_' + str(config['port'])

		if key not in ComponentContainer.instances:

			connection = MongoComponent(config)

			item = {'connection':connection,'created':date.now()}

			ComponentContainer.instances[key] = item

			ComponentContainer.mongo_component = connection

		return ComponentContainer.instances[key]['connection']

	@staticmethod
	def flush_conections():

		hosts = ComponentContainer.instances.keys()

		for host in hosts:
			connection = ComponentContainer.instances[host]['connection']

			connection.close()

		ComponentContainer.instances = {}

		return 'Success'

