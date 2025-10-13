### **Project Documentation: Old Book Management System**  

---

#### **1. Project Idea and Objectives**  
**Main Objective:**  
Create an electronic platform for selling used books containing readers' notes, aiming to:  
- **Preserve Cultural Heritage**: Prevent the loss of books with intellectual value by providing a platform for selling them.  
- **Promote Knowledge Exchange**: Enable users to share their notes on books.  
- **Enhanced User Experience**: Design an intuitive interface reflecting the nature of old books and simplifying purchasing/management processes.  

**Key Features:**  
- Display book details (name, author, price, cover image, category).  
- Book management operations (add/edit/delete) with secure JWT authentication.  
- Interactive interface with search and filtering by name or category.  
- Aesthetic design reflecting a heritage theme uasing carefully chosen colors and fonts.  

---

#### **2. Planning and Requirements Analysis**  
**Target Audience:**  
- **Readers**: Seeking rare or classic books.  
- **Sellers**: Wanting to sell their books while preserving their handwritten notes.  

**Functional Requirements:**  
- User registration/login system.  
- Book management (view, add, edit, delete).  
- Filter books by category (literature, science, history, etc.).  
- Search by name or author.  

**Non-Functional Requirements:**  
- Intuitive user interface reflecting cultural heritage.  
- High security via password encryption and JWT.  

---

#### **3. Technologies Used**  
**Frontend:**  
- **React.js**: To build an interactive UI with reusable components (e.g., book cards, management forms).  
- **Bootstrap**: For rapid, responsive styling with custom color and font adjustments.  
- **React Router**: To manage navigation between pages (Home, Cart, Login, Book Management).  
- **Axios**: To send HTTP requests to the backend.  

**Backend:**  
- **PHP**: To build JWT-protected API endpoints.  
- **MySQL**: Database with tables:  
  - `books` (stores book data).  
  - `users` (stores encrypted user data).  
  - `cart` (tracks books added to the cart).  
  - `types` (book categories like literature, science).  

---

#### **4. UI/UX Design**  
**A. Colors and Visual Design:**  
- **Primary Colors:**  
  - **Dark Red (#8B0000)**: For buttons and headings to evoke a classic feel.  
  - **Black (#000000)**: For primary text clarity.  
  - **Gray (#808080)**: For backgrounds to reduce eye strain.  
- **Goal**: Create a visually cohesive theme that aligns with the "old book" aesthetic.  

**B. Typography:**  
- **Headings**: *Nunito* (clean and modern).  
- **Body Text**: *Nunito* (balanced readability).  

**C. Image Style:**  
Surreal and Abstract Collage

---

#### **5. Interactive Features**  
**A. Cart System:**  
- **Management**:  
  - Temporary use of `localStorage` (instead of React Context due to initial complexity).  
  - Display item count next to the cart icon in the navigation bar.  
- **Navigation**:  
  - "Cart" button redirects to the cart page via `<Link to="/cart">`.  
  - "Back to Shopping" button on the cart page redirects to the homepage.  

**B. Search and Filtering:**  
- **Search by Name/Author**:  
  - Text input field with real-time updates using `onChange`.  
- **Filter by Category**:  
  - Dropdown menu populated with categories from the `types` table.  

**C. User Greeting:**  
- **Display Username**:  
  - Extracted from the JWT token stored in `localStorage` and displayed in the navigation bar.  
  - Example code:  
    ```javascript
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userName = decoded.data.name; // Username
    ```  
    - Displayed as: `Welcome, ${userName}!`.  

---

#### **6. Frontend-Backend Integration**  
**A. API Requests:**  
- **Fetch Data**:  
  - Use `axios.get()` to retrieve books from `/api/books`.  
- **Submit Data**:  
  - Example for adding a book:  
    ```javascript
    axios.post('/api/books', formData, {  
      headers: {  
        'Authorization': `Bearer ${token}`  
      }  
    })  
    ```  

**B. Access Control:**  
- **Protected Pages**:  
  - Book management pages (add/edit/delete) require a valid JWT token.  
  - The token is sent in the request header (`Authorization: Bearer <token>`).  

---

#### **7. Key Challenges and Solutions**  
**Challenge 1: JWT Signature Issue**  
- **Issue**: "Invalid Signature" error on jwt.io.  
- **Cause**: Secret key mismatch between server and client.  
- **Solution**:The issue is still unresolved: The solution is to use phpdotenv to manage keys via .env, with additional server adjustments required. However, the issue is still unresolved


**Challenge 2: Cart State Management**  
- **Issue**: Difficulty synchronizing cart state across components.  
- **Solution**: Temporary use of `localStorage` with plans to migrate to React Context.  

**Challenge 3: Responsive Design**  
- **Issue**: Ensuring consistent book card display across devices.  
- **Solution**: The solution is to use the Bootstrap grid with col-md-4 to display three cards per row on medium screens. However, some components are still incomplete in terms of responsiveness.

---
**8Technologies Used for Testing in the Book Management Project**
****Postman - API Testing & JWT Authentication
1- Testing API Endpoints (GET, POST, PUT, DELETE):

Sending requests to verify server responses.
Checking response codes (200 for success, 400 for invalid input, 401 for unauthorized access, 500 for server errors).
2- User Authentication Testing (JWT Authentication):

Sending login credentials and receiving a JWT token.
Using the token in protected requests to confirm authentication works.
Simulating scenarios like incorrect login details .
3- Verifying Database Data:

Comparing API response data with the values stored in MySQL.
***-*** Console - Testing React & Frontend Behavior
1- Validating API Responses:

Using console.log() to inspect data received from the API.
Checking for errors like 401 Unauthorized or 500 Server Error.
2-Monitoring React State (useState):

Ensuring state updates correctly when performing actions like adding books to the cart.
Checking data flow between components via props and context API.
3- Error Handling Tests:

Entering invalid inputs and ensuring appropriate error messages appear.
Simulating scenarios like missing data or server connection failure.

#### **9. Outcomes**  
- **Complete UI**: 4 main pages (Home, Cart, Login, Book Management).  
- **Secure Authentication**: JWT-protected operations.  
- **Structured Database**: 4 relational tables with clear connections.  

---

#### **10. Lessons Learned**  
- **Token Management**: Criticality of environment variables for secret keys.  
- **Component Interaction**: Importance of planning state management in React.  
- **Visual Design**: Impact of colors and typography on user perception.  

#### **11. Conclusion**  
A fully functional system for managing used books was successfully developed, combining an engaging UI with robust technical capabilities. Despite challenges (e.g., JWT signature issues), the project achieved its core goals, including:  
- A secure platform for selling/preserving books.  
- A heritage-inspired design reflecting the books' cultural value.  
- Streamlined management workflows for registered users.  


**Final Notes:**  
I am available for a live demo or further technical discussions.  
