import React, { useState, useEffect } from "react";

const Problem2 = () => {
  const [modalType, setModalType] = useState(null);
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyEven, setOnlyEven] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const apiURL = `https://contact.mediusware.com/api/contacts/?page=${page}`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => setContacts(data.results))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, [page]);
  const handleOpenModalA = () => {
    setModalType("A");
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    setPage(1);
  };

  const handleOpenModalB = () => {
    setModalType("B");
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
    setPage(1);
  };

  const handleOpenModalC = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(true);
  };

  const handleCloseModals = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
  };

  const handleFilterContacts = () => {
    const filtered = contacts.filter((contact) => {
      const matchesSearch = contact.phone
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isEven = contact.id % 2 === 0;
      return matchesSearch && (!onlyEven || (onlyEven && isEven));
    });

    setFilteredContacts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setTimeout(handleFilterContacts, 300);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      handleFilterContacts();
    }
  };

  const handleOnlyEvenChange = () => {
    setOnlyEven(!onlyEven);
    handleFilterContacts();
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            style={{ backgroundColor: modalType === "A" ? "#46139f" : "" }}
            onClick={handleOpenModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            style={{ backgroundColor: modalType === "B" ? "#ff7f50" : "" }}
            onClick={handleOpenModalB}
          >
            US Contacts
          </button>
        </div>

        {showModalA && (
          <div className="contacts-container mt-5">
            <div className="d-flex gap-3">
              <button
                className="btn btn-lg btn-primary"
                type="button"
                onClick={handleOpenModalA}
                style={{ backgroundColor: "#46139f" }}
              >
                All Contacts
              </button>
              <button
                className="btn btn-lg btn-warning"
                type="button"
                onClick={handleOpenModalB}
                style={{ backgroundColor: "#ff7f50" }}
              >
                US Contacts
              </button>
              <button
                className="btn btn-lg btn-dark"
                type="button"
                onClick={handleCloseModals}
                style={{ backgroundColor: "#46139f", color: "white" }}
              >
                Close
              </button>
            </div>

            <div className="search-options">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="onlyEvenCheckbox"
                  checked={onlyEven}
                  onChange={handleOnlyEvenChange}
                  className="mt-4"
                />
                <label htmlFor="onlyEvenCheckbox">Only even</label>
              </div>
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchEnter}
                />
              </div>
            </div>

            <ul className="contact-list" onScroll={handleScroll}>
              {filteredContacts.map((contact) => (
                <li key={contact.id} onClick={handleOpenModalC}>
                  {contact.phone}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showModalB && (
          <div className="mt-5">
            <div className="d-flex gap-3">
              <button
                className="btn btn-lg btn-outline-primary"
                type="button"
                onClick={handleOpenModalA}
                style={{ backgroundColor: "#46139f" }}
              >
                All Contacts
              </button>
              <button
                className="btn btn-lg btn-outline-warning"
                type="button"
                onClick={handleOpenModalB}
                style={{ backgroundColor: "#ff7f50" }}
              >
                US Contacts
              </button>
              <button
                className="btn btn-lg btn-outline-dark"
                type="button"
                onClick={handleCloseModals}
                style={{ backgroundColor: "#46139f", color: "white" }}
              >
                Close
              </button>
            </div>
            <input
              type="checkbox"
              id="onlyEvenCheckbox"
              checked={onlyEven}
              onChange={handleOnlyEvenChange}
              className="mt-4"
            />
            <label htmlFor="onlyEvenCheckbox">Only even</label>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchEnter}
            />
            <ul onScroll={handleScroll}>
              {filteredContacts.map((contact) => (
                <li key={contact.id} onClick={handleOpenModalC}>
                  {contact.phone}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showModalC && (
          <div className="mt-5">
            <button
              className="btn btn-lg btn-outline-primary"
              type="button"
              onClick={handleOpenModalA}
              style={{ backgroundColor: "#46139f" }}
            >
              All Contacts
            </button>
            <button
              className="btn btn-lg btn-outline-warning"
              type="button"
              onClick={handleOpenModalB}
              style={{ backgroundColor: "#ff7f50" }}
            >
              US Contacts
            </button>
            <button
              className="btn btn-lg btn-outline-dark"
              type="button"
              onClick={handleCloseModals}
              style={{ backgroundColor: "#46139f", color: "white" }}
            >
              Close
            </button>
            <h5>Contact Details</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;
