# Facebook Database Cloning (Backend)

This project is a **backend database system inspired by Facebook**, designed for learning and experimentation with data modeling, relationships, and scalable database design.

---

## **Table of Contents**
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Database Schema](#database-schema)
5. [Setup Instructions](#setup-instructions)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Overview**

The goal of this project is to create a **Facebook-like database** using **PostgreSQL**, focusing on:

- Users and their relationships (friends, followers)
- Posts, comments, and reactions
- Messaging system
- Notifications

This backend does **not include a frontend UI**, but the database is structured to support one.

---

## **Features**

- Create, read, update, and delete **users**  
- Manage **friendship and follow relationships**  
- Post **status updates**, **comments**, and **reactions**  
- Send and receive **messages**  
- Generate **notifications** for user activity  

---

## **Technologies**

- **Database:** PostgreSQL  
- **Query Tool / Client:** pgAdmin, psql, or any PostgreSQL client  
- **Documentation / Code Language:** SQL  

---

## **Database Schema**

The project includes the following tables:

| Table | Description |
|-------|-------------|
| `users` | Stores user account information |
| `posts` | Stores user posts |
| `comments` | Stores comments on posts |
| `reactions` | Stores likes or reactions to posts/comments |
| `friends` | Stores friendship relationships between users |
| `messages` | Stores private messages between users |
| `notifications` | Stores user notifications |

Relationships are **properly normalized** and include **foreign keys** to maintain data integrity.

---

## **Setup Instructions**

1. **Install PostgreSQL** if not already installed:  
   [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

2. **Clone this repository**:
   ```bash
   git clone <repository-url>
   cd Facebook_Cloning
