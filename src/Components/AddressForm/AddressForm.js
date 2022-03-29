import "./addressform.css";

function AddressForm(props) {
  return (
    <div className="AddressForm">
      <div className="address-form-inputs">
        <form>
          <div className="address-top">
            <input
              onChange={props.updateAddressLine1}
              type="text"
              id="input-1"
              value={props.input1Value}
              placeholder="Name"
            />

            <input
              onChange={props.updateAddressLine2}
              type="text"
              id="input-2"
              value={props.input2Value}
              placeholder="10 Digit Mobile Number"
            />
          </div>

          <div className="address-mid-1">
            <input
              onChange={props.updateAddressLine3}
              type="text"
              id="input-3"
              value={props.input3Value}
              placeholder="Email Address"
            />

            <input
              onChange={props.updateAddressLine4}
              type="text"
              id="input-4"
              value={props.input4Value}
              placeholder="Pincode"
            />
          </div>

          <div className="address-mid-2">
            <textarea
              onChange={props.updateAddressLine5}
              type="text"
              id="input-5"
              value={props.input5Value}
              placeholder="Address (Area & Street)"
            ></textarea>
          </div>

          <div className="address-bottom">
            <input
              onChange={props.updateAddressLine6}
              type="text"
              id="input-6"
              value={props.input6Value}
              placeholder="City/District/Town"
            />

            <input
              onChange={props.updateAddressLine7}
              type="text"
              id="input-7"
              value={props.input7Value}
              placeholder="State"
            />
          </div>
        </form>
      </div>

      <div className="address-button-group">
        <button onClick={props.updateSavedAddresses}>Save</button>
        <button onClick={props.cancelUpdateSavedAddresses}>Cancel</button>
      </div>
    </div>
  );
}

export default AddressForm;
