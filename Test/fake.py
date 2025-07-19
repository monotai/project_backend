from faker import Faker
import random
import csv

# Initialize Faker
faker = Faker()

# Define number of fake records
num_records = 1000000

# Define CSV file name
csv_file = "fake_users.csv"

# Create and write to the CSV file
with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    
    # Write header
    writer.writerow(["id", "name", "email", "address", "phone", "age"])
    
    # Write fake data
    for i in range(1, num_records + 1):
        name = faker.name()
        email = faker.email()
        address = faker.address().replace("\n", ", ")
        phone = faker.phone_number()
        age = random.randint(18, 80)
        
        writer.writerow([i, name, email, address, phone, age])

print(f"✅ {num_records} fake users saved to '{csv_file}'")
