import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Cookies from "universal-cookie";
import Account from "./Account";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";

const cookies = new Cookies();

// Custom route component to handle authentication
function ProtectedRoute({ element: Element, ...rest }) {
  const token = cookies.get("TOKEN");

  // Redirect to home page if user is not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Render the requested component if user is logged in
  return <AuthComponent {...rest}/>;
}

function App() {
  return (
    <Container className="dashboard">
      <Row>
        <Col className="text-center">
          <h1>React Authentication Tutorial</h1>

          <section id="navigation">
            <a href="/">Home</a>
            <a href="/free">Free Component</a>
            <a href="/auth">Auth Component</a>
          </section>
        </Col>
      </Row>

      {/* create routes here */}
      <Routes>
        <Route exact path="/" element={<Account />} />
        <Route exact path="/free" element={<FreeComponent />} />
        <Route path="/auth" element={<ProtectedRoute element={<AuthComponent />} />} />
      </Routes>
    </Container>
  );
}

export default App;