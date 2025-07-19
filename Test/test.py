import requests
# Your API endpoint
API_URL = 'http://localhost:4576/users'

# Create randomized user data to avoid unique constraint violations

new_user = {
    "firstname": "Jane",
    "lastname": "Doe",
    "username": "janedoe",
    "email": "jane@example.com",
    "phonenumber": "010",
    "password": "SecurePass123!",
    "profile_image_url": "https://example.com/profile.jpg"
}

# Send POST request
response = requests.post(API_URL, json=new_user)
# response = requests.get(API_URL)

# Print results
print("Status Code:", response.status_code)
try:
    print("Response:", response.json())
except Exception as e:
    print("Error parsing response:", e)
    print("Raw text:", response.text)
