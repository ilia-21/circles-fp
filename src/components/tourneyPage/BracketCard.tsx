// @ts-ignore
import { DoubleEliminationBracket, SVGViewer, createTheme } from "@g-loot/react-tournament-brackets";
import { Tourney } from "../../types/Tourney";
import "./BracketCard.css";
import { useEffect, useRef, useState } from "react";
import { Score, Side, StyledMatch, Team, TopText, BottomText, Wrapper, Line, Anchor } from "@g-loot/react-tournament-brackets/dist/esm/components/match/styles";
import ProcessTournamentBracket from "../../functions/ProcessTournamentBracket";

interface Props {
	tourney: Tourney;
}
const cfpTheme = createTheme({
	textColor: { main: "#FFFFFF", highlighted: "#A6D8AD", dark: "#FFFFFF90" },
	matchBackground: { wonColor: "#2D3830", lostColor: "#212923" },
	score: {
		background: { wonColor: "#39473c", lostColor: "#2e3830" },
		text: { highlightedWonColor: "#FFFFFF", highlightedLostColor: "#FFFFFF" },
	},
	border: {
		color: "#CED1F200",
		highlightedColor: "#CED1F2",
	},
	connectorColor: "rgb(47, 0, 0)",
	connectorColorHighlight: "#A6D8AD",

	roundHeaders: {
		background: "#2D3830",
	},
});

const BracketCard = ({ tourney }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				setWidth(containerRef.current.offsetWidth);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	tourney.data.bracket = ProcessTournamentBracket(tourney);
	const finalWidth = Math.max(width, 500);
	//I am in a lot of pain right now :start
	//Sorry to whoever will have to read this :after 17 minutes
	//Leaving like this for now, maybe add clickable players in the future :after 26 minutes
	//I found out that I can't customize rounds text :sob: :after 36 minutes
	return (
		<div ref={containerRef} className="bracketCardContainer">
			<DoubleEliminationBracket
				matches={tourney.data.bracket}
				matchComponent={(
					{ match, onMatchClick, onPartyClick, onMouseEnter, onMouseLeave, topParty, bottomParty, topWon, bottomWon, topHovered, bottomHovered, topText, bottomText }: any //connectorColor, computedStyles, teamNameFallback, resultFallback
				) => (
					<Wrapper>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<TopText>{topText}</TopText>
							{(match.href || typeof onMatchClick === "function") && (
								<Anchor href={match.href} onClick={(event: any) => onMatchClick?.({ match, topWon, bottomWon, event })}>
									<TopText>Details</TopText>
								</Anchor>
							)}
						</div>
						<StyledMatch>
							<Side onMouseEnter={() => onMouseEnter(topParty.id)} onMouseLeave={onMouseLeave} won={topWon} hovered={topHovered} onClick={() => onPartyClick?.(topParty, topWon)}>
								<Team>{topParty?.name}</Team>
								<Score won={topWon}>{topParty?.resultText}</Score>
							</Side>
							<Line highlighted={topHovered || bottomHovered} />
							<Side onMouseEnter={() => onMouseEnter(bottomParty.id)} onMouseLeave={onMouseLeave} won={bottomWon} hovered={bottomHovered} onClick={() => onPartyClick?.(bottomParty, bottomWon)}>
								<Team>{bottomParty?.name}</Team>
								<Score won={bottomWon}>{bottomParty?.resultText}</Score>
							</Side>
						</StyledMatch>
						<BottomText>{bottomText ?? " "}</BottomText>
					</Wrapper>
				)}
				theme={cfpTheme}
				svgWrapper={({ children, ...props }: any) => (
					<SVGViewer SVGBackground="#161B17" width={finalWidth} height={1000} {...props}>
						{children}
					</SVGViewer>
				)}
			/>
		</div>
	);
};

export default BracketCard;
