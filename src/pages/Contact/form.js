import { useForm, ValidationError } from "@formspree/react";
import "./Contact.css";

function ContactForm() {
  const [state, handleSubmit] = useForm("mlekdrjy");
  if (state.succeeded) {
    return (
      <div>
        <p className="Contact-Response">I WILL RESPOND AS SOON AS POSSIBLE</p>
        <p className="Contact-Thank-You">THANK YOU!</p>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="test">
          <input
            className="Contact-Email"
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
        <div >
          <textarea
            className="Contact-Message"
            id="message"
            name="message"
            placeholder="Your Message"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={state.submitting}
            className="Contact-Button"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
function ConnectForm() {
  return <ContactForm />;
}
export default ConnectForm;
