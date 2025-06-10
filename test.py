import requests

BASE_URL = "http://192.168.14.210:3000/upload"
TEST_FILE = "Phal_Sovandy_HW1.pdf"
NEW_FILE_NAME = "downloaded.pdf"

# Upload the file
# with open(TEST_FILE, 'rb') as f:
#     files = {'file': (TEST_FILE, f)}
#     response = requests.post(BASE_URL, files=files)
#     print("Upload Response:", response.json())

# Download the file
response = requests.get(f"{BASE_URL}/{TEST_FILE}")
if response.status_code == 200:
    with open(NEW_FILE_NAME, 'wb') as f:
        f.write(response.content)
    print(f"File saved as {NEW_FILE_NAME}")
else:
    print("Download Response:", response.json())

# Delete the file
# response = requests.delete(f"{BASE_URL}/{TEST_FILE}")
# print("Delete Response:", response.json())