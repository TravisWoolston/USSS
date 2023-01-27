import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Contact from "./components/Contact";
const App = () => {
  const [members, setMembers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [search, setSearch] = useState("");
  const [updated, setUpdated] = useState(search);
  const getMembers = async () => {
    await axios.get("http://localhost:3000/members").then((data) => {
      setMembers(data.data.splice(0, 50));
    });
  };
  const getMember = async (queryStr) => {
    await axios
      .get(`http://localhost:3000/member`, {
        params: { query: queryStr },
        headers: {
          Accept: "*/*, application/json, text/plain",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((data) => {
        setMembers(data.data.splice(0, 50));
      });
  };
  const getAddresses = async () => {
    await axios.get("http://localhost:3000/addresses").then((data) => {
      setAddresses(data.data.splice(0, 50));
    });
  };

  const ContactList = ({ members, addresses }) => {
    const memberFormat = [];
    let i = 0;
    members?.forEach((member) => {
      member.address = addresses[i]?.address;
      memberFormat.push(
        <Contact member={member} colorToggle={i % 2}></Contact>
      );
      i++;
    });

    return memberFormat;
  };
  const handleChange = (event) => {
    const val = event.target.value;
    setSearch(val);
  };
  useEffect(() => {
    if (search.length < 1) {
      getMembers();
    }
    setMembers([]);
    if (search.length > 0) getMember(search);
  }, [search]);
  useEffect(() => {
  }, [members]);
  useEffect(() => {}, [updated]);
  useEffect(() => {
    getMembers();
    getAddresses();
  }, []);
  return (
    <div className="Search">
      <input
        type="text"
        name="search"
        placeholder="First Name"
        onChange={handleChange}
      />
      <ContactList members={members} addresses={addresses} />
    </div>
  );
};

export default App;
