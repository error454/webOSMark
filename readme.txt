webOSMark

A benchmark suite for webOS.  This includes:
webOSMark - An SDL based client for webOS that wraps the Coremark benchmark.  Uses curl to post scores to an http server.  Old and crusty, needs a lot of love, most notably the ditching of the SDL UI.
webOSMarkStats - A Mojo based client for webOS that reads scores off the server and displays graphs and statistics.
webOSMarkServer - A server written for Google App Engine to store uploaded data from webOSMark.  Lots of code for such a simple thing.

By changing a few key variables, you could have your own stats server up and running quite quickly.

License:	MIT 
Author:		Zachary Burke
Twitter: 	@error454
Website:	http://mobilecoder.wordpress.com