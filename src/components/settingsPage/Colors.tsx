import { ColorResult, SketchPicker } from "react-color";
import type { UserSettings } from "../../types/Player";
import { useState, useRef, useEffect } from "react";
import "./../../pages/Settings.css";
import { defaultColors } from "../../pages/Settings";
import HeaderButtons from "./HeaderButtons";

interface Props {
	userSettings: UserSettings;
	setUserSettings: (settings: UserSettings) => void;
	importSettings: (section: string) => void;
	exportSettings: (section: string) => void;
}

const colorTitles = {
	cfpBgDark: "Darker background",
	cfpBg: "Background",
	cfpBgSecondary: "Secondary background",
	cfpBgTertiary: "Tertiary background",
	cfpAccent: "Accent color",
	cfpText: "Text color",
	advanced: {
		rosewater: "Catppucchin Mocha rosewater",
		flamingo: "Catppucchin Mocha flamingo",
		pink: "Catppucchin Mocha pink",
		mauve: "Catppucchin Mocha mauve",
		red: "Catppucchin Mocha red",
		maroon: "Catppucchin Mocha maroon",
		peach: "Catppucchin Mocha peach",
		yellow: "Catppucchin Mocha yellow",
		green: "Catppucchin Mocha green",
		teal: "Catppucchin Mocha teal",
		sky: "Catppucchin Mocha sky",
		sapphire: "Catppucchin Mocha sapphire",
		blue: "Catppucchin Mocha blue",
		lavender: "Catppucchin Mocha lavender",
		text: "Catppucchin Mocha text",
		subtext0: "Catppucchin Mocha subtext0",
		subtext1: "Catppucchin Mocha subtext1",
		overlay0: "Catppucchin Mocha overlay0",
		overlay1: "Catppucchin Mocha overlay1",
		overlay2: "Catppucchin Mocha overlay2",
		surface0: "Catppucchin Mocha surface0",
		surface1: "Catppucchin Mocha surface1",
		surface2: "Catppucchin Mocha surface2",
		base: "Catppucchin Mocha base",
		mantle: "Catppucchin Mocha mantle",
		crust: "Catppucchin Mocha crust",
	},
};
const styles: React.CSSProperties = { WebkitTouchCallout: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none", userSelect: "none" };
const Colors = ({ userSettings, setUserSettings, importSettings, exportSettings }: Props) => {
	const [fulldarkness, setFulldarkness] = useState<boolean>(false);
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const [currentColor, setCurrentColor] = useState<string>("");
	const pickerRef = useRef<HTMLDivElement>(null);

	const handleUpdate = (e: ColorResult, color: string) => {
		const updatedColors = { ...userSettings.colors, [color]: e.hex };
		const updatedSettings = { ...userSettings, colors: updatedColors };
		const rootVariableName = color
			.split(/\.?(?=[A-Z])/)
			.join("-")
			.toLowerCase();
		document.documentElement.style.setProperty(`--${rootVariableName}`, e.hex);
		setUserSettings(updatedSettings);
		let fulldarknessColors = true;
		//@ts-ignore
		for (const clr of Object.keys(updatedSettings.colors)) {
			if (clr != "advanced") {
				if (fulldarknessColors) fulldarknessColors = (updatedSettings as any).colors[clr] == "#000000";
			}
		}
		if (fulldarknessColors) {
			setFulldarkness(true);
			document.getElementsByClassName("navBar")[0].setAttribute("style", "opacity:0");
			document.getElementById("restoreSettings")?.setAttribute("style", "z-index:999; color:#89B4FA");
		} else {
			setFulldarkness(false);
			document.getElementsByClassName("navBar")[0].setAttribute("style", "opacity:1");
			document.getElementById("restoreSettings")?.setAttribute("style", "z-index:auto; color:#89B4FA;");
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
			setShowPicker(false);
		}
	};

	const handleEscapeKey = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setShowPicker(false);
		}
	};
	const updateColors = () => {
		for (const clr of Object.keys(userSettings.colors)) {
			if (clr != "advanced") {
				const rootVariableName = clr
					.split(/\.?(?=[A-Z])/)
					.join("-")
					.toLowerCase();
				document.documentElement.style.setProperty(`--${rootVariableName}`, (userSettings as any).colors[clr]);
				document.getElementsByClassName("navBar")[0].setAttribute("style", "opacity:1");
			}
		}
	};
	useEffect(() => {
		updateColors();
	}, [userSettings.colors]);
	const setDefaultColors = () => {
		const updatedSettings = { ...userSettings, colors: defaultColors };
		setUserSettings(updatedSettings);
		updateColors();
		setFulldarkness(false);
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, []);

	const drawColors = () => {
		let elements = [];
		for (const color of Object.keys(userSettings.colors)) {
			if (typeof (userSettings.colors as any)[color] == "string") {
				const currentPickerColor = (userSettings.colors as any)[color];
				let hex;
				if (currentPickerColor.startsWith("#")) {
					hex = (userSettings.colors as any)[color];
				} else {
					hex = (userSettings.colors as any).advanced[currentPickerColor.replace("var(--", "").replace(")", "")];
				}

				elements.push(
					<div className="settings-color-block" key={color}>
						<div className="settings-color-container">
							<p>{(colorTitles as any)[color]}</p>
							<div
								className="settings-color-preview"
								style={{ background: hex }}
								onClick={() => {
									setCurrentColor(color);
									setShowPicker(true);
								}}
							></div>
						</div>
						{showPicker && currentColor === color && (
							<div ref={pickerRef}>
								<SketchPicker
									color={hex}
									onChange={(e) => {
										handleUpdate(e, color);
									}}
								/>
							</div>
						)}
					</div>
				);
			}
		}
		return elements;
	};

	return (
		<div style={styles}>
			<div className="settings-colors-header">
				<h2 className="settings-header-title">Colors</h2>
				<HeaderButtons exportSettings={exportSettings} importSettings={importSettings} setDefaults={setDefaultColors} section="colors" />
			</div>
			{userSettings.colors && drawColors()}
			{fulldarkness && (
				<div className="full-darkness-easter-egg">
					<img src="https://c.tenor.com/bTfeApdPmN4AAAAC/tenor.gif" alt="" />
				</div>
			)}
		</div>
	);
};

export default Colors;
