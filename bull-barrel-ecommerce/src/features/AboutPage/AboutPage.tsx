import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page__main-container">
      <div className="hero">
        <h1>The Bull & Barrel Bar</h1>
        <p>A sophisticated whiskey sanctuary within Alexander's Steakhouse</p>
      </div>

      <div className="section">
        <div className="intro-text">
          Welcome to our intimate bar that celebrates the art of whiskey from around the world. Our
          carefully curated space offers an unparalleled collection of premium spirits from America,
          Scotland, Ireland, Japan, India, Canada, Wales, Germany, and Thailand. Where amber spirits
          from every corner of the globe tell stories of tradition, craftsmanship, and time-honored
          distilling techniques. Whether you're savoring a classic Old Fashioned with American
          bourbon, exploring rare Japanese single malts, or discovering innovative expressions from
          emerging whiskey regions, we provide the perfect setting for global whiskey appreciation
          and memorable conversations.
        </div>
      </div>

      <div className="section">
        <div className="membership-container">
          <div className="membership-intro">
            <h3>Private Whiskey Club</h3>
            <p>
              For the true whiskey connoisseur, we offer an exclusive membership that transforms
              casual appreciation into genuine expertise across our global whiskey collection.
            </p>
          </div>

          <div className="price">
            $1,200 <span>annually</span>
          </div>

          <div className="benefits">
            <div className="benefit">
              <h4>Monthly Curated Tastings</h4>
              <p>
                Join fellow enthusiasts for guided explorations of exceptional whiskeys from around
                the world, led by our knowledgeable staff and featuring both established favorites
                and rare discoveries from every whiskey-producing region.
              </p>
            </div>

            <div className="benefit">
              <h4>Personal Whiskey Locker</h4>
              <p>
                Your own secure storage space within our bar, allowing you to build and maintain
                your personal collection in our climate-controlled environment.
              </p>
            </div>

            <div className="benefit">
              <h4>Exclusive Dining Events</h4>
              <p>
                Priority access to special whiskey dinners and pairing events that showcase the
                harmony between exceptional spirits and culinary excellence.
              </p>
            </div>

            <div className="benefit">
              <h4>Member Pricing - 30% Off</h4>
              <p>
                Enjoy significant savings on all bottle purchases, making it easier to expand your
                collection or find the perfect gift for fellow whiskey lovers.
              </p>
            </div>

            <div className="benefit">
              <h4>Welcome Selection</h4>
              <p>
                Begin your membership with our exclusive single barrel bourbon and single barrel rye
                bottles, carefully selected by our team (a $300 value).
              </p>
            </div>

            <div className="benefit">
              <h4>Complimentary Cocktails</h4>
              <p>
                Enjoy cocktails crafted from your personal bottle collection at no additional
                charge, allowing you to experience your whiskeys in new and creative ways.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="closing">
        <blockquote>
          At The Bull and Barrel, we believe whiskey is more than a drink—it's a journey of
          discovery, a connection to tradition, and a celebration of craftsmanship from every corner
          of the whiskey world.
        </blockquote>
        <p className="location">Located within Alexander's Steakhouse, Pasadena</p>
      </div>
    </div>
  );
};

export default AboutPage;
