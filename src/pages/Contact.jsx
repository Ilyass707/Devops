import React, { useState } from "react";
import bg1 from "../assets/bg1.jpg";
import BackButton from '../components/BackButton';

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [reviewData, setReviewData] = useState({
    review: "",
    rating: 0,
  });

  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (starValue) => {
    setReviewData((prev) => ({ ...prev, rating: starValue }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: send contactData to backend or email service
    setContactSubmitted(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // TODO: send reviewData to backend or store
    setReviewSubmitted(true);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-3xl ${
            i <= reviewData.rating ? "text-yellow-400" : "text-gray-400"
          }`}
          onClick={() => handleRatingClick(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleRatingClick(i);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
        >
          {i <= reviewData.rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className="pt-20 px-4 md:px-24 bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${bg1})` }}
    >
        <BackButton />
      {/* Overlay */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        {/* Contact Form */}
        <section>
          {contactSubmitted ? (
            <p className="text-green-600 text-center">
              Thank you for reaching out! We'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={contactData.name}
                  onChange={handleContactChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={contactData.subject}
                  onChange={handleContactChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Subject (optional)"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  required
                  rows="5"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-900 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </section>

        {/* Review Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-center">Write a Review</h2>
          {reviewSubmitted ? (
            <p className="text-green-600 text-center">
              Thank you for your review!
            </p>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-xl mx-auto">
              <div>
                <label className="block mb-1 font-semibold" htmlFor="review">
                  Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={reviewData.review}
                  onChange={handleReviewChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Write your review here (optional)..."
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Rate Us</label>
                <div className="flex justify-center">{renderStars()}</div>
              </div>

              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-900 transition"
              >
                Submit Review
              </button>
            </form>
          )}
        </section>

        {/* Contact info footer */}
        <div className="mt-12 text-center text-gray-700 space-y-2">
          <p>
            Email:{" "}
            <a
              href="mailto:support@yourfitnessapp.com"
              className="text-blue-600 underline"
            >
              support@yourfitnessapp.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+212664567965" className="text-blue-600 underline">
              +212-664567965
            </a>
          </p>
          <p>
            Follow us on social media:{" "}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Facebook
            </a>
            ,{" "}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Instagram
            </a>
            ,{" "}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
