
import { useState } from "react";
import {
  Plane, MapPin, Camera, BookOpen, Plus,
  Search, ArrowUpRight, Heart, Menu, X,
  Share2, CalendarDays
} from "lucide-react";
import "./App.css";

const initialTrips = [
  {
    id: 1,
    title: "Melbourne",
    country: "Australia",
    date: "August 2027",
    photos: 0,
    cover:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1000&q=85",
    description: "City strolls, little cafés and memories waiting to be made.",
    color: "peach",
  },
  {
    id: 2,
    title: "A little escape",
    country: "Your next adventure",
    date: "Coming soon",
    photos: 0,
    cover:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=85",
    description: "Every journey starts with a little curiosity.",
    color: "green",
  },
];

const navItems = [
  { label: "Home", icon: BookOpen },
  { label: "My Trips", icon: Plane },
  { label: "Gallery", icon: Camera },
  { label: "About", icon: Heart },
];

function App() {
  const [trips, setTrips] = useState(initialTrips);
  const [page, setPage] = useState("Home");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredTrips = trips.filter((trip) =>
    `${trip.title} ${trip.country}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addTrip(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const trip = {
      id: Date.now(),
      title: form.get("title"),
      country: form.get("country") || "A new destination",
      date: form.get("date") || "Date not set",
      photos: 0,
      cover:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
      description:
        form.get("description") || "A new chapter in my travel story.",
      color: "peach",
    };

    setTrips((previous) => [trip, ...previous]);
    setShowForm(false);
    setPage("My Trips");
    setNotice("Your new trip has been added to this preview!");
    event.currentTarget.reset();
  }

  async function sharePage() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("Preview link copied! Online sharing will be enabled after deployment.");
    } catch {
      setNotice("Your website address is " + window.location.href);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => {
          setPage("Home");
          setSelectedTrip(null);
        }}>
          <span className="brand-icon"><Plane size={21} /></span>
          <span>little <b>journeys</b><small>MY TRAVEL JOURNAL</small></span>
        </button>

        <nav className="desktop-nav">
          {navItems.map(({ label }) => (
            <button
              key={label}
              className={page === label ? "nav-link active" : "nav-link"}
              onClick={() => {
                setPage(label);
                setSelectedTrip(null);
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <button className="share-button" onClick={sharePage}>
          <Share2 size={16} /> <span>Share</span>
        </button>
      </header>

      {notice && (
        <div className="notice">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      )}

      {selectedTrip ? (
        <main className="trip-detail">
          <button className="back-link" onClick={() => setSelectedTrip(null)}>
            ← Back to my trips
          </button>
          <div className="detail-cover" style={{ backgroundImage: `url("${selectedTrip.cover}")` }}>
            <span className="eyebrow">MY TRAVEL STORY</span>
            <h1>{selectedTrip.title}</h1>
            <p><MapPin size={16} /> {selectedTrip.country} · {selectedTrip.date}</p>
          </div>
          <section className="detail-content">
            <span className="eyebrow">A NOTE TO REMEMBER</span>
            <h2>Every place leaves a little something behind.</h2>
            <p>{selectedTrip.description}</p>
            <div className="empty-journal">
              <Camera size={30} />
              <h3>Your memories belong here.</h3>
              <p>Later, you will be able to add photos, daily stories, food, expenses and special moments to this page.</p>
            </div>
          </section>
        </main>
      ) : (
        <main>
          {page === "Home" && (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <span className="eyebrow">A PASSPORT TO MY MEMORIES ✳</span>
                  <h1>Collect moments,<br />not <em>things.</em></h1>
                  <p>
                    Little adventures, beautiful places, happy accidents
                    and all the moments I want to keep forever.
                  </p>
                  <button className="primary-button" onClick={() => setPage("My Trips")}>
                    Explore my journeys <ArrowUpRight size={17} />
                  </button>
                  <div className="hero-note">Made with love, one trip at a time ♡</div>
                </div>

                <div className="hero-photo">
                  <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=90"
                    alt="Beautiful mountain lake"
                  />
                  <div className="photo-stamp">POSTCARD<br />FROM MY HEART ✳</div>
                  <div className="floating-note">
                    <span>✳ A little reminder</span>
                    <b>Life is better<br />when explored.</b>
                  </div>
                </div>
              </section>

              <section className="intro-row">
                <div>
                  <span className="eyebrow">THE MEMORY COLLECTION</span>
                  <h2>Every trip has a story<span className="orange-dot">.</span></h2>
                </div>
                <p>Places I've been, people I've met,<br />and moments that feel like sunshine.</p>
              </section>
            </>
          )}

          {page === "My Trips" && (
            <section className="page-heading">
              <span className="eyebrow">THE ADVENTURE ARCHIVE</span>
              <h1>My little journeys<span className="orange-dot">.</span></h1>
              <p>A collection of places I've been and stories still unfolding.</p>
            </section>
          )}

          {page === "Gallery" && (
            <section className="page-heading">
              <span className="eyebrow">LITTLE MOMENTS, BIG MEMORIES</span>
              <h1>The photo diary<span className="orange-dot">.</span></h1>
              <p>A home for all the beautiful things I want to remember.</p>
            </section>
          )}

          {page === "About" && (
            <section className="page-heading about-page">
              <span className="eyebrow">A LITTLE ABOUT THIS SPACE</span>
              <h1>My world, one trip at a time<span className="orange-dot">.</span></h1>
              <p>This is my personal corner of the internet, made to keep travel memories alive and share a little happiness with the people I love.</p>
            </section>
          )}

          {page !== "About" && (
            <section className="trips-section">
              <div className="section-toolbar">
                <div>
                  <h2>{page === "Gallery" ? "Snapshots & stories" : "Recent adventures"} <span>✳</span></h2>
                  <p>{trips.length} little chapters in my collection</p>
                </div>
                <div className="toolbar-actions">
                  <label className="search-box">
                    <Search size={17} />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Find a journey..."
                    />
                  </label>
                  <button className="primary-button add-button" onClick={() => setShowForm(true)}>
                    <Plus size={17} /> New trip
                  </button>
                </div>
              </div>

              <div className="trip-grid">
                {filteredTrips.map((trip, index) => (
                  <article className="trip-card" key={trip.id}>
                    <button className="trip-image-button" onClick={() => setSelectedTrip(trip)}>
                      <img src={trip.cover} alt={trip.title} className="trip-cover" />
                      <span className="trip-number">NO. {String(index + 1).padStart(2, "0")}</span>
                      <span className="image-arrow"><ArrowUpRight size={19} /></span>
                    </button>
                    <div className="trip-info">
                      <div className="trip-meta">
                        <span><MapPin size={13} /> {trip.country}</span>
                        <span><CalendarDays size={13} /> {trip.date}</span>
                      </div>
                      <button className="trip-title" onClick={() => setSelectedTrip(trip)}>
                        {trip.title}
                      </button>
                      <p>{trip.description}</p>
                      <div className="trip-footer">
                        <span><Camera size={14} /> {trip.photos} photos</span>
                        <Heart size={17} />
                      </div>
                    </div>
                  </article>
                ))}

                <button className="new-trip-card" onClick={() => setShowForm(true)}>
                  <span className="plus-circle"><Plus size={24} /></span>
                  <b>Your next adventure</b>
                  <span>Every memory starts somewhere.</span>
                </button>
              </div>
              {filteredTrips.length === 0 && <p className="empty-message">No journeys found. Try another search!</p>}
            </section>
          )}
        </main>
      )}

      <footer className="footer">
        <span>✳ made with a little wanderlust & lots of love</span>
        <span>MY TRAVEL JOURNAL · EST. 2026</span>
      </footer>

      {showForm && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowForm(false);
        }}>
          <form className="trip-form" onSubmit={addTrip}>
            <button type="button" className="close-button" onClick={() => setShowForm(false)}>
              <X size={20} />
            </button>
            <span className="eyebrow">A NEW CHAPTER BEGINS</span>
            <h2>Add a little journey<span className="orange-dot">.</span></h2>
            <label>Trip name *
              <input name="title" required placeholder="e.g. Melbourne diaries" />
            </label>
            <label>Country or destination
              <input name="country" placeholder="e.g. Australia" />
            </label>
            <label>When?
              <input name="date" placeholder="e.g. August 2027" />
            </label>
            <label>A little note
              <textarea name="description" placeholder="What makes this journey special?" rows="3" />
            </label>
            <button className="primary-button form-submit" type="submit">
              Create my trip <ArrowUpRight size={17} />
            </button>
            <p className="form-note">Preview only: trips are not saved to the cloud yet.</p>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
