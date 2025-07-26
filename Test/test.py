import requests

# Change this if your server runs on a different port or domain
url = 'http://localhost:3000/upload'

# Upload the hello.jpg file
with open('hello.jpg', 'rb') as f:
    files = {'file': ('hello.jpg', f, 'image/jpeg')}
    response = requests.post(url, files=files)

# Print result
print("Status:", response.status_code)
try:
    print("Response:", response.json())
except Exception as e:
    print("Failed to parse JSON:", e)
    print("Raw response:", response.text)
