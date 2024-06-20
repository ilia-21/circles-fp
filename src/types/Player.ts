export interface Player {
	avatar_url: string;
	country_code: string;
	default_group: string;
	id: number;
	is_active: boolean;
	is_bot: boolean;
	is_deleted: boolean;
	is_online: boolean;
	is_supporter: boolean;
	last_visit: Date;
	pm_friends_only: boolean;
	profile_colour: string;
	username: string;
	cover_url: string;
	discord: null;
	has_supported: boolean;
	interests: null;
	join_date: Date;
	location: null;
	max_blocks: number;
	max_friends: number;
	occupation: null;
	playmode: string;
	playstyle: string[];
	post_count: number;
	profile_order: string[];
	title: null;
	title_url: null;
	twitter: string;
	website: string;
	country: Country;
	cover: Cover;
	kudosu: Kudosu;
	account_history: any[];
	active_tournament_banner: null;
	active_tournament_banners: any[];
	badges: any[];
	beatmap_playcounts_count: number;
	comments_count: number;
	favourite_beatmapset_count: number;
	follower_count: number;
	graveyard_beatmapset_count: number;
	groups: Group[];
	guest_beatmapset_count: number;
	loved_beatmapset_count: number;
	mapping_follower_count: number;
	monthly_playcounts: Count[];
	nominated_beatmapset_count: number;
	page: Page;
	pending_beatmapset_count: number;
	previous_usernames: any[];
	rank_highest: RankHighest;
	ranked_beatmapset_count: number;
	replays_watched_counts: Count[];
	scores_best_count: number;
	scores_first_count: number;
	scores_pinned_count: number;
	scores_recent_count: number;
	statistics: Statistics;
	support_level: number;
	user_achievements: UserAchievement[];
	rank_history: RankHistory;
	rankHistory: RankHistory;
	ranked_and_approved_beatmapset_count: number;
	unranked_beatmapset_count: number;
	cfp: Cfp;
}
/**
 * Lighter version of player data to save bandwith
 *
 * @interface PlayerLite
 */
export interface PlayerLite {
	avatar_url: string;
	id: number;
	username: string;
	statistics: Statistics;
	cover_url: string;
	country: Country;
	cover: Cover;
	cfp: Cfp;
}
/**
 * Lightest possible version of player data, containing only id, avatar and username
 *
 * @interface PlayerLitest
 */
export interface PlayerLitest {
	avatar_url: string;
	id: number;
	username: string;
}

export interface Cfp {
	roles: Roles;
	stats: CfpStats;
}

interface CfpStats {
	period: "allTime" | "lastMonth" | "lastYear";
	Rates: Rates;
}
interface Rates {
	NM: Rate;
	HR: Rate;
	HD: Rate;
	DT: Rate;
	FM: Rate;
}
/**
 * Rates for map picks/bans/wins/looses
 *
 * @timesWon Amount of maps won
 * @timesLost Amount of maps lost
 * @outOf  Total amount of maps
 */
interface Rate {
	timesWon: Times;
	timesLost: Times;
	outOf: Times;
}
/**
 * Times for picks/bans/wins/looses
 * this is prob unoptimized af, but I'll fix in later™
 * @ownPick Amount of own picks
 * @oppPick Amount of opponent picks
 *
 */
interface Times {
	ownPick: number;
	oppPick: number;
}

export interface Roles {
	[name: string]: string[];
}

interface Country {
	code: string;
	name: string;
}

interface Cover {
	custom_url: string;
	url: string;
	id: null;
}

interface Group {
	colour: string;
	has_listing: boolean;
	has_playmodes: boolean;
	id: number;
	identifier: string;
	is_probationary: boolean;
	name: string;
	short_name: string;
	playmodes: null;
}

interface Kudosu {
	available: number;
	total: number;
}

interface Count {
	start_date: Date;
	count: number;
}

interface Page {
	html: string;
	raw: string;
}

interface RankHistory {
	mode: string;
	data: number[];
}

interface RankHighest {
	rank: number;
	updated_at: Date;
}

interface Statistics {
	count_100: number;
	count_300: number;
	count_50: number;
	count_miss: number;
	level: Level;
	global_rank: number;
	global_rank_exp: null;
	pp: number;
	pp_exp: number;
	ranked_score: number;
	hit_accuracy: number;
	play_count: number;
	play_time: number;
	total_score: number;
	total_hits: number;
	maximum_combo: number;
	replays_watched_by_others: number;
	is_ranked: boolean;
	grade_counts: GradeCounts;
	country_rank: number;
	rank: Rank;
}

interface GradeCounts {
	ss: number;
	ssh: number;
	s: number;
	sh: number;
	a: number;
}

interface Level {
	current: number;
	progress: number;
}

interface Rank {
	country: number;
}

interface UserAchievement {
	achieved_at: Date;
	achievement_id: number;
}
export interface UserSettings {
	colors: {
		/* CFP styles */
		cfpBgDark: string;
		cfpBg: string;
		cfpBgSecondary: string;
		cfpBgTertiary: string;
		cfpAccent: string;
		cfpText: string;
		advanced: {
			rosewater: string;
			flamingo: string;
			pink: string;
			mauve: string;
			red: string;
			maroon: string;
			peach: string;
			yellow: string;
			green: string;
			teal: string;
			sky: string;
			sapphire: string;
			blue: string;
			lavender: string;
			text: string;
			subtext0: string;
			subtext1: string;
			overlay0: string;
			overlay1: string;
			overlay2: string;
			surface0: string;
			surface1: string;
			surface2: string;
			base: string;
			mantle: string;
			crust: string;
		};
	};
	profileButtons: string[];
}
export interface Me extends Player {
	settings: UserSettings | {};
}
