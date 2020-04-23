import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/ContactContext";

const ContactItem = ({ contact }) => {
  //use the data in the context
  const contactContext = useContext(ContactContext);

  const { _id, name, email, phone, type } = contact;

  const badgeColor =
    type === "professional" ? "badge-success" : "badge-primary";

  const handleDelete = () => {
    contactContext.deleteContact(_id);
    contactContext.clearCurrent();
  };

  const handleEdit = () => {
    contactContext.setCurrent(contact);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span className={`badge ${badgeColor}`} style={{ float: "right" }}>
          {type}
        </span>
      </h3>

      <ul className="list">
        {email && (
          <li>
            <i className="fa fa-envelope"></i> {"  "}
            {email}
          </li>
        )}

        {phone && (
          <li>
            <i className="fa fa-phone"></i> {"  "}
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-warning" onClick={handleEdit}>
          <i className="fa fa-pencil"></i>
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          <i className="fa fa-trash"></i>
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
