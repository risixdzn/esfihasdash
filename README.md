<a href="https://esfihasdash.vercel.app">
    <img src ="./public/assets/img/readmeimg.png"/>
</a>    
<p align="center">
    <b>BR</b>: "EsfihasDash" é um sistema de gerenciamento de clientes, pedidos e produtos, baseado em uma aplicação CRUD. / <b>EN</b>: "EsfihasDash", a CRUD based application that can manage clients, orders and products as a webapp.    
</p>
<div align="center">

### **Deployment**

[![deployment](https://img.shields.io/badge/EsfihasDash-000?style=for-the-badge&logo=vercel&logoColor=white)](https://esfihasdash.vercel.app/)
</div>

## 🚀 **Stack**

**Framework:**

[![framework](https://img.shields.io/badge/React-2289e3?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)

**DB:**

[![db](https://img.shields.io/badge/firestore-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://react.dev)

**Authentication:** 

[![auth](https://img.shields.io/badge/firebase/auth-ff8c00?style=for-the-badge&logo=firebase&logoColor=white)](https://react.dev)

## 🌌 **Features**

- Authentication
- Dashboard 
- Clients, products and order management.
 

## **Run Locally**

Clone the project

```bash
  git clone https://github.com/risixdzn/esfihasdash.git
```

Go to the project directory

```bash
  cd esfihasdash
```

Install dependencies

```bash
  npm install | yarn
```

Get your own Firebase API key
- Create a project at https://console.firebase.google.com
- Copy the following project info:
```js
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "api_key", //<- copy this
  authDomain: "auth_domain",
  projectId: "project_id",
  storageBucket: "storage_bucket",
  messagingSenderId: "messaging_sender_id", //<- copy this
  appId: "app_id" //<- copy this
};
```

- Create a ".env" file at the project root directory

- Paste the following info:

```dotenv
REACT_APP_API_KEY="api_key"
REACT_APP_MESSAGE_SENDER="messaging_sender_id"
REACT_APP_APP_ID="app_id"
```

Start the server

```bash
  npm start | yarn start
```


