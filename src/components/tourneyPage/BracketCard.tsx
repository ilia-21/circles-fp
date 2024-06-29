// @ts-ignore
import { DoubleEliminationBracket, SVGViewer, createTheme } from "@g-loot/react-tournament-brackets";
import { Tourney } from "../../types/Tourney";
import "./BracketCard.css";
import { useEffect, useRef, useState } from "react";
import { Score, Side, StyledMatch, Team, TopText, BottomText, Wrapper, Line, Anchor } from "@g-loot/react-tournament-brackets/dist/esm/components/match/styles";
import ProcessTournamentBracket from "../../functions/ProcessTournamentBracket";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

interface Props {
	tourney: Tourney;
	bracketWidth?: number;
}
const cfpTheme = createTheme({
	textColor: { main: "var(--text)", highlighted: "var(--cfp-accent)", dark: "var(--surface-1)", won: "var(--green)", lost: "var(--red)" },
	// seperate colors for score and username are not allowed sadly
	// fine, I'll do it myself

	matchBackground: { wonColor: "var(--cfp-bg-tertiary)", lostColor: "var(--cfp-bg-secondary)" },
	score: {
		background: { wonColor: "var(--cfp-bg-secondary)", lostColor: "var(--cfp-bg)" },
		text: { highlightedWonColor: "var(--cfp-accent)", highlightedLostColor: "var(--cfp-accent)" },
	},
	border: {
		color: "#CED1F200",
		highlightedColor: "#CED1F250",
	},
	connectorColor: "rgb(47, 0, 0)",
	connectorColorHighlight: "var(--base)",

	roundHeaders: {
		background: "var(--cfp-bg-secondary)",
	},
});

const BracketCard = ({ tourney, bracketWidth }: Props) => {
	if (!tourney.data.bracket) {
		return <p>{tourney.title} doesn't have a bracket</p>;
	}
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState<number>(bracketWidth || 0);

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

	const localBracket = ProcessTournamentBracket(tourney);
	const finalWidth = Math.max(width, 500);
	//I am in a lot of pain right now :start
	//Sorry to whoever will have to read this :after 17 minutes
	//Leaving like this for now, maybe add clickable players in the future :after 26 minutes
	//I found out that I can't customize rounds text :sob: :after 36 minutes
	return (
		<ErrorBoundary
			fallbackRender={(Props: FallbackProps) => {
				console.log(Props.error, tourney.data.bracket);
				return <p>Bracket could not be rendered</p>;
			}}
		>
			<div ref={containerRef} className="bracketCardContainer">
				<DoubleEliminationBracket
					matches={localBracket}
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
						<SVGViewer SVGBackground="var(--cfp-bg)" width={finalWidth} height={500} {...props}>
							{children}
						</SVGViewer>
					)}
				/>
			</div>
		</ErrorBoundary>
	);
};

export default BracketCard;
