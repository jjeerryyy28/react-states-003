import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumeric, setIncludeNumeric] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numericChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let validChars = "";
    if (includeUppercase) validChars += uppercaseChars;
    if (includeLowercase) validChars += lowercaseChars;
    if (includeNumeric) validChars += numericChars;
    if (includeSymbols) validChars += symbolChars;

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      newPassword += validChars[randomIndex];
    }

    setGeneratedPassword(newPassword);
  };

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.value = generatedPassword;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <div className="password-generator-container">
      <h1 className="password-generator-heading">Password Generator</h1>
      <div className="input-container">
        <label>
          Select password length
          <input
            type="number"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            className="password-length-input"
          />
        </label>
      </div>
      <div className="generated-password">
        <input
          type="text"
          value={generatedPassword}
          readOnly
          className="generated-password-input"
        />
        <button onClick={copyToClipboard} className="copy-button">
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include Uppercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Include Lowercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumeric}
            onChange={() => setIncludeNumeric(!includeNumeric)}
          />
          Include Numeric
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Include Symbols
        </label>
      </div>
      <button onClick={generatePassword} className="generate-button">
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
