import requests


def send_post_request_createBatch(api_url, data):
    response = requests.post(api_url, json=data)

    if response.status_code == 201:
        print("Post created successfully:", response.json())
        response_data = response.json()
        post_id = response_data.get('id')
        return post_id
    else:
        raise ValueError("Failed to create POST:", response.status_code, response.text)


# Example usage
'''api_url = "http://127.0.0.1:8000/users/admin/createuser/"  # Your Django API endpoint
data = {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "username": "johndoe",
    "password": "yourpassword"
}

send_post_request(api_url, data)

try:
    response = requests.post(api_url, json=data)

    if response.status_code == 201:
        print("Post created successfully:", response.json())
    else:
        print("Failed to create POST:", response.status_code, response.text)

except requests.exceptions.RequestException as e:
    print("Error during request:", e)
'''