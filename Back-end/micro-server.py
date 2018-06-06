from bottle import post, request, run
import json

from crawler import crawl_from_initial_url

@post('/crawl')
def crawl():
	body = json.loads(request.body.read())
	url = body['url']
	crawl_from_initial_url(url)
	return 'crawling!'

run(host='localhost', port=8080, debug=True)
