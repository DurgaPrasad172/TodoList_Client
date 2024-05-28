// // src/components/layout/Header.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css'; // Import the CSS file

// const Header = () => {
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//   };

//   return (
//     <header className="header">
//       <nav className="nav">
//         <ul className="nav-list">
//           <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
//           {!user ? (
//             <>
//               <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
//               <li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link></li>
//             </>
//           ) : (
//             <>
//               <li className="nav-item"><Link to="/todo-list" className="nav-link">Todo List</Link></li>
//               <li className="nav-item"><Link to="/login" className="nav-link" onClick={handleLogout}>Logout</Link></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the CSS file

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <h1 className="todo-list-heading">Todo List</h1>
        </div>
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          {!user ? (
            <>
              <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
              <li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link to="/todo-list" className="nav-link">Todo List</Link></li>
              <li className="nav-item"><button onClick={handleLogout} className="nav-link logout-button">Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
