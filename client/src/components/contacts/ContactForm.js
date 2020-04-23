import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  //Destructure the current contact
  const { current } = contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  useEffect(() => {
    if (current !== null && current !== undefined) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (current === null || current === undefined) {
      contactContext.addContact(contact);
    } else {
      contactContext.updateContact(contact);
    }

    handleClear();
  };

  const handleClear = () => {
    contactContext.clearCurrent();
  };

  const title =
    current === null || current === undefined ? "Add Contact" : "Edit Contact";

  const buttonText =
    current === null || current === undefined
      ? "Add Contact"
      : "Update Contact";

  const buttonColor = buttonText === "Add Contact" ? "primary" : "warning";

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">{title}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={handleChange}
      />{" "}
      Personal {"  "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={handleChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={buttonText}
          className={`btn btn-${buttonColor} btn-block`}
        />
      </div>
      {current !== null && current !== undefined && (
        <div>
          <button className="btn btn-light btn-block" onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
