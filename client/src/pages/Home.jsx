
import './Home.css'; // Import the CSS file
import featureImage1 from '../assets/images/VE1.jpg';
import featureImage2 from '../assets/images/VE1.jpg';
import featureImage3 from '../assets/images/VE1.jpg';

const Home = () => {
  return (
    <div className="home-container">
      <div className="headerss">
        <div className="header-content">
          <h1>Welcome to Your Editing App</h1>
          <p>A place to create and edit amazing videos</p>
          <button>Get Started</button>
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <img src={featureImage1} alt="Intuitive Interface" />
          <h2>Intuitive Interface</h2>
          <p>Easily navigate through our user-friendly interface.</p>
        </div>
        <div className="feature">
          <img src={featureImage2} alt="Powerful Editing Tools" />
          <h2>Powerful Editing Tools</h2>
          <p>Access a wide range of tools to make your videos stand out.</p>
        </div>
        <div className="feature">
          <img src={featureImage3} alt="Collaborate Effortlessly" />
          <h2>Collaborate Effortlessly</h2>
          <p>Work with your team seamlessly on projects.</p>
        </div>
      </div>
      <div className="footer">
        <p>Start creating your masterpiece today!</p>
      </div>
    </div>
  );
}

export default Home;
