import requests
from google.transit import gtfs_realtime_pb2

feed = gtfs_realtime_pb2.FeedMessage()
response = requests.get('https://your-provider-url/gtfs-realtime')
feed.ParseFromString(response.content)

for entity in feed.entity:
    if entity.HasField('trip_update'):
        print(entity.trip_update)
