# 🚀 Lead Distribution System (CRM)

A full-stack **Customer Relationship Management (CRM)** application designed to automate sales operations. It solves the problem of manual lead assignment by using a **Round Robin Algorithm** to fairly distribute incoming leads (from CSV uploads) to sales agents instantly.

## 🎥 Video Demonstration
Here is the working demo of the application:
[Watch Video on Google Drive](https://drive.google.com/file/d/1N650-Z9QHhQZfUZofwiu0RQPdrbRJQcP/view?usp=sharing)

## 🌟 Key Features

### 🛡️ Admin Panel (Manager View)
- **User Management:** Create, view, and delete Sales Agents securely.
- **Bulk Data Processing:** Upload thousands of leads via **CSV/Excel** files.
- **Smart Automation:** Automatically assigns leads to agents in a rotational (Round Robin) manner to ensure fairness.
- **Lead Tracking:** Monitor all leads, see who they are assigned to, and track status.
- **System Stats:** Real-time overview of active agents and total leads.

### 👤 Agent Panel (Sales View)
- **Personalized Dashboard:** Agents see *only* the leads assigned to their specific ID (Data Security).
- **Lead Details:** Access customer Name, Phone, and Notes.
- **Status Workflow:** Track lead progress (New, Contacted, Interested).
- **Mobile Responsive:** Fully optimized interface for agents working on their phones.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, Lucide React (Icons), Context API, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens), Bcrypt.js |
| **File Handling** | Multer, CSV-Parser, FS (File System) |

---

## 🚀 Installation & Setup
Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/ManjunathS2/lead-distribution-system.git 
cd lead-distribution-system
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:

```bash
cd Backend
npm install
```

Configure Environment Variables
Create a file named .env in the Backend folder and add:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Start the Server:

```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder:

```bash
cd Frontend
npm install
```

Start the Client:

```bash
npm run dev
```

### 📖 Usage Guide

## 1. Log in as Admin
   
Email: admin@test.com
Password: 123
Capabilities: Create Agents, Upload CSVs, Delete Users/Leads.

## 2. Sample CSV Format
   
To test the upload feature, create a file named leads.csv with these exact headers:

```bash
FirstName,Phone,Notes
John Doe,9876543210,Interested in Loans
Jane Smith,9123456789,Looking for Credit Card
```

## 3. Log in as Agent
Use the credentials created by the Admin.
Capabilities: View assigned leads.
