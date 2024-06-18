import React, { useState, useEffect } from "react";
import "./InputWithSuggestions.css";
import { CSSProperties } from "styled-components";

interface Props {
	name: string;
	suggestions: string[];
	value: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
	inputStyle?: CSSProperties;
	containerStyle?: CSSProperties;
}

const InputWithSuggestions = ({ name, suggestions, value, onChange, onBlur, onPaste, onKeyDown, inputStyle, containerStyle }: Props) => {
	const [inputValue, setInputValue] = useState(value);
	const [selected, setSelected] = useState(0);
	const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	useEffect(() => {
		if (inputValue) {
			const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().startsWith((inputValue as string).toLowerCase()));
			setFilteredSuggestions(filtered);
			//setShowSuggestions(true);
		} else {
			setFilteredSuggestions([]);
			//setShowSuggestions(false);
		}
	}, [inputValue, suggestions]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		!showSuggestions && !suggestions.includes(e.target.value.toLowerCase()) && setShowSuggestions(true);
		setInputValue(e.target.value);
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.code) {
			case "Enter":
				e.preventDefault();
				setTimeout(() => setInputValue(filteredSuggestions[selected]), 10);
				//typescript :sob:
				e.currentTarget.blur();
				setTimeout(() => {
					setShowSuggestions(false);
					onBlur && onBlur(e as unknown as React.FocusEvent<HTMLInputElement>);
				}, 100);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelected(selected - 1 < 0 ? selected : selected - 1);
				break;
			case "ArrowDown":
				e.preventDefault();
				setSelected(selected + 1 > filteredSuggestions.length - 1 ? selected : selected + 1);
				break;
		}
	};

	const handleSuggestionClick = (suggestion: string) => {
		setInputValue(suggestion);
		setShowSuggestions(false);
	};

	return (
		<div className="inputWithSuggestions" style={containerStyle || {}}>
			<input
				type="text"
				name={name}
				value={inputValue}
				onChange={(e) => {
					handleInputChange(e);
					onChange && onChange(e);
				}}
				onPaste={onPaste}
				onFocus={(e) => !suggestions.includes(e.target.value) && setShowSuggestions(true)}
				onKeyDown={(e) => {
					handleKeyDown(e);
					onKeyDown && onKeyDown(e);
				}}
				onBlur={(e) => {
					// Allow time for click to register before hiding suggestions
					setTimeout(() => setShowSuggestions(false), 50);
					onBlur && onBlur(e);
				}}
				className="minimalisticInput"
				style={inputStyle || {}}
			/>
			{showSuggestions && filteredSuggestions.length > 0 && (
				<div className="inputWithSuggestions-suggestions">
					{filteredSuggestions.map((suggestion, index) => (
						<p key={index} className={selected == index ? "selected" : ""} onClick={() => handleSuggestionClick(suggestion)}>
							{suggestion}
						</p>
					))}
				</div>
			)}
		</div>
	);
};

export default InputWithSuggestions;
