import requests

# API URL and parameters
url = "https://api.menetbrand.com/hungary/gtfs/download"
params = {
    "config_id": "kaposvar",  # Using the 'kaposvar' configuration ID
    "type": "7z"  # Desired download format (7z)
}

# HTTP header with the authorization token
headers = {
    "Authorization": "Basic cbrgwtzhljucjysmepxkysxsnpqddhetgrnsunjudfpfurvrhrbyprpurdrqltie",
    "Service-Version": "3.0.0"
}

# Debugging the headers
print(f"Authorization header: {headers['Authorization']}")

# Sending the GET request to the API
response = requests.get(url, params=params, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    # Saving the response content to a file
    with open("kaposvar_gtfs_data.7z", "wb") as file:
        file.write(response.content)
    print("The file has been successfully downloaded: kaposvar_gtfs_data.7z")
else:
    print(f"An error occurred during the download. HTTP Status Code: {response.status_code}")
    print(f"Response Text: {response.text}")
