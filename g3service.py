import googlemaps
from flask import Flask, request, render_template

apiKey = '*******************************' // Pass API key here.
map = googlemaps.Client(key=apiKey)

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('landing.html')

@app.route('/result', methods=['GET'])
def result():
    r = request.args.get('userloc')
    response = map.geocode(address=str(r))
    lat = response[0]['geometry']['location']['lat']
    lng = response[0]['geometry']['location']['lng']
    human = response[0]['formatted_address']
    return render_template('resultcopy.html', loc=human, latitude=lat, longitude=lng)

if __name__ == '__main__':
    app.run()