import React, { useState, useEffect } from "react";
const Contact = ({ member, colorToggle }) => {

  const [cc, setCc] = useState(member);
  const [edit, setEdit] = useState(false);
  const [editFirst, setEditFirst] = useState(cc.firstName);
  const [editLast, setEditLast] = useState(cc.lastName);
  const [editPhone, setEditPhone] = useState(cc.phone);
  const handleFirst = (event) => {
    setEditFirst(event.target.value);
  };
  const handleLast = (event) => {
    setEditLast(event.target.value);
  };
  const handlePhone = (event) => {
    setEditPhone(event.target.value);
  };
  useEffect(() => {
    setCc(member)
  }, [member])
  useEffect(() => {
    const copy = cc;
    copy.firstName = editFirst;
    copy.lastName = editLast;
    copy.phone = editPhone;
    setCc(copy)
  }, [editFirst, editLast, editPhone]);
  const classTog = colorToggle === 0 ? "contact" : "contact2"
  return (
    <div className={classTog}>
      {!edit ? (
        <>
        <div className = {"cardHeaders"}>Name: <d className = {"cardText"}>{`${cc.firstName} ${cc.lastName}`}</d> </div>
        <div className = {"cardHeaders"}>Company: <d className = {"cardText"}>{`${cc.company}`}</d> </div>
        <div className = {"cardHeaders"}>Title: <d className = {"cardText"}>{`${cc.title}`}</d> </div>
        <div className = {"cardHeaders"}>Department: <d className = {"cardText"}>{`${cc.department}`}</d> </div>
        <div className = {"cardHeaders"}>Phone: <d className = {"cardText"}>{`${cc.phone}`}</d> </div>
        <div className = {"cardHeaders"}>Address: <d className = {"cardText"}>{`${cc.address}`}</d> </div>
        <div className = {"cardHeaders"}>Website: <d className = {"cardText"}>{`${cc.url}`}</d> </div>
        <img src = {cc.image} className = {"cardHeaders"}></img>
        </>
      ) : (
        <>
          <input defaultValue={cc.firstName} onChange={handleFirst}></input>{" "}
          <input defaultValue={cc.lastName} onChange={handleLast}></input>
          <p>
            <input defaultValue={cc.phone} onChange={handlePhone}></input>
          </p>
          <div className="contact-save" onClick={() => {
            setEdit(false)
            }}>
            Save
          </div>
        </>
      )}
    </div>
  );
};

export default Contact;