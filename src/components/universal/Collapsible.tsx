import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const Collapsible = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleCollapse = () => {
		setIsOpen(!isOpen);
	};
	const [firstChild, ...restChildren] = React.Children.toArray(children);

	return (
		<div className="collapsible-container">
			<div className="collapsible-header">
				{firstChild}
				{isOpen ? <BsChevronUp onClick={toggleCollapse} className="collapsible-button" /> : <BsChevronDown onClick={toggleCollapse} className="collapsible-button" />}
			</div>
			{isOpen && <div className="collapsible-content">{restChildren}</div>}
		</div>
	);
};

export default Collapsible;
