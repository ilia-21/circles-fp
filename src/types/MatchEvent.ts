import { MappoolMod } from "./Beatmap";
import { Mod } from "./Mod";
import { PlayerLitest } from "./Player";

export interface MatchEvent {
	id: number;
	detail: Detail;
	timestamp: string;
	user_id?: number;
	game?: Game;
}

export interface Detail {
	type: "match-created" | "player-joined" | "other" | "player-left" | "match-disbanded" | "pickban" | "tb";
	text?: string;
}

export interface Game {
	beatmap_id: number;
	id: number;
	start_time: string;
	end_time?: string;
	mode: string;
	mode_int: number;
	scoring_type: string;
	team_type: string;
	mods: string[];
	beatmap: BeatmapLite;
	scores: Score[];
}

export interface BeatmapLite {
	beatmapset_id: number;
	difficulty_rating: number;
	id: number;
	mode: string;
	status: string;
	total_length: number;
	user_id: number;
	version: string;
	beatmapset: Beatmapset;
}

export interface Beatmapset {
	artist: string;
	artist_unicode: string;
	covers: Covers;
	creator: string;
	favourite_count: number;
	hype: any;
	id: number;
	nsfw: boolean;
	offset: number;
	play_count: number;
	preview_url: string;
	source: string;
	spotlight: boolean;
	status: string;
	title: string;
	title_unicode: string;
	track_id: any;
	user_id: number;
	video: boolean;
}

export interface Covers {
	cover: string;
	"cover@2x": string;
	card: string;
	"card@2x": string;
	list: string;
	"list@2x": string;
	slimcover: string;
	"slimcover@2x": string;
}

export interface Score {
	accuracy: number;
	best_id: any;
	created_at: string;
	id: any;
	max_combo: number;
	mode: string;
	mode_int: number;
	mods: Mod[];
	passed: boolean;
	perfect: number;
	pp: any;
	rank: string;
	replay: boolean;
	score: number;
	statistics: Statistics;
	type: string;
	user_id: number;
	current_user_attributes: CurrentUserAttributes;
	match: Match;
	player: PlayerLitest;
}

export interface Statistics {
	count_100: number;
	count_300: number;
	count_50: number;
	count_geki: number;
	count_katu: number;
	count_miss: number;
}

export interface CurrentUserAttributes {
	pin: any;
}

export interface Match {
	slot: number;
	team: string;
	pass: boolean;
}
export interface PickEvent {
	detail: {
		type: "pickban";
	};
	who: "first" | "second" | "tb";
	type: "ban" | "pick" | "tb";
	map: MappoolMod;
}
