import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { personal } from "../data/portfolio";

type ToastType = "success" | "error" | null;

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastType>(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (type: ToastType, msg: string) => {
    setToast(type);
    setToastMsg(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("error", "Please fill in all fields.");
      return;
    }
    setLoading(true);

    emailjs
      .send(
        personal.emailjs.serviceId,
        personal.emailjs.templateId,
        {
          from_name:  form.name,
          to_name:    personal.nickname,
          from_email: form.email,
          to_email:   personal.email,
          message:    form.message,
        },
        personal.emailjs.publicKey
      )
      .then(() => {
        setLoading(false);
        showToast("success", "Message sent! I'll get back to you soon. 🎉");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setLoading(false);
        showToast("error", "Failed to send. Please try again or email directly.");
      });
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast}`}>
            {toast === "success" ? "✅ " : "❌ "}
            {toastMsg}
          </div>
        </div>
      )}

      <section id="contact" className="section contact-section">
        <div className="container">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's <span>Connect.</span>
          </h2>

          <div className="contact-grid">
            {/* Info Side */}
            <div className="contact-info">
              <p className="contact-blurb">
                Have a project in mind? Want to collaborate? Or just want to say
                hi? My inbox is always open — I'll try my best to get back to
                you!
              </p>

              <div className="contact-link-list">
                <a
                  href={`mailto:${personal.email}`}
                  className="contact-link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-email-link"
                >
                  <span className="contact-link-icon">✉️</span>
                  {personal.email}
                </a>
                <a
                  href={`tel:${personal.phone}`}
                  className="contact-link-item"
                  id="contact-phone-link"
                >
                  <span className="contact-link-icon">📱</span>
                  {personal.phone}
                </a>
                <a
                  href={personal.linkedin}
                  className="contact-link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin-link"
                >
                  <span className="contact-link-icon">💼</span>
                  linkedin.com/in/muhammad-ainur-riziq
                </a>
                <a
                  href={personal.github}
                  className="contact-link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-github-link"
                >
                  <span className="contact-link-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: "inline" }}>
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </span>
                  MuhammadAinurRiziq13
                </a>
              </div>
            </div>

            {/* Form Side */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form"
              id="contact-form"
            >
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to say?"
                  className="form-textarea"
                  required
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={loading}
                id="contact-submit-btn"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
