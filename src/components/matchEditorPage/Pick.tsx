import React from "react";
import { PlayerLite } from "../../types/Player";
import { PickEvent } from "../../types/MatchEvent";
import { Team } from "../../types/Team";
interface Props {
	first: PlayerLite | Team;
	second: PlayerLite | Team;
	pick: PickEvent;
	pickData: PickEvent[];
	setPickData: (picks: PickEvent[]) => void;
	availableMaps: string[];
}
const Pick = ({ first, second, pickData, pick, setPickData, availableMaps }: Props) => {
	return (
		<div>
			<div>
				<div>{pick.who}</div>
				<div>what</div>
				<div>which</div>
			</div>
		</div>
	);
};

export default Pick;
