import { Component } from "react";

import "./Contact.css";
import { useForm, ValidationError } from "@formspree/react";


interface ContactState {
  Name: string;
  Email: string;
  Subject: string;
  Message: string;
}


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

export class Contact extends Component<{}, ContactState> {
  public state: Readonly<ContactState> = {
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  };

  private printSocial(
    img: any,
    header: string,
    site: string,
    url: string,
    className: string
  ) {
    return (
      <a className={"Social-Card " + className} href={url} target="blank">
        <div>
          <img className="Social-Image" src={img} />
          <div className="Social-Info">
            <div className="Social-Header">{header}</div>
            <div className="Social-Site">{site}</div>
          </div>
        </div>
      </a>
    );
  }


  private printForm() {
    return (
      <div className="Contact-Form">
        <ContactForm />
      </div>
    );
  }

  public render() {
    return (
      <div className="Contact Page" id='Contact'>
        <div className="Contact-Title">CONNECT</div>
        <hr className="Contact-HR" />
        <div className="Social-Links">
          {this.printSocial(
            "/assets/GitHub.png",
            "LOOK AT MY",
            "GITHUB",
            "https://github.com/GarrettSidle",
            "Git-Hub"
          )}
          {this.printSocial(
            "/assets/LinkedIn.png",
            "ADD ME ON",
            "LINKEDIN",
            "https://www.linkedin.com/in/garrettsidle/",
            "Linked-In"
          )}
          {this.printSocial(
            "/assets/Email.png",
            "REACH ME AT ",
            "GARRETT.SIDLE.REC@GMAIL.COM",
            "mailto:garrett.sidle.rec@gmail.com",
            "Email"
          )}
        </div>
        <div className="Contact-Sheet">
          {this.printForm()}
        </div>
      </div>
    );
  }


}

export default Contact;
