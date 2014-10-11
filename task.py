import sys, getopt

def main(argv):

	try:
		print argv

		help()
	except Exception, e:
		print 'Exception'


def help():
	print 'Avaliables commands'

	print "--create-user"
	print "--create-super-user"

if __name__ == "__main__":
   main(sys.argv[1:])