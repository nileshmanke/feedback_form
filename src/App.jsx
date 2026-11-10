import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Heart,
  LockKeyhole, MessageCircle, ShieldCheck, Sparkles, Star, ExternalLink
} from "lucide-react";

const PROJECT_URL = "https://bank-f-nu.vercel.app/";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const steps = [
  { label: "Welcome", eyebrow: "A small request" },
  { label: "Explore", eyebrow: "Try the project" },
  { label: "Thank you", eyebrow: "Your time matters" },
  { label: "Feedback", eyebrow: "Your thoughts" }
];

function App() {
  const [step, setStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", role: "", liked: "", improve: "", comments: "", consent: true
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));

  const next = () => {
    setError("");
    setStep(current => Math.min(current + 1, 3));
  };
  const back = () => {
    setError("");
    setStep(current => Math.max(current - 1, 0));
  };

  async function submitFeedback(event) {
    event.preventDefault();
    setError("");
    if (!rating) return setError("Please select an overall rating before submitting.");
    if (!form.consent) return setError("Please confirm the feedback notice to continue.");

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError("Feedback email is not configured yet. Please contact the project owner.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const templateParams = {
        to_email: "nileshmanke12ab@gmail.com",
        project_name: "Bank Loan Risk Prediction",
        from_name: form.name || "Anonymous visitor",
        from_email: form.email || "Not provided",
        user_role: form.role || "Not provided",
        rating: `${rating}/5`,
        recommendation: recommend || "Not answered",
        liked: form.liked || "Not provided",
        improvements: form.improve || "Not provided",
        additional_comments: form.comments || "Not provided",
        submitted_at: new Date().toLocaleString()
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
    } catch (err) {
      console.error("EmailJS feedback submission failed:", err);
      setStatus("error");
      setError("We couldn't send your feedback right now. Please try again in a moment.");
    }
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setStep(0); }}>
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>PROJECT <b>FEEDBACK</b></span>
        </a>
        <span className="owner-tag">A project by <strong>Nilesh Manke</strong></span>
      </header>

      <section className="progress-wrap" aria-label="Feedback progress">
        <div className="progress-meta"><span>{steps[step].eyebrow}</span><span>0{step + 1} / 04</span></div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        <div className="step-labels">
          {steps.map((item, index) => <span key={item.label} className={index <= step ? "active" : ""}>{item.label}</span>)}
        </div>
      </section>

      <section className="main-card" key={step}>
        <div className="card-glow" />
        {step === 0 && (
          <div className="screen welcome-screen">
            <div className="icon-orb"><Heart size={27} /></div>
            <p className="eyebrow">YOUR OPINION MAKES A DIFFERENCE</p>
            <h1>You’re about to give feedback to <span>Nilesh Manke’s</span> project.</h1>
            <p className="lead">Thank you for being here. Your honest thoughts can help make this project more useful, clear, and reliable.</p>
            <div className="respect-note"><ShieldCheck size={18} /><span>Your feedback is valued. Please share what you genuinely think—there are no right or wrong answers.</span></div>
            <button className="primary-btn" onClick={next}>Let’s get started <ArrowRight size={18} /></button>
            <p className="tiny-note">It only takes a few minutes.</p>
          </div>
        )}

        {step === 1 && (
          <div className="screen explore-screen">
            <div className="icon-orb cyan"><ExternalLink size={25} /></div>
            <p className="eyebrow">BEFORE YOU SHARE YOUR THOUGHTS</p>
            <h1>Please take a moment to <span>explore the project.</span></h1>
            <p className="lead">To make your feedback meaningful, we kindly request that you try the Bank Loan Risk Prediction application first.</p>
            <a className="project-link" href={PROJECT_URL} target="_blank" rel="noreferrer">
              <span className="project-link-icon"><ExternalLink size={20} /></span>
              <span><small>OPEN THE LIVE PROJECT</small><strong>Bank Loan Risk Prediction</strong><em>bank-f-nu.vercel.app</em></span>
              <ChevronRight className="link-arrow" />
            </a>
            <div className="check-list">
              <div><CheckCircle2 size={17} /> Explore the dashboard and its information.</div>
              <div><CheckCircle2 size={17} /> Try the applicant form with sample values.</div>
              <div><CheckCircle2 size={17} /> Review the prediction result and user experience.</div>
            </div>
            <p className="gentle-reminder">When you’re finished exploring, come back to this page and continue.</p>
            <div className="button-row"><button className="secondary-btn" onClick={back}><ArrowLeft size={17} /> Back</button><button className="primary-btn" onClick={next}>I’ve explored the project <ArrowRight size={18} /></button></div>
          </div>
        )}

        {step === 2 && (
          <div className="screen thanks-screen">
            <div className="thank-you-art"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="thank-icon"><Heart size={34} fill="currentColor" /></div><span className="spark spark-a">✦</span><span className="spark spark-b">✧</span><span className="spark spark-c">✦</span></div>
            <p className="eyebrow">A MOMENT OF APPRECIATION</p>
            <h1>We appreciate your <span>valuable time.</span></h1>
            <p className="lead">Thank you for exploring the project and considering sharing your experience. Taking the time to help someone improve their work is genuinely meaningful.</p>
            <div className="quote-card">“Every thoughtful suggestion is a step toward making this project better.”</div>
            <div className="button-row"><button className="secondary-btn" onClick={back}><ArrowLeft size={17} /> Back</button><button className="primary-btn" onClick={next}>Share my feedback <ArrowRight size={18} /></button></div>
          </div>
        )}

        {step === 3 && (
          <div className="screen feedback-screen">
            {status === "success" ? (
              <div className="success-screen">
                <div className="success-icon"><Check size={38} /></div>
                <p className="eyebrow">FEEDBACK RECEIVED</p>
                <h1>Thank you for helping us <span>improve.</span></h1>
                <p className="lead">Your feedback has been sent successfully to the project owner by email. Your contribution will help guide future improvements.</p>
                <div className="privacy-card"><LockKeyhole size={18} /><span>Your response is sent to the project owner's Gmail through EmailJS for review and future enhancements.</span></div>
                <button className="primary-btn" onClick={() => { setStep(0); setStatus("idle"); setRating(0); setRecommend(""); setForm({ name:"", email:"", role:"", liked:"", improve:"", comments:"", consent:true }); }}>Back to welcome <ArrowRight size={18} /></button>
              </div>
            ) : (
              <>
                <div className="form-heading">
                  <div><p className="eyebrow">YOUR VOICE COUNTS</p><h1>Share your <span>feedback.</span></h1><p className="form-subtitle">A few honest answers can make a real difference. Thank you!</p></div>
                  <div className="mini-orb"><MessageCircle size={23} /></div>
                </div>
                <form onSubmit={submitFeedback}>
                  <div className="field-group">
                    <label>How would you rate the overall project? <b>*</b></label>
                    <div className="rating-row">
                      {[1,2,3,4,5].map(value => <button type="button" key={value} className={`star-btn ${rating >= value ? "selected" : ""}`} onClick={() => setRating(value)} aria-label={`${value} star${value > 1 ? "s" : ""}`}><Star size={27} fill={rating >= value ? "currentColor" : "none"} /></button>)}
                      <span className="rating-caption">{["", "Needs work", "Fair", "Good", "Very good", "Excellent"][rating]}</span>
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="field-group"><label htmlFor="name">Your name <span>(optional)</span></label><input id="name" value={form.name} onChange={e => update("name", e.target.value)} placeholder="Enter your name" maxLength="80" /></div>
                    <div className="field-group"><label htmlFor="email">Email address <span>(optional)</span></label><input id="email" type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" maxLength="120" /></div>
                  </div>
                  <div className="field-group"><label htmlFor="role">You are a...</label><select id="role" value={form.role} onChange={e => update("role", e.target.value)}><option value="">Select one (optional)</option><option>Student</option><option>Developer / IT professional</option><option>Banking / Finance professional</option><option>Teacher / Faculty</option><option>Other</option></select></div>
                  <div className="field-group"><label>Would you recommend this project to others?</label><div className="choice-row">{["Yes", "Maybe", "No"].map(choice => <button type="button" key={choice} className={`choice ${recommend === choice ? "chosen" : ""}`} onClick={() => setRecommend(choice)}>{choice}</button>)}</div></div>
                  <div className="field-group"><label htmlFor="liked">What did you like about the project?</label><textarea id="liked" rows="3" value={form.liked} onChange={e => update("liked", e.target.value)} placeholder="Tell us what worked well..." maxLength="2000" /></div>
                  <div className="field-group"><label htmlFor="improve">What should we improve?</label><textarea id="improve" rows="3" value={form.improve} onChange={e => update("improve", e.target.value)} placeholder="Share any issues or suggestions..." maxLength="2000" /></div>
                  <div className="field-group"><label htmlFor="comments">Any other comments? <span>(optional)</span></label><textarea id="comments" rows="2" value={form.comments} onChange={e => update("comments", e.target.value)} placeholder="Anything else you’d like us to know..." maxLength="2000" /></div>
                  <label className="consent-row"><input type="checkbox" checked={form.consent} onChange={e => update("consent", e.target.checked)} /><span>I understand that my feedback will be sent by email to the project owner for project evaluation, model improvement research, and future enhancements. <b>*</b></span></label>
                  {error && <div className="error-message">{error}</div>}
                  <div className="submit-row"><button type="button" className="secondary-btn" onClick={back}><ArrowLeft size={17} /> Back</button><button className="primary-btn submit-btn" type="submit" disabled={status === "sending"}>{status === "sending" ? "Submitting..." : "Submit feedback"} <ArrowRight size={18} /></button></div>
                  <p className="secure-foot"><LockKeyhole size={13} /> Please don’t include passwords, financial account details, or other sensitive personal information.</p>
                </form>
              </>
            )}
          </div>
        )}
      </section>
      <footer className="footer"><span>Made with care by <strong>Nilesh Manke</strong></span><span><LockKeyhole size={12} /> Feedback for continuous improvement</span></footer>
    </main>
  );
}

export default App;