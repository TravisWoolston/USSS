import React, { useState, useEffect } from "react";
const Contact = ({ member, colorToggle }) => {
  const [cc, setCc] = useState(member);
  useEffect(() => {
    setCc(member)
  }, [member])
  const classTog = colorToggle === 0 ? "contact" : "contact2"
  return (
    <div className={classTog}>
        <>
        <div className = {"cardHeaders"}>Name: <d className = {"cardText"}>{`${cc.firstName} ${cc.lastName}`}</d> </div>
        <div className = {"cardHeaders"}>Company: <d className = {"cardText"}>{`${cc.company}`}</d> </div>
        <div className = {"cardHeaders"}>Title: <d className = {"cardText"}>{`${cc.title}`}</d> </div>
        <div className = {"cardHeaders"}>Department: <d className = {"cardText"}>{`${cc.department}`}</d> </div>
        <div className = {"cardHeaders"}>Phone: <d className = {"cardText"}>{`${cc.phone}`}</d> </div>
        <div className = {"cardHeaders"}>Address: <d className = {"cardText"}>{`${cc.address}`}</d> </div>
        <div className = {"cardHeaders"}>Website: <d className = {"cardText"}>{`${cc.url}`}</d> </div>
        <img src = {cc.image} width={"170px"} maxHeight={"100px"}className = {"cardHeaders"}></img>
        </>
    </div>
  );
};

export default Contact;